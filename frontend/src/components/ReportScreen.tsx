import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, ExternalLink, Building2, Globe } from 'lucide-react';
import { Product } from '../types';
import Mascot from './Mascot';

interface ReportScreenProps {
  html: string;
  products: Product[];
  insuranceType: string;
  country: string;
  onStartOver: () => void;
}

export default function ReportScreen({ products, insuranceType, country, onStartOver }: ReportScreenProps) {
  const [_showActions, setShowActions] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowActions(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (

    <div className="min-h-screen flex items-center justify-center font-sans"
      style={{ background: 'linear-gradient(180deg, #FFF5F7 0%, #FFE4E9 30%, #FFD6DE 60%, #FFC9D4 100%)' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md min-h-screen flex flex-col bg-white overflow-hidden relative shadow-2xl"
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center border-b border-gray-100 sticky top-0 bg-white z-20">
          <button onClick={onStartOver} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="ml-2">
            <h1 className="font-bold text-lg text-gray-900 leading-none">Your Results</h1>
            <span className="text-xs text-gray-500 font-medium capitalize">{insuranceType} • {country}</span>
          </div>
          <div className="ml-auto">
            <Mascot className="w-8 h-8" expression="happy" />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50/50 p-4 space-y-4 pb-32">

          {/* Success Banner */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-start gap-4"
          >
            <div className="bg-green-100 p-2 rounded-full text-green-600">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-green-800 text-sm">Analysis Complete</h3>
              <p className="text-xs text-green-700 leading-relaxed mt-1">
                I've found {products.length} excellent {insuranceType} options for you in {country}.
              </p>
            </div>
          </motion.div>

          {/* Product Cards */}
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all"
            >
              {/* Country Badge */}
              <div className="absolute top-0 right-0 bg-gray-100 px-3 py-1 rounded-bl-2xl">
                <div className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-gray-400" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{country}</span>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-4 mt-2">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{product.product_name}</h3>
                  <p className="text-sm text-gray-500 font-medium">{product.insurer}</p>
                  {product.target_audience && (
                    <span className="inline-block mt-1 text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                      {product.target_audience}
                    </span>
                  )}
                </div>
              </div>

              {/* Benefits Preview */}
              <div className="space-y-2 mb-6">
                {
                  product.benefits.slice(0, 3).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </div>
                  ))
                }
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-50 text-gray-700 font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  View Details <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}

          {/* Disclaimer - Below Products */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
            <p className="text-xs text-amber-800 leading-relaxed">
              ⚠️ <strong>Disclaimer:</strong> This information is gathered from public sources. Always verify details on the insurer's official website.
            </p>
          </div>

          {/* Empty space for bottom bar */}
          <div className="h-24"></div>
        </div>

        {/* Fixed Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-30 max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onStartOver}
              className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl text-sm hover:bg-gray-200 transition-colors"
            >
              Start Over
            </button>
            <a
              href="https://360f.com/book-a-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#9c1c28] text-white font-bold py-3 rounded-xl text-sm hover:bg-[#841a24] transition-colors shadow-lg shadow-red-200"
            >
              Book Demo
            </a>
          </div>
          <div className="text-center mt-3">
            <span className="text-[10px] text-gray-400 font-semibold tracking-wide uppercase">Powered by <span className="text-gray-500">360F</span></span>
          </div>
        </div>

      </motion.div >
    </div >
  );
}
