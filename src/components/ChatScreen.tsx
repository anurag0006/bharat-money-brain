
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

const ChatScreen = () => {
  const navigate = useNavigate();
  const { user } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: `Hello ${user.name}! I'm your Bharat Agent. I've been managing your finances automatically. You currently have ₹${user.savings.toLocaleString()} saved and earning 6.2% APY. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    'How much did I save last month?',
    'What is my current APY?',
    'Enable tax saving vault',
    'Set savings goal for 2024'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const agentResponse = generateAgentResponse(content.trim());
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: agentResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAgentResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('save') && input.includes('month')) {
      return `Last month, I helped you save ₹850! Here's the breakdown:\n\n• Auto-saved ₹250 from your salary (5%)\n• Round-up savings: ₹125\n• Smart bill optimization: ₹200\n• Investment returns: ₹275\n\nThat's 12% more than the previous month! 🎉`;
    }
    
    if (input.includes('apy') || input.includes('interest')) {
      return `Your current APY is 6.2%! This means:\n\n• Daily interest: ~₹0.58\n• Monthly projected: ~₹17.50\n• Annual projected: ~₹210\n\nYour funds are invested in Aave protocol on Polygon zkEVM for maximum security and yield.`;
    }
    
    if (input.includes('tax')) {
      return `Great idea! I can set up a tax-saving vault under Section 80C:\n\n• Lock-in period: 3 years\n• Higher APY: 8.5%\n• Tax benefit: Up to ₹1.5L deduction\n• Auto-invest from salary: Available\n\nShould I create this vault for you?`;
    }
    
    if (input.includes('goal')) {
      return `Let's set your 2024 savings goal! Based on your income pattern:\n\n• Recommended goal: ₹50,000\n• Monthly target: ₹4,167\n• Current pace: ₹3,400/month\n\nI can increase your auto-save rate to 8% to hit this target. Would you like me to do that?`;
    }
    
    if (input.includes('how') || input.includes('what')) {
      return `I'm analyzing your UPI transactions in real-time and making smart financial decisions:\n\n• Income detection: Automatic\n• Savings rate: 5-10% of income\n• Investment strategy: Conservative DeFi\n• Bill optimization: AI-powered\n\nEverything is secure, transparent, and in your control. What specific aspect would you like to know more about?`;
    }
    
    return `I understand you're asking about "${userInput}". As your AI financial agent, I'm here to help optimize your money management. I can explain any transaction, adjust your savings strategy, or help you plan for financial goals. What specific information would you like?`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pt-12 bg-white/80 backdrop-blur-sm border-b">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/dashboard')}
          className="text-gray-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900">Bharat Agent</h1>
          <p className="text-sm text-green-600">Online • Always learning</p>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.type === 'user' 
                ? 'bg-violet text-white' 
                : 'bg-gradient-to-r from-gold to-yellow-500 text-white'
            }`}>
              {message.type === 'user' ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>
            
            <Card className={`max-w-[80%] p-4 ${
              message.type === 'user'
                ? 'bg-violet text-white border-0'
                : 'bg-white/80 backdrop-blur-sm border-0 shadow-lg'
            }`}>
              <p className="text-sm whitespace-pre-line">{message.content}</p>
              <p className={`text-xs mt-2 ${
                message.type === 'user' ? 'text-white/70' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </Card>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-gold to-yellow-500 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
              </div>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-4">
          <p className="text-sm text-gray-600 mb-3">Quick questions:</p>
          <div className="grid grid-cols-1 gap-2">
            {quickSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage(suggestion)}
                className="text-left justify-start h-auto p-3 bg-white/80 border border-gray-200 text-gray-700 hover:bg-violet/10"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t">
        <div className="flex items-center space-x-3">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything about your finances..."
            className="flex-1 rounded-full bg-white border-gray-200"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(inputMessage);
              }
            }}
          />
          <Button
            onClick={() => handleSendMessage(inputMessage)}
            size="sm"
            className="rounded-full w-10 h-10 p-0 gradient-primary text-white"
            disabled={!inputMessage.trim() || isTyping}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
