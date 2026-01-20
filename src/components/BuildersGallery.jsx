import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Trophy, Hammer } from 'lucide-react';
import { useCoins } from '../context/CoinContext';

export default function BuildersGallery({ isOpen, onClose, defaultTab = 'parker' }) {
    const { history } = useCoins();
    // Simple tab state if we want to toggle views, but for now we might just show both or pass a prop

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 50 }}
                    className="w-full max-w-4xl max-h-[85vh] glass-liquid flex flex-col relative overflow-hidden text-lego-black"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-6 bg-white/40 border-b border-white/30 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-4">
                            <Trophy className="text-yellow-600 drop-shadow-md" size={40} />
                            <h2 className="text-3xl md:text-4xl font-black tracking-wide text-lego-black">
                                Hall of Fame
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 bg-white/50 rounded-full hover:bg-white transition-colors"
                        >
                            <X size={32} />
                        </button>
                    </div>

                    {/* Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Parker's Column */}
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold bg-lego-green/20 inline-block px-4 py-1 rounded-xl text-lego-green border-2 border-lego-green/30">
                                    Parker's Build Log
                                </h3>

                                <div className="space-y-4">
                                    {history.parker.length === 0 ? (
                                        <div className="opacity-50 italic">No builds yet. Go play!</div>
                                    ) : (
                                        history.parker.map((item) => (
                                            <GalleryCard key={item.id} item={item} color="bg-lego-green/10 border-lego-green/20" />
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Barrett's Column */}
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold bg-lego-blue/20 inline-block px-4 py-1 rounded-xl text-lego-blue border-2 border-lego-blue/30">
                                    Barrett's Build Log
                                </h3>

                                <div className="space-y-4">
                                    {history.barrett.length === 0 ? (
                                        <div className="opacity-50 italic">No builds yet. Go play!</div>
                                    ) : (
                                        history.barrett.map((item) => (
                                            <GalleryCard key={item.id} item={item} color="bg-lego-blue/10 border-lego-blue/20" />
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function GalleryCard({ item, color }) {
    const date = new Date(item.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 ${color} bg-white/40 shadow-sm backdrop-blur-[2px]`}
        >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <Hammer size={24} className="text-gray-400" />
            </div>
            <div className="flex-1 text-left">
                <p className="font-bold text-lg leading-tight">{item.text}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <Calendar size={14} />
                    <span>{date}</span>
                    <span className="text-lego-yellow font-black mx-1">•</span>
                    <span className="font-black text-lego-yellow">+{item.coins} Coins</span>
                </div>
            </div>
        </motion.div>
    );
}
