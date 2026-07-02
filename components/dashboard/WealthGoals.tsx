"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Target, 
  TrendingUp, 
  Plus, 
  Sparkles, 
  Trash2, 
  HelpCircle, 
  Info,
  DollarSign
} from "lucide-react";

interface SmartGoal {
  id: string;
  name: string;
  current: number;
  target: number;
  months: number;
}

interface WealthGoalsProps {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  setTransactions: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function WealthGoals({ balance, setBalance, setTransactions }: WealthGoalsProps) {
  // Goal Planner states
  const [goals, setGoals] = useState<SmartGoal[]>([
    { id: "1", name: "Tesla Purchase Fund", current: 3500000, target: 4000000, months: 12 },
    { id: "2", name: "Property Downpayment", current: 4000000, target: 10000000, months: 48 }
  ]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "500000",
    current: "50000",
    months: "12"
  });

  // Investment Planner states
  const [riskProfile, setRiskProfile] = useState<"Conservative" | "Moderate" | "Aggressive">("Moderate");
  const [sipAmount, setSipAmount] = useState(25000);
  const [sipDuration, setSipDuration] = useState(3); // years
  const [simulatedGrowth, setSimulatedGrowth] = useState<any | null>(null);

  // Add goal handler
  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.name.trim()) return;

    const goal: SmartGoal = {
      id: Math.random().toString(),
      name: newGoal.name,
      target: Number(newGoal.target),
      current: Number(newGoal.current),
      months: Number(newGoal.months)
    };

    setGoals(prev => [...prev, goal]);
    setShowAddGoal(false);
    setNewGoal({ name: "", target: "500000", current: "50000", months: "12" });

    // Deduct initial goal deposit from balance
    const deposit = Number(newGoal.current);
    if (deposit > 0 && balance >= deposit) {
      setBalance(prev => prev - deposit);
      setTransactions(prev => [
        {
          id: Math.random(),
          merchant: `${newGoal.name} Deposit`,
          category: "Transfer",
          amount: -deposit,
          date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: "Swept to Goal"
        },
        ...prev
      ]);
    }
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  // Simulate Yield Growth
  const handleSimulateSIP = () => {
    let rate = 0.055; // Conservative: 5.5%
    if (riskProfile === "Moderate") rate = 0.085; // Moderate: 8.5%
    if (riskProfile === "Aggressive") rate = 0.125; // Aggressive: 12.5%

    const monthlyRate = rate / 12;
    const months = sipDuration * 12;
    let totalInvested = sipAmount * months;
    
    // Future value of SIP formula
    let futureValue = sipAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    let profit = futureValue - totalInvested;

    setSimulatedGrowth({
      invested: totalInvested,
      estimated: futureValue,
      profit: profit,
      apy: rate * 100
    });
  };

  const getRiskRecommendations = () => {
    switch (riskProfile) {
      case "Conservative":
        return [
          { name: "Government Bond SIP", min: "₹5,000/mo", return: "5.2% APY", desc: "Low-risk government backing, secure yields." },
          { name: "Liquid Sweep Reserve", min: "₹2,500/mo", return: "4.8% APY", desc: "Instant accessibility with secure auto-sweep." }
        ];
      case "Aggressive":
        return [
          { name: "Quantum Technology Fund", min: "₹15,000/mo", return: "14.5% Est", desc: "High growth assets tracking tech sub-indexes." },
          { name: "Decentralized Liquidity Pool", min: "₹35,000/mo", return: "16.2% Est", desc: "Digital assets market-making pool with higher volatility." }
        ];
      default:
        return [
          { name: "Balanced Horizon Index Portfolio", min: "₹10,000/mo", return: "8.5% Est", desc: "Diversified index structure covering global equities." },
          { name: "Gold ETF Accumulation", min: "₹5,000/mo", return: "7.8% Est", desc: "Precious metal hedges swept during high volatility cycles." }
        ];
    }
  };

  const activeRecs = getRiskRecommendations();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full"
    >
      {/* Left panel: Goal Planner (Goal Planning Agent) */}
      <div className="lg:col-span-6 bg-slate-900/10 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
        <div className="absolute top-[-30%] left-[-10%] w-72 h-72 bg-gradient-to-br from-cyan-accent/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Target className="h-4.5 w-4.5 text-cyan-accent" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Goal Planner Agent</h4>
            </div>

            <button 
              onClick={() => setShowAddGoal(!showAddGoal)}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 text-[#020205] text-[9px] font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Plus className="h-3 w-3" /> New Goal
            </button>
          </div>

          {/* Add Goal Form Modal / Form */}
          <AnimatePresence>
            {showAddGoal && (
              <motion.form 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleAddGoal}
                className="bg-slate-950/60 border border-[#7C3AED]/20 rounded-2xl p-4 space-y-3 mb-4 overflow-hidden"
              >
                <div className="text-[10px] font-bold text-[#A78BFA] uppercase tracking-wider border-b border-white/5 pb-1.5 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> Initialize Smart Goal Vault
                </div>

                <div className="space-y-2">
                  <input 
                    type="text" 
                    placeholder="Goal Name (e.g. Europe Vacation)" 
                    value={newGoal.name}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-slate-900 border border-white/5 px-3 py-2 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-accent"
                    required
                  />
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[8px] font-bold text-slate-500 uppercase">Target (₹)</label>
                      <input 
                        type="number" 
                        value={newGoal.target}
                        onChange={(e) => setNewGoal(prev => ({ ...prev, target: e.target.value }))}
                        className="w-full bg-slate-900 border border-white/5 px-2.5 py-1.5 rounded-lg text-xs text-white focus:outline-none mt-0.5"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] font-bold text-slate-500 uppercase">Deposit (₹)</label>
                      <input 
                        type="number" 
                        value={newGoal.current}
                        onChange={(e) => setNewGoal(prev => ({ ...prev, current: e.target.value }))}
                        className="w-full bg-slate-900 border border-white/5 px-2.5 py-1.5 rounded-lg text-xs text-white focus:outline-none mt-0.5"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] font-bold text-slate-500 uppercase">Tenor (Mo)</label>
                      <input 
                        type="number" 
                        value={newGoal.months}
                        onChange={(e) => setNewGoal(prev => ({ ...prev, months: e.target.value }))}
                        className="w-full bg-slate-900 border border-white/5 px-2.5 py-1.5 rounded-lg text-xs text-white focus:outline-none mt-0.5"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-2 bg-white text-[#020205] text-[10px] font-bold rounded-xl shadow-md cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  Authorize Goal Sweep Account
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Goals List */}
          <div className="space-y-4">
            {goals.map((g) => {
              const progress = Math.min(100, Math.round((g.current / g.target) * 100));
              const monthlyRequired = Math.max(0, Math.round((g.target - g.current) / g.months));

              return (
                <div key={g.id} className="bg-slate-950/40 border border-white/5 rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="text-[11px] font-bold text-white">{g.name}</h5>
                      <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">Goal Sweep Node</span>
                    </div>
                    <button 
                      onClick={() => handleDeleteGoal(g.id)}
                      className="p-1 text-slate-600 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center text-[10px] mt-1">
                    <span className="text-slate-400">₹{g.current.toLocaleString('en-IN')} saved</span>
                    <span className="text-cyan-accent font-bold">{progress}%</span>
                  </div>

                  <div className="w-full bg-slate-900/60 border border-white/5 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-electric-blue to-cyan-accent rounded-full" 
                      style={{ width: `${progress}%` }} 
                    />
                  </div>

                  <div className="flex justify-between items-center text-[8px] text-slate-500 font-bold uppercase pt-1">
                    <span>Target: ₹{g.target.toLocaleString('en-IN')}</span>
                    <span className="text-[#A78BFA]">Sweep: ₹{monthlyRequired.toLocaleString('en-IN')}/mo needed</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-cyan-accent/5 border border-cyan-accent/15 rounded-2xl p-4 flex items-start gap-2.5">
          <Info className="h-4.5 w-4.5 text-cyan-accent shrink-0 mt-0.5" />
          <p className="text-[9px] text-slate-400 leading-normal">
            Our Goal Agent scans account balances and uses excess cash sweeps to auto-deposit into goal vaults without impacting daily buffers.
          </p>
        </div>
      </div>

      {/* Right panel: Investment Planner */}
      <div className="lg:col-span-6 bg-slate-900/10 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-72 h-72 bg-gradient-to-tr from-accent-purple/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div>
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-4 mb-4">
            <div className="p-1.5 bg-[#7C3AED]/20 border border-[#7C3AED]/30 rounded-lg">
              <TrendingUp className="h-4.5 w-4.5 text-[#A78BFA]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Investment Planner Agent</h4>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wide">Automated Asset Sweeps</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Risk Selection */}
            <div>
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Select Risk Appetite</label>
              <div className="grid grid-cols-3 gap-2 mt-1 bg-slate-950/60 p-1 border border-white/5 rounded-xl">
                {["Conservative", "Moderate", "Aggressive"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRiskProfile(r as any);
                      setSimulatedGrowth(null);
                    }}
                    className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      riskProfile === r 
                        ? "bg-white text-[#020205] shadow" 
                        : "text-slate-500 hover:text-white"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-2.5">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Recommended Portfolios</span>
              <div className="grid grid-cols-2 gap-4">
                {activeRecs.map((rec, i) => (
                  <div key={i} className="p-3 bg-slate-950/40 border border-white/5 rounded-2xl flex flex-col justify-between">
                    <div>
                      <h6 className="text-[10px] font-bold text-white">{rec.name}</h6>
                      <p className="text-[8px] text-slate-400 mt-1 leading-normal">{rec.desc}</p>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/5 pt-2 mt-3 text-[8px] font-bold uppercase">
                      <span className="text-slate-500">Min {rec.min}</span>
                      <span className="text-emerald-400">{rec.return}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SIP Yield Growth Calculator */}
            <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4 space-y-3">
              <span className="text-[9px] font-bold text-[#A78BFA] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" /> Compound Yield Simulator
              </span>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[8px] font-bold text-slate-500 uppercase">Monthly SIP (₹)</label>
                  <input 
                    type="number" 
                    value={sipAmount} 
                    onChange={(e) => setSipAmount(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-white/5 px-2.5 py-1.5 rounded-lg text-xs text-white focus:outline-none mt-0.5" 
                  />
                </div>
                <div>
                  <label className="text-[8px] font-bold text-slate-500 uppercase">Duration (Yrs)</label>
                  <select 
                    value={sipDuration} 
                    onChange={(e) => setSipDuration(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-white/5 px-2.5 py-1.5 rounded-lg text-xs text-white focus:outline-none mt-0.5"
                  >
                    <option value={1}>1 Year</option>
                    <option value={3}>3 Years</option>
                    <option value={5}>5 Years</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSimulateSIP}
                className="w-full py-2 bg-white text-[#020205] text-[10px] font-bold rounded-xl shadow-md hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Calculate Yield Projection
              </button>

              {simulatedGrowth && (
                <div className="border-t border-white/5 pt-3 mt-3 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[8px] text-slate-500 font-bold uppercase">Total Principal</span>
                    <h6 className="text-xs font-black text-slate-400">₹{Math.round(simulatedGrowth.invested).toLocaleString('en-IN')}</h6>
                  </div>
                  <div>
                    <span className="text-[8px] text-emerald-400 font-bold uppercase">Est. Portfolio Value ({simulatedGrowth.apy.toFixed(1)}% APY)</span>
                    <h6 className="text-xs font-black text-emerald-400">₹{Math.round(simulatedGrowth.estimated).toLocaleString('en-IN')}</h6>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}
