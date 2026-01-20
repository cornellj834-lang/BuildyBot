import { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const CoinContext = createContext();

export const useCoins = () => useContext(CoinContext);

export const CoinProvider = ({ children }) => {
    // Coins State
    const [coins, setCoins] = useState(() => {
        const saved = localStorage.getItem('lego-coins-v4');
        return saved ? JSON.parse(saved) : { parker: 0, barrett: 0 };
    });

    // History State (New)
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('lego-history-v1');
        return saved ? JSON.parse(saved) : { parker: [], barrett: [] };
    });

    // Persistence
    useEffect(() => {
        localStorage.setItem('lego-coins-v4', JSON.stringify(coins));
    }, [coins]);

    useEffect(() => {
        localStorage.setItem('lego-history-v1', JSON.stringify(history));
    }, [history]);

    // Actions
    const addCoins = (ageGroup, amount) => {
        setCoins(prev => ({
            ...prev,
            [ageGroup]: (prev[ageGroup] || 0) + amount
        }));
    };

    const spendCoins = (ageGroup, amount) => {
        if (coins[ageGroup] >= amount) {
            setCoins(prev => ({
                ...prev,
                [ageGroup]: prev[ageGroup] - amount
            }));
            return true;
        }
        return false;
    };

    const resetCoins = (ageGroup) => {
        if (ageGroup === 'all') {
            setCoins({ parker: 0, barrett: 0 });
            setHistory({ parker: [], barrett: [] });
        } else {
            setCoins(prev => ({ ...prev, [ageGroup]: 0 }));
            setHistory(prev => ({ ...prev, [ageGroup]: [] }));
        }
    };

    const setCoinsManually = (ageGroup, amount) => {
        const value = Math.max(0, parseInt(amount) || 0);
        setCoins(prev => ({
            ...prev,
            [ageGroup]: value
        }));
    };

    // New: Handle Full Completion
    const completeChallenge = (ageGroup, challengePrompt) => {
        const amount = challengePrompt.coins;

        // 1. Add Coins
        addCoins(ageGroup, amount);

        // 2. Add to History
        const entry = {
            id: Date.now(), // timestamp ID
            text: challengePrompt.text,
            category: challengePrompt.category,
            coins: amount,
            date: new Date().toISOString()
        };

        setHistory(prev => ({
            ...prev,
            [ageGroup]: [entry, ...(prev[ageGroup] || [])] // Prepend (newest first)
        }));
    };

    return (
        <CoinContext.Provider value={{
            coins,
            history,
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
