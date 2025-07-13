
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Languages, Shield, CreditCard, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

const SettingsScreen = () => {
  const navigate = useNavigate();
  const { user, toggleLanguage } = useApp();

  const settingsOptions = [
    {
      icon: Languages,
      title: user.language === 'en' ? 'Language' : 'भाषा',
      subtitle: user.language === 'en' ? 'English' : 'हिंदी',
      action: toggleLanguage,
      type: 'toggle'
    },
    {
      icon: Shield,
      title: user.language === 'en' ? 'Security & Privacy' : 'सुरक्षा और गोपनीयता',
      subtitle: user.language === 'en' ? 'Aadhaar, PIN, Biometric' : 'आधार, पिन, बायोमेट्रिक',
      type: 'navigate'
    },
    {
      icon: CreditCard,
      title: user.language === 'en' ? 'Linked Accounts' : 'जुड़े खाते',
      subtitle: user.language === 'en' ? 'UPI, Bank accounts' : 'UPI, बैंक खाते',
      type: 'navigate'
    },
    {
      icon: Settings,
      title: user.language === 'en' ? 'Agent Settings' : 'एजेंट सेटिंग्स',
      subtitle: user.language === 'en' ? 'Auto-save rules, Goals' : 'ऑटो-सेव नियम, लक्ष्य',
      type: 'navigate'
    }
  ];

  const translations = {
    en: {
      settings: 'Settings',
      profile: 'Profile',
      kyc: 'KYC Verified',
      logout: 'Logout',
      version: 'Version 1.0.0'
    },
    hi: {
      settings: 'सेटिंग्स',
      profile: 'प्रोफ़ाइल',
      kyc: 'KYC सत्यापित',
      logout: 'लॉग आउट',
      version: 'संस्करण 1.0.0'
    }
  };

  const t = translations[user.language];

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
        <h1 className="text-xl font-semibold text-gray-900">{t.settings}</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {user.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">{t.kyc}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Button>
          </div>
        </Card>

        {/* Settings Options */}
        <div className="space-y-3">
          {settingsOptions.map((option, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <Button 
                variant="ghost" 
                className="w-full h-auto p-4 justify-start"
                onClick={option.action}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <option.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">{option.title}</p>
                    <p className="text-sm text-gray-600">{option.subtitle}</p>
                  </div>
                  {option.type === 'toggle' ? (
                    <Switch checked={user.language === 'hi'} />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </Button>
            </Card>
          ))}
        </div>

        {/* Agent Stats */}
        <Card className="gradient-primary p-6 text-white border-0 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            {user.language === 'en' ? 'Your Agent Stats' : 'आपके एजेंट आंकड़े'}
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">₹3,400</p>
              <p className="text-sm text-white/80">
                {user.language === 'en' ? 'Saved' : 'बचत'}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold">18</p>
              <p className="text-sm text-white/80">
                {user.language === 'en' ? 'Days Active' : 'दिन सक्रिय'}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold">6.2%</p>
              <p className="text-sm text-white/80">APY</p>
            </div>
          </div>
        </Card>

        {/* Support & About */}
        <div className="space-y-3">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <Button variant="ghost" className="w-full h-auto p-4 justify-start">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xl">💬</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">
                    {user.language === 'en' ? 'Help & Support' : 'सहायता और सहारा'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {user.language === 'en' ? 'Get help, report issues' : 'सहायता प्राप्त करें, समस्याओं की रिपोर्ट करें'}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Button>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <Button variant="ghost" className="w-full h-auto p-4 justify-start">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-xl">ℹ️</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">
                    {user.language === 'en' ? 'About Bharat Agent' : 'भारत एजेंट के बारे में'}
                  </p>
                  <p className="text-sm text-gray-600">{t.version}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Button>
          </Card>
        </div>

        {/* Logout */}
        <Button 
          variant="outline" 
          className="w-full h-14 border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-semibold"
          onClick={() => navigate('/')}
        >
          <LogOut className="w-5 h-5 mr-2" />
          {t.logout}
        </Button>
      </div>
    </div>
  );
};

export default SettingsScreen;
