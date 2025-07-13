
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Shield, Zap, Globe } from 'lucide-react';

const OnboardingScreen = () => {
  const navigate = useNavigate();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-violet rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gold rounded-full blur-3xl"></div>
      </div>

      <div className={`text-center z-10 transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Logo Animation */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto gradient-primary rounded-2xl flex items-center justify-center animate-bounce-subtle">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold rounded-full animate-pulse"></div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bharat <span className="text-violet">Agent</span>
        </h1>
        
        <p className="text-lg text-gray-600 mb-2 max-w-sm mx-auto">
          Let's build your money brain
        </p>
        
        <p className="text-sm text-gray-500 mb-12 max-w-xs mx-auto">
          We connect Aadhaar, UPI & Ethereum to automate your finances
        </p>

        {/* Features */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center justify-center space-x-3 text-gray-700">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm">Secured by Aadhaar</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-700">
            <Zap className="w-5 h-5 text-violet" />
            <span className="text-sm">Auto-save with AI</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-700">
            <Globe className="w-5 h-5 text-gold" />
            <span className="text-sm">Global remittance</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={() => navigate('/kyc')}
          className="w-full max-w-sm gradient-primary text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Get Started
        </Button>

        <p className="text-xs text-gray-400 mt-6">
          Trusted by 10M+ Indians
        </p>
      </div>
    </div>
  );
};

export default OnboardingScreen;
