
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Upload, CheckCircle, Shield, FileText } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const KYCScreen = () => {
  const navigate = useNavigate();
  const { updateUser } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    aadhaar: '',
    phone: '',
    consent: false
  });
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    // Simulate verification delay
    setTimeout(() => {
      updateUser({ isKYCVerified: true });
      setIsVerifying(false);
      navigate('/dashboard');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-8">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/')}
          className="text-gray-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900">Verification</h1>
        <div className="w-10"></div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex space-x-2">
          <div className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-violet' : 'bg-gray-300'}`}></div>
          <div className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-violet' : 'bg-gray-300'}`}></div>
          <div className={`w-2 h-2 rounded-full ${step >= 3 ? 'bg-violet' : 'bg-gray-300'}`}></div>
        </div>
      </div>

      {step === 1 && (
        <div className="animate-fade-in">
          <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-violet/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-violet" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Secure Identity</h2>
              <p className="text-gray-600">Your Aadhaar keeps your money safe</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aadhaar Number
                </label>
                <Input
                  type="text"
                  placeholder="XXXX XXXX XXXX"
                  value={formData.aadhaar}
                  onChange={(e) => setFormData({...formData, aadhaar: e.target.value})}
                  className="text-center text-lg tracking-widest"
                  maxLength={14}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <Input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="text-center text-lg"
                />
              </div>
            </div>
          </Card>

          <Button 
            onClick={() => setStep(2)}
            disabled={!formData.aadhaar || !formData.phone}
            className="w-full gradient-primary text-white font-semibold py-3 rounded-xl"
          >
            Continue
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gold" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Consent</h2>
              <p className="text-gray-600">We believe in full transparency</p>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">What we'll do:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Monitor your UPI transactions to identify savings opportunities</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Automatically save a percentage to earn interest</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Explain all actions through our AI assistant</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">What we won't do:</h3>
                <ul className="space-y-2">
                  <li>• Share your data with third parties</li>
                  <li>• Make transactions without your permission</li>
                  <li>• Access your personal messages or calls</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-6">
              <input 
                type="checkbox" 
                id="consent"
                checked={formData.consent}
                onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                className="w-4 h-4 text-violet focus:ring-violet border-gray-300 rounded"
              />
              <label htmlFor="consent" className="text-sm text-gray-700">
                I agree to these terms and give my consent
              </label>
            </div>
          </Card>

          <Button 
            onClick={() => setStep(3)}
            disabled={!formData.consent}
            className="w-full gradient-primary text-white font-semibold py-3 rounded-xl"
          >
            I Agree
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in text-center">
          <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            {!isVerifying ? (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Verify</h2>
                <p className="text-gray-600 mb-6">
                  We'll securely verify your identity using Aadhaar's digital signature
                </p>
                <Button 
                  onClick={handleVerify}
                  className="w-full gradient-primary text-white font-semibold py-3 rounded-xl"
                >
                  Verify Me
                </Button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-violet/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Shield className="w-8 h-8 text-violet" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying...</h2>
                <p className="text-gray-600 mb-6">
                  This may take a few moments
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-violet h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default KYCScreen;
