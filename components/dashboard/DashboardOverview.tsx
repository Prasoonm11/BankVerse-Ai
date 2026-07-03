"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  MoreHorizontal, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Search, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Bell, 
  Info,
  DollarSign
} from "lucide-react";

interface DashboardOverviewProps {
  balance: number;
  sweepReserve: number;
  smartYield: number;
  activeGoalsRate: number;
  transactions: any[];
  onApplyOptimization: (id: number) => void;
  appliedOptimizations: number[];
  isAutonomousMode: boolean;
  kycStatus: string;
}

export default function DashboardOverview({
  balance,
  sweepReserve,
  smartYield,
  activeGoalsRate,
  transactions,
  onApplyOptimization,
  appliedOptimizations,
  isAutonomousMode,
  kycStatus
}: DashboardOverviewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRecId, setExpandedRecId] = useState<number | null>(null);

  const recommendations = [
    {
      id: 1,
      title: "Optimize High-Yield Savings",
      desc: "Move ₹1,00,000 to partner bank with 5.2% APY. Yields +₹5,200/yr.",
      impact: "+₹5,200/yr",
      badge: "Finance Coach",
      type: "investment",
      reasoning: "Your liquid cash holdings (₹1,50,000) exceed your monthly buffer size (₹50,000) by 200%. Transferring ₹1,00,000 to partner High-Yield Savings Account (5.2% APY) maintains emergency accessibility while capturing premium yield rates vs default 0.1% APY."
    },
    {
      id: 2,
      title: "Automate Credit Card Reward",
      desc: "Activate 5% dining rewards for Chase Freedom. Automatic opt-in available.",
      impact: "5% Cashback",
      badge: "Rewards Optimizer",
      type: "rewards",
      reasoning: "Your card spending logs show dining purchases account for 38% of your overall monthly expenses. Chase Freedom is offering a promotional 5% cashback on dining. Activating this via the rewards agent will save you roughly ₹2,500 this quarter."
    },
    {
      id: 3,
      title: "Upcoming Subscription Alert",
      desc: "You have 2 overlapping cloud storage service bills. Cancel duplicate?",
      impact: "Save ₹299/mo",
      badge: "Finance Coach",
      type: "saving",
      reasoning: "The orchestrator detected a ₹199 monthly charge from Apple iCloud and a ₹299 charge from Google One. File synchronization patterns show 94% duplicate assets across accounts. Consolidated storage will trim ₹299/month with zero data loss."
    }
  ];

  const filteredTransactions = transactions.filter(t => 
    t.merchant.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Metrics Row (4 Columns Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch w-full border-b border-white/5 pb-8">
        
        {/* Column 1: Total Balance */}
        <div className="md:col-span-4 flex flex-col justify-between gap-4 bg-slate-900/20 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-24 h-24 bg-cyan-accent/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total balance</span>
            <div className="flex items-baseline gap-2 mt-1">
              <h4 className="text-4xl font-extrabold text-white tracking-tight">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h4>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                <TrendingUp className="h-2.5 w-2.5" /> +2.4%
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">KYC Onboarding: <span className="font-semibold text-cyan-accent capitalize">{kycStatus}</span></p>
          </div>

          <div className="flex items-center gap-2 mt-2 w-full">
            <button className="flex-1 py-2 bg-white hover:bg-slate-100 text-[#020205] text-[10px] font-bold rounded-full shadow-md flex items-center justify-center gap-1 cursor-pointer transition-all duration-300">
              Transfer <ArrowUpRight className="h-3 w-3" />
            </button>
            <button className="flex-1 py-2 bg-transparent border border-white/10 hover:border-white/20 text-white text-[10px] font-bold rounded-full flex items-center justify-center gap-1 cursor-pointer transition-all duration-300">
              Request <ArrowDownLeft className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Column 2: AI Sweep progress */}
        <div className="md:col-span-4 bg-slate-900/20 border border-white/5 rounded-3xl p-6 flex flex-col justify-between h-full relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-24 h-24 bg-accent-purple/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex flex-col">
            <h4 className="text-xl font-bold text-white">₹{sweepReserve.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h4>
            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" /> Goal Sweep Pool
            </span>
          </div>

          <div className="mt-4">
            <div className="w-full bg-slate-950/60 border border-white/5 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-electric-blue to-accent-purple rounded-full transition-all duration-500" 
                style={{ width: `${activeGoalsRate}%` }} 
              />
            </div>
            <p className="text-[8px] text-slate-500 font-bold uppercase mt-2">Vaults: {activeGoalsRate}% Funded</p>
          </div>
        </div>

        {/* Column 3: Yield Projection */}
        <div className="md:col-span-4 bg-slate-900/20 border border-white/5 rounded-3xl p-6 flex flex-col justify-between h-full relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-24 h-24 bg-electric-blue/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex flex-col">
            <h4 className="text-xl font-bold text-white">₹{smartYield.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h4>
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
                  className="w-1 bg-[#7C3AED]/70 hover:bg-[#A78BFA] rounded-full transition-all cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Main Split Grid (Recommendations vs Transactions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        
        {/* Left Section: Explainable Recommendations (Orchestrator) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[#A78BFA]" /> Coordinated AI Recommendations
            </h4>
            {isAutonomousMode && (
              <span className="text-[8px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                Auto-Sweep Active
              </span>
            )}
          </div>

          <div className="space-y-4">
            {recommendations.map((rec) => {
              const isApplied = appliedOptimizations.includes(rec.id);
              const isExpanded = expandedRecId === rec.id;

              return (
                <div 
                  key={rec.id} 
                  className={`p-5 bg-slate-900/30 border border-white/5 rounded-2xl transition-all duration-300 ${
                    isExpanded ? "border-[#7C3AED]/40 bg-slate-900/50 shadow-[0_0_20px_rgba(124,58,237,0.05)]" : "hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-cyan-accent bg-cyan-accent/10 border border-cyan-accent/15 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {rec.badge}
                      </span>
                      <span className="text-[9px] font-bold text-slate-500">Node ID: #{rec.id}03</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">{rec.impact}</span>
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

                  {/* Explainable AI block (Feature 24) */}
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
                      onClick={() => onApplyOptimization(rec.id)}
                      disabled={isApplied}
                      className={`w-full py-2 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isApplied 
                          ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
                          : "bg-white text-[#020205] hover:bg-slate-100 shadow-md"
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="h-3.5 w-3.5" /> Applied by Orchestrator
                        </>
                      ) : (
                        <>
                          Apply Optimization <ArrowRight className="h-3 w-3" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Section: Recent Transactions (Spending Analyzer) */}
        <div className="lg:col-span-5 bg-slate-900/10 border border-white/5 rounded-3xl p-6 space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" /> Transaction Ledger
            </span>
            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-3 w-3 text-slate-500" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter ledger..." 
                className="pl-8 pr-3 py-1 bg-slate-950/60 border border-white/5 rounded-full text-[10px] text-white focus:outline-none focus:border-[#7C3AED]/40 w-32" 
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-1">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => {
                let categoryColor = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
                if (tx.category === "Transfer" || tx.category === "Income") {
                  categoryColor = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
                } else if (tx.category === "Beauty" || tx.category === "Entertainment") {
                  categoryColor = "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20";
                } else if (tx.category === "Shopping") {
                  categoryColor = "bg-accent-purple/10 text-accent-purple/40 border border-accent-purple/20";
                }

                return (
                  <motion.div
                    key={tx.id}
                    layout
                    whileHover={{ x: 2, backgroundColor: "rgba(255,255,255,0.02)" }}
                    className="flex items-center justify-between py-2 px-2 border-b border-white/5 last:border-0 rounded-xl transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-slate-950/60 border border-white/5 flex items-center justify-center text-[10px] font-black text-slate-300">
                        {tx.merchant.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white">{tx.merchant}</span>
                          <span className={`text-[7px] font-bold border rounded-full px-1.5 py-0.2 uppercase tracking-wider ${categoryColor}`}>
                            {tx.category}
                          </span>
                        </div>
                        <p className="text-[8px] text-slate-500 mt-0.5">{tx.date} • {tx.status}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${tx.amount > 0 ? "text-emerald-400" : "text-white"}`}>
                        {tx.amount > 0 ? "+" : ""}₹{Math.abs(tx.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-8 text-xs text-slate-500">
                No matching ledger entries
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
