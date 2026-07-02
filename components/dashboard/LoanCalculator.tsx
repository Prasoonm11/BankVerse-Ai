"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  DollarSign, 
  HelpCircle, 
  Sparkles, 
  Calculator, 
  ShieldCheck, 
  ShieldAlert,
  Info 
} from "lucide-react";

export default function LoanCalculator() {
  // Input states
  const [loanAmount, setLoanAmount] = useState(1500000);
  const [interestRate, setInterestRate] = useState(8.5); // % p.a. (more typical for home/car loan in India)
  const [tenorYears, setTenorYears] = useState(15);
  const [existingLiabilities, setExistingLiabilities] = useState(15000); // monthly EMI debts (e.g. Car loan EMI)

  // Hardcoded simulated monthly income for the user (₹1,00,000)
  const monthlyIncome = 100000;

  // Computed states
  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [isEligible, setIsEligible] = useState(false);
  const [maxEligiblePrincipal, setMaxEligiblePrincipal] = useState(0);
  const [dtiRatio, setDtiRatio] = useState(0); // Debt-to-Income percentage

  useEffect(() => {
    // 1. Calculate Monthly EMI
    // Formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
    const principal = loanAmount;
    const r = (interestRate / 100) / 12;
    const n = tenorYears * 12;

    let emi = 0;
    if (r > 0) {
      emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      emi = principal / n;
    }
    setMonthlyEMI(emi);

    // 2. Calculate Total Interest
    const totalPayable = emi * n;
    const interest = totalPayable - principal;
    setTotalInterest(interest);

    // 3. Evaluate Loan Eligibility (FOIR / DTI check)
    // EMI + Existing Liabilities should be <= 50% of monthly income
    const totalMonthlyDebt = emi + existingLiabilities;
    const dti = (totalMonthlyDebt / monthlyIncome) * 100;
    setDtiRatio(dti);

    const eligible = dti <= 50;
    setIsEligible(eligible);

    // 4. Calculate Maximum Eligible Principal
    // Max debt allowance = 50% of income minus existing liabilities
    const maxMonthlyDebtAllowance = (monthlyIncome * 0.5) - existingLiabilities;
    
    let maxPrincipal = 0;
    if (maxMonthlyDebtAllowance > 0 && r > 0) {
      maxPrincipal = (maxMonthlyDebtAllowance * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
    }
    setMaxEligiblePrincipal(Math.max(0, Math.round(maxPrincipal)));

  }, [loanAmount, interestRate, tenorYears, existingLiabilities]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full"
    >
      {/* Left Panel: Inputs */}
      <div className="lg:col-span-6 bg-slate-900/10 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <Calculator className="h-4.5 w-4.5 text-cyan-accent" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Loan Specifications</h4>
        </div>

        <div className="space-y-5">
          {/* Input 1: Loan Amount */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Loan Principal Requested</label>
              <span className="text-xs font-bold text-white bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/5">
                ₹{loanAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="100000"
              max="10000000"
              step="50000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full cursor-pointer accent-cyan-accent bg-slate-800"
            />
          </div>

          {/* Input 2: Tenor Years */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Repayment Tenor (Years)</label>
              <span className="text-xs font-bold text-white bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/5">
                {tenorYears} Years
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={tenorYears}
              onChange={(e) => setTenorYears(Number(e.target.value))}
              className="w-full cursor-pointer accent-cyan-accent bg-slate-800"
            />
          </div>

          {/* Input 3: Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Interest Rate (% p.a.)</label>
              <span className="text-xs font-bold text-white bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/5">
                {interestRate.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="3.0"
              max="15.0"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full cursor-pointer accent-cyan-accent bg-slate-800"
            />
          </div>

          {/* Input 4: Existing Liabilities */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Existing Monthly EMIs</label>
              <span className="text-xs font-bold text-white bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/5">
                ₹{existingLiabilities.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="80000"
              step="1000"
              value={existingLiabilities}
              onChange={(e) => setExistingLiabilities(Number(e.target.value))}
              className="w-full cursor-pointer accent-cyan-accent bg-slate-800"
            />
          </div>
        </div>

        <div className="bg-[#7C3AED]/5 border border-[#7C3AED]/15 rounded-2xl p-4 flex items-start gap-2.5">
          <Info className="h-4.5 w-4.5 text-[#A78BFA] shrink-0 mt-0.5" />
          <div className="text-[9px] text-slate-400 leading-normal">
            <span className="font-bold text-[#A78BFA] block mb-0.5">Loan Evaluation Criteria</span>
            The Loan Agent checks your Debt-to-Income (DTI) ratio. Monthly EMIs + debts must not exceed 50% of your income.
          </div>
        </div>
      </div>

      {/* Right Panel: Calculations & Amortization */}
      <div className="lg:col-span-6 flex flex-col justify-between gap-6">
        
        {/* Eligibility Status */}
        <div className="bg-slate-900/10 border border-white/5 rounded-3xl p-6 space-y-4">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider">Eligibility Evaluation</h5>

          <div className="space-y-3">
            {isEligible ? (
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 flex items-start gap-3">
                <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 block uppercase">Loan Application Pre-Approved</span>
                  <p className="text-[9px] text-slate-300 leading-normal mt-1">
                    Your DTI ratio is {dtiRatio.toFixed(1)}% (below the 50% threshold limit). Maximum eligible principal: <span className="font-bold text-white">₹{maxEligiblePrincipal.toLocaleString('en-IN')}</span>.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-4 flex items-start gap-3">
                <ShieldAlert className="h-6 w-6 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold text-red-400 block uppercase">Pre-Approval Declined</span>
                  <p className="text-[9px] text-slate-300 leading-normal mt-1">
                    Your DTI ratio is {dtiRatio.toFixed(1)}% (exceeding the 50% safety limit). Max principal loan size allowed: <span className="font-bold text-white">₹{maxEligiblePrincipal.toLocaleString('en-IN')}</span>. Consider extending tenor.
                  </p>
                </div>
              </div>
            )}

            <div className="border-t border-white/5 pt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[8px] text-slate-500 font-bold uppercase">Estimated Monthly EMI</span>
                <h4 className="text-lg font-black text-white mt-0.5">₹{Math.round(monthlyEMI).toLocaleString('en-IN')}</h4>
              </div>
              <div>
                <span className="text-[8px] text-slate-500 font-bold uppercase">Debt-to-Income Ratio</span>
                <h4 className={`text-lg font-black mt-0.5 ${isEligible ? "text-emerald-400" : "text-red-400"}`}>{Math.round(dtiRatio)}%</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Amortization Split */}
        <div className="bg-slate-900/10 border border-white/5 rounded-3xl p-6 flex flex-col justify-between flex-1 relative overflow-hidden">
          <div className="absolute top-[-30%] right-[-10%] w-56 h-56 bg-gradient-to-tr from-cyan-accent/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[#A78BFA]" /> Cost Breakdown Analysis
            </h5>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <span className="text-[8px] text-slate-500 font-bold uppercase">Requested Principal</span>
                <h5 className="text-xs font-bold text-white">₹{loanAmount.toLocaleString('en-IN')}</h5>
              </div>
              <div>
                <span className="text-[8px] text-slate-500 font-bold uppercase">Total Interest Cost</span>
                <h5 className="text-xs font-bold text-slate-400">₹{Math.round(totalInterest).toLocaleString('en-IN')}</h5>
              </div>
            </div>
          </div>

          {/* Simple Amortization Horizontal Bar */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between items-center text-[8px] text-slate-500 font-bold uppercase">
              <span>Principal ({(loanAmount / (loanAmount + totalInterest) * 100).toFixed(0)}%)</span>
              <span>Interest ({(totalInterest / (loanAmount + totalInterest) * 100).toFixed(0)}%)</span>
            </div>
            
            <div className="w-full h-4 rounded-xl overflow-hidden flex border border-white/5 p-0.5 bg-slate-950/60">
              <div 
                className="h-full bg-cyan-accent rounded-l-lg transition-all duration-300" 
                style={{ width: `${(loanAmount / (loanAmount + totalInterest) * 100)}%` }} 
              />
              <div 
                className="h-full bg-[#7C3AED] rounded-r-lg transition-all duration-300" 
                style={{ width: `${(totalInterest / (loanAmount + totalInterest) * 100)}%` }} 
              />
            </div>

            <p className="text-[8px] text-slate-500 font-bold uppercase text-center mt-1">
              Overall Retained Liabilities: ₹{Math.round(loanAmount + totalInterest).toLocaleString('en-IN')}
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
