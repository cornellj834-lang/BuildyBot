import { createContext, useContext, useState, useEffect } from 'react';
import audioEngine from '../utils/audioEngine';

const SoundContext = createContext();

export function SoundProvider({ children }) {
    const [isMuted, setIsMuted] = useState(false);

    const toggleMute = () => {
        const muted = audioEngine.toggleMute();
        setIsMuted(muted);
        if (!muted) {
            audioEngine.playPop(); // Feedback when unmuting
        }
    };

    const playSound = (type) => {
        switch (type) {
            case 'pop':
                audioEngine.playPop();
                break;
            case 'click':
                audioEngine.playClick();
                break;
            case 'success':
                audioEngine.playSuccess();
                break;
            case 'whoosh':
                audioEngine.playWhoosh();
                break;
            default:
                console.warn(`Unknown sound type: ${type}`);
        }
    };

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    return useContext(SoundContext);
}
