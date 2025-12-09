import { motion } from 'framer-motion';
import Mascot from './Mascot';

interface LandingScreenProps {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key="landing"
        className="w-full max-w-md h-full flex flex-col relative"
      >
        {/* MIRA Logo Header */}
        <div className="pt-12 text-center relative z-10">
          <Mascot className="w-28 h-28 mx-auto mb-4" expression="happy" />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10 -mt-10">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-black text-gray-900 text-center mb-6 leading-tight"
          >
            Hi, I'm <span className="text-[#9c1c28]">Mira!</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-center mb-10 text-lg leading-relaxed max-w-xs font-medium"
          >
            I am your Product Search Agent. I can find any insurance products in any country with AI-powered research.
          </motion.p>

          {/* Modern Illustration Area */}
          <div className="relative mb-8 w-56 h-56">
            {/* Background Gradient Blob */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-pink-50 to-purple-100 rounded-full opacity-80 blur-2xl"></div>

            {/* Central AI Core */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#9c1c28] to-[#d4424f] rounded-3xl flex items-center justify-center shadow-2xl shadow-red-300/50 rotate-12">
                <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center -rotate-12">
                  <svg className="w-16 h-16 text-[#9c1c28]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating Modern Elements */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-300/50">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </motion.div>

            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-4 left-0 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-300/50">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
            </motion.div>

            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-0 right-6 w-11 h-11 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-300/50">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Bottom Button Area */}
        <div className="p-6 pb-8 w-full">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="w-full py-4 text-lg font-bold text-white shadow-lg rounded-2xl bg-[#9c1c28] hover:bg-[#841a24] transition-all"
          >
            Start Research
          </motion.button>

          <div className="mt-4 text-center">
            <span className="text-xs text-gray-400 font-semibold tracking-wide uppercase">Powered by <span className="text-gray-600">360F</span></span>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
