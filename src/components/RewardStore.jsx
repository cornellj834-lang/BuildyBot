import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Coins, Check } from 'lucide-react';
import { useCoins } from '../context/CoinContext';
import { storeItems } from '../data/storeItems';
import confetti from 'canvas-confetti';

export default function RewardStore({ ageGroup, isOpen, onClose }) {
    const { coins, spendCoins } = useCoins();
    const [purchasedItem, setPurchasedItem] = useState(null);

    const handleBuy = (item) => {
        if (spendCoins(ageGroup, item.cost)) {
            setPurchasedItem(item);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FFD700', '#FFA500'] // Gold colors
            });
            setTimeout(() => setPurchasedItem(null), 3000);
        } else {
            // Shake effect or feedback for insufficient funds could go here
            alert("Not enough coins yet! Keep building!");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 50 }}
                        className="bg-lego-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative"
                    >
                        {/* Header */}
                        <div className="bg-lego-yellow p-6 flex justify-between items-center shadow-md z-10">
                            <div className="flex items-center gap-4">
                                <ShoppingBag size={40} className="text-lego-black" />
                                <h2 className="text-3xl md:text-4xl font-black text-lego-black">Reward Store</h2>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-inner">
                                    <Coins size={28} className="text-yellow-600" />
                                    <span className="text-2xl font-bold">{coins[ageGroup]}</span>
                                </div>
                                <button onClick={onClose} className="p-2 bg-white/50 rounded-full hover:bg-white transition-colors">
                                    <X size={32} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <motion.div
                            className="flex-1 overflow-y-auto p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {storeItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    variants={{
                                        hidden: { y: 20, opacity: 0 },
                                        visible: { y: 0, opacity: 1 }
                                    }}
                                    layout
                                    whileHover={{ scale: 1.03, y: -5 }}
                                    className={`relative p-4 rounded-2xl border-2 ${item.bg} flex flex-col items-center text-center gap-3 shadow-lg card-glass overflow-hidden border-white/50 h-full min-h-[280px] justify-between`}
                                >
                                    {/* Glass sheen */}
                                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

                                    <div className={`p-3 rounded-full bg-white shadow-md ${item.color} relative z-10 mt-2`}>
                                        <item.icon size={40} />
                                    </div>
                                    <div className="relative z-10 w-full px-1 flex-1 flex items-center justify-center">
                                        <h3 className="text-base md:text-lg font-bold text-lego-black bg-white/90 px-3 py-1.5 rounded-lg backdrop-blur-sm shadow-sm leading-tight">
                                            {item.label}
                                        </h3>
                                    </div>

                                    <div className="w-full relative z-10 mt-2">
                                        <button
                                            onClick={() => handleBuy(item)}
                                            disabled={coins[ageGroup] < item.cost}
                                            className={`w-full py-2 px-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 transition-all btn-lego
                        ${coins[ageGroup] >= item.cost
                                                    ? 'bg-lego-green text-white shadow-lg'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                      `}
                                        >
                                            {purchasedItem?.id === item.id ? (
                                                <>
                                                    <Check size={24} /> Purchased!
                                                </>
                                            ) : (
                                                <>
                                                    <Coins size={24} /> {item.cost}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Purchase Overlay Feedback */}
                        <AnimatePresence>
                            {purchasedItem && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-50 pointer-events-none"
                                >
                                    <h3 className="text-5xl font-black text-lego-green mb-8">You Bought It!</h3>
                                    <div className={`p-12 rounded-full bg-gray-100 mb-8 animate-bounce ${purchasedItem.color}`}>
                                        <purchasedItem.icon size={120} />
                                    </div>
                                    <p className="text-3xl font-bold">Ask your parent for:</p>
                                    <p className="text-4xl text-lego-blue font-black mt-4">{purchasedItem.label}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
