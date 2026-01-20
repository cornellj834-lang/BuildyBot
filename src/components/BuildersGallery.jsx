import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Trophy, Hammer, Home, Flame, Star } from 'lucide-react'; // Added icons
import { useCoins } from '../context/CoinContext';

export default function BuildersGallery({ isOpen, onClose }) {
    const { history, stats } = useCoins();

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
                    className="w-full max-w-5xl max-h-[90vh] glass-liquid flex flex-col relative overflow-hidden text-lego-black"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-6 bg-white/40 border-b border-white/30 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-4">
                            <Trophy className="text-yellow-500 drop-shadow-md" size={40} />
                            <h2 className="text-3xl md:text-5xl font-black tracking-wide text-lego-black drop-shadow-sm">
                                Hall of Fame
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="bg-lego-red hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
                        >
                            <Home size={24} />
                            <span>Home</span>
                        </button>
                    </div>

                    {/* Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">

                        <div className="grid md:grid-cols-2 gap-8 h-full">
                            {/* Parker's Column */}
                            <div className="flex flex-col gap-4">
                                <StatsHeader
                                    name="Parker"
                                    color="text-lego-green"
                                    bg="bg-lego-green/10"
                                    borderColor="border-lego-green"
                                    stats={stats?.parker}
                                />
                                <div className="space-y-4 flex-1">
                                    {(!history.parker || history.parker.length === 0) ? (
                                        <div className="opacity-50 italic text-center p-8">No builds yet. Go play!</div>
                                    ) : (
                                        history.parker.map((item) => (
                                            <GalleryCard key={item.id} item={item} color="bg-lego-green/10 border-lego-green/20" />
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Barrett's Column */}
                            <div className="flex flex-col gap-4">
                                <StatsHeader
                                    name="Barrett"
                                    color="text-lego-blue"
                                    bg="bg-lego-blue/10"
                                    borderColor="border-lego-blue"
                                    stats={stats?.barrett}
                                />
                                <div className="space-y-4 flex-1">
                                    {(!history.barrett || history.barrett.length === 0) ? (
                                        <div className="opacity-50 italic text-center p-8">No builds yet. Go play!</div>
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

function StatsHeader({ name, color, bg, borderColor, stats }) {
    if (!stats) return null;
    return (
        <div className={`flex items-center justify-between p-4 rounded-2xl border-2 ${borderColor} ${bg} backdrop-blur-md`}>
            <h3 className={`text-3xl font-bold ${color}`}>{name}</h3>
            <div className="flex gap-4">
                <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-gray-500 uppercase">Level</span>
                    <span className="text-2xl font-black">{stats.level}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-gray-500 uppercase">Streak</span>
                    <div className="flex items-center gap-1 text-orange-500">
                        <Flame size={20} fill="currentColor" />
                        <span className="text-2xl font-black">{stats.streak}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-gray-500 uppercase">XP</span>
                    <span className="text-2xl font-black text-purple-600">{stats.xp}</span>
                </div>
            </div>
        </div>
    );
}

function GalleryCard({ item, color }) {
    const date = new Date(item.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 ${color} bg-white/60 shadow-sm backdrop-blur-md`}
        >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                <Hammer size={24} className="text-gray-400" />
            </div>
            <div className="flex-1 text-left">
                <p className="font-bold text-lg leading-tight text-gray-800">{item.text}</p>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-2 font-medium">
                    <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{date}</span>
                    </div>
                    {item.coins && (
                        <div className="flex items-center gap-1 text-yellow-600">
                            <span className="text-yellow-400">●</span>
                            <span>+{item.coins} Coins</span>
                        </div>
                    )}
                    {item.xp && (
                        <div className="flex items-center gap-1 text-purple-600">
                            <span className="text-purple-400">●</span>
                            <span>+{item.xp} XP</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
