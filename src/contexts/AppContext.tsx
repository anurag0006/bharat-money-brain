
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  balance: number;
  savings: number;
  language: 'en' | 'hi';
  isKYCVerified: boolean;
}

interface Transaction {
  id: string;
  type: 'save' | 'earn' | 'withdraw' | 'receive';
  amount: number;
  description: string;
  timestamp: Date;
  icon: string;
}

interface AppContextType {
  user: User;
  transactions: Transaction[];
  updateUser: (updates: Partial<User>) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  toggleLanguage: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    name: 'Anjali',
    balance: 12500,
    savings: 3400,
    language: 'en',
    isKYCVerified: false,
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'save',
      amount: 250,
      description: 'Auto-saved from salary',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      icon: '💰'
    },
    {
      id: '2',
      type: 'earn',
      amount: 1.2,
      description: 'Interest earned on vault',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      icon: '📈'
    },
    {
      id: '3',
      type: 'receive',
      amount: 5000,
      description: 'Salary credited',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      icon: '💳'
    }
  ]);

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const toggleLanguage = () => {
    setUser(prev => ({
      ...prev,
      language: prev.language === 'en' ? 'hi' : 'en'
    }));
  };

  return (
    <AppContext.Provider value={{
      user,
      transactions,
      updateUser,
      addTransaction,
      toggleLanguage,
    }}>
      {children}
    </AppContext.Provider>
  );
};
