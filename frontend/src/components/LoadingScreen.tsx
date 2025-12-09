import { motion } from 'framer-motion';
import Mascot from './Mascot';
import { Search, Shield, Globe, FileText } from 'lucide-react';

export default function LoadingScreen() {

  return (

    <div className="min-h-screen flex items-center justify-center font-sans overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF5F7 0%, #FFE4E9 30%, #FFD6DE 60%, #FFC9D4 100%)' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md h-screen flex flex-col relative bg-white shadow-2xl"
      >
        <div className="flex-1 flex flex-col items-center justify-center relative">

          {/* Thinking Cloud Animation */}
          <div className="absolute top-[15%] right-[20%] opacity-50">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-2 ml-4"
            >
              <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
              className="mb-1 ml-1"
            >
              <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
            </motion.div>
          </div>

          {/* Orbiting Icons */}
          <div className="relative w-80 h-80 flex items-center justify-center mb-8">
            {/* Central Mascot */}
            <Mascot className="w-40 h-40 z-10 relative" expression="thinking" />

            {/* Orbit Path 1 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              className="absolute w-56 h-56 border border-blue-100 rounded-full"
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full shadow-sm">
                <Search className="w-5 h-5 text-blue-400" />
              </div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full shadow-sm">
                <Globe className="w-5 h-5 text-green-400" />
              </div>
            </motion.div>

            {/* Orbit Path 2 (Reverse) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 10, ease: "linear", repeat: Infinity }}
              className="absolute w-72 h-72 border border-purple-100 rounded-full border-dashed"
            >
              <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-sm">
                <Shield className="w-5 h-5 text-purple-400" />
              </div>
              <div className="absolute top-1/2 -left-3 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-sm">
                <FileText className="w-5 h-5 text-orange-400" />
              </div>
            </motion.div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-blue-50 bg-opacity-30 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">Mira is researching...</h2>
          <p className="text-gray-500 font-medium">Analyzing insurance products for you</p>

          {/* Bouncing Dots */}
          <div className="flex space-x-2 mt-8">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="w-3 h-3 bg-[#9c1c28] rounded-full"></motion.div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 0.6, delay: 0.2, repeat: Infinity }} className="w-3 h-3 bg-[#e97e8a] rounded-full"></motion.div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 0.6, delay: 0.4, repeat: Infinity }} className="w-3 h-3 bg-[#f8d2d6] rounded-full"></motion.div>
          </div>

        </div>

        {/* Footer */}
        <div className="pb-8 text-center">
          <span className="text-[10px] text-gray-400 font-semibold tracking-wide uppercase">Powered by <span className="text-gray-500">360F</span></span>
        </div>
      </motion.div>
    </div>
  );
}
