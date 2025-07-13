
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PiggyBank, TrendingUp, Send, CreditCard, Eye, EyeOff, Languages } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useState } from 'react';

const Dashboard = () => {
  const { user, toggleLanguage } = useApp();
  const [showBalance, setShowBalance] = useState(true);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (user.language === 'hi') {
      if (hour < 12) return 'सुप्रभात';
      if (hour < 17) return 'नमस्ते';
      return 'शुभ संध्या';
    }
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const translations = {
    en: {
      balance: 'UPI Balance',
      agentSavings: 'Agent Savings This Month',
      quickActions: 'Quick Actions',
      saveMore: 'Save More',
      withdraw: 'Withdraw',
      convert: 'Convert',
      borrow: 'Borrow',
      recentActivity: 'Recent Activity',
      viewAll: 'View All'
    },
    hi: {
      balance: 'UPI बैलेंस',
      agentSavings: 'इस महीने एजेंट सेविंग्स',
      quickActions: 'त्वरित कार्य',
      saveMore: 'और बचत करें',
      withdraw: 'निकालें',
      convert: 'बदलें',
      borrow: 'उधार लें',
      recentActivity: 'हाल की गतिविधि',
      viewAll: 'सभी देखें'
    }
  };

  const t = translations[user.language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 pb-20">
      {/* Header */}
      <div className="gradient-primary p-6 pt-12 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {user.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-white text-xl font-semibold">
                {getGreeting()}, {user.name} 👋
              </h1>
              <p className="text-white/80 text-sm">Ready to grow your wealth?</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-white hover:bg-white/10"
          >
            <Languages className="w-5 h-5" />
          </Button>
        </div>

        {/* Balance Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-0 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 text-sm">{t.balance}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalance(!showBalance)}
              className="text-white/80 hover:bg-white/10 p-1"
            >
              {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          <div className="text-white text-2xl font-bold">
            {showBalance ? `₹${user.balance.toLocaleString()}` : '₹••••••'}
          </div>
        </Card>
      </div>

      <div className="p-6 space-y-6">
        {/* Agent Savings */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <PiggyBank className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{t.agentSavings}</h3>
              <p className="text-2xl font-bold text-green-600">₹{user.savings.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span>+12% vs last month</span>
          </div>
        </Card>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.quickActions}</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button className="h-20 gradient-primary text-white rounded-xl flex flex-col items-center justify-center space-y-2">
              <PiggyBank className="w-6 h-6" />
              <span className="text-sm font-medium">{t.saveMore}</span>
            </Button>
            <Button variant="outline" className="h-20 bg-white/80 border-2 border-gray-200 rounded-xl flex flex-col items-center justify-center space-y-2">
              <CreditCard className="w-6 h-6 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">{t.withdraw}</span>
            </Button>
            <Button variant="outline" className="h-20 bg-white/80 border-2 border-gray-200 rounded-xl flex flex-col items-center justify-center space-y-2">
              <Send className="w-6 h-6 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">{t.convert}</span>
            </Button>
            <Button variant="outline" className="h-20 bg-white/80 border-2 border-gray-200 rounded-xl flex flex-col items-center justify-center space-y-2">
              <TrendingUp className="w-6 h-6 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">{t.borrow}</span>
            </Button>
          </div>
        </div>

        {/* Recent Activity Preview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{t.recentActivity}</h3>
            <Button variant="ghost" size="sm" className="text-violet">
              {t.viewAll}
            </Button>
          </div>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-lg">💰</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Auto-saved from salary</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">+₹250</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
