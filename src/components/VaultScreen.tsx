
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, PiggyBank, Shield, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

const VaultScreen = () => {
  const navigate = useNavigate();
  const { user } = useApp();

  const vaultData = {
    totalSaved: user.savings,
    monthlyGrowth: 12,
    currentAPY: 6.2,
    interestEarned: 42.5,
    nextInterestDate: '2024-01-15'
  };

  const chartData = [
    { month: 'Oct', amount: 2800 },
    { month: 'Nov', amount: 3100 },
    { month: 'Dec', amount: 3400 },
    { month: 'Jan', amount: 3400 }
  ];

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
        <h1 className="text-xl font-semibold text-gray-900">Savings Vault</h1>
        <Button variant="ghost" size="sm" className="text-gray-600">
          <Info className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-6 space-y-6">
        {/* Main Balance Card */}
        <Card className="gradient-primary p-6 text-white border-0 shadow-lg">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <PiggyBank className="w-6 h-6" />
              <span className="text-white/80">Total Saved</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">₹{vaultData.totalSaved.toLocaleString()}</h2>
            <div className="flex items-center justify-center space-x-4 text-white/90">
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+{vaultData.monthlyGrowth}% this month</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Yield Information */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Earning Interest</h3>
              <p className="text-sm text-gray-600">Your money is growing automatically</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{vaultData.currentAPY}%</p>
              <p className="text-sm text-gray-600">Current APY</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">₹{vaultData.interestEarned}</p>
              <p className="text-sm text-gray-600">Earned This Month</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Secured by Ethereum</span>
            </div>
            <p className="text-xs text-blue-700">
              Your funds are secured in audited smart contracts on Polygon zkEVM, earning yield from Aave protocol.
            </p>
          </div>
        </Card>

        {/* Growth Chart */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Savings Growth</h3>
          <div className="space-y-3">
            {chartData.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-violet to-purple-600 rounded-full transition-all duration-1000"
                      style={{width: `${(data.amount / 4000) * 100}%`}}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">₹{data.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="h-14 gradient-primary text-white rounded-xl font-semibold">
            Top Up Vault
          </Button>
          <Button variant="outline" className="h-14 bg-white/80 border-2 border-gray-200 rounded-xl font-semibold">
            Withdraw Funds
          </Button>
        </div>

        {/* Next Interest Payment */}
        <Card className="bg-gradient-to-r from-gold/10 to-yellow-100 border-0 shadow-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
              <span className="text-gold text-xl">💰</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Next Interest Payment</p>
              <p className="text-sm text-gray-600">Jan 15, 2024 • Est. ₹18.50</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VaultScreen;
