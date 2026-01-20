import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { prompts } from '../data/prompts';
import { useCoins } from '../context/CoinContext';
import { useSound } from '../context/SoundContext';
import RewardStore from './RewardStore';
import legoCharacter from '../assets/lego_character.png';
import catVehicle from '../assets/cat_vehicle.png';
import catBuilding from '../assets/cat_building.png';
import catAnimal from '../assets/cat_animal.png';
// Fallback mappings for now until we have all images
const catSpace = catVehicle;
const catFantasy = catBuilding;
const catGeneric = catBuilding;

import { useVoiceCompanion } from '../hooks/useVoiceCompanion';
import micIcon from '../assets/mic_icon.png';

import { ArrowLeft, RefreshCw, Volume2, CheckCircle, Home, Gift, Star, Trophy, Heart, Coins, ShoppingBag, Mic } from 'lucide-react';

const CATEGORY_IMAGES = {
    vehicle: catVehicle,
    building: catBuilding,
    animal: catAnimal,
    space: catSpace,
    fantasy: catFantasy,
    generic: catGeneric
};

const REWARDS = [
    { icon: Star, color: 'text-yellow-400', label: 'Gold Star!' },
    { icon: Trophy, color: 'text-yellow-600', label: 'Champion Trophy!' },
    { icon: Gift, color: 'text-red-500', label: 'Mystery Gift!' },
    { icon: Heart, color: 'text-pink-500', label: 'Big Love!' },
];

export default function ChallengeScreen({ ageGroup, onBack }) {
    const { coins, completeChallenge } = useCoins();
    const { playSound } = useSound();
    const [currentPrompt, setCurrentPrompt] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [showReward, setShowReward] = useState(false);
    const [rewardItem, setRewardItem] = useState(null);
    const [isStoreOpen, setIsStoreOpen] = useState(false);
    const [voices, setVoices] = useState([]);

    // Voice Companion Hook
    const { isListening, isThinking, isSpeaking: isAiSpeaking, transcript, startListening } = useVoiceCompanion(currentPrompt?.text);

    useEffect(() => {
        const loadVoices = () => {
            const v = window.speechSynthesis.getVoices();
            if (v.length > 0) {
                setVoices(v);
            }
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    useEffect(() => {
        generateNewPrompt();
    }, [ageGroup]);

    const generateNewPrompt = () => {
        playSound('whoosh'); // Whoosh on new prompt
        const availablePrompts = prompts[ageGroup];
        const randomIndex = Math.floor(Math.random() * availablePrompts.length);
        setCurrentPrompt(availablePrompts[randomIndex]);
    };

    const handleSpeak = () => {
        playSound('pop');
        if ('speechSynthesis' in window) {
            if (isSpeaking) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
            } else {
                const utterance = new SpeechSynthesisUtterance(currentPrompt.text);
                // Robust voice selection for iOS/Android/Windows
                // We assume English is preferred.
                // The `voices` state variable is already available.

                // 1. Try to find a "Premium" or "Enhanced" US English voice (common on iOS/macOS)
                let selectedVoice = voices.find(v =>
                    v.lang === 'en-US' && (v.name.includes('Enhanced') || v.name.includes('Premium'))
                );

                // 2. If not, try specific high-quality names
                if (!selectedVoice) {
                    const preferredNames = ['Google US English', 'Samantha', 'Aaron', 'Ava', 'Zira'];
                    for (const name of preferredNames) {
                        selectedVoice = voices.find(v => v.name.includes(name));
                        if (selectedVoice) break;
                    }
                }

                // 3. Fallback to any US English
                if (!selectedVoice) {
                    selectedVoice = voices.find(v => v.lang === 'en-US');
                }

                if (selectedVoice) {
                    utterance.voice = selectedVoice;
                }

                // NATURAL SETTINGS: Don't mess with rate/pitch for modern neural voices
                utterance.rate = 1.0;
                utterance.pitch = 1.0;

                utterance.onend = () => setIsSpeaking(false);
                utterance.onerror = () => setIsSpeaking(false);

                setIsSpeaking(true);
                window.speechSynthesis.speak(utterance);
            }
        } else {
            alert("Sorry, your browser doesn't support text-to-speech!");
        }
    };

    const handleComplete = () => {
        // 1. Confetti
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });

        // 2. Select random reward
        const randomReward = REWARDS[Math.floor(Math.random() * REWARDS.length)];
        setRewardItem(randomReward);

        setRewardItem(randomReward);

        // 3. Award functionality (Coin + History)
        completeChallenge(ageGroup, currentPrompt);

        playSound('success'); // BIG SOUND

        // 4. Show Modal
        setShowReward(true);
    };

    const closeReward = () => {
        setShowReward(false);
        generateNewPrompt();
    };

    return (
        <div className="min-h-screen flex flex-col p-4 relative">
            <RewardStore ageGroup={ageGroup} isOpen={isStoreOpen} onClose={() => setIsStoreOpen(false)} />

            {/* Header / Nav */}
            <div className="flex justify-between items-center mb-8">
                <button
                    onClick={() => { playSound('click'); onBack(); }}
                    className="p-3 bg-lego-red text-white rounded-full hover:bg-red-700 transition-colors shadow-lg btn-plastic"
                >
                    <Home size={32} />
                </button>
                <div className="text-2xl font-bold text-lego-black uppercase tracking-wider bg-white/50 px-6 py-2 rounded-full border border-white/50 backdrop-blur-sm">
                    {ageGroup === 'parker' ? 'Parker' : 'Barrett'}
                </div>

                <div className="flex items-center gap-2 bg-lego-yellow px-4 py-2 rounded-full shadow-md cursor-pointer hover:scale-105 transition-transform btn-plastic" onClick={() => { playSound('pop'); setIsStoreOpen(true); }}>
                    <Coins size={24} className="text-yellow-700" />
                    <span className="text-xl font-bold">{coins[ageGroup]}</span>
                    <ShoppingBag size={20} className="ml-2 text-lego-black opacity-50" />
                </div>
            </div>

            {/* Main Content */}
            <motion.main
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.2
                        }
                    }
                }}
                className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full"
            >

                <AnimatePresence mode="wait">
                    {currentPrompt && (
                        <motion.div
                            key={currentPrompt.id}
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0, scale: 0.8, y: 50 },
                                visible: {
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                    transition: { type: "spring", bounce: 0.4 }
                                }
                            }}
                            exit={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                            className="mb-12 w-full glass-liquid p-8 relative overflow-hidden"
                        >
                            {/* Decorative shiny highlight - REMOVED (handled by new CSS) */}

                            <h2 className="text-4xl md:text-5xl font-bold text-lego-black leading-tight mb-8 min-h-[120px] flex items-center justify-center drop-shadow-sm relative z-10">
                                {currentPrompt.text}
                            </h2>

                            <div className="flex flex-col items-center gap-6 mb-8">
                                <motion.div
                                    className="relative"
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring" }}
                                >
                                    {/* Category Image */}
                                    <div className="w-64 h-64 bg-white/40 backdrop-blur-md rounded-full p-4 shadow-2xl border-4 border-white/50 flex items-center justify-center overflow-hidden relative z-10">
                                        <img
                                            src={CATEGORY_IMAGES[currentPrompt.category] || catGeneric}
                                            alt={currentPrompt.category}
                                            className="w-full h-full object-contain filter drop-shadow-xl"
                                        />
                                    </div>

                                    {/* Coin Reward Badge (More 3D) */}
                                    <div className="absolute -top-4 -right-4 bg-lego-yellow text-lego-black font-black text-2xl w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.2)] border-4 border-white z-20 rotate-12 animate-bounce-slow">
                                        <span>+{currentPrompt.coins}</span>
                                        <Coins size={24} />
                                    </div>

                                    {/* Helper */}
                                    <motion.img
                                        src={legoCharacter}
                                        alt="Helper"
                                        className="absolute -bottom-10 -left-16 w-36 h-36 object-contain drop-shadow-2xl z-20 pointer-events-none"
                                        animate={{
                                            rotate: isSpeaking ? [0, 10, -10, 0] : 0,
                                            y: isSpeaking ? [0, -5, 0] : 0
                                        }}
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Action Buttons */}

                {/* Voice Interaction Zone */}
                <div className="flex flex-col items-center gap-4 mt-8 z-10 w-full">
                    {/* Transcript Bubble */}
                    {(transcript || isThinking) && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/90 backdrop-blur px-6 py-3 rounded-2xl shadow-lg max-w-lg border-2 border-lego-blue"
                        >
                            <p className="text-xl text-lego-black font-semibold">
                                {isThinking ? "Thinking..." : `"${transcript}"`}
                            </p>
                        </motion.div>
                    )}

                    <div className="flex flex-col md:flex-row gap-8 w-full max-w-2xl justify-center">
                        <motion.button
                            variants={{
                                hidden: { scale: 0, opacity: 0 },
                                visible: { scale: 1, opacity: 1 }
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => { playSound('click'); startListening(); }}
                            disabled={isListening || isThinking || isAiSpeaking}
                            className={`
                                relative flex items-center justify-center w-24 h-24 rounded-full shadow-2xl border-4 border-white
                                ${isListening ? 'bg-red-500 animate-pulse' : 'bg-lego-blue btn-lego-3d'}
                                ${isThinking ? 'bg-purple-500' : ''}
                            `}
                        >
                            {/* Ripple Effect when speaking */}
                            {isAiSpeaking && (
                                <div className="absolute inset-0 rounded-full border-4 border-lego-blue animate-ping" />
                            )}

                            <img src={micIcon} alt="Mic" className={`w-12 h-12 object-contain ${isListening ? 'animate-bounce' : ''}`} />
                        </motion.button>

                        {/* Status Label */}
                        <div className="absolute -bottom-10 whitespace-nowrap bg-white/80 px-4 py-1 rounded-full text-sm font-bold text-gray-600">
                            {isListening ? "Listening..." : isThinking ? "Buildy is thinking..." : isAiSpeaking ? "Buildy is talking!" : "Talk to Buildy!"}
                        </div>
                    </div>
                </div>

                {/* Legacy Action Buttons (Bottom) */}
                <div className="flex flex-col md:flex-row gap-8 w-full max-w-2xl justify-center mt-12 z-10 opacity-80 hover:opacity-100 transition-opacity">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSpeak}
                        className="flex items-center justify-center gap-2 px-6 py-3 text-lg bg-white/50 rounded-xl hover:bg-white transition-colors"
                    >
                        <Volume2 size={24} />
                        Read Again
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { playSound('click'); generateNewPrompt(); }}
                        className="flex items-center justify-center gap-2 px-6 py-3 text-lg bg-white/50 rounded-xl hover:bg-white transition-colors"
                    >
                        <RefreshCw size={24} />
                        Skip
                    </motion.button>
                </div>

                <div className="mt-12 z-10">
                    <motion.button
                        variants={{
                            hidden: { y: 50, opacity: 0 },
                            visible: { y: 0, opacity: 1 }
                        }}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleComplete}
                        className="px-14 py-8 text-4xl btn-lego-3d btn-lego-3d-green animate-pulse-glow flex items-center gap-4 w-full md:w-auto justify-center"
                    >
                        <CheckCircle size={48} />
                        I DID IT!
                    </motion.button>
                </div>

            </motion.main >

            {/* Reward Modal */}
            < AnimatePresence >
                {showReward && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                        onClick={closeReward}
                    >
                        <motion.div
                            initial={{ scale: 0.5, y: 100 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.5, y: 100 }}
                            className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border-8 border-lego-yellow"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                        >
                            <motion.div
                                initial={{ rotate: 0 }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className={`inline-block mb-4 p-4 rounded-full bg-gray-100 ${rewardItem?.color}`}
                            >
                                {rewardItem && <rewardItem.icon size={80} />}
                            </motion.div>

                            <h3 className="text-4xl font-bold text-lego-black mb-2">Awesome!</h3>
                            <p className="text-2xl text-gray-600 mb-8">You found a {rewardItem?.label}</p>

                            <button
                                onClick={closeReward}
                                className="bg-lego-blue text-white w-full py-4 rounded-xl text-2xl font-bold hover:bg-blue-600 transition-colors"
                            >
                                Next Challenge!
                            </button>
                        </motion.div>
                    </motion.div>
                )
                }
            </AnimatePresence >
        </div >
    );
}
