import { useState, useRef } from 'react';
import { getBuildyResponse } from '../services/gemini';

export const useVoiceCompanion = (challengeText) => {
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isThinking, setIsThinking] = useState(false);

    const [transcript, setTranscript] = useState('');

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const synth = window.speechSynthesis;

    const startListening = async () => {
        if (isListening || isThinking || isSpeaking) return;
        setTranscript("Listening...");

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // DETECT SUPPORTED MIME TYPE (Crucial for Safari)
            let mimeType = 'audio/webm'; // Chrome default
            if (MediaRecorder.isTypeSupported('audio/mp4')) {
                mimeType = 'audio/mp4'; // Safari default
            } else if (MediaRecorder.isTypeSupported('audio/aac')) {
                mimeType = 'audio/aac';
            }

            const mediaRecorder = new MediaRecorder(stream, { mimeType });

            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
                await processAudio(audioBlob, mimeType);

                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsListening(true);

            setTimeout(() => {
                if (mediaRecorder.state === 'recording') {
                    stopListening();
                }
            }, 5000);

        } catch (err) {
            console.error("Mic Access Error:", err);
            setTranscript("Please allow Microphone access!");
            setIsListening(false);
        }
    };

    const stopListening = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            setIsListening(false);
        }
    };

    const processAudio = async (audioBlob, mimeType) => {
        setIsThinking(true);
        setTranscript("Thinking...");

        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
            const base64Audio = reader.result.split(',')[1];

            // Pass mimeType to service
            const aiResponse = await getBuildyResponse(base64Audio, mimeType, challengeText);

            setTranscript(`"${aiResponse}"`);
            setIsThinking(false);

            speak(aiResponse);
        };
    };

    const speak = (text) => {
        if (!synth) return;

        setIsSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(text);

        const voices = synth.getVoices();
        const friendlyVoice = voices.find(v => v.name.includes("Samantha") || v.name.includes("Enhanced") || v.lang === 'en-US');
        if (friendlyVoice) utterance.voice = friendlyVoice;

        utterance.rate = 1.1;
        utterance.pitch = 1.1;

        utterance.onend = () => setIsSpeaking(false);

        synth.speak(utterance);
    };

    return {
        isListening,
        isThinking,
        isSpeaking,
        transcript,
        startListening,
        stopListening
    };
};
