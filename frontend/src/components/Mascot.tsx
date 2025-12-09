import { motion } from 'framer-motion';

interface MascotProps {
    className?: string;
    expression?: 'happy' | 'thinking' | 'waiting';
}

export default function Mascot({ className = "w-48 h-48", expression = 'happy' }: MascotProps) {
    // MIRA - Premium 3D Robot Mascot
    // Style: Red glossy helmet + Large expressive glowing eyes
    // Body: Ice cream cone shape (tapered), no antenna

    return (
        <motion.div
            className={`relative ${className}`}
            animate={{
                y: [0, -10, 0], // Soft hover motion
            }}
            transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
            }}
        >
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    {/* WARM RED GRADIENT (Original Mira Color Scheme) */}
                    <linearGradient id="redGlossyGradient" x1="100" y1="40" x2="100" y2="140" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#F87171" />  {/* Red 400 - Highlight */}
                        <stop offset="30%" stopColor="#DC2626" /> {/* Red 600 - Main */}
                        <stop offset="100%" stopColor="#991B1B" /> {/* Red 800 - Shadow */}
                    </linearGradient>

                    {/* PEACH EAR GRADIENT */}
                    <linearGradient id="peachEarGradient" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                        <stop offset="0%" stopColor="#FECDD3" /> {/* Rose 200 */}
                        <stop offset="100%" stopColor="#F9A8D4" /> {/* Pink 300 */}
                    </linearGradient>

                    {/* DARK VISOR GRADIENT */}
                    <linearGradient id="visorDark" x1="100" y1="60" x2="100" y2="120" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#1F1F23" />
                        <stop offset="100%" stopColor="#0D0D0F" />
                    </linearGradient>

                    {/* YELLOW GLOW FOR EYES & ACCENTS */}
                    <filter id="yellowGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* SOFT DROP SHADOW */}
                    <filter id="softShadow" x="-20%" y="-10%" width="140%" height="150%">
                        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#991B1B" floodOpacity="0.3" />
                    </filter>

                    {/* GLOSS HIGHLIGHT FILTER */}
                    <linearGradient id="glossHighlight" x1="70" y1="50" x2="130" y2="50" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="50%" stopColor="white" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* === SMALL ICE CREAM CONE BODY (Attached to Head) === */}

                {/* Body Shadow */}
                <ellipse cx="100" cy="158" rx="10" ry="4" fill="black" opacity="0.1" />

                {/* Ice Cream Cone Shaped Body (50% smaller, attached to head) */}
                <path
                    d="M80 132 Q 78 142, 90 155 Q 100 165, 110 155 Q 122 142, 120 132 Z"
                    fill="url(#redGlossyGradient)"
                    filter="url(#softShadow)"
                />

                {/* Body Highlight */}
                <path d="M85 136 Q 90 139, 97 138" stroke="white" strokeWidth="2" opacity="0.25" strokeLinecap="round" fill="none" />

                {/* Chest LED (Pulsing Yellow Glow) */}
                <circle cx="100" cy="145" r="4" fill="#FCD34D" filter="url(#yellowGlow)">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="100" cy="145" r="2" fill="#FFFBEB" /> {/* Inner bright core */}


                {/* === HEAD (Rounded Glossy Red Helmet - NO ANTENNA) === */}

                {/* Main Head Shape */}
                <rect x="50" y="50" width="100" height="85" rx="38" fill="url(#redGlossyGradient)" filter="url(#softShadow)" />

                {/* Glossy Helmet Highlight (Top curve) */}
                <path d="M65 58 Q 100 48 135 58" stroke="url(#glossHighlight)" strokeWidth="6" strokeLinecap="round" fill="none" />
                <ellipse cx="68" cy="65" rx="6" ry="4" fill="white" opacity="0.4" transform="rotate(-20 68 65)" />


                {/* === EAR PODS (3D Glossy Side Components) === */}

                {/* Left Ear Pod */}
                <ellipse cx="48" cy="92" rx="10" ry="18" fill="url(#peachEarGradient)" />
                <ellipse cx="46" cy="88" rx="4" ry="8" fill="white" opacity="0.3" />

                {/* Right Ear Pod */}
                <ellipse cx="152" cy="92" rx="10" ry="18" fill="url(#peachEarGradient)" />
                <ellipse cx="150" cy="88" rx="4" ry="8" fill="white" opacity="0.3" />


                {/* === VISOR (Dark Glass Face Area) === */}

                <rect x="62" y="68" width="76" height="52" rx="20" fill="url(#visorDark)" stroke="#374151" strokeWidth="1" />

                {/* Visor Glass Reflection */}
                <path d="M75 75 Q 100 72 125 75" stroke="white" strokeWidth="2" opacity="0.08" strokeLinecap="round" />


                {/* === EYES (Large, Bright, Expressive, Glowing) === */}

                {expression === 'happy' && (
                    <g filter="url(#yellowGlow)">
                        {/* Left Eye */}
                        <g transform="translate(85, 92)">
                            {/* Eye Base (Warm Yellow/Amber Glow) */}
                            <motion.ellipse
                                rx="10" ry="12"
                                fill="#FBBF24" // Amber 400
                                animate={{ ry: [12, 2, 12] }} // Blink animation
                                transition={{
                                    duration: 4,
                                    times: [0, 0.025, 0.05], // Quick blink
                                    repeat: Infinity,
                                    repeatDelay: 0
                                }}
                            />
                            {/* Eye Shimmer/Reflection (Top Left) */}
                            <motion.ellipse
                                cx="-3" cy="-5" rx="3" ry="4"
                                fill="white" opacity="0.8"
                                animate={{ opacity: [0.8, 0.5, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                            {/* Pupil Core (Bright center) */}
                            <circle r="4" fill="#FEF3C7" opacity="0.9" />
                        </g>

                        {/* Right Eye */}
                        <g transform="translate(115, 92)">
                            {/* Eye Base */}
                            <motion.ellipse
                                rx="10" ry="12"
                                fill="#FBBF24"
                                animate={{ ry: [12, 2, 12] }}
                                transition={{
                                    duration: 4,
                                    times: [0, 0.025, 0.05],
                                    repeat: Infinity,
                                    repeatDelay: 0
                                }}
                            />
                            {/* Eye Shimmer */}
                            <motion.ellipse
                                cx="-3" cy="-5" rx="3" ry="4"
                                fill="white" opacity="0.8"
                                animate={{ opacity: [0.8, 0.5, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                            {/* Pupil Core */}
                            <circle r="4" fill="#FEF3C7" opacity="0.9" />
                        </g>
                    </g>
                )}

                {expression === 'thinking' && (
                    <g filter="url(#yellowGlow)">
                        {/* Thinking Eyes (Smaller, pulsing) */}
                        <circle cx="85" cy="92" r="6" fill="#FBBF24">
                            <animate attributeName="r" values="5;7;5" dur="1s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="115" cy="92" r="6" fill="#FBBF24">
                            <animate attributeName="r" values="5;7;5" dur="1s" begin="0.5s" repeatCount="indefinite" />
                        </circle>
                    </g>
                )}

                {expression === 'waiting' && (
                    <g filter="url(#yellowGlow)">
                        {/* Waiting Eyes (Curved lines) */}
                        <path d="M78 92 Q 85 86 92 92" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" fill="none" />
                        <path d="M108 92 Q 115 86 122 92" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" fill="none" />
                    </g>
                )}


                {/* === CHEEKS (Subtle Warm Glow) === */}
                <circle cx="68" cy="108" r="5" fill="#FECDD3" opacity="0.5" />
                <circle cx="132" cy="108" r="5" fill="#FECDD3" opacity="0.5" />

            </svg>
        </motion.div>
    );
}
