
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

export default function StreakFlame({ streak }) {
    const isActive = streak > 0;

    return (
        <div className="flex flex-col items-center group cursor-help relative" title={`${streak} Day Streak!`}>
            <div className="relative">
                {/* Outer Glow */}
                {isActive && (
                    <motion.div
                        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-orange-500 blur-xl rounded-full"
                    />
                )}

                <div className={`
                    relative p-3 rounded-full border-4 shadow-lg transition-colors
                    ${isActive ? 'bg-orange-500 border-yellow-300' : 'bg-gray-300 border-gray-400'}
                `}>
                    <Flame
                        size={32}
                        className={`
                            ${isActive ? 'text-white fill-yellow-200' : 'text-gray-500'}
                        `}
                    />
                </div>

                {/* Badge Number */}
                {isActive && (
                    <div className="absolute -bottom-2 -right-2 bg-lego-red text-white font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 border-white">
                        {streak}
                    </div>
                )}
            </div>
            <span className="text-xs font-bold text-gray-600 mt-1 uppercase tracking-wider">Streak</span>
        </div>
    );
}
