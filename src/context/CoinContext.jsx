
import { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { auth, db } from '../services/firebase'; // Import Firebase
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const CoinContext = createContext();

export const useCoins = () => useContext(CoinContext);

export const CoinProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initial State (Default empty, will fill from LocalStorage OR Firebase)
    const [coins, setCoins] = useState({ parker: 0, barrett: 0 });
    const [history, setHistory] = useState({});
    const [stats, setStats] = useState({
        parker: { xp: 0, level: 1, streak: 0, lastBuildDate: null },
        barrett: { xp: 0, level: 1, streak: 0, lastBuildDate: null }
    });

    // 1. Auth Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (!currentUser) {
                // FALLBACK: Load from LocalStorage if logged out
                loadFromLocalStorage();
            }
            // If logged in, the Snapshot listener below will handle loading
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // 2. Data Sync (Firebase Listener)
    useEffect(() => {
        if (!user) return;

        const docRef = doc(db, 'families', user.uid);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                if (data.coins) setCoins(data.coins);
                if (data.history) setHistory(data.history);
                if (data.stats) setStats(data.stats);
            } else {
                // If doc doesn't exist yet, we save our current LocalStorage data to the Cloud (First Sync)
                saveToCloud();
            }
        });

        return () => unsubscribe();
    }, [user]);

    // Helper: Load Local
    const loadFromLocalStorage = () => {
        try {
            const c = localStorage.getItem('lego_coins');
            const h = localStorage.getItem('lego_history');
            const s = localStorage.getItem('lego_stats');
            if (c) setCoins(JSON.parse(c));
            if (h) setHistory(JSON.parse(h));
            if (s) setStats(JSON.parse(s));
        } catch (e) {
            console.error("Local Load Error", e);
            // Defaults if fail
            setCoins({ parker: 0, barrett: 0 });
            setHistory({});
            setStats({
                parker: { xp: 0, level: 1, streak: 0, lastBuildDate: null },
                barrett: { xp: 0, level: 1, streak: 0, lastBuildDate: null }
            });
        }
    };

    // Helper: Save (Both Local + Cloud)
    // We update state first (Optimistic UI), then save.
    const saveData = (newCoins, newHistory, newStats) => {
        // 1. Local Persistence (Always backup)
        localStorage.setItem('lego_coins', JSON.stringify(newCoins));
        localStorage.setItem('lego_history', JSON.stringify(newHistory));
        localStorage.setItem('lego_stats', JSON.stringify(newStats));

        // 2. Cloud Persistence
        if (user) {
            setDoc(doc(db, 'families', user.uid), {
                coins: newCoins,
                history: newHistory,
                stats: newStats
            }, { merge: true });
        }
    };

    const saveToCloud = () => {
        saveData(coins, history, stats);
    };


    // --- Actions ---

    const addCoins = (ageGroup, amount) => {
        const newCoins = { ...coins, [ageGroup]: (coins[ageGroup] || 0) + amount };
        setCoins(newCoins);
        saveData(newCoins, history, stats);
    };

    const spendCoins = (ageGroup, amount) => {
        if (coins[ageGroup] >= amount) {
            const newCoins = { ...coins, [ageGroup]: coins[ageGroup] - amount };
            setCoins(newCoins);
            saveData(newCoins, history, stats);
            return true;
        }
        return false;
    };

    const resetCoins = (ageGroup) => {
        let newCoins, newHistory, newStats;
        if (ageGroup === 'all') {
            newCoins = { parker: 0, barrett: 0 };
            newHistory = {};
            newStats = {
                parker: { xp: 0, level: 1, streak: 0, lastBuildDate: null },
                barrett: { xp: 0, level: 1, streak: 0, lastBuildDate: null }
            };
        } else {
            newCoins = { ...coins, [ageGroup]: 0 };
            newHistory = { ...history, [ageGroup]: [] };
            newStats = { ...stats, [ageGroup]: { xp: 0, level: 1, streak: 0, lastBuildDate: null } };
        }

        setCoins(newCoins);
        setHistory(newHistory);
        setStats(newStats);
        saveData(newCoins, newHistory, newStats);
    };

    const setCoinsManually = (ageGroup, amount) => {
        const value = Math.max(0, parseInt(amount) || 0);
        const newCoins = { ...coins, [ageGroup]: value };
        setCoins(newCoins);
        saveData(newCoins, history, stats);
    };

    const getLevelFromXp = (xp) => {
        return Math.floor(Math.sqrt(xp / 50)) + 1;
    };

    // --- MAIN GAME LOOP ---
    const completeChallenge = (ageGroup, challengePrompt) => {
        const amount = challengePrompt.coins;

        // 1. Calculate New State
        const newCoins = { ...coins, [ageGroup]: (coins[ageGroup] || 0) + amount };

        const entry = {
            id: Date.now(),
            text: challengePrompt.text,
            category: challengePrompt.category,
            coins: amount,
            date: new Date().toISOString()
        };
        const newHistory = { ...history, [ageGroup]: [entry, ...(history[ageGroup] || [])] };

        // 3. Stats
        const currentStats = stats[ageGroup] || { xp: 0, level: 1, streak: 0, lastBuildDate: null };
        const today = new Date().toDateString();
        const lastDate = currentStats.lastBuildDate ? new Date(currentStats.lastBuildDate).toDateString() : null;

        let newStreak = currentStats.streak;
        if (today !== lastDate) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (lastDate === yesterday.toDateString()) {
                newStreak += 1;
            } else if (lastDate !== today) {
                newStreak = 1;
            }
        }

        const xpGained = 50;
        const newXp = currentStats.xp + xpGained;
        const newLevel = getLevelFromXp(newXp);

        const newStats = {
            ...stats,
            [ageGroup]: {
                ...currentStats,
                xp: newXp,
                level: newLevel,
                streak: newStreak,
                lastBuildDate: new Date().toISOString()
            }
        };

        // 4. Update & Save
        setCoins(newCoins);
        setHistory(newHistory);
        setStats(newStats);
        saveData(newCoins, newHistory, newStats);
    };

    return (
        <CoinContext.Provider value={{
            coins,
            history,
            stats,
            user, // Expose user status
            addCoins,
            spendCoins,
            resetCoins,
            setCoinsManually,
            completeChallenge
        }}>
            {children}
        </CoinContext.Provider>
    );
};
