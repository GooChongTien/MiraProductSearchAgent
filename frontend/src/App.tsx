import { useState } from 'react';
import {
  Plane, Heart, Activity,
  Car, AlertTriangle, BriefcaseMedical
} from 'lucide-react';
import { AppState, AppData } from './types';
import { generateReport } from './api';
import LandingScreen from './components/LandingScreen';
import QuestionScreen from './components/QuestionScreen';
import LoadingScreen from './components/LoadingScreen';
import ReportScreen from './components/ReportScreen';
import ErrorScreen from './components/ErrorScreen';

function App() {
  const [state, setState] = useState<AppState>('intro');
  const [data, setData] = useState<AppData>({
    insuranceType: '',
    country: '',
    reportHTML: '',
    products: [],
    errorMessage: '',
  });

  const handleStart = () => {
    setState('askType');
  };

  const handleInsuranceTypeSubmit = (answer: string) => {
    setData((prev) => ({ ...prev, insuranceType: answer }));
    setState('askCountry');
  };

  const handleCountrySubmit = async (answer: string) => {
    setData((prev) => ({ ...prev, country: answer }));
    setState('loading');

    // Generate report
    const result = await generateReport(data.insuranceType, answer);

    if (result.ok && result.html) {
      setData((prev) => ({
        ...prev,
        reportHTML: result.html!,
        products: result.products || []
      }));
      setState('report');
    } else {
      setData((prev) => ({
        ...prev,
        errorMessage: result.error || 'An unexpected error occurred',
      }));
      setState('error');
    }
  };

  const handleStartOver = () => {
    setData({
      insuranceType: '',
      country: '',
      reportHTML: '',
      products: [],
      errorMessage: '',
    });
    setState('intro');
  };

  return (
    <>
      {state === 'intro' && <LandingScreen onStart={handleStart} />}

      {state === 'askType' && (
        <QuestionScreen
          title="Choose an insurance type"
          question="Choose an insurance type"
          placeholder="Or type here..."
          layout="grid"
          examples={[
            { label: 'Term Life', value: 'Term Life', icon: <Heart className="text-yellow-500" />, color: 'bg-blue-50' },
            { label: 'Whole Life', value: 'Whole Life', icon: <Heart className="text-red-400" />, color: 'bg-pink-50' },
            { label: 'Medical', value: 'Medical/Health', icon: <BriefcaseMedical className="text-green-500" />, color: 'bg-green-50' },
            { label: 'Travel', value: 'Travel', icon: <Plane className="text-blue-500 rotate-45" />, color: 'bg-sky-50' },
            { label: 'Motor', value: 'Motor', icon: <Car className="text-purple-500" />, color: 'bg-violet-50' },
            { label: 'Personal Accident', value: 'Personal Accident', icon: <AlertTriangle className="text-orange-500" />, color: 'bg-orange-50' },
            { label: 'Critical Illness', value: 'Critical Illness', icon: <Activity className="text-teal-500" />, color: 'bg-teal-50' },
          ]}
          onSubmit={handleInsuranceTypeSubmit}
          step={1}
          totalSteps={2}
        />
      )}

      {state === 'askCountry' && (
        <QuestionScreen
          title="Choose a country to search in"
          question="Choose a country to search in"
          placeholder="Or type here..."
          layout="list"
          examples={[
            { label: 'Singapore', value: 'Singapore', icon: <img src="https://flagcdn.com/w40/sg.png" alt="SG" className="w-6 h-4 object-cover rounded shadow-sm" />, color: 'bg-white' },
            { label: 'Malaysia', value: 'Malaysia', icon: <img src="https://flagcdn.com/w40/my.png" alt="MY" className="w-6 h-4 object-cover rounded shadow-sm" />, color: 'bg-white' },
            { label: 'Indonesia', value: 'Indonesia', icon: <img src="https://flagcdn.com/w40/id.png" alt="ID" className="w-6 h-4 object-cover rounded shadow-sm" />, color: 'bg-white' },
            { label: 'Thailand', value: 'Thailand', icon: <img src="https://flagcdn.com/w40/th.png" alt="TH" className="w-6 h-4 object-cover rounded shadow-sm" />, color: 'bg-white' },
            { label: 'Vietnam', value: 'Vietnam', icon: <img src="https://flagcdn.com/w40/vn.png" alt="VN" className="w-6 h-4 object-cover rounded shadow-sm" />, color: 'bg-white' },
            { label: 'Spain', value: 'Spain', icon: <img src="https://flagcdn.com/w40/es.png" alt="ES" className="w-6 h-4 object-cover rounded shadow-sm" />, color: 'bg-white' },
            { label: 'Switzerland', value: 'Switzerland', icon: <img src="https://flagcdn.com/w40/ch.png" alt="CH" className="w-6 h-4 object-cover rounded shadow-sm" />, color: 'bg-white' },
          ]}
          onSubmit={handleCountrySubmit}
          step={2}
          totalSteps={2}
        />
      )}

      {state === 'loading' && <LoadingScreen />}

      {state === 'report' && (
        <ReportScreen
          html={data.reportHTML}
          products={data.products}
          insuranceType={data.insuranceType}
          country={data.country}
          onStartOver={handleStartOver}
        />
      )}

      {state === 'error' && (
        <ErrorScreen message={data.errorMessage} onStartOver={handleStartOver} />
      )}
    </>
  );
}

export default App;
