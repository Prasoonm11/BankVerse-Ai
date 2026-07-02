"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sliders, 
  Sparkles, 
  TrendingUp, 
  BrainCircuit, 
  CalendarClock, 
  Award,
  Info,
  ShoppingBag,
  CreditCard,
  HelpCircle
} from "lucide-react";

interface DigitalTwinTabProps {
  initialIncome?: number;
  initialExpenses?: number;
}

export default function DigitalTwinTab({
  initialIncome = 100000,
  initialExpenses = 56500
}: DigitalTwinTabProps) {
  // Slider states
  const [income, setIncome] = useState(initialIncome);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [investment, setInvestment] = useState(25000);

  // Purchase Simulation States
  const [purchaseType, setPurchaseType] = useState<string>("none");
  const [purchaseAmount, setPurchaseAmount] = useState<number>(0);
  const [purchaseMode, setPurchaseMode] = useState<"cash" | "emi">("cash");
  const [emiTenor, setEmiTenor] = useState<number>(12); // months
  const [emiInterest, setEmiInterest] = useState<number>(12); // % p.a.

  // Computed states
  const [futureWealth, setFutureWealth] = useState(0);
  const [simulatedFutureWealth, setSimulatedFutureWealth] = useState(0);
  const [opportunityCost, setOpportunityCost] = useState(0);
  const [retirementAge, setRetirementAge] = useState(0);
  const [retirementDelay, setRetirementDelay] = useState(0);
  const [goalMonths, setGoalMonths] = useState(0);
  const [financialScore, setFinancialScore] = useState(0);
  const [chartPoints, setChartPoints] = useState<string>("");
  const [simulatedChartPoints, setSimulatedChartPoints] = useState<string>("");

  // Ensure investment doesn't exceed total surplus
  const maxInvestment = Math.max(0, income - expenses);
  const adjustedInvestment = Math.min(investment, maxInvestment);

  // Preset handler
  const handleSelectPurchasePreset = (type: string) => {
    setPurchaseType(type);
    if (type === "none") {
      setPurchaseAmount(0);
    } else if (type === "tv") {
      setPurchaseAmount(45000);
    } else if (type === "iphone") {
      setPurchaseAmount(85000);
    } else if (type === "laptop") {
      setPurchaseAmount(65000);
    } else if (type === "jewelry") {
      setPurchaseAmount(120000);
    } else if (type === "car") {
      setPurchaseAmount(1500000);
    }
  };

  useEffect(() => {
    // 1. Calculate Financial Score
    const surplus = income - expenses;
    const savingsRate = income > 0 ? (surplus / income) * 100 : 0;
    const investmentRate = income > 0 ? (adjustedInvestment / income) * 100 : 0;
    
    // Base score ranges from 35 to 98
    let score = 35 + (savingsRate * 0.8) + (investmentRate * 0.4);
    if (surplus < 0) score = 35 + (surplus / 100); // penalize negative surplus
    const finalScore = Math.min(99, Math.max(20, Math.round(score)));
    setFinancialScore(finalScore);

    // Rates
    const investReturn = 0.085 / 12; // 8.5% compounded monthly
    const savingsReturn = 0.04 / 12;  // 4% compounded monthly
    const startingPortfolio = 250000; // Realistic starting liquid net worth for Prasoon

    // 2. Future Wealth Projection (10 years / 120 months)
    // BASELINE Simulation
    let baselineBalance = startingPortfolio;
    const baselinePoints: number[] = [baselineBalance];
    const monthlyInvest = adjustedInvestment;
    const monthlyLiquid = Math.max(0, surplus - adjustedInvestment);

    for (let month = 1; month <= 120; month++) {
      baselineBalance = 
        baselineBalance * (1 + investReturn) + 
        monthlyInvest + 
        monthlyLiquid * (1 + savingsReturn) * 0.5; // assume half of surplus savings is compounded
      
      if (month % 12 === 0) {
        baselinePoints.push(baselineBalance);
      }
    }
    setFutureWealth(baselineBalance);

    // SIMULATED Simulation
    let simulatedBalance = purchaseMode === "cash" 
      ? Math.max(0, startingPortfolio - purchaseAmount) 
      : startingPortfolio;
    
    // Calculate Monthly EMI
    let emiAmount = 0;
    if (purchaseMode === "emi" && purchaseAmount > 0) {
      const r = (emiInterest / 100) / 12;
      const n = emiTenor;
      if (r > 0) {
        emiAmount = (purchaseAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      } else {
        emiAmount = purchaseAmount / n;
      }
    }

    const simulatedPoints: number[] = [simulatedBalance];
    for (let month = 1; month <= 120; month++) {
      // Determine this month's surplus after EMI
      const activeEmi = month <= emiTenor ? emiAmount : 0;
      const currentSurplus = surplus - activeEmi;
      
      let simInvest = 0;
      let simLiquid = 0;
      
      if (currentSurplus >= 0) {
        simInvest = Math.min(adjustedInvestment, currentSurplus);
        simLiquid = currentSurplus - simInvest;
      } else {
        // Drawdown to cover deficit
        simulatedBalance += currentSurplus;
      }

      simulatedBalance = 
        simulatedBalance * (1 + investReturn) + 
        simInvest + 
        simLiquid * (1 + savingsReturn) * 0.5;
      
      if (month % 12 === 0) {
        simulatedPoints.push(Math.max(0, simulatedBalance));
      }
    }
    setSimulatedFutureWealth(simulatedBalance);
    setOpportunityCost(Math.max(0, baselineBalance - simulatedBalance));

    // Generate SVG path for BOTH curves
    const maxVal = Math.max(...baselinePoints, ...simulatedPoints, 100000);
    const svgWidth = 300;
    const svgHeight = 100;
    
    const pointsBaseline = baselinePoints.map((val, idx) => {
      const x = (idx / (baselinePoints.length - 1)) * svgWidth;
      const y = svgHeight - (val / maxVal) * (svgHeight - 15) - 5;
      return `${x},${y}`;
    });
    setChartPoints(`M ${pointsBaseline.join(" L ")}`);

    const pointsSimulated = simulatedPoints.map((val, idx) => {
      const x = (idx / (simulatedPoints.length - 1)) * svgWidth;
      const y = svgHeight - (val / maxVal) * (svgHeight - 15) - 5;
      return `${x},${y}`;
    });
    setSimulatedChartPoints(`M ${pointsSimulated.join(" L ")}`);

    // 3. FIRE Retirement Age calculations
    const annualExpenses = expenses * 12;
    const targetPortfolio = annualExpenses * 25;

    // Baseline Months to FIRE
    let fireBalanceBaseline = startingPortfolio;
    let monthsToFireBaseline = 0;
    const maxMonths = 12 * 60; // 60 years limit

    if (surplus <= 0) {
      monthsToFireBaseline = maxMonths;
    } else {
      while (fireBalanceBaseline < targetPortfolio && monthsToFireBaseline < maxMonths) {
        fireBalanceBaseline = fireBalanceBaseline * (1 + investReturn) + (monthlyInvest + monthlyLiquid * 0.4);
        monthsToFireBaseline++;
      }
    }

    // Simulated Months to FIRE
    let fireBalanceSimulated = purchaseMode === "cash" 
      ? Math.max(0, startingPortfolio - purchaseAmount) 
      : startingPortfolio;
    let monthsToFireSimulated = 0;
    
    if (surplus <= 0) {
      monthsToFireSimulated = maxMonths;
    } else {
      while (fireBalanceSimulated < targetPortfolio && monthsToFireSimulated < maxMonths) {
        const activeEmi = monthsToFireSimulated <= emiTenor ? emiAmount : 0;
        const currentSurplus = surplus - activeEmi;
        
        let simInvest = 0;
        let simLiquid = 0;
        
        if (currentSurplus >= 0) {
          simInvest = Math.min(adjustedInvestment, currentSurplus);
          simLiquid = currentSurplus - simInvest;
        } else {
          fireBalanceSimulated += currentSurplus;
        }

        fireBalanceSimulated = fireBalanceSimulated * (1 + investReturn) + (simInvest + simLiquid * 0.4);
        monthsToFireSimulated++;
      }
    }

    const currentAge = 30;
    const yearsToFire = monthsToFireBaseline / 12;
    setRetirementAge(Math.min(85, Math.max(35, Math.round(currentAge + yearsToFire))));

    const delayMonths = Math.max(0, monthsToFireSimulated - monthsToFireBaseline);
    setRetirementDelay(Number((delayMonths / 12).toFixed(1)));

    // 4. Goal Completion (e.g. ₹5,00,000 emergency fund/milestone)
    const targetGoal = 500000;
    const startingGoal = 100000;
    const monthlyContribution = monthlyInvest + monthlyLiquid;
    
    if (monthlyContribution <= 0) {
      setGoalMonths(-1);
    } else {
      const months = (targetGoal - startingGoal) / monthlyContribution;
      setGoalMonths(Math.max(1, Math.round(months)));
    }

  }, [income, expenses, adjustedInvestment, purchaseAmount, purchaseMode, emiTenor, emiInterest]);

  return (
    <div className="space-y-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
        {/* Left panel: Sliders */}
        <div className="lg:col-span-6 bg-slate-900/10 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <Sliders className="h-4.5 w-4.5 text-cyan-accent" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">What If Parameters</h4>
          </div>

          <div className="space-y-5">
            {/* Slider 1: Income */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monthly Income</label>
                <span className="text-xs font-bold text-white bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/5">
                  ₹{income.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="20000"
                max="300000"
                step="5000"
                value={income}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setIncome(val);
                  if (expenses > val) setExpenses(Math.round(val * 0.7));
                }}
                className="w-full cursor-pointer accent-cyan-accent bg-slate-800"
              />
            </div>

            {/* Slider 2: Expenses */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monthly Expenses</label>
                <span className="text-xs font-bold text-white bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/5">
                  ₹{expenses.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="200000"
                step="2000"
                value={expenses}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setExpenses(val);
                  const surplus = income - val;
                  if (investment > surplus) setInvestment(Math.max(0, surplus));
                }}
                className="w-full cursor-pointer accent-cyan-accent bg-slate-800"
              />
            </div>

            {/* Slider 3: Investment Sweep Amount */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monthly Investment Sweep</label>
                <span className="text-xs font-bold text-white bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/5">
                  ₹{adjustedInvestment.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={maxInvestment}
                step="1000"
                value={adjustedInvestment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                disabled={maxInvestment <= 0}
                className="w-full cursor-pointer accent-cyan-accent bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="bg-cyan-accent/5 border border-cyan-accent/15 rounded-2xl p-4 flex items-start gap-2.5">
            <Sparkles className="h-4.5 w-4.5 text-cyan-accent shrink-0 mt-0.5" />
            <p className="text-[9px] text-slate-400 leading-normal">
              Your Digital Twin models wealth projection compounded at 8.5% p.a. on investments, and 4% APY on liquid buffers.
            </p>
          </div>
        </div>

        {/* Right panel: Results */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          {/* Future Wealth Card */}
          <div className="bg-slate-900/10 border border-white/5 rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden">
            <div className="z-10">
              <TrendingUp className="h-4.5 w-4.5 text-cyan-accent" />
              <span className="text-[9px] uppercase font-bold text-slate-500 mt-2 block">10-Yr Wealth Projection</span>
            </div>
            <div className="z-10">
              <h4 className="text-xl sm:text-2xl font-black text-white leading-tight mt-4">
                ₹{Math.round(purchaseAmount > 0 ? simulatedFutureWealth : futureWealth).toLocaleString('en-IN')}
              </h4>
              <div className="h-16 w-full mt-3 relative">
                <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                  {/* Baseline curve */}
                  <path d={chartPoints} fill="none" stroke="#22D3EE" strokeWidth="2.5" strokeDasharray={purchaseAmount > 0 ? "3 3" : "0"} />
                  {/* Simulated curve */}
                  {purchaseAmount > 0 && (
                    <path d={simulatedChartPoints} fill="none" stroke="#F59E0B" strokeWidth="2.5" />
                  )}
                </svg>
              </div>
              {purchaseAmount > 0 && (
                <div className="flex justify-between items-center text-[8px] text-slate-500 font-bold uppercase mt-1">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-cyan-accent rounded-full" /> Baseline</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full" /> Simulated</span>
                </div>
              )}
            </div>
          </div>

          {/* Retirement Age Card */}
          <div className="bg-slate-900/10 border border-white/5 rounded-3xl p-5 flex flex-col justify-between">
            <div>
              <CalendarClock className="h-4.5 w-4.5 text-accent-purple" />
              <span className="text-[9px] uppercase font-bold text-slate-500 mt-2 block">FIRE Retirement Age</span>
            </div>
            <div>
              {income - expenses <= 0 ? (
                <h4 className="text-lg font-black text-red-400 mt-4">Never (Deficit)</h4>
              ) : (
                <h4 className="text-xl sm:text-2xl font-black text-white mt-4">
                  Age {retirementAge}
                  {purchaseAmount > 0 && retirementDelay > 0 && (
                    <span className="text-[10px] text-[#F59E0B] block mt-1 font-semibold uppercase">
                      +{retirementDelay} yrs delay
                    </span>
                  )}
                </h4>
              )}
              <p className="text-[8px] text-slate-500 mt-1 uppercase">
                Target: ₹{(expenses * 12 * 25).toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          {/* Goal Milestone Card */}
          <div className="bg-slate-900/10 border border-white/5 rounded-3xl p-5 flex flex-col justify-between">
            <div>
              <Award className="h-4.5 w-4.5 text-amber-400" />
              <span className="text-[9px] uppercase font-bold text-slate-500 mt-2 block">Goal Milestone (Emergency Reserve)</span>
            </div>
            <div>
              {goalMonths === -1 ? (
                <h4 className="text-lg font-black text-red-400 mt-4 font-bold">Infinite</h4>
              ) : (
                <h4 className="text-xl sm:text-2xl font-black text-white mt-4">
                  {goalMonths} <span className="text-xs font-semibold text-slate-400">Months</span>
                </h4>
              )}
              <p className="text-[8px] text-slate-500 mt-1 uppercase">
                Target: ₹5,00,000 Fund
              </p>
            </div>
          </div>

          {/* Financial Health Score Card */}
          <div className="bg-slate-900/10 border border-white/5 rounded-3xl p-5 flex flex-col justify-between">
            <div>
              <BrainCircuit className="h-4.5 w-4.5 text-emerald-400" />
              <span className="text-[9px] uppercase font-bold text-slate-500 mt-2 block">Twin Health Rating</span>
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-black text-white mt-4">
                {financialScore}<span className="text-xs text-slate-400">/100</span>
              </h4>
              <p className={`text-[8px] mt-1 font-bold uppercase ${
                financialScore > 80 ? "text-emerald-400" :
                financialScore > 60 ? "text-cyan-accent" : "text-amber-400"
              }`}>
                {financialScore > 80 ? "Excellent standing" :
                 financialScore > 60 ? "Balanced profile" : "coaching recommended"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* "What If I Purchase" Simulation Section */}
      <div className="bg-slate-900/10 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-72 h-72 bg-gradient-to-tr from-[#F59E0B]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <div className="p-1.5 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-lg">
            <ShoppingBag className="h-4.5 w-4.5 text-[#F59E0B]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">"What If I Purchase" Simulator</h4>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wide">Evaluate instant vs long-term opportunity cost</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Controls (Left) */}
          <div className="md:col-span-6 space-y-4">
            {/* Purchase Item Selection */}
            <div>
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Select Product Preset</label>
              <div className="grid grid-cols-3 gap-2 mt-1.5">
                {[
                  { id: "none", label: "None", val: 0 },
                  { id: "tv", label: "TV (₹45k)", val: 45000 },
                  { id: "laptop", label: "Laptop (₹65k)", val: 65000 },
                  { id: "iphone", label: "iPhone (₹85k)", val: 85000 },
                  { id: "jewelry", label: "Jewelry (₹1.2L)", val: 120000 },
                  { id: "car", label: "Car (₹15L)", val: 1500000 }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectPurchasePreset(item.id)}
                    className={`py-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer border ${
                      purchaseType === item.id 
                        ? "bg-[#F59E0B]/10 border-[#F59E0B] text-[#F59E0B]" 
                        : "bg-slate-950/60 border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Field (if not none) */}
            {purchaseType !== "none" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Purchase Amount (₹)</label>
                  <input 
                    type="number" 
                    value={purchaseAmount} 
                    onChange={(e) => {
                      setPurchaseType("custom");
                      setPurchaseAmount(Number(e.target.value));
                    }}
                    className="w-full bg-slate-950/60 border border-white/5 px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#F59E0B]/40 mt-1" 
                  />
                </div>

                {/* Purchase Mode */}
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Payment Mode</label>
                  <div className="grid grid-cols-2 gap-2 mt-1.5 bg-slate-950/60 p-1 border border-white/5 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setPurchaseMode("cash")}
                      className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        purchaseMode === "cash" 
                          ? "bg-white text-[#020205] shadow" 
                          : "text-slate-500 hover:text-white"
                      }`}
                    >
                      Upfront Cash
                    </button>
                    <button
                      type="button"
                      onClick={() => setPurchaseMode("emi")}
                      className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        purchaseMode === "emi" 
                          ? "bg-white text-[#020205] shadow" 
                          : "text-slate-500 hover:text-white"
                      }`}
                    >
                      EMI Loan
                    </button>
                  </div>
                </div>

                {/* EMI options */}
                {purchaseMode === "emi" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3 mt-3"
                  >
                    <div>
                      <label className="text-[8px] font-bold text-slate-500 uppercase">Tenor (Months)</label>
                      <select 
                        value={emiTenor} 
                        onChange={(e) => setEmiTenor(Number(e.target.value))}
                        className="w-full bg-slate-950/60 border border-white/5 px-2.5 py-1.5 rounded-lg text-xs text-white focus:outline-none mt-0.5"
                      >
                        <option value={6}>6 Months</option>
                        <option value={12}>12 Months</option>
                        <option value={24}>24 Months</option>
                        <option value={36}>36 Months</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[8px] font-bold text-slate-500 uppercase">Interest Rate ({emiInterest}% p.a.)</label>
                      <input 
                        type="range"
                        min="0"
                        max="24"
                        step="1"
                        value={emiInterest}
                        onChange={(e) => setEmiInterest(Number(e.target.value))}
                        className="w-full cursor-pointer accent-[#F59E0B] bg-slate-800 mt-2"
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>

          {/* Results Analysis (Right) */}
          <div className="md:col-span-6 h-full flex flex-col justify-between">
            {purchaseAmount === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center text-slate-500 bg-slate-950/20 border border-white/5 rounded-2xl p-6 h-full">
                <HelpCircle className="h-8 w-8 text-slate-600 mb-2 animate-bounce" />
                <h5 className="text-[11px] font-bold text-slate-400">Simulation Idle</h5>
                <p className="text-[9px] max-w-[200px] mt-1 leading-normal">Select an item above to run the digital twin opportunity cost impact audit.</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-950/40 border border-white/5 rounded-2xl p-5 space-y-4"
              >
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-[9px] font-bold text-[#F59E0B] uppercase tracking-wider flex items-center gap-1">
                    <BrainCircuit className="h-3.5 w-3.5" /> Simulation Report
                  </span>
                  <span className="text-[9px] text-slate-500">Compounding Impact</span>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <span className="text-[8px] text-slate-500 font-bold uppercase">Opportunity Cost Loss</span>
                    <h5 className="text-lg font-black text-red-400">₹{Math.round(opportunityCost).toLocaleString('en-IN')}</h5>
                    <p className="text-[9px] text-slate-400 leading-normal mt-0.5">
                      By spending ₹{purchaseAmount.toLocaleString('en-IN')} today, you forfeit ₹{Math.round(opportunityCost).toLocaleString('en-IN')} in compounded growth at 8.5% over 10 years.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
                    <div>
                      <span className="text-[8px] text-slate-500 font-bold uppercase">Retirement Delay</span>
                      <h6 className="text-xs font-black text-white">{retirementDelay > 0 ? `+${retirementDelay} Years` : "No Delay"}</h6>
                    </div>
                    <div>
                      <span className="text-[8px] text-slate-500 font-bold uppercase">Monthly EMI Burden</span>
                      <h6 className="text-xs font-black text-[#F59E0B]">
                        {purchaseMode === "emi" ? `₹${Math.round(purchaseAmount / emiTenor).toLocaleString('en-IN')}/mo` : "₹0 (Upfront Cash)"}
                      </h6>
                    </div>
                  </div>

                  {purchaseMode === "emi" && (
                    <div className="p-2.5 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-start gap-2">
                      <Info className="h-3.5 w-3.5 text-[#F59E0B] shrink-0 mt-0.5" />
                      <p className="text-[8.5px] text-slate-400 leading-normal">
                        Your monthly investment capacity will decrease by the EMI amount for {emiTenor} months, reducing early compound momentum.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
