
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function LevelProgressBar({ xp, level }) {
    // Calculate progress to next level
    // Formula inverse of context: Level = sqrt(xp/50) + 1  =>  XP = (Level-1)^2 * 50
    const currentLevelBaseXp = Math.pow(level - 1, 2) * 50;
    const nextLevelBaseXp = Math.pow(level, 2) * 50;

    const xpInThisLevel = xp - currentLevelBaseXp;
    const xpNeededForNext = nextLevelBaseXp - currentLevelBaseXp;
    const progressPercent = Math.min(100, Math.max(0, (xpInThisLevel / xpNeededForNext) * 100));

    return (
        <div className="w-full max-w-sm">
            <div className="flex justify-between items-end mb-1 px-2">
                <span className="text-lego-black font-bold text-sm">LEVEL {level}</span>
                <span className="text-gray-500 text-xs font-bold">{Math.floor(xpInThisLevel)} / {xpNeededForNext} XP</span>
            </div>

            <div className="h-6 bg-gray-200 rounded-full border-2 border-white/50 overflow-hidden relative shadow-inner">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                {/* Bar */}
                <motion.div
                    className="h-full bg-gradient-to-r from-lego-blue to-cyan-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />

                {/* Shine effect */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-full" />
            </div>
        </div>
    );
}
