import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Baby, Hammer, Settings, Trash2, X, Trophy } from 'lucide-react';
import { useCoins } from '../context/CoinContext';
import { useSound } from '../context/SoundContext';
import BuildersGallery from './BuildersGallery';
import audioEngine from '../utils/audioEngine'; // Import engine to init audio context on first click

export default function ProfileSelection({ onSelectProfile }) {
    const { coins, resetCoins, setCoinsManually } = useCoins();
    const { playSound } = useSound();
    const [showAdmin, setShowAdmin] = useState(false);
    const [parkerInput, setParkerInput] = useState('');
    const [barrettInput, setBarrettInput] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [showGallery, setShowGallery] = useState(false);

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordInput === '92585') {
            setShowPasswordModal(false);
            setShowAdmin(true);
            setPasswordInput('');
            setPasswordError(false);
        } else {
            setPasswordError(true);
            setPasswordInput('');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center relative overflow-hidden">
            <BuildersGallery isOpen={showGallery} onClose={() => setShowGallery(false)} />

            {/* Animated Title */}
            <motion.h1
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="text-6xl md:text-9xl mb-6 title-premium animate-bounce-slow"
            >
                🧱 BuildyBot
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => audioEngine.init()} // Hint to browser to resume audio context
                className="text-2xl md:text-3xl text-white mb-12 font-bold drop-shadow-md bg-lego-black/20 px-6 py-3 rounded-full backdrop-blur-sm"
            >
                Who is building today?
            </motion.p>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.3,
                            delayChildren: 0.4
                        }
                    }
                }}
                className="flex flex-col md:flex-row gap-12 w-full max-w-4xl justify-center px-4"
            >
                {/* Parker (Age 2) - Green Lego Brick */}
                <motion.button
                    variants={{
                        hidden: { y: 50, opacity: 0, scale: 0.8 },
                        visible: {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            transition: { type: "spring", bounce: 0.4 }
                        }
                    }}
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    whileTap={{ scale: 0.95, y: 5 }}
                    onClick={() => { playSound('click'); onSelectProfile('parker'); }}
                    className="flex-1 glass-panel bg-lego-green/80 hover:bg-lego-green transition-colors text-white p-10 flex flex-col items-center gap-4 btn-lego-large relative border-4 border-white/20"
                >
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Baby size={80} className="drop-shadow-lg" />
                    </motion.div>
                    <span className="text-4xl md:text-5xl font-bold drop-shadow-md">Parker</span>
                    <span className="text-xl opacity-90 font-medium bg-white/20 px-4 py-1 rounded-full">(Age 2)</span>
                </motion.button>

                {/* Barrett (Age 7) - Blue Lego Brick */}
                <motion.button
                    variants={{
                        hidden: { y: 50, opacity: 0, scale: 0.8 },
                        visible: {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            transition: { type: "spring", bounce: 0.4 }
                        }
                    }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.95, y: 5 }}
                    onClick={() => { playSound('click'); onSelectProfile('barrett'); }}
                    className="flex-1 glass-panel bg-lego-blue/80 hover:bg-lego-blue transition-colors text-white p-10 flex flex-col items-center gap-4 btn-lego-large relative border-4 border-white/20"
                >
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Hammer size={80} className="drop-shadow-lg" />
                    </motion.div>
                    <span className="text-4xl md:text-5xl font-bold drop-shadow-md">Barrett</span>
                    <span className="text-xl opacity-90 font-medium bg-white/20 px-4 py-1 rounded-full">(Age 7)</span>
                </motion.button>
            </motion.div>

            {/* Gallery Toggle (Mid Bottom) */}
            <motion.button
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => { playSound('pop'); setShowGallery(true); }}
                className="mt-12 bg-white/20 backdrop-blur-md border-2 border-white/40 text-white px-8 py-3 rounded-full font-bold text-xl flex items-center gap-2 hover:bg-white/30 transition-colors shadow-lg"
            >
                <Trophy className="text-yellow-400" />
                <span>Hall of Fame</span>
            </motion.button>

            {/* Admin Toggle */}
            <button
                onClick={() => setShowPasswordModal(true)}
                className="absolute bottom-4 right-4 p-3 bg-white text-lego-black hover:bg-gray-100 rounded-full shadow-xl transition-all z-50 border-2 border-white/50"
            >
                <Settings size={28} />
            </button>

            {/* Password Modal */}
            <AnimatePresence>
                {showPasswordModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
                        onClick={() => setShowPasswordModal(false)}
                    >
                        <motion.form
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onSubmit={handlePasswordSubmit}
                            className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl relative text-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                onClick={() => setShowPasswordModal(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>

                            <h2 className="text-2xl font-bold text-lego-black mb-4">Adults Only 🔒</h2>
                            <p className="mb-4 text-gray-600">Enter PIN to access settings:</p>

                            <input
                                type="password"
                                autoFocus
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                className="w-full text-center text-3xl font-bold tracking-widest p-3 border-2 rounded-xl mb-4 focus:border-lego-blue focus:outline-none"
                                maxLength={5}
                                placeholder="•••••"
                            />

                            {passwordError && (
                                <p className="text-red-500 font-bold mb-4 animate-pulse">Wrong PIN!</p>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-lego-blue text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors"
                            >
                                Unlock
                            </button>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Admin Modal */}
            <AnimatePresence>
                {showAdmin && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                        onClick={() => setShowAdmin(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowAdmin(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>

                            <h2 className="text-2xl font-bold text-lego-black mb-6">Parent Controls</h2>

                            <div className="space-y-4">
                                {/* Manual Coin Setting */}
                                <div className="bg-blue-50 p-4 rounded-xl space-y-3">
                                    <h3 className="font-bold text-blue-800 text-sm">Set Coin Balance</h3>

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium w-20">Parker:</span>
                                        <input
                                            type="number"
                                            placeholder={coins.parker.toString()}
                                            value={parkerInput}
                                            onChange={(e) => setParkerInput(e.target.value)}
                                            className="flex-1 px-3 py-2 border rounded-lg text-center font-bold"
                                        />
                                        <button
                                            onClick={() => {
                                                if (parkerInput !== '') {
                                                    setCoinsManually('parker', parkerInput);
                                                    setParkerInput('');
                                                }
                                            }}
                                            className="px-3 py-2 bg-blue-500 text-white rounded-lg font-bold text-sm"
                                        >
                                            Set
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium w-20">Barrett:</span>
                                        <input
                                            type="number"
                                            placeholder={coins.barrett.toString()}
                                            value={barrettInput}
                                            onChange={(e) => setBarrettInput(e.target.value)}
                                            className="flex-1 px-3 py-2 border rounded-lg text-center font-bold"
                                        />
                                        <button
                                            onClick={() => {
                                                if (barrettInput !== '') {
                                                    setCoinsManually('barrett', barrettInput);
                                                    setBarrettInput('');
                                                }
                                            }}
                                            className="px-3 py-2 bg-blue-500 text-white rounded-lg font-bold text-sm"
                                        >
                                            Set
                                        </button>
                                    </div>
                                </div>

                                <hr className="border-gray-200" />

                                <button
                                    onClick={() => {
                                        if (confirm("Reset PARKER'S coins to 0?")) {
                                            resetCoins('parker');
                                            setShowAdmin(false);
                                        }
                                    }}
                                    className="w-full flex items-center justify-between p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 font-bold"
                                >
                                    <span>Reset Parker</span>
                                    <Trash2 size={20} />
                                </button>

                                <button
                                    onClick={() => {
                                        if (confirm("Reset BARRETT'S coins to 0?")) {
                                            resetCoins('barrett');
                                            setShowAdmin(false);
                                        }
                                    }}
                                    className="w-full flex items-center justify-between p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 font-bold"
                                >
                                    <span>Reset Barrett</span>
                                    <Trash2 size={20} />
                                </button>

                                <button
                                    onClick={() => {
                                        if (confirm("Reset ALL coins to 0? This cannot be undone.")) {
                                            resetCoins('all');
                                            setShowAdmin(false);
                                        }
                                    }}
                                    className="w-full flex items-center justify-between p-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-bold mt-4"
                                >
                                    <span>Reset All Data</span>
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
}
