"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Sparkles, 
  ShieldAlert, 
  Award, 
  Plus, 
  Sliders, 
  ChevronRight, 
  Info,
  DollarSign,
  CheckCircle2
} from "lucide-react";

interface FinancialCoachProps {
  balance: number;
  healthScore: number;
  setHealthScore: (score: number) => void;
  monthlyIncome: number;
}

export default function FinancialCoach({
  balance,
  healthScore,
  setHealthScore,
  monthlyIncome
}: FinancialCoachProps) {
  // Category Budget limits
  const [budgets, setBudgets] = useState({
    food: 15000,
    shopping: 15000,
    travel: 12000,
    entertainment: 8000,
    healthcare: 5000,
    utilities: 30000
  });

  // Current spending (constant values or modified)
  const currentSpending = {
    food: 12000,
    shopping: 20000, // Overspent
    travel: 10500,
    entertainment: 9500, // Overspent
    healthcare: 2500,
    utilities: 29500
  };

  // Compute total spending
  const totalSpend = Object.values(currentSpending).reduce((a, b) => a + b, 0);
  const totalBudget = Object.values(budgets).reduce((a, b) => a + b, 0);

  // Compute emergency savings
  const emergencySavings = 150000;
  const monthlyExpenses = totalSpend;
  const idealEmergencyFund = monthlyExpenses * 6; // 6 months buffer
  const emergencyShortfall = Math.max(0, idealEmergencyFund - emergencySavings);

  // Dynamically recalculate health score based on budgets, overspending, and income ratios
  useEffect(() => {
    // 1. Overspend penalty
    let overspendCount = 0;
    let overspentAmount = 0;
    Object.keys(currentSpending).forEach((category) => {
      const spend = currentSpending[category as keyof typeof currentSpending];
      const budget = budgets[category as keyof typeof budgets];
      if (spend > budget) {
        overspendCount++;
        overspentAmount += (spend - budget);
      }
    });

    // 2. Savings rate ratio
    const monthlySurplus = monthlyIncome - totalSpend;
    const savingsRate = monthlyIncome > 0 ? (monthlySurplus / monthlyIncome) : 0;

    // Base score calculation
    let score = 85;

    // Savings rate modifier
    if (savingsRate > 0.3) score += 5;
    else if (savingsRate < 0.1) score -= 15;

    // Overspending penalty
    score -= (overspendCount * 6);
    score -= Math.min(20, Math.floor(overspentAmount / 30));

    // Emergency shortfall penalty
    if (emergencyShortfall > 150000) score -= 8;
    else if (emergencyShortfall > 50000) score -= 4;

    const finalScore = Math.min(99, Math.max(25, Math.round(score)));
    setHealthScore(finalScore);
  }, [budgets, monthlyIncome, totalSpend, emergencyShortfall]);

  const handleBudgetChange = (category: string, value: number) => {
    setBudgets(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const getScoreColor = (score: number) => {
    if (score > 80) return "text-emerald-400 border-emerald-500/20";
    if (score > 60) return "text-cyan-accent border-cyan-accent/20";
    if (score > 40) return "text-amber-400 border-amber-500/20";
    return "text-red-400 border-red-500/20";
  };

  const budgetCategories = [
    { id: "food", label: "Food & Dining", color: "bg-emerald-500" },
    { id: "shopping", label: "Shopping", color: "bg-[#7C3AED]" },
    { id: "travel", label: "Travel & Commute", color: "bg-blue-500" },
    { id: "entertainment", label: "Entertainment", color: "bg-pink-500" },
    { id: "healthcare", label: "Healthcare", color: "bg-cyan-accent" },
    { id: "utilities", label: "Utilities & Subscriptions", color: "bg-amber-500" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full"
    >
      {/* Left panel: Health Score & Emergency Advisor */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-6">
        
        {/* Financial Health Score (Feature 16) */}
        <div className="bg-slate-900/10 border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-[-30%] right-[-10%] w-56 h-56 bg-gradient-to-tr from-cyan-accent/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
          
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">Health Score Node</span>
          
          {/* Gauge display */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
              <motion.circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="transparent" 
                stroke={healthScore > 80 ? "#10B981" : healthScore > 60 ? "#22D3EE" : healthScore > 40 ? "#F59E0B" : "#EF4444"} 
                strokeWidth="8" 
                strokeDasharray="251.2"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 - (251.2 * healthScore) / 100 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-white">{healthScore}</span>
              <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">Health Index</span>
            </div>
          </div>

          <h5 className="text-sm font-bold text-white mt-4 uppercase">
            {healthScore > 80 ? "Premium Standing" : healthScore > 60 ? "Secure Standing" : "Risk Advisory"}
          </h5>
          <p className="text-[10px] text-slate-400 max-w-[240px] mt-1 leading-normal">
            Your score updates dynamically as you adjust the budget planners and savings profiles.
          </p>
        </div>

        {/* Emergency Fund Advisor (Feature 22) */}
        <div className="bg-slate-900/10 border border-white/5 rounded-3xl p-6 space-y-4">
          <h5 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase">
            <Award className="h-4 w-4 text-cyan-accent" /> Emergency Fund Advisor
          </h5>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px] text-slate-400">
              <span>Avg. Monthly Expenses</span>
              <span className="font-semibold text-white">₹{totalSpend.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400">
              <span>Recommended Reserve (6mo)</span>
              <span className="font-semibold text-white">₹{idealEmergencyFund.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400">
              <span>Current Liquid Savings</span>
              <span className="font-semibold text-cyan-accent">₹{emergencySavings.toLocaleString('en-IN')}</span>
            </div>
            
            {emergencyShortfall > 0 ? (
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-3 flex items-start gap-2.5 mt-2">
                <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-[9px] text-slate-300 leading-normal">
                  <span className="font-bold text-amber-500 block">Shortfall Detected: ₹{emergencyShortfall.toLocaleString('en-IN')}</span>
                  Finance Agent suggests transferring ₹10,000/month surplus cash into emergency sweep accounts to cover the reserve gap.
                </div>
              </div>
            ) : (
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-3 flex items-start gap-2.5 mt-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-[9px] text-slate-300 leading-normal">
                  <span className="font-bold text-emerald-400 block">Reserve Fully Funded</span>
                  Your liquid emergency buffer is fully secured. All additional savings can be safely swept to mutual funds.
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Right panel: Budget Planner & Spending Analyzer */}
      <div className="lg:col-span-7 bg-slate-900/10 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase">
              <Sliders className="h-4.5 w-4.5 text-[#A78BFA]" /> Budget Planner & Analyzer
            </h4>
            <span className="text-[9px] text-slate-500 font-bold">Total Budget: ₹{totalBudget.toLocaleString('en-IN')}</span>
          </div>

          <div className="space-y-4">
            {budgetCategories.map((category) => {
              const spend = currentSpending[category.id as keyof typeof currentSpending];
              const budget = budgets[category.id as keyof typeof budgets];
              const percent = Math.min(100, Math.round((spend / budget) * 100));
              const isOver = spend > budget;

              return (
                <div key={category.id} className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-semibold text-white">{category.label}</span>
                    <span className="text-slate-400">
                      ₹{spend.toLocaleString('en-IN')} of 
                      <input 
                        type="number" 
                        value={budget} 
                        onChange={(e) => handleBudgetChange(category.id, Number(e.target.value))}
                        className="w-14 bg-slate-950/60 border border-white/5 rounded px-1 ml-1 text-right text-white focus:outline-none focus:border-cyan-accent"
                      />
                    </span>
                  </div>

                  <div className="w-full bg-slate-950/60 border border-white/5 h-2.5 rounded-full overflow-hidden p-0.5 relative">
                    <motion.div 
                      className={`h-full rounded-full ${isOver ? "bg-red-500" : category.color}`} 
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>

                  {isOver && (
                    <p className="text-[8px] text-red-400 font-bold uppercase flex items-center gap-1">
                      ⚠️ Over budget by ₹{(spend - budget).toLocaleString('en-IN')}! Consider adjustments.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#7C3AED]/5 border border-[#7C3AED]/15 rounded-2xl p-4 flex items-start gap-2.5">
          <Info className="h-4.5 w-4.5 text-[#A78BFA] shrink-0 mt-0.5" />
          <p className="text-[10px] text-slate-400 leading-normal">
            <span className="font-bold text-[#A78BFA] block mb-0.5">Budget Optimization Advice</span>
            Based on current spending, shifting ₹5,000 from shopping to utilities or emergency reserves will lift your financial health index rating by 7 points.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
