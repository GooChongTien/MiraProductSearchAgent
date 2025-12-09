interface ErrorScreenProps {
  message: string;
  onStartOver: () => void;
}

export default function ErrorScreen({ message, onStartOver }: ErrorScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(180deg, #FFF5F7 0%, #FFE4E9 30%, #FFD6DE 60%, #FFC9D4 100%)' }}>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
        <div className="text-center">
          {/* Error icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Report Generation Failed
          </h2>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {message}
          </p>

          <button
            onClick={onStartOver}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
