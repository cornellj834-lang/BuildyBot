import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IMAGES = [
    'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1920&q=80', // Classic Bricks
    'https://images.unsplash.com/photo-1518946222227-364f22132616?w=1920&q=80', // Colorful Field
    'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=1920&q=80', // Minifigs
    'https://images.unsplash.com/photo-1560964645-a53f25307a55?w=1920&q=80', // Yellow/Blue abstract
    'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?w=1920&q=80'  // Mixed pile
];

// Randomize Ken Burns parameters
const getRandomVariant = () => {
    const scales = [1.1, 1.25];
    const xAnims = ["0%", "5%", "-5%"];
    const yAnims = ["0%", "5%", "-5%"];

    return {
        initial: {
            scale: 1.0,
            opacity: 0,
            x: "0%",
            y: "0%"
        },
        animate: {
            scale: scales[Math.floor(Math.random() * scales.length)],
            opacity: 1,
            x: xAnims[Math.floor(Math.random() * xAnims.length)],
            y: yAnims[Math.floor(Math.random() * yAnims.length)],
            transition: {
                opacity: { duration: 2.5 },
                scale: { duration: 20, ease: "linear" },
                x: { duration: 20, ease: "linear" },
                y: { duration: 20, ease: "linear" }
            }
        },
        exit: {
            opacity: 0,
            transition: { duration: 2.5 }
        }
    };
};

export default function BackgroundSlideshow() {
    const [index, setIndex] = useState(0);
    const [variant, setVariant] = useState(getRandomVariant());

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % IMAGES.length);
            setVariant(getRandomVariant());
        }, 12000); // Slower cycle matching cinematic pace

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Darker Overlay for Contrast */}
            <div className="absolute inset-0 bg-lego-black/40 z-10 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-lego-black/60 via-transparent to-lego-black/30 z-10" />

            {/* Particle Dust Overlay */}
            <div className="absolute inset-0 z-20 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

            <AnimatePresence mode='popLayout'>
                <motion.img
                    key={index}
                    src={IMAGES[index]}
                    alt="Lego Background"
                    variants={variant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{ willChange: "transform, opacity" }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </AnimatePresence>
        </div>
    );
}
