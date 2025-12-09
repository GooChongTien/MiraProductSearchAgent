import { motion } from 'framer-motion';

interface MascotProps {
    className?: string;
    expression?: 'happy' | 'thinking' | 'waiting';
}

export default function Mascot({ className = "w-48 h-48", expression = 'happy' }: MascotProps) {
    // "Mira" - Premium Glossy 3D Style (Matches uploaded reference)
    return (
        <motion.div
            className={`relative ${className}`}
            initial={{ y: 0 }}
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="glossBody" x1="50" y1="50" x2="150" y2="150" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#ff9a9e" />  {/* Lighter Pink/Red Highlight */}
                        <stop offset="50%" stopColor="#db4b5d" /> {/* Main Maroon */}
                        <stop offset="100%" stopColor="#841a24" /> {/* Dark Shadow */}
                    </linearGradient>
                    <linearGradient id="glossEar" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                        <stop offset="0%" stopColor="#ffc3a0" />
                        <stop offset="100%" stopColor="#db4b5d" />
                    </linearGradient>
                    <radialGradient id="screenGlow" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                        <stop offset="0%" stopColor="#2D1B2E" /> {/* Deep Dark Maroon/Black */}
                        <stop offset="100%" stopColor="#1a0b10" />
                    </radialGradient>
                    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* --- MIRA ROBOT --- */}

                {/* Left Ear/Headphone */}
                <rect x="25" y="65" width="20" height="40" rx="10" fill="url(#glossBody)" transform="rotate(-10 35 85)" shadow-md="true" />
                <rect x="30" y="70" width="10" height="30" rx="5" fill="#581c23" opacity="0.3" transform="rotate(-10 35 85)" />

                {/* Right Ear/Headphone */}
                <rect x="155" y="65" width="20" height="40" rx="10" fill="url(#glossBody)" transform="rotate(10 165 85)" />
                <rect x="160" y="70" width="10" height="30" rx="5" fill="#581c23" opacity="0.3" transform="rotate(10 165 85)" />

                {/* Head (Round Glossy) */}
                <rect x="40" y="40" width="120" height="100" rx="45" fill="url(#glossBody)" stroke="#6f1922" strokeWidth="2" />

                {/* Highlight on Head (Gloss) */}
                <path d="M60 55 Q 100 45 140 55" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
                <circle cx="55" cy="65" r="4" fill="white" opacity="0.6" />

                {/* Face Screen (Black Glass) */}
                <rect x="60" y="70" width="80" height="50" rx="20" fill="#2d1b1e" stroke="#581c23" strokeWidth="2" />

                {/* Cheeks */}
                <circle cx="55" cy="110" r="6" fill="#fca5a5" opacity="0.6" />
                <circle cx="145" cy="110" r="6" fill="#fca5a5" opacity="0.6" />

                {/* Eyes (Glowing Orange/Yellow) */}
                {expression === 'happy' && (
                    <g fill="#fbbf24" filter="url(#softGlow)">
                        {/* Arched Happy Eyes */}
                        <path d="M75 95 Q 85 85 95 95" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" fill="none" />
                        <path d="M105 95 Q 115 85 125 95" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" fill="none" />
                    </g>
                )}

                {expression === 'thinking' && (
                    <g fill="#fbbf24">
                        <circle cx="85" cy="95" r="5">
                            <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="115" cy="95" r="5">
                            <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
                        </circle>
                    </g>
                )}

                {/* Antenna */}
                <path d="M100 40 L100 25" stroke="#841a24" strokeWidth="4" />
                <circle cx="100" cy="20" r="8" fill="#db4b5d" stroke="#fca5a5" strokeWidth="2" />
                <circle cx="100" cy="20" r="3" fill="#fbbf24">
                    <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Body (Little nub below head) */}
                <path d="M80 145 Q 100 160 120 145 L 115 160 Q 100 170 85 160 Z" fill="url(#glossBody)" />

                {/* Shield Icon on Chest (Optional detail from ref) */}
                <path d="M93 155 L100 162 L107 155 V 148 H 93 V 155 Z" fill="#fbbf24" />

            </svg>
        </motion.div>
    );
}
