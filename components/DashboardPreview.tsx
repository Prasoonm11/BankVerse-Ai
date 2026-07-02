"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight, 
  Sparkles, 
  ShieldAlert, 
  Zap, 
  Check, 
  ArrowRight,
  User,
  Search,
  Bell,
  CreditCard,
  Target,
  Clock,
  ChevronRight,
  Filter,
  Cpu
} from "lucide-react";

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("all");
  const [acceptedRecommendation, setAcceptedRecommendation] = useState<number[]>([]);

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
      type: "investment"
    },
    {
      id: 2,
      title: "Automate Credit Card Reward",
      desc: "Activate 5% dining rewards for Chase Freedom. Automatic opt-in available.",
      impact: "5% Cashback",
      badge: "Rewards Optimizer",
      type: "rewards"
    },
    {
      id: 3,
      title: "Upcoming Subscription Alert",
      desc: "You have 2 overlapping cloud storage service bills. Cancel duplicate?",
      impact: "Save ₹299/mo",
      badge: "Finance Coach",
      type: "saving"
    }
  ];

  const transactions = [
    { id: 1, merchant: "Imagine Store", date: "Jun 26, 2026", amount: -85000.00, category: "Shopping", status: "Secured by Guard" },
    { id: 2, merchant: "Corporate Salary", date: "Jun 25, 2026", amount: 100000.00, category: "Salary", status: "Deposited" },
    { id: 3, merchant: "Tanishq Jewellers", date: "Jun 24, 2026", amount: -120000.00, category: "Shopping", status: "Rewards Applied" },
    { id: 4, merchant: "House Rent", date: "Jun 23, 2026", amount: -25000.00, category: "Utilities", status: "Audited" },
    { id: 5, merchant: "HDFC Car Loan", date: "Jun 22, 2026", amount: -15000.00, category: "Transfer", status: "Secured by Guard" },
  ];

  const agentLogs = [
    { time: "09:42 AM", agent: "Fraud Guardian", action: "Validated POS swipe at Chevron. Location matches user device." },
    { time: "08:15 AM", agent: "Rewards Optimizer", action: "Matched Chase Sapphire 3x points bonus on Apple purchase." },
    { time: "07:00 AM", agent: "Finance Coach", action: "Triggered sweep of ₹25,000 surplus cash into high-yield asset pool." },
    { time: "Yesterday", agent: "Digital Twin", action: "Recalculated retirement plan. On track for age 54 (+3 months margin)." }
  ];

  return (
    <section id="demo" className="relative py-32 bg-navy-bg overflow-hidden border-t border-white/5">
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
          className="w-full border border-white/10 rounded-[24px] bg-slate-950/60 backdrop-blur-2xl shadow-2xl shadow-black/80 overflow-hidden"
        >
          {/* Main App Layout */}
          <div className="grid grid-cols-12 min-h-[750px]">
            
            {/* Sidebar Mockup - Hidden on Mobile */}
            <div className="hidden lg:col-span-2 lg:flex flex-col justify-between border-r border-white/5 p-6 bg-slate-950/50">
              <div className="flex flex-col gap-8">
                {/* Logo */}
                <div className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-cyan-accent" />
                  <span className="font-bold text-sm text-white tracking-tight">BankVerse</span>
                </div>

                {/* Nav items */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest pl-2 mb-1">Navigation</span>
                  <a href="#demo" className="text-xs font-semibold text-white bg-white/5 border border-white/5 px-3 py-2 rounded-xl flex items-center gap-2">
                    <CreditCard className="h-3.5 w-3.5 text-cyan-accent" /> Dashboard
                  </a>
                  <a href="#demo" className="text-xs font-medium text-slate-400 hover:text-white px-3 py-2 rounded-xl flex items-center gap-2 transition-colors">
                    <Target className="h-3.5 w-3.5" /> Goals
                  </a>
                  <a href="#demo" className="text-xs font-medium text-slate-400 hover:text-white px-3 py-2 rounded-xl flex items-center gap-2 transition-colors">
                    <Sparkles className="h-3.5 w-3.5" /> AI Coach
                  </a>
                  <a href="#demo" className="text-xs font-medium text-slate-400 hover:text-white px-3 py-2 rounded-xl flex items-center gap-2 transition-colors">
                    <Clock className="h-3.5 w-3.5" /> Agent Logs
                  </a>
                </div>
              </div>

              {/* Bottom user profile card */}
              <div className="flex items-center gap-3 bg-white/5 border border-white/5 p-3 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-electric-blue flex items-center justify-center font-bold text-xs text-white">
                  PM
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-[11px] font-bold text-white truncate">Prasoon Mathur</h4>
                  <p className="text-[9px] text-slate-400 truncate">Premium tier active</p>
                </div>
              </div>
            </div>

            {/* Main Application Area */}
            <div className="col-span-12 lg:col-span-10 flex flex-col">
              
              {/* Header inside App */}
              <div className="flex items-center justify-between border-b border-white/5 px-6 py-4 bg-slate-950/20">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Welcome back, Prasoon Mathur 
                    <span className="text-[10px] font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Autonomous Mode
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Your financial twin is syncing. Next run in 12m.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                    <input type="text" placeholder="Search insights..." className="pl-9 pr-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-accent/50 w-48" />
                  </div>
                  <button className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-300 hover:text-white flex items-center justify-center">
                    <Bell className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Inner Dashboard Body */}
              <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-8">
                
                {/* Metrics Row (4 Cards) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Financial Health Score */}
                  <div className="bg-slate-900/30 border border-white/5 p-5 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500">Autonomous Health</span>
                      <h4 className="text-2xl font-black text-white mt-1">94<span className="text-xs font-normal text-slate-400">/100</span></h4>
                      <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-0.5">
                        <TrendingUp className="h-3 w-3" /> +2% this month
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-cyan-accent border-r-transparent flex items-center justify-center text-[10px] font-bold text-cyan-accent rotate-45">
                      <span className="-rotate-45">94%</span>
                    </div>
                  </div>

                  {/* Savings */}
                  <div className="bg-slate-900/30 border border-white/5 p-5 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500">Total Balance</span>
                      <h4 className="text-2xl font-black text-white mt-1">₹3,50,000</h4>
                      <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-0.5">
                        <TrendingUp className="h-3 w-3" /> +₹10,500 interest
                      </p>
                    </div>
                    <div className="p-3 bg-cyan-accent/5 rounded-xl border border-cyan-accent/15 text-cyan-accent">
                      <CreditCard className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Monthly Income */}
                  <div className="bg-slate-900/30 border border-white/5 p-5 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500">Monthly Income</span>
                      <h4 className="text-2xl font-black text-white mt-1">₹1,00,000</h4>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Salary direct deposit active
                      </p>
                    </div>
                    <div className="p-3 bg-electric-blue/5 rounded-xl border border-electric-blue/15 text-electric-blue">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Upcoming EMI */}
                  <div className="bg-slate-900/30 border border-white/5 p-5 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500">Upcoming EMI</span>
                      <h4 className="text-2xl font-black text-white mt-1">₹15,000</h4>
                      <p className="text-[10px] text-amber-400 mt-1">
                        Auto-reserved by Goal Agent
                      </p>
                    </div>
                    <div className="p-3 bg-amber-400/5 rounded-xl border border-amber-400/15 text-amber-400">
                      <ShieldAlert className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* Dashboard Grid (Main Graph + Sub Modules) */}
                <div className="grid grid-cols-12 gap-6">
                  
                  {/* Left Column (Main Graph & Transactions) */}
                  <div className="col-span-12 lg:col-span-8 space-y-6">
                    {/* SVG Chart Container */}
                    <div className="bg-slate-900/20 border border-white/5 rounded-3xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="text-base font-bold text-white">Cash Flow Analytics</h4>
                          <p className="text-xs text-slate-400">Comparing income, savings, and investments.</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-[10px] font-semibold text-cyan-accent bg-cyan-accent/10 px-2.5 py-1 rounded-lg border border-cyan-accent/20">Monthly</span>
                          <span className="text-[10px] font-semibold text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">Yearly</span>
                        </div>
                      </div>

                      {/* SVG custom styled chart */}
                      <div className="h-64 w-full">
                        <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="glowSavings" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="glowExpenses" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                            </linearGradient>
                          </defs>

                          {/* Grid lines */}
                          <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                          <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                          <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                          {/* Area representing Savings Growth */}
                          <path d="M0,160 C50,140 100,120 150,105 C200,90 250,85 300,70 C350,55 400,38 450,22 L500,15 L500,200 L0,200 Z" fill="url(#glowSavings)" />
                          {/* Line representing Savings Growth */}
                          <path d="M0,160 C50,140 100,120 150,105 C200,90 250,85 300,70 C350,55 400,38 450,22 L500,15" fill="none" stroke="#22D3EE" strokeWidth="3" />

                          {/* Area representing Expenses */}
                          <path d="M0,185 C50,180 100,175 150,168 C200,160 250,162 300,150 C350,138 400,145 450,130 L500,125 L500,200 L0,200 Z" fill="url(#glowExpenses)" />
                          {/* Line representing Expenses */}
                          <path d="M0,185 C50,180 100,175 150,168 C200,160 250,162 300,150 C350,138 400,145 450,130 L500,125" fill="none" stroke="#7C3AED" strokeWidth="2" strokeDasharray="3 3" />

                          {/* Labels */}
                          <text x="10" y="195" fill="rgba(255,255,255,0.3)" fontSize="8">Jan</text>
                          <text x="110" y="195" fill="rgba(255,255,255,0.3)" fontSize="8">Feb</text>
                          <text x="210" y="195" fill="rgba(255,255,255,0.3)" fontSize="8">Mar</text>
                          <text x="310" y="195" fill="rgba(255,255,255,0.3)" fontSize="8">Apr</text>
                          <text x="410" y="195" fill="rgba(255,255,255,0.3)" fontSize="8">May</text>
                          <text x="475" y="195" fill="rgba(255,255,255,0.3)" fontSize="8">Jun</text>
                        </svg>
                      </div>

                      <div className="flex gap-6 mt-4 pl-2 justify-center">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-accent" />
                          <span className="text-[10px] text-slate-300 font-medium">Income & Savings (Active Modeling)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-accent-purple" />
                          <span className="text-[10px] text-slate-300 font-medium">Monthly Living Expenses</span>
                        </div>
                      </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-slate-900/20 border border-white/5 rounded-3xl p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h4 className="text-base font-bold text-white">Recent Transactions</h4>
                          <p className="text-xs text-slate-400">Audited and secured in real-time.</p>
                        </div>
                        <button className="flex items-center gap-1.5 text-xs text-cyan-accent font-semibold hover:underline">
                          View all <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        {transactions.map((tx) => (
                          <div key={tx.id} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${
                                tx.amount > 0 
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                  : "bg-slate-800 text-slate-300 border border-slate-700/50"
                              }`}>
                                {tx.merchant.slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-white">{tx.merchant}</h5>
                                <span className="text-[10px] text-slate-500 flex items-center gap-1.5">
                                  {tx.date} • <span className="text-cyan-accent/80 font-medium">{tx.status}</span>
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`text-xs font-bold ${tx.amount > 0 ? "text-emerald-400" : "text-white"}`}>
                                {tx.amount > 0 ? "+" : ""}₹{Math.abs(tx.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                              </span>
                              <p className="text-[9px] text-slate-500 mt-0.5">{tx.category}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Goals, AI Recommendations, Timeline) */}
                  <div className="col-span-12 lg:col-span-4 space-y-6">
                    
                    {/* Goal Progress */}
                    <div className="bg-slate-900/20 border border-white/5 rounded-3xl p-6">
                      <h4 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                        <Target className="h-4 w-4 text-cyan-accent" /> Active Goals
                      </h4>

                      <div className="space-y-5">
                        {/* Tesla */}
                        <div>
                          <div className="flex justify-between items-center mb-1.5">
                             <span className="text-xs font-bold text-white">Tesla Purchase Fund</span>
                             <span className="text-xs font-semibold text-cyan-accent">87%</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-electric-blue to-cyan-accent h-full rounded-full" style={{ width: "87%" }} />
                          </div>
                          <div className="flex justify-between items-center text-[9px] text-slate-500 mt-1">
                             <span>₹35,00000 saved</span>
                             <span>Target: ₹40,00000</span>
                          </div>
                        </div>

                        {/* House */}
                        <div>
                          <div className="flex justify-between items-center mb-1.5">
                             <span className="text-xs font-bold text-white">Property Downpayment</span>
                             <span className="text-xs font-semibold text-accent-purple">40%</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-electric-blue to-accent-purple h-full rounded-full" style={{ width: "40%" }} />
                          </div>
                          <div className="flex justify-between items-center text-[9px] text-slate-500 mt-1">
                             <span>₹40,00000 saved</span>
                             <span>Target: ₹10,000000</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Recommendations */}
                    <div className="bg-slate-900/20 border border-white/5 rounded-3xl p-6">
                      <h4 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-cyan-accent" /> AI Insights & Swaps
                      </h4>

                      <div className="space-y-4">
                        {recommendations.map((rec) => {
                          const isDone = acceptedRecommendation.includes(rec.id);
                          return (
                            <div key={rec.id} className="p-4 bg-slate-900/40 border border-white/5 rounded-2xl space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] font-bold text-cyan-accent bg-cyan-accent/10 border border-cyan-accent/15 px-2 py-0.5 rounded-md uppercase tracking-wider">
                                  {rec.badge}
                                </span>
                                <span className="text-[10px] font-bold text-emerald-400">{rec.impact}</span>
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-white">{rec.title}</h5>
                                <p className="text-[10px] text-slate-400 mt-1 leading-normal">{rec.desc}</p>
                              </div>
                              <button
                                onClick={() => handleAcceptRec(rec.id)}
                                className={`w-full py-2 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 ${
                                  isDone 
                                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
                                    : "bg-gradient-to-r from-electric-blue to-cyan-accent text-white hover:opacity-90"
                                }`}
                              >
                                {isDone ? (
                                  <>
                                    <Check className="h-3 w-3" /> Transferred & Done
                                  </>
                                ) : (
                                  <>
                                    Apply Optimization <ArrowRight className="h-3 w-3" />
                                  </>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Live Agent Timeline */}
                    <div className="bg-slate-900/20 border border-white/5 rounded-3xl p-6">
                      <h4 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-cyan-accent" /> Live Agent Timeline
                      </h4>

                      <div className="relative pl-4 border-l border-white/5 space-y-5">
                        {agentLogs.map((log, idx) => (
                          <div key={idx} className="relative">
                            <span className="absolute -left-[20.5px] top-1 w-2.5 h-2.5 rounded-full bg-cyan-accent border-2 border-slate-950" />
                            <div className="flex justify-between items-center">
                              <span className="text-[9px] font-bold text-cyan-accent uppercase">{log.agent}</span>
                              <span className="text-[9px] text-slate-500">{log.time}</span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1 leading-normal">{log.action}</p>
                          </div>
                        ))}
                      </div>
                    </div>

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
