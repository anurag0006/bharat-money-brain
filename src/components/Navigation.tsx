
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Activity, PiggyBank, Send, MessageCircle, Settings } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show navigation on onboarding and KYC screens
  if (location.pathname === '/' || location.pathname === '/kyc') {
    return null;
  }

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/transactions', icon: Activity, label: 'Activity' },
    { path: '/vault', icon: PiggyBank, label: 'Vault' },
    { path: '/remittance', icon: Send, label: 'Send' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 px-4 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center space-y-1 p-2 min-w-0 h-auto ${
                isActive 
                  ? 'text-violet bg-violet/10' 
                  : 'text-gray-600 hover:text-violet hover:bg-violet/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
