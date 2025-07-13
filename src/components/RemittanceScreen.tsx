
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, RefreshCw, Send, Clock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RemittanceScreen = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [step, setStep] = useState(1);

  const exchangeRate = 83.25;
  const usdAmount = amount ? (parseFloat(amount) / exchangeRate).toFixed(2) : '0.00';

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pt-12 bg-white/80 backdrop-blur-sm">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/dashboard')}
          className="text-gray-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900">Global Send</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-6 space-y-6">
        {step === 1 && (
          <div className="animate-fade-in space-y-6">
            {/* Exchange Rate Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">USD → INR</h3>
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-green-600">₹{exchangeRate}</p>
                <p className="text-sm text-gray-600">per USD</p>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-700 text-center">
                  Live rate • Updates every 30 seconds
                </p>
              </div>
            </Card>

            {/* Amount Input */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Amount</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount in INR
                  </label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-2xl font-bold text-center h-16"
                  />
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">Equivalent in USDC</p>
                  <p className="text-xl font-bold text-blue-600">${usdAmount}</p>
                </div>
              </div>
            </Card>

            {/* Recipient Input */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipient</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  UPI ID or Mobile Number
                </label>
                <Input
                  type="text"
                  placeholder="name@paytm or +91 XXXXX XXXXX"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="text-center"
                />
              </div>
            </Card>

            <Button 
              onClick={() => setStep(2)}
              disabled={!amount || !recipient}
              className="w-full h-14 gradient-primary text-white rounded-xl font-semibold"
            >
              Review Transfer
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in space-y-6">
            {/* Transfer Summary */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Transfer Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">You send</span>
                  <span className="font-semibold">₹{amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Exchange rate</span>
                  <span className="font-semibold">₹{exchangeRate}/USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Network fee</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <hr />
                <div className="flex justify-between">
                  <span className="text-gray-600">Recipient gets</span>
                  <span className="font-bold text-lg">₹{amount}</span>
                </div>
              </div>
            </Card>

            {/* Delivery Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Instant delivery via UPI</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Secured by blockchain</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Send className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-700">To: {recipient}</span>
                </div>
              </div>
            </Card>

            {/* Process Flow */}
            <Card className="bg-gradient-to-r from-violet-100 to-purple-100 border-0 shadow-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">How it works:</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>1. Convert INR to USDC on Polygon</p>
                <p>2. Bridge USDC to recipient's wallet</p>
                <p>3. Auto-convert to INR via UPI</p>
                <p>4. Instant credit to recipient</p>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline"
                onClick={() => setStep(1)}
                className="h-14 bg-white/80 border-2 border-gray-200 rounded-xl font-semibold"
              >
                Go Back
              </Button>
              <Button 
                onClick={() => {
                  // Simulate transfer
                  setTimeout(() => navigate('/dashboard'), 2000);
                }}
                className="h-14 gradient-primary text-white rounded-xl font-semibold"
              >
                Send Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemittanceScreen;
