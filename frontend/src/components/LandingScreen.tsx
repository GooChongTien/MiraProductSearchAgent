import { motion } from 'framer-motion';
import Mascot from './Mascot';
import { Shield, Home, Heart, Plane, Cross, Search } from 'lucide-react';

interface LandingScreenProps {
  onStart: () => void;
}

// Orbiting Icon in Glowing Disk
function OrbitIcon({
  Icon,
  angle,
  orbitRadius,
  duration,
  diskColor,
  iconColor,
  delay,
}: {
  Icon: React.ElementType;
  angle: number; // Starting angle
  orbitRadius: number;
  duration: number;
  diskColor: string;
  iconColor: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{ width: 0, height: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        duration: duration,
        ease: "linear",
        repeat: Infinity,
        delay: delay
      }}
    >
      {/* Icon positioned on orbit */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          transform: `rotate(${angle}deg) translateX(${orbitRadius}px) rotate(-${angle}deg)`,
          marginLeft: '-24px',
          marginTop: '-24px',
        }}
      >
        {/* Glowing Disk */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm"
          style={{
            background: `radial-gradient(circle, ${diskColor} 0%, transparent 70%)`,
            boxShadow: `0 0 20px ${diskColor}, 0 4px 15px rgba(0,0,0,0.1)`,
          }}
        >
          <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg">
            <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  // 6 Orbit Icons with pastel glow colors
  const orbitIcons = [
    { Icon: Home, angle: 0, orbitRadius: 140, duration: 25, diskColor: 'rgba(251,191,36,0.4)', iconColor: 'text-amber-500', delay: 0 },
    { Icon: Cross, angle: 60, orbitRadius: 140, duration: 25, diskColor: 'rgba(244,114,182,0.4)', iconColor: 'text-rose-400', delay: 0 },
    { Icon: Heart, angle: 120, orbitRadius: 140, duration: 25, diskColor: 'rgba(244,114,182,0.4)', iconColor: 'text-rose-400', delay: 0 },
    { Icon: Plane, angle: 180, orbitRadius: 140, duration: 25, diskColor: 'rgba(56,189,248,0.4)', iconColor: 'text-sky-400', delay: 0 },
    { Icon: Shield, angle: 240, orbitRadius: 140, duration: 25, diskColor: 'rgba(251,191,36,0.4)', iconColor: 'text-amber-500', delay: 0 },
    { Icon: Search, angle: 300, orbitRadius: 140, duration: 25, diskColor: 'rgba(167,139,250,0.4)', iconColor: 'text-violet-400', delay: 0 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center font-sans overflow-hidden relative"
      style={{ background: 'linear-gradient(180deg, #FFF5F7 0%, #FFE4E9 30%, #FFD6DE 60%, #FFC9D4 100%)' }}>

      {/* === WARM ATMOSPHERE GLOW === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[5%] w-[90%] h-[50%] bg-gradient-to-b from-white/60 via-rose-50/30 to-transparent blur-[80px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[10%] w-[80%] h-[30%] bg-gradient-to-t from-amber-50/40 to-transparent blur-[60px] rounded-full" />
      </div>

      {/* === FLOATING LIGHT PARTICLES === */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 3 + Math.random() * 4 + 'px',
            height: 3 + Math.random() * 4 + 'px',
            left: 20 + Math.random() * 60 + '%',
            top: 30 + Math.random() * 50 + '%',
            background: ['#FCD34D', '#F9A8D4', '#93C5FD'][Math.floor(Math.random() * 3)],
            opacity: 0.4,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key="landing"
        className="w-full max-w-md h-full flex flex-col relative z-20"
      >
        {/* === MIRA ROBOT === */}
        <div className="pt-6 pb-2 flex justify-center relative z-20 h-[180px] items-center">
          <div className="absolute top-8 w-36 h-36 bg-rose-100/40 rounded-full blur-3xl" />
          <Mascot className="w-44 h-52 relative z-10" expression="happy" />
        </div>

        {/* === TITLE === */}
        <div className="px-8 relative z-20 text-center -mt-4">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-black text-slate-800 mb-2 leading-tight tracking-tight"
          >
            Hi, I'm <span className="text-[#9c1c28]">Mira!</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto"
          >
            I am your Product Search Agent. I can find any insurance products in any country with AI-powered research.
          </motion.p>
        </div>

        {/* === 3D HOLOGRAPHIC EARTH === */}
        <div className="flex-1 relative flex items-center justify-center min-h-[360px] mt-2">

          <div className="relative w-80 h-80 flex items-center justify-center">

            {/* === OUTER HALO GLOW === */}
            <div className="absolute w-72 h-72 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, rgba(244,114,182,0.1) 40%, transparent 70%)',
                filter: 'blur(20px)'
              }} />

            {/* === HOLOGRAPHIC ORBIT RINGS (Neon Lines) === */}

            {/* Ring 1 - Gold/Pink */}
            <motion.div
              className="absolute w-[280px] h-[280px] rounded-full border-2 scale-y-[0.35]"
              style={{
                borderColor: 'rgba(251, 191, 36, 0.25)',
                boxShadow: '0 0 10px rgba(251, 191, 36, 0.3), inset 0 0 10px rgba(251, 191, 36, 0.1)'
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, ease: "linear", repeat: Infinity }}
            />

            {/* Ring 2 - Blue/Pink (Offset) */}
            <motion.div
              className="absolute w-[300px] h-[300px] rounded-full border scale-y-[0.3] rotate-[20deg]"
              style={{
                borderColor: 'rgba(244, 114, 182, 0.2)',
                boxShadow: '0 0 8px rgba(244, 114, 182, 0.2)'
              }}
              animate={{ rotate: [20, 380] }}
              transition={{ duration: 80, ease: "linear", repeat: Infinity }}
            />

            {/* Ring 3 - Cyan (Wide) */}
            <div
              className="absolute w-[320px] h-[320px] rounded-full border scale-y-[0.25] -rotate-[15deg]"
              style={{
                borderColor: 'rgba(56, 189, 248, 0.15)',
              }}
            />


            {/* === CLASSIC EARTH SPHERE (Blue Ocean + Green Land) === */}
            <motion.div
              className="relative w-44 h-44 rounded-full overflow-hidden"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, ease: "linear", repeat: Infinity }}
              style={{
                background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 30%, #2563EB 60%, #1D4ED8 100%)',
                boxShadow: `
                            inset -20px -20px 40px rgba(0,0,0,0.15),
                            inset 10px 10px 30px rgba(255,255,255,0.4),
                            0 0 40px rgba(59, 130, 246, 0.3),
                            0 0 80px rgba(34, 197, 94, 0.15),
                            0 15px 40px rgba(30, 64, 175, 0.25)
                        `
              }}
            >
              {/* Atmosphere Bloom (Edge Glow) */}
              <div className="absolute inset-[-8px] rounded-full pointer-events-none"
                style={{
                  boxShadow: '0 0 25px 10px rgba(56, 189, 248, 0.2), 0 0 50px 20px rgba(251, 191, 36, 0.1)'
                }} />

              {/* Continent Shapes (GREEN LAND) */}
              <motion.div
                className="absolute inset-[-100%] opacity-90"
                style={{
                  backgroundImage: `
                                radial-gradient(ellipse 20% 30% at 25% 35%, rgba(34, 197, 94, 0.85) 0%, transparent 100%),
                                radial-gradient(ellipse 25% 20% at 55% 28%, rgba(34, 197, 94, 0.8) 0%, transparent 100%),
                                radial-gradient(ellipse 18% 25% at 72% 50%, rgba(34, 197, 94, 0.7) 0%, transparent 100%),
                                radial-gradient(ellipse 22% 18% at 38% 62%, rgba(34, 197, 94, 0.75) 0%, transparent 100%),
                                radial-gradient(ellipse 15% 22% at 82% 68%, rgba(34, 197, 94, 0.6) 0%, transparent 100%),
                                radial-gradient(ellipse 12% 15% at 15% 55%, rgba(34, 197, 94, 0.5) 0%, transparent 100%)
                            `,
                  backgroundSize: '200% 200%',
                }}
                animate={{ x: [0, -176] }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              />

              {/* Golden Network Lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                {/* Connection Lines */}
                <path d="M20 35 Q 45 25, 70 40" stroke="#D4A574" strokeWidth="0.5" fill="none" opacity="0.7" />
                <path d="M25 50 Q 50 40, 75 55" stroke="#D4A574" strokeWidth="0.5" fill="none" opacity="0.6" />
                <path d="M30 60 Q 55 70, 80 50" stroke="#D4A574" strokeWidth="0.4" fill="none" opacity="0.5" />
                <path d="M15 45 Q 40 55, 65 45" stroke="#D4A574" strokeWidth="0.4" fill="none" opacity="0.5" />

                {/* Glowing Nodes */}
                <circle cx="20" cy="35" r="2" fill="#FBBF24">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="70" cy="40" r="2.5" fill="#FBBF24">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="50" cy="50" r="3" fill="#FBBF24">
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="1.8s" repeatCount="indefinite" />
                </circle>
                <circle cx="25" cy="50" r="1.5" fill="#FBBF24">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="75" cy="55" r="2" fill="#FBBF24">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="45" cy="65" r="1.5" fill="#FBBF24">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="2.8s" repeatCount="indefinite" />
                </circle>
              </svg>

              {/* Latitude/Longitude Grid (Subtle) */}
              <div className="absolute inset-0 rounded-full opacity-20"
                style={{
                  backgroundImage: `
                                 linear-gradient(0deg, transparent 48%, rgba(100,150,200,0.3) 50%, transparent 52%),
                                 linear-gradient(90deg, transparent 48%, rgba(100,150,200,0.2) 50%, transparent 52%),
                                 linear-gradient(0deg, transparent 23%, rgba(100,150,200,0.15) 25%, transparent 27%),
                                 linear-gradient(0deg, transparent 73%, rgba(100,150,200,0.15) 75%, transparent 77%)
                             `,
                  backgroundSize: '100% 100%, 25% 100%, 100% 100%, 100% 100%'
                }}
              />

              {/* Globe Highlight (Top Left Gloss) */}
              <div className="absolute top-4 left-5 w-14 h-10 bg-white opacity-30 blur-xl rounded-full transform rotate-[-25deg]" />

            </motion.div>

            {/* === ORBITING ICONS === */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            >
              {orbitIcons.map((icon, idx) => (
                <OrbitIcon
                  key={idx}
                  Icon={icon.Icon}
                  angle={icon.angle}
                  orbitRadius={icon.orbitRadius}
                  duration={icon.duration}
                  diskColor={icon.diskColor}
                  iconColor={icon.iconColor}
                  delay={icon.delay}
                />
              ))}
            </motion.div>

          </div>
        </div>

        {/* === FOOTER === */}
        <div className="p-6 pb-10 w-full mt-auto relative z-30">
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(156, 28, 40, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="w-full py-4 text-lg font-bold text-white shadow-xl rounded-2xl transition-all relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #9c1c28 0%, #b82e3c 100%)',
              boxShadow: '0 10px 30px rgba(156, 28, 40, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)'
            }}
          >
            Start Research
          </motion.button>

          <div className="mt-5 text-center">
            <span className="text-[11px] text-slate-400 font-semibold tracking-[0.15em] uppercase">Powered by <span className="text-slate-600">360F</span></span>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
