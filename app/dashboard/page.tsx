"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Bell, 
  LogOut, 
  Search, 
  Settings, 
  ChevronDown,
  Info,
  Sun,
  Moon
} from "lucide-react";

// Import custom dashboard tab components
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import AIAssistant from "@/components/dashboard/AIAssistant";
import OnboardingAdoption from "@/components/dashboard/OnboardingAdoption";
import FinancialCoach from "@/components/dashboard/FinancialCoach";
import DigitalTwinTab from "@/components/dashboard/DigitalTwinTab";
import WealthGoals from "@/components/dashboard/WealthGoals";
import LoanCalculator from "@/components/dashboard/LoanCalculator";

export default function DashboardPage() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("Overview");

  // Shared Account Balances & Ratios States
  const [balance, setBalance] = useState(350000.00);
  const [sweepReserve, setSweepReserve] = useState(120000.00);
  const [smartYield, setSmartYield] = useState(250000.00);
  const [activeGoalsRate, setActiveGoalsRate] = useState(40);
  
  // KYC & Service adoption metrics
  const [kycStatus, setKycStatus] = useState("verified"); // verified / none
  const [digitalAdoptionRate, setDigitalAdoptionRate] = useState(25); // percentage

  // System States
  const [isAutonomousMode, setIsAutonomousMode] = useState(true);
  const [appliedOptimizations, setAppliedOptimizations] = useState<number[]>([]);
  const [healthScore, setHealthScore] = useState(82);

  // Theme State
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme === "light" ? "theme-light" : "";
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme === "light" ? "theme-light" : "";
  };

  // Notification Inbox popover state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Unusual Spend Flagged", text: "Croma Electronics Bangalore, IN swipe flagged by Fraud Guardian.", type: "warning", read: false },
    { id: 2, title: "Promotional Cashback Nudge", text: "HDFC Card offers 5% cashback on dining. Activate now.", type: "info", read: false },
    { id: 3, title: "AutoPay Activation Credit", text: "Received ₹1,500 credit for utility autopay setup.", type: "success", read: true }
  ]);

  // Dynamic Transaction Generator for 2 Years
  const generateSampleTransactions = () => {
    const txs = [];
    let id = 1;

    // Big purchases dates & amounts
    const bigPurchases = [
      { date: "Oct 15, 2024", merchant: "Sony Center (Smart TV)", amount: -45000, category: "Shopping", status: "Verified" },
      { date: "Jan 12, 2025", merchant: "Apple Store (MacBook Pro)", amount: -65000, category: "Shopping", status: "Verified" },
      { date: "Sep 22, 2025", merchant: "Imagine Store (iPhone 16)", amount: -85000, category: "Shopping", status: "Rewards Applied" },
      { date: "Nov 08, 2025", merchant: "Tanishq Jewellers (Gold Necklace)", amount: -120000, category: "Shopping", status: "Secured" },
    ];

    for (let year = 2026; year >= 2024; year--) {
      const startMonth = (year === 2026) ? 5 : 11; // June (5) for 2026, Dec (11) for others
      const endMonth = (year === 2024) ? 6 : 0;    // July (6) for 2024, Jan (0) for others
      
      for (let month = startMonth; month >= endMonth; month--) {
        const actualMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthStr = actualMonthNames[month];
        
        // Salary (1st of month)
        txs.push({
          id: id++,
          merchant: "Corporate Salary",
          category: "Income",
          amount: 100000,
          date: `${monthStr} 01, ${year}`,
          status: "Deposited"
        });

        // House Rent (3rd of month)
        txs.push({
          id: id++,
          merchant: "House Rent",
          category: "Utilities",
          amount: -25000,
          date: `${monthStr} 03, ${year}`,
          status: "AutoPaid"
        });

        // Groceries & House Expenses (10th of month)
        txs.push({
          id: id++,
          merchant: "Supermarket & Groceries",
          category: "Utilities",
          amount: -12000,
          date: `${monthStr} 10, ${year}`,
          status: "Audited"
        });

        // Car EMI (5th of month)
        txs.push({
          id: id++,
          merchant: "HDFC Car Loan EMI",
          category: "Transfer",
          amount: -15000,
          date: `${monthStr} 05, ${year}`,
          status: "AutoPaid"
        });

        // Other monthly expenses: Internet & Electricity (18th of month)
        txs.push({
          id: id++,
          merchant: "Electricity & Wi-Fi",
          category: "Utilities",
          amount: -4500,
          date: `${monthStr} 18, ${year}`,
          status: "Secured"
        });
      }
    }

    bigPurchases.forEach(bp => {
      txs.push({
        id: id++,
        merchant: bp.merchant,
        category: bp.category,
        amount: bp.amount,
        date: bp.date,
        status: bp.status
      });
    });

    const parseDate = (dStr: string) => new Date(dStr).getTime();
    txs.sort((a, b) => parseDate(b.date) - parseDate(a.date));

    return txs;
  };

  // Transaction Ledger Database
  const [transactions, setTransactions] = useState(() => generateSampleTransactions());

  // Live Agent Timeline Logs (Feature 15)
  const [agentLogs, setAgentLogs] = useState([
    { time: "09:42 AM", agent: "Fraud Guardian", action: "Validated POS swipe at Croma Bangalore. Location matches user device." },
    { time: "08:15 AM", agent: "Rewards Optimizer", action: "Matched HDFC 5x points bonus on iPhone purchase." },
    { time: "07:00 AM", agent: "Finance Coach", action: "Triggered sweep of ₹25,000 surplus cash into high-yield asset pool." },
    { time: "Yesterday", agent: "Digital Twin", action: "Recalculated retirement plan. On track for age 54 (+3 months margin)." }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleApplyOptimization = (id: number) => {
    if (appliedOptimizations.includes(id)) return;
    setAppliedOptimizations([...appliedOptimizations, id]);
    
    if (id === 1) {
      setBalance(prev => prev - 100000);
      setSmartYield(prev => prev + 100000);
      setTransactions(prev => [
        {
          id: Math.random(),
          merchant: "Savings Optimization Sweep",
          category: "Transfer",
          amount: -100000.00,
          date: "Today",
          status: "Swept to Partner HYS"
        },
        ...prev
      ]);
      setAgentLogs(prev => [
        { time: "Just Now", agent: "Finance Coach", action: "Moved ₹1,00,000 surplus to High-Yield Savings Account. Projected +₹5,200/yr yields." },
        ...prev
      ]);
    } else if (id === 2) {
      setTransactions(prev => [
        {
          id: Math.random(),
          merchant: "HDFC Card Optimization",
          category: "Rewards",
          amount: 0.00,
          date: "Today",
          status: "5% dining promotion active"
        },
        ...prev
      ]);
      setAgentLogs(prev => [
        { time: "Just Now", agent: "Rewards Optimizer", action: "Authorized HDFC dining rewards sweep cycle." },
        ...prev
      ]);
    } else if (id === 3) {
      setBalance(prev => prev + 299);
      setTransactions(prev => [
        {
          id: Math.random(),
          merchant: "Duplicate Cloud Storage cancel",
          category: "Transfer",
          amount: 299.00,
          date: "Today",
          status: "Subscription Cancel Refunded"
        },
        ...prev
      ]);
      setAgentLogs(prev => [
        { time: "Just Now", agent: "Finance Coach", action: "Identified iCloud & Google storage overlap. Consolidated and saved ₹299/month." },
        ...prev
      ]);
    }
  };

  const handleLogout = () => {
    router.push("/");
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const renderTabContent = () => {
    switch (activeNav) {
      case "Overview":
        return (
          <DashboardOverview 
            balance={balance}
            sweepReserve={sweepReserve}
            smartYield={smartYield}
            activeGoalsRate={activeGoalsRate}
            transactions={transactions}
            onApplyOptimization={handleApplyOptimization}
            appliedOptimizations={appliedOptimizations}
            isAutonomousMode={isAutonomousMode}
            kycStatus={kycStatus}
            digitalAdoptionRate={digitalAdoptionRate}
          />
        );
      case "AI Assistant":
        return (
          <AIAssistant 
            onExecuteCommand={(cmd) => {
              if (cmd.includes("optimize") || cmd.includes("apply")) {
                handleApplyOptimization(1);
              }
            }}
            healthScore={healthScore}
          />
        );
      case "Adoption":
        return (
          <OnboardingAdoption 
            kycStatus={kycStatus}
            setKycStatus={setKycStatus}
            digitalAdoptionRate={digitalAdoptionRate}
            setDigitalAdoptionRate={setDigitalAdoptionRate}
            setBalance={setBalance}
            setTransactions={setTransactions}
          />
        );
      case "Financial Coach":
        return (
          <FinancialCoach 
            balance={balance}
            healthScore={healthScore}
            setHealthScore={setHealthScore}
            monthlyIncome={100000}
          />
        );
      case "Digital Twin":
        return (
          <DigitalTwinTab 
            initialIncome={100000}
            initialExpenses={56500}
          />
        );
      case "Wealth & Goals":
        return (
          <WealthGoals 
            balance={balance}
            setBalance={setBalance}
            setTransactions={setTransactions}
          />
        );
      case "Loans & Credit":
        return <LoanCalculator />;
      case "Settings":
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-slate-900/10 border border-white/5 rounded-3xl p-6 max-w-xl mx-auto space-y-6"
          >
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">System Settings Config</h4>
            <p className="text-[10px] text-slate-400">Manage autonomous sweeps, biometric secure credentials, and Orchestrator limits.</p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between p-4 bg-slate-950/60 border border-white/5 rounded-2xl">
                <div>
                  <h5 className="text-[11px] font-bold text-white">Autonomous Financial Sweeping</h5>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-normal">Allows the Orchestrator to sweep buffers into wealth portfolios.</p>
                </div>
                <button 
                  onClick={() => setIsAutonomousMode(!isAutonomousMode)}
                  className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors ${isAutonomousMode ? "bg-emerald-500" : "bg-slate-800"}`}
                >
                  <motion.div 
                    layout 
                    className="w-4 h-4 rounded-full bg-white" 
                    animate={{ x: isAutonomousMode ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              <div className="flex items-start gap-3 bg-white/5 border border-white/5 rounded-2xl p-4">
                <Info className="h-4.5 w-4.5 text-[#A78BFA] shrink-0 mt-0.5" />
                <div className="text-[10px] text-slate-400 leading-relaxed">
                  <span className="font-semibold text-slate-300 block mb-0.5">Secure Enclave Signature Active</span>
                  All sweep recommendations require local authorization code inputs, verified by multi-agent cryptographic auditing tokens.
                </div>
              </div>

              <button 
                onClick={handleLogout}
                className="w-full py-2.5 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <LogOut className="h-4 w-4" /> Sign Out Secure Session
              </button>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const navItems = [
    "Overview",
    "AI Assistant",
    "Adoption",
    "Financial Coach",
    "Digital Twin",
    "Wealth & Goals",
    "Loans & Credit",
    "Settings"
  ];

  return (
    <div className="min-h-screen w-screen bg-[#020205] text-slate-100 relative overflow-x-hidden overflow-y-auto select-none bg-gradient-to-br from-[#d9f99d]/6 via-[#020205] to-[#7c3aed]/8 flex flex-col">
      
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] left-[5%] w-[450px] h-[450px] bg-[#d9f99d]/4 rounded-full blur-[130px]" />
        <div className="absolute bottom-[5%] right-[5%] w-[500px] h-[500px] bg-[#7C3AED]/6 rounded-full blur-[140px]" />
        <div className="absolute inset-0 grid-pattern opacity-[0.04]" />
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex-1 flex flex-col gap-8 p-6 md:p-10 relative z-10"
      >
        
        {/* Top Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveNav("Overview")}>
            <div className="p-1.5 bg-[#7C3AED]/20 border border-[#7C3AED]/30 rounded-lg flex items-center justify-center">
              <Cpu className="h-4.5 w-4.5 text-[#A78BFA] shadow-[0_0_8px_rgba(167,139,250,0.4)]" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1">
              BankVerse <span className="text-[#A78BFA] text-[9px] font-bold bg-[#7C3AED]/10 px-1.5 py-0.5 rounded-full border border-[#7C3AED]/20">AI</span>
            </span>
          </div>

          {/* Navigation Pill scrollbar wrapper */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/5 p-1 rounded-full overflow-x-auto max-w-full scrollbar-none whitespace-nowrap">
            {navItems.map((item) => {
              const isActive = activeNav === item;
              return (
                <button
                  key={item}
                  onClick={() => setActiveNav(item)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? "bg-white text-[#020205] shadow-lg" 
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3 relative">
            {/* Theme Toggle Switch */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            {/* Smart Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications) markAllNotificationsRead();
                }}
                className={`p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors relative cursor-pointer ${showNotifications ? "bg-white/5 text-white" : ""}`}
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                )}
              </button>

              {/* Notification Popover Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-72 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-4 z-50 space-y-3"
                  >
                    <div className="flex justify-between items-center border-b border-white/5 pb-2 text-[10px] font-bold text-slate-500 uppercase">
                      <span>Proactive Notifications</span>
                      <button onClick={markAllNotificationsRead} className="text-cyan-accent normal-case hover:underline">Mark all read</button>
                    </div>

                    <div className="space-y-2.5 max-h-56 overflow-y-auto">
                      {notifications.map((n) => (
                        <div key={n.id} className="text-left space-y-0.5 border-b border-white/2 pb-2 last:border-0">
                          <div className="flex justify-between items-center">
                            <span className={`text-[9px] font-bold uppercase ${
                              n.type === "warning" ? "text-red-400" :
                              n.type === "success" ? "text-emerald-400" : "text-cyan-accent"
                            }`}>{n.title}</span>
                            {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent" />}
                          </div>
                          <p className="text-[10px] text-slate-400 leading-normal">{n.text}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex items-center gap-2 pl-2 border-l border-white/5 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA] p-[1.5px] shadow-[0_0_8px_rgba(167,139,250,0.3)]">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[10px] font-black text-white uppercase">
                  PM
                </div>
              </div>
            </div>

            <button 
              onClick={handleLogout}
              className="p-2 rounded-full text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* User Status Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Welcome back, Prasoon Mathur
              {isAutonomousMode && (
                <span className="text-[9px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full flex items-center gap-1 select-none align-middle h-fit mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Autonomous Mode Sweeps Active
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-400 mt-1">Orchestrator online. Core bank nodes synchronized securely.</p>
          </div>
        </div>

        {/* Active Tab rendering */}
        <div className="flex-1 min-h-0">
          <AnimatePresence mode="wait">
            {renderTabContent()}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}
