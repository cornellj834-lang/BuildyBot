import { Gamepad2, Moon, IceCream, Tv, User, Bike, Pizza, Music, Star, Gift, Sparkles, PartyPopper, Popcorn, Cookie, Heart } from 'lucide-react';

export const storeItems = [
    // ===== FAMILY TIME (150-300) =====
    {
        id: 'mommy-game',
        label: 'Game time with Mommy',
        cost: 200,
        icon: User,
        color: 'text-pink-500',
        bg: 'bg-pink-100'
    },
    {
        id: 'daddy-game',
        label: 'Game time with Daddy',
        cost: 200,
        icon: Gamepad2,
        color: 'text-blue-500',
        bg: 'bg-blue-100'
    },
    {
        id: 'family-game',
        label: 'Family Game Night',
        cost: 300,
        icon: PartyPopper,
        color: 'text-yellow-500',
        bg: 'bg-yellow-100'
    },
    {
        id: 'bike-ride',
        label: 'Bike Ride with Dad',
        cost: 250,
        icon: Bike,
        color: 'text-green-600',
        bg: 'bg-green-100'
    },

    // ===== SCREEN TIME (200-400) =====
    {
        id: 'tv-time',
        label: 'Extra TV Time (30 min)',
        cost: 250,
        icon: Tv,
        color: 'text-green-500',
        bg: 'bg-green-100'
    },
    {
        id: 'video-game',
        label: 'Video Game Time (30 min)',
        cost: 300,
        icon: Gamepad2,
        color: 'text-indigo-500',
        bg: 'bg-indigo-100'
    },
    {
        id: 'movie-night',
        label: 'Pick the Movie Night',
        cost: 400,
        icon: Popcorn,
        color: 'text-red-400',
        bg: 'bg-red-100'
    },

    // ===== BEDTIME (400-600) =====
    {
        id: 'stay-up-15',
        label: 'Stay up 15 mins late',
        cost: 400,
        icon: Moon,
        color: 'text-purple-500',
        bg: 'bg-purple-100'
    },
    {
        id: 'stay-up-30',
        label: 'Stay up 30 mins late',
        cost: 600,
        icon: Sparkles,
        color: 'text-purple-600',
        bg: 'bg-purple-200'
    },
    {
        id: 'skip-chore',
        label: 'Skip one chore',
        cost: 500,
        icon: Star,
        color: 'text-amber-500',
        bg: 'bg-amber-100'
    },

    // ===== TREATS (150-350) =====
    {
        id: 'ice-cream',
        label: 'Ice Cream Treat',
        cost: 250,
        icon: IceCream,
        color: 'text-pink-400',
        bg: 'bg-pink-100'
    },
    {
        id: 'dinner-choice',
        label: 'Your Choice for Dinner',
        cost: 350,
        icon: Pizza,
        color: 'text-orange-500',
        bg: 'bg-orange-100'
    },

    // ===== SPECIAL (500-800) =====
    {
        id: 'pick-music',
        label: 'Pick Car Music',
        cost: 150,
        icon: Music,
        color: 'text-cyan-500',
        bg: 'bg-cyan-100'
    },
    {
        id: 'surprise',
        label: 'Mystery Surprise',
        cost: 500,
        icon: Gift,
        color: 'text-teal-500',
        bg: 'bg-teal-100'
    }
];
