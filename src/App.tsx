
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import OnboardingScreen from "./components/OnboardingScreen";
import KYCScreen from "./components/KYCScreen";
import Dashboard from "./components/Dashboard";
import TransactionFeed from "./components/TransactionFeed";
import VaultScreen from "./components/VaultScreen";
import RemittanceScreen from "./components/RemittanceScreen";
import ChatScreen from "./components/ChatScreen";
import SettingsScreen from "./components/SettingsScreen";
import Navigation from "./components/Navigation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50">
            <Routes>
              <Route path="/" element={<OnboardingScreen />} />
              <Route path="/kyc" element={<KYCScreen />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<TransactionFeed />} />
              <Route path="/vault" element={<VaultScreen />} />
              <Route path="/remittance" element={<RemittanceScreen />} />
              <Route path="/chat" element={<ChatScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
            </Routes>
            <Navigation />
          </div>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
