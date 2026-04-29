/**
 * Disclaimer Banner Component
 * Warning banner indicating this is a student project
 *
 * @component
 */

import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const DisclaimerBanner = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-50 border-b-2 border-yellow-400 z-40">
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle size={20} className="text-yellow-600 flex-shrink-0" />
          <p className="text-sm text-yellow-800 font-medium">
            <span className="font-bold">⚠️ Demo Project:</span> This is a student educational project and is <span className="font-bold">not affiliated with Coinbase</span>. Do not enter real personal or financial information.
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-yellow-600 hover:text-yellow-700 flex-shrink-0 p-1"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default DisclaimerBanner;
