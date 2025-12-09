import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowLeft } from 'lucide-react';
import Mascot from './Mascot';

export interface ExampleItem {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

interface QuestionScreenProps {
  question: string;
  placeholder: string;
  examples: ExampleItem[];
  onSubmit: (answer: string) => void;
  title: string;
  step?: number;
  totalSteps?: number;
  layout?: 'grid' | 'list';
}

export default function QuestionScreen({
  question: _question,
  placeholder,
  examples,
  onSubmit,
  title,
  step = 1,
  totalSteps = 2,
  layout: _layout = 'grid',
}: QuestionScreenProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer.trim());
    }
  };

  const handleExampleClick = (value: string) => {
    onSubmit(value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans overflow-hidden relative"
      style={{ background: 'linear-gradient(180deg, #FFF5F7 0%, #FFE4E9 30%, #FFD6DE 60%, #FFC9D4 100%)' }}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md h-screen flex flex-col bg-white overflow-hidden relative shadow-2xl"
      >
        {/* Navigation Header */}
        <div className="px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            {step > 1 && (
              <button onClick={() => window.location.reload()} className="p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100">
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <Mascot className="w-7 h-7" expression="happy" />
              <span className="font-bold text-base text-gray-900 tracking-tight">Mira</span>
            </div>
          </div>
          <div className="text-xs font-semibold text-gray-400">
            Step {step}/{totalSteps}
          </div>
        </div>

        {/* Title Section */}
        <div className="px-6 pb-4 shrink-0">
          <h2 className="text-xl font-black text-gray-900 leading-tight">
            {title}
          </h2>
        </div>

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          {/* Grid Layout for both Insurance Types and Countries */}
          <div className="grid grid-cols-3 gap-2">
            {examples.map((example, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => handleExampleClick(example.value)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-95 border border-transparent hover:border-gray-200 hover:shadow-md ${example.color} aspect-square`}
              >
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-2 shadow-sm text-gray-900 overflow-hidden">
                  <div className="scale-150">{example.icon}</div>
                </div>
                <span className="font-semibold text-gray-800 text-center leading-tight text-xs">
                  {example.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bottom Section - Fixed */}
        <div className="shrink-0 px-6 pb-6 pt-4 bg-white border-t border-gray-100">
          {/* Search Input */}
          <form onSubmit={handleSubmit} className="mb-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#9c1c28] transition-colors" />
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9c1c28] focus:bg-white transition-all text-gray-900 placeholder-gray-400 font-medium text-sm"
              />
            </div>
          </form>

          {/* Powered by 360F */}
          <div className="text-center">
            <span className="text-[10px] text-gray-400 font-semibold tracking-wide uppercase">Powered by <span className="text-gray-500">360F</span></span>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
