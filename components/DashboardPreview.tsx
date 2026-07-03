"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft,
  Sparkles, 
  Check, 
  ArrowRight,
  Search,
  Bell,
  Cpu,
  ChevronDown,
  ChevronUp,
  Info,
  Sun,
  LogOut
} from "lucide-react";

export default function DashboardPreview() {
  const [acceptedRecommendation, setAcceptedRecommendation] = useState<number[]>([]);
  const [expandedRecId, setExpandedRecId] = useState<number | null>(null);

  const handleAcceptRec = (id: number) => {
    if (acceptedRecommendation.includes(id)) return;
    setAcceptedRecommendation([...acceptedRecommendation, id]);
  };

  const recommendations = [
    {
      id: 1,
      title: "Optimize High-Yield Savings",
      desc: "Move ₹1,00,000 to partner bank with 5.2% APY. Yields +₹5,200/yr.",
      impact: "+₹5,200/yr",
      badge: "Finance Coach",
      type: "investment",
      reasoning: "Your liquid cash holdings (₹1,50,000) exceed your monthly buffer size (₹50,000) by 200%. Transferring ₹1,00,000 to partner High-Yield Savings Account (5.2% APY) maintains emergency accessibility while capturing premium yield rates."
    },
    {
      id: 2,
      title: "Automate Credit Card Reward",
      desc: "Activate 5% dining rewards for Chase Freedom. Automatic opt-in available.",
      impact: "5% Cashback",
      badge: "Rewards Optimizer",
      type: "rewards",
      reasoning: "Your card spending logs show dining purchases account for 38% of your overall monthly expenses. Chase Freedom is offering a promotional 5% cashback on dining. Activating this via the rewards agent will save you roughly ₹2,50,000 this quarter."
    },
    {
      id: 3,
      title: "Upcoming Subscription Alert",
      desc: "You have 2 overlapping cloud storage service bills. Cancel duplicate?",
      impact: "Save ₹299/mo",
      badge: "Finance Coach",
      type: "saving",
      reasoning: "Detected double-billing for Apple iCloud (200GB) and Google One (200GB). Consolidating onto a single provider will eliminate storage overlap without loss of user files, saving ₹299/month."
    }
  ];

  const transactions = [
    { id: 1, merchant: "Electricity & Wi-Fi", date: "Jun 18, 2026", amount: -4500.00, category: "Utilities", status: "Secured" },
    { id: 2, merchant: "Supermarket & Groceries", date: "Jun 10, 2026", amount: -12000.00, category: "Utilities", status: "Audited" },
    { id: 3, merchant: "HDFC Car Loan EMI", date: "Jun 05, 2026", amount: -15000.00, category: "Transfer", status: "AutoPaid" },
    { id: 4, merchant: "House Rent", date: "Jun 03, 2026", amount: -25000.00, category: "Utilities", status: "AutoPaid" },
    { id: 5, merchant: "Corporate Salary", date: "Jun 01, 2026", amount: 100000.00, category: "Income", status: "Deposited" },
    { id: 6, merchant: "Electricity & Wi-Fi", date: "May 18, 2026", amount: -4500.00, category: "Utilities", status: "Secured" },
  ];

  return (
    <section id="demo" className="relative py-32 bg-[#020205] overflow-hidden border-t border-white/5">
      {/* Glow Backdrops */}
      <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-electric-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10">
        
        {/* Header Title */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-accent/10 border border-cyan-accent/20 text-cyan-accent text-xs font-semibold uppercase tracking-wider mb-4">
            Interactive Portal
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Realistic Dashboard Preview
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg">
            Interact with the BankVerse AI platform mockup. Watch agents operating autonomously, review dynamic recommendations, and view cash flow predictions.
          </p>
        </div>

        {/* Mock Application Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full border border-white/10 rounded-[24px] bg-[#020205] backdrop-blur-2xl shadow-2xl shadow-black/80 overflow-hidden"
        >
          {/* Main App Layout */}
          <div className="flex flex-col min-h-[750px] w-full text-slate-100">
            
            {/* Top Header Navbar - Perfectly matching the uploaded screenshot */}
            <header className="flex items-center justify-between border-b border-white/5 px-6 py-4 bg-slate-950/40 w-full shrink-0">
              {/* Left Side: Logo */}
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-gradient-to-tr from-electric-blue to-cyan-accent rounded-xl shadow-lg flex items-center justify-center">
                  <Cpu className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-sm text-white tracking-tight flex items-center gap-1">
                  BankVerse <span className="text-[9px] text-cyan-accent bg-cyan-accent/10 px-1.5 py-0.5 rounded-full border border-cyan-accent/20 font-semibold">AI</span>
                </span>
              </div>

              {/* Center Navigation Tabs */}
              <div className="hidden lg:flex items-center gap-1.5 bg-white/5 border border-white/5 p-1 rounded-full">
                <span className="text-[10px] font-bold text-black bg-white px-3.5 py-1.5 rounded-full shadow-sm cursor-pointer">
                  Overview
                </span>
                <span className="text-[10px] font-medium text-slate-400 hover:text-white px-3 py-1.5 transition-colors cursor-pointer">
                  AI Assistant
                </span>
                <span className="text-[10px] font-medium text-slate-400 hover:text-white px-3 py-1.5 transition-colors cursor-pointer">
                  Financial Coach
                </span>
                <span className="text-[10px] font-medium text-slate-400 hover:text-white px-3 py-1.5 transition-colors cursor-pointer">
                  Digital Twin
                </span>
                <span className="text-[10px] font-medium text-slate-400 hover:text-white px-3 py-1.5 transition-colors cursor-pointer">
                  Wealth & Goals
                </span>
                <span className="text-[10px] font-medium text-slate-400 hover:text-white px-3 py-1.5 transition-colors cursor-pointer">
                  Loans & Credit
                </span>
                <span className="text-[10px] font-medium text-slate-400 hover:text-white px-3 py-1.5 transition-colors cursor-pointer">
                  Settings
                </span>
              </div>

              {/* Right Side: Quick Action Icons */}
              <div className="flex items-center gap-4">
                <button className="text-slate-400 hover:text-white transition-colors">
                  <Sun className="h-4 w-4" />
                </button>
                <button className="text-slate-400 hover:text-white transition-colors relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-cyan-accent animate-pulse" />
                </button>
                
                {/* PM Profile Initials */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-purple-500 bg-slate-900 text-purple-400 text-xs font-bold shadow-md cursor-pointer">
                  PM
                </div>

                <button className="text-slate-500 hover:text-red-400 transition-colors">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </header>

            {/* Inner Dashboard Body */}
            <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-8 bg-[#020205]">
              
              {/* Dashboard Greeting Header */}
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Welcome back, Prasoon Mathur 
                  <span className="text-[10px] font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Autonomous Mode Sweeps Active
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">Orchestrator online. Core bank nodes synchronized securely.</p>
              </div>

              {/* Metrics Row (3 Cards matching Dashboard) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch w-full">
                
                {/* Card 1: Total Balance */}
                <div className="md:col-span-4 flex flex-col justify-between gap-4 bg-slate-900/20 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                  <div className="absolute top-[-20%] right-[-10%] w-24 h-24 bg-cyan-accent/5 rounded-full blur-xl pointer-events-none" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total balance</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <h4 className="text-3xl font-extrabold text-white tracking-tight">₹3,50,000.00</h4>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                        <TrendingUp className="h-2.5 w-2.5" /> +2.4%
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">KYC Onboarding: <span className="font-semibold text-cyan-accent capitalize">Verified</span></p>
                  </div>

                  <div className="flex items-center gap-2 mt-2 w-full">
                    <button className="flex-1 py-2 bg-white text-[#020205] text-[10px] font-bold rounded-full shadow-md flex items-center justify-center gap-1 cursor-pointer hover:bg-slate-100 transition-colors">
                      Transfer <ArrowUpRight className="h-3 w-3" />
                    </button>
                    <button className="flex-1 py-2 bg-transparent border border-white/10 text-white text-[10px] font-bold rounded-full flex items-center justify-center gap-1 cursor-pointer hover:bg-white/5 transition-colors">
                      Request <ArrowDownLeft className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Card 2: Goal Sweep Pool */}
                <div className="md:col-span-4 bg-slate-900/20 border border-white/5 rounded-3xl p-6 flex flex-col justify-between h-full relative overflow-hidden">
                  <div className="absolute top-[-20%] right-[-10%] w-24 h-24 bg-accent-purple/5 rounded-full blur-xl pointer-events-none" />
                  <div className="flex flex-col bg-[#020205]/10">
                    <h4 className="text-2xl font-bold text-white">₹1,20,000.00</h4>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" /> Goal Sweep Pool
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="w-full bg-slate-950/60 border border-white/5 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-electric-blue to-accent-purple rounded-full transition-all duration-500" 
                        style={{ width: "40%" }} 
                      />
                    </div>
                    <p className="text-[8px] text-slate-500 font-bold uppercase mt-2">Vaults: 40% Funded</p>
                  </div>
                </div>

                {/* Card 3: Smart Yield APY */}
                <div className="md:col-span-4 bg-slate-900/20 border border-white/5 rounded-3xl p-6 flex flex-col justify-between h-full relative overflow-hidden">
                  <div className="absolute top-[-20%] right-[-10%] w-24 h-24 bg-electric-blue/5 rounded-full blur-xl pointer-events-none" />
                  <div className="flex flex-col">
                    <h4 className="text-2xl font-bold text-white">₹2,50,000.00</h4>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 5.2% Smart Yield APY
                    </span>
                  </div>

                  <div className="relative mt-4">
                    <div className="flex items-end justify-between h-10 w-full px-1">
                      {[40, 60, 45, 80, 50, 70, 90, 65, 85, 55, 75, 95, 60, 80].map((height, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.8, delay: i * 0.02 }}
                          className="w-1 bg-[#7C3AED]/70 hover:bg-[#A78BFA] rounded-full transition-all"
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Main Split Grid (Recommendations vs Transactions) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
                
                {/* Left Column: Coordinated Recommendations */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-[#A78BFA]" /> Coordinated AI Recommendations
                    </h4>
                    <span className="text-[8px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      Auto-Sweep Active
                    </span>
                  </div>

                  <div className="space-y-4">
                    {recommendations.map((rec) => {
                      const isApplied = acceptedRecommendation.includes(rec.id);
                      const isExpanded = expandedRecId === rec.id;
                      return (
                        <div 
                          key={rec.id} 
                          className={`p-5 bg-slate-900/30 border border-white/5 rounded-2xl transition-all duration-300 ${
                            isExpanded ? "border-[#7C3AED]/40 bg-slate-900/50" : "hover:border-white/10"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-bold text-cyan-accent bg-cyan-accent/10 border border-cyan-accent/15 px-2 py-0.5 rounded-md uppercase tracking-wider">
                                {rec.badge}
                              </span>
                              <span className="text-[9px] font-bold text-slate-500">Node ID: #{rec.id}03</span>
                            </div>
                            <span className="text-xs font-bold text-[#22D3EE]">{rec.impact}</span>
                          </div>

                          <div className="mt-3 flex items-start justify-between gap-4">
                            <div>
                              <h5 className="text-xs font-bold text-white flex items-center gap-1">{rec.title}</h5>
                              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{rec.desc}</p>
                            </div>
                            
                            <button 
                              onClick={() => setExpandedRecId(isExpanded ? null : rec.id)}
                              className="p-1 text-slate-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                              title="Explain Recommendation"
                            >
                              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </button>
                          </div>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden mt-3 border-t border-white/5 pt-3"
                              >
                                <div className="bg-slate-950/40 border border-[#7C3AED]/20 rounded-xl p-3 flex items-start gap-2.5">
                                  <Info className="h-4 w-4 text-[#A78BFA] shrink-0 mt-0.5" />
                                  <div className="text-[10px] text-slate-300 leading-normal">
                                    <span className="font-bold text-[#A78BFA] block mb-1">Explainable AI Node Reasoning</span>
                                    {rec.reasoning}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="mt-4">
                            <button
                              onClick={() => handleAcceptRec(rec.id)}
                              disabled={isApplied}
                              className={`w-full py-2.5 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                isApplied 
                                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
                                  : "bg-white text-[#020205] hover:bg-slate-100 shadow-md"
                              }`}
                            >
                               {isApplied ? (
                                 <>
                                   <Check className="h-3.5 w-3.5 text-emerald-500" /> Optimization Applied
                                 </>
                               ) : (
                                 <>
                                   Apply Optimization <ArrowRight className="h-3.5 w-3.5" />
                                 </>
                               )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Transaction Ledger */}
                <div className="lg:col-span-5 bg-slate-900/20 border border-white/5 rounded-3xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" /> Transaction Ledger
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-1">Audited and secured in real-time.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-bold bg-slate-800/60 text-slate-300 border border-slate-700/50">
                            {tx.merchant.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-white">{tx.merchant}</h5>
                            <span className="text-[9px] text-slate-500 flex items-center gap-1.5">
                              {tx.date} • <span className="text-cyan-accent/80 font-medium">{tx.status}</span>
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs font-bold ${tx.amount > 0 ? "text-emerald-400" : "text-white"}`}>
                            {tx.amount > 0 ? "+" : ""}₹{Math.abs(tx.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                          <p className="text-[8px] text-slate-500 mt-0.5 uppercase tracking-wider font-bold">{tx.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
