
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

const TransactionFeed = () => {
  const navigate = useNavigate();
  const { transactions, user } = useApp();

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'save': return 'text-green-600';
      case 'earn': return 'text-blue-600';
      case 'withdraw': return 'text-red-600';
      case 'receive': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getTransactionBg = (type: string) => {
    switch (type) {
      case 'save': return 'bg-green-100';
      case 'earn': return 'bg-blue-100';
      case 'withdraw': return 'bg-red-100';
      case 'receive': return 'bg-purple-100';
      default: return 'bg-gray-100';
    }
  };

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
        <h1 className="text-xl font-semibold text-gray-900">Agent Timeline</h1>
        <Button variant="ghost" size="sm" className="text-gray-600">
          <Filter className="w-5 h-5" />
        </Button>
      </div>

      {/* Agent Summary */}
      <div className="p-6 pb-2">
        <Card className="gradient-primary p-6 text-white border-0 shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Your AI Agent at Work</h2>
            <p className="text-white/90 mb-4">
              I've been busy optimizing your finances! Here's what I did today:
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">₹250</p>
                <p className="text-sm text-white/80">Saved</p>
              </div>
              <div>
                <p className="text-2xl font-bold">₹1.2</p>
                <p className="text-sm text-white/80">Earned</p>
              </div>
              <div>
                <p className="text-2xl font-bold">6%</p>
                <p className="text-sm text-white/80">APY</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Transaction Timeline */}
      <div className="px-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        
        {transactions.map((transaction, index) => (
          <Card key={transaction.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-4 animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 ${getTransactionBg(transaction.type)} rounded-full flex items-center justify-center flex-shrink-0`}>
                <span className="text-xl">{transaction.icon}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900 mb-1">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatTime(transaction.timestamp)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                      {transaction.type === 'withdraw' ? '-' : '+'}₹{transaction.amount}
                    </p>
                  </div>
                </div>
                
                {/* Agent Explanation */}
                <div className="mt-3 bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-violet">Agent says:</span> {getAgentExplanation(transaction.type, transaction.amount)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {/* AI Chat Suggestion */}
        <Card className="bg-gradient-to-r from-violet-100 to-purple-100 border-0 shadow-lg p-4 mt-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-violet rounded-full flex items-center justify-center">
              <span className="text-white text-xl">🤖</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Want to know more?</p>
              <p className="text-sm text-gray-600">Ask me anything about your finances</p>
            </div>
            <Button 
              size="sm" 
              className="gradient-primary text-white"
              onClick={() => navigate('/chat')}
            >
              Chat
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

const getAgentExplanation = (type: string, amount: number) => {
  switch (type) {
    case 'save':
      return `I detected your salary and automatically saved ${amount} rupees (5% of income) to help you build wealth gradually.`;
    case 'earn':
      return `Your saved money earned ${amount} rupees in interest from our secure DeFi vault. This compounds daily!`;
    case 'receive':
      return `I noticed ${amount} rupees credited to your account. This looks like salary, so I'll start the auto-save process.`;
    case 'withdraw':
      return `You withdrew ${amount} rupees from your savings. Your remaining balance continues to earn interest.`;
    default:
      return 'Transaction processed successfully.';
  }
};

export default TransactionFeed;
