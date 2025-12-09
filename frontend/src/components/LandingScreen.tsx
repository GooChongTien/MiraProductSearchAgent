import { motion } from 'framer-motion';
import Mascot from './Mascot';
import { Shield, Home, Heart, Plane, Car, Search } from 'lucide-react';

interface LandingScreenProps {
  onStart: () => void;
}

// 3D Orbiting Icon Component - Each icon orbits in its own tilted plane
function OrbitingIcon({
  Icon,
  color,
  orbitDuration,
  orbitTilt,
  startAngle,
  radius
}: {
  Icon: React.ElementType;
  color: string;
  orbitDuration: number;
  orbitTilt: number;
  startAngle: number;
  radius: number;
}) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        perspective: '400px',
        transformStyle: 'preserve-3d'
      }}
    >
      <motion.div
        className="absolute"
        style={{
          width: radius * 2,
          height: radius * 2,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${orbitTilt}deg) rotateY(${startAngle}deg)`,
        }}
        animate={{
          rotateY: [startAngle, startAngle + 360]
        }}
        transition={{
          duration: orbitDuration,
          ease: "linear",
          repeat: Infinity
        }}
      >
        <motion.div
          className={`absolute w-9 h-9 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg`}
          style={{
            left: '50%',
            top: '50%',
            marginLeft: '-18px',
            marginTop: '-18px',
            transform: `translateZ(${radius}px)`,
            backfaceVisibility: 'visible',
          }}
          // Counter-rotate to keep icon upright
          animate={{ rotateY: [0, -360] }}
          transition={{ duration: orbitDuration, ease: "linear", repeat: Infinity }}
        >
          <Icon className="w-4 h-4 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  // Each icon has unique orbit parameters for true 3D effect
  const orbitIcons = [
    { Icon: Shield, color: 'from-red-400 to-red-600', duration: 8, tilt: 70, startAngle: 0, radius: 100 },
    { Icon: Home, color: 'from-rose-400 to-rose-600', duration: 10, tilt: 60, startAngle: 60, radius: 95 },
    { Icon: Heart, color: 'from-pink-400 to-pink-600', duration: 12, tilt: 80, startAngle: 120, radius: 105 },
    { Icon: Plane, color: 'from-red-300 to-red-500', duration: 9, tilt: 50, startAngle: 180, radius: 90 },
    { Icon: Car, color: 'from-rose-300 to-rose-500', duration: 11, tilt: 75, startAngle: 240, radius: 98 },
    { Icon: Search, color: 'from-pink-300 to-red-400', duration: 7, tilt: 65, startAngle: 300, radius: 102 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 overflow-hidden">
      {/* Decorative Light Rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-b from-pink-200/30 to-transparent blur-3xl"></div>
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-gradient-to-l from-amber-200/40 to-transparent blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-rose-200/30 to-transparent blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key="landing"
        className="w-full max-w-md h-full flex flex-col relative z-10"
      >
        {/* MIRA Robot Header */}
        <div className="pt-10 text-center relative z-10">
          <Mascot className="w-24 h-24 mx-auto mb-2" expression="happy" />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-4 leading-tight"
          >
            Hi, I'm <span className="text-[#9c1c28]">Mira!</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-center mb-8 text-base leading-relaxed max-w-xs font-medium"
          >
            I am your Product Search Agent. I can find any insurance products in any country with AI-powered research.
          </motion.p>

          {/* 3D Earth Globe with True 3D Orbiting Icons */}
          <div className="relative w-64 h-64 mb-6" style={{ perspective: '600px' }}>
            {/* Outer glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 via-cyan-100/30 to-amber-100/30 rounded-full blur-2xl"></div>

            {/* 3D Earth Globe - Center */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="relative w-32 h-32">
                {/* Globe base with 3D gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-cyan-400 to-blue-600 rounded-full shadow-2xl shadow-blue-400/50"></div>
                {/* Continents overlay */}
                <div className="absolute inset-0 rounded-full overflow-hidden opacity-70">
                  <div className="absolute top-3 left-5 w-10 h-7 bg-green-500/60 rounded-full blur-sm"></div>
                  <div className="absolute top-7 right-3 w-7 h-9 bg-green-600/50 rounded-full blur-sm"></div>
                  <div className="absolute bottom-5 left-7 w-9 h-5 bg-green-500/50 rounded-full blur-sm"></div>
                  <div className="absolute bottom-3 right-5 w-5 h-7 bg-green-600/40 rounded-full blur-sm"></div>
                </div>
                {/* Network lines effect */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <circle cx="30" cy="35" r="2" fill="#fbbf24" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="70" cy="40" r="2" fill="#fbbf24" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="50" cy="65" r="2" fill="#fbbf24" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  <line x1="30" y1="35" x2="70" y2="40" stroke="#fbbf24" strokeWidth="0.5" opacity="0.5" />
                  <line x1="70" y1="40" x2="50" y2="65" stroke="#fbbf24" strokeWidth="0.5" opacity="0.5" />
                  <line x1="50" y1="65" x2="30" y2="35" stroke="#fbbf24" strokeWidth="0.5" opacity="0.5" />
                </svg>
                {/* Globe highlight */}
                <div className="absolute top-2 left-3 w-6 h-6 bg-white/40 rounded-full blur-sm"></div>
              </div>
            </div>

            {/* 3D Orbiting Icons - Each with unique tilted orbit */}
            {orbitIcons.map((item, index) => (
              <OrbitingIcon
                key={index}
                Icon={item.Icon}
                color={item.color}
                orbitDuration={item.duration}
                orbitTilt={item.tilt}
                startAngle={item.startAngle}
                radius={item.radius}
              />
            ))}
          </div>
        </div>

        {/* Bottom Button Area */}
        <div className="p-6 pb-8 w-full">
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(156, 28, 40, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="w-full py-4 text-lg font-bold text-white shadow-xl rounded-2xl bg-gradient-to-r from-[#9c1c28] to-[#b82e3c] hover:from-[#841a24] hover:to-[#9c1c28] transition-all"
            style={{ boxShadow: "0 10px 30px rgba(156, 28, 40, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)" }}
          >
            Start Research
          </motion.button>

          <div className="mt-4 text-center">
            <span className="text-xs text-gray-400 font-semibold tracking-widest uppercase">Powered by <span className="text-gray-600">360F</span></span>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
