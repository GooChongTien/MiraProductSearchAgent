import { motion } from 'framer-motion';
import Mascot from './Mascot';
import { Shield, Home, Heart, Plane, Car, Cross, Search } from 'lucide-react';

interface LandingScreenProps {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  // Insurance icons for orbiting effect
  const orbitIcons = [
    { Icon: Shield, color: 'from-red-400 to-red-600', delay: 0 },
    { Icon: Home, color: 'from-rose-400 to-rose-600', delay: 0.5 },
    { Icon: Heart, color: 'from-pink-400 to-pink-600', delay: 1 },
    { Icon: Plane, color: 'from-red-300 to-red-500', delay: 1.5 },
    { Icon: Car, color: 'from-rose-300 to-rose-500', delay: 2 },
    { Icon: Cross, color: 'from-red-400 to-pink-500', delay: 2.5 },
    { Icon: Search, color: 'from-pink-300 to-red-400', delay: 3 },
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

          {/* 3D Earth Globe with Orbiting Icons */}
          <div className="relative w-64 h-64 mb-6">
            {/* Outer glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 via-cyan-100/30 to-amber-100/30 rounded-full blur-2xl"></div>

            {/* Orbit path */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, ease: "linear", repeat: Infinity }}
              className="absolute inset-4 border border-gray-200/50 rounded-full border-dashed"
            ></motion.div>

            {/* 3D Earth Globe */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-36 h-36">
                {/* Globe base with 3D gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-cyan-400 to-blue-600 rounded-full shadow-2xl shadow-blue-400/50"></div>
                {/* Continents overlay */}
                <div className="absolute inset-0 rounded-full overflow-hidden opacity-70">
                  <div className="absolute top-4 left-6 w-12 h-8 bg-green-500/60 rounded-full blur-sm"></div>
                  <div className="absolute top-8 right-4 w-8 h-10 bg-green-600/50 rounded-full blur-sm"></div>
                  <div className="absolute bottom-6 left-8 w-10 h-6 bg-green-500/50 rounded-full blur-sm"></div>
                  <div className="absolute bottom-4 right-6 w-6 h-8 bg-green-600/40 rounded-full blur-sm"></div>
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
                <div className="absolute top-2 left-4 w-8 h-8 bg-white/40 rounded-full blur-sm"></div>
              </div>
            </div>

            {/* Orbiting Insurance Icons */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, ease: "linear", repeat: Infinity }}
              className="absolute inset-0"
            >
              {orbitIcons.map((item, index) => {
                const angle = (index * 360) / orbitIcons.length;
                const radius = 110;
                const x = Math.cos((angle * Math.PI) / 180) * radius + 128 - 16;
                const y = Math.sin((angle * Math.PI) / 180) * radius + 128 - 16;

                return (
                  <motion.div
                    key={index}
                    animate={{ rotate: -360 }} // Counter-rotate to keep icons upright
                    transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                    className={`absolute w-8 h-8 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg`}
                    style={{ left: x, top: y }}
                  >
                    <item.Icon className="w-4 h-4 text-white" />
                  </motion.div>
                );
              })}
            </motion.div>
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
