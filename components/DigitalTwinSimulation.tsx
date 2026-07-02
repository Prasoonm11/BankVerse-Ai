"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sliders, Sparkles, TrendingUp, BrainCircuit, ShieldAlert, Award, CalendarClock } from "lucide-react";

export default function DigitalTwinSimulation() {
  // Slider states
  const [income, setIncome] = useState(8000);
  const [expenses, setExpenses] = useState(4500);
  const [investment, setInvestment] = useState(1500);

  // Computed states
  const [futureWealth, setFutureWealth] = useState(0);
  const [retirementAge, setRetirementAge] = useState(0);
  const [goalMonths, setGoalMonths] = useState(0);
  const [financialScore, setFinancialScore] = useState(0);
  const [chartPoints, setChartPoints] = useState<string>("");

  // Ensure investment doesn't exceed total surplus
  const maxInvestment = Math.max(0, income - expenses);
  const adjustedInvestment = Math.min(investment, maxInvestment);

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

    // 2. Future Wealth Projection (10 years / 120 months)
    // Starting portfolio: $15,000
    // Monthly input = adjustedInvestment (growing at 8% p.a.) + remaining surplus (growing at 4% p.a.)
    let currentBalance = 15000;
    const investReturn = 0.08 / 12;
    const savingsReturn = 0.04 / 12;
    const monthlyInvest = adjustedInvestment;
    const monthlyLiquid = Math.max(0, surplus - adjustedInvestment);

    const dataPoints: number[] = [currentBalance];

    for (let month = 1; month <= 120; month++) {
      currentBalance = 
        currentBalance * (1 + investReturn) + 
        monthlyInvest + 
        monthlyLiquid * (1 + savingsReturn) * 0.5; // assume half of remaining liquid is saved long-term
      
      if (month % 12 === 0) {
        dataPoints.push(currentBalance);
      }
    }
    setFutureWealth(currentBalance);

    // Generate SVG path for the data points
    // Max value will normalize the height
    const maxVal = Math.max(...dataPoints, 100000);
    const svgWidth = 300;
    const svgHeight = 100;
    const points = dataPoints.map((val, idx) => {
      const x = (idx / (dataPoints.length - 1)) * svgWidth;
      const y = svgHeight - (val / maxVal) * (svgHeight - 15) - 5;
      return `${x},${y}`;
    });
    setChartPoints(`M ${points.join(" L ")}`);

    // 3. Retirement Age Projection (FIRE Calculation)
    // Target Portfolio = Annual Expenses * 25
    const annualExpenses = expenses * 12;
    const targetPortfolio = annualExpenses * 25;
    const startingPortfolio = 25000;

    let fireBalance = startingPortfolio;
    let monthsToFire = 0;
    const maxMonths = 12 * 60; // 60 years limit

    if (surplus <= 0) {
      monthsToFire = maxMonths;
    } else {
      while (fireBalance < targetPortfolio && monthsToFire < maxMonths) {
        fireBalance = fireBalance * (1 + investReturn) + (monthlyInvest + monthlyLiquid * 0.4);
        monthsToFire++;
      }
    }
    
    const currentAge = 30;
    const yearsToFire = monthsToFire / 12;
    const projectedAge = Math.min(85, Math.max(35, Math.round(currentAge + yearsToFire)));
    setRetirementAge(projectedAge);

    // 4. Goal Completion (e.g. $50,000 emergency/investment goal)
    const targetGoal = 50000;
    const startingGoal = 10000;
    const monthlyContribution = monthlyInvest + monthlyLiquid;
    
    if (monthlyContribution <= 0) {
      setGoalMonths(-1); // Infinite
    } else {
      const months = (targetGoal - startingGoal) / monthlyContribution;
      setGoalMonths(Math.max(1, Math.round(months)));
    }

  }, [income, expenses, adjustedInvestment]);

  return (
    <section className="relative py-32 bg-navy-dark/30 border-y border-white/5 overflow-hidden">
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[10%] w-[45%] h-[45%] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-accent/10 border border-cyan-accent/20 text-cyan-accent text-xs font-semibold uppercase tracking-wider mb-4">
            Financial Simulator
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Digital Twin Simulation
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg">
            Model your future financial outcomes. Use the interactive sliders to alter your variables and watch the AI Digital Twin calculate your wealth trajectory, retirement age, and health score instantly.
          </p>
        </div>

        {/* Simulator Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Sliders */}
          <div className="lg:col-span-6 bg-slate-900/40 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-8">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Sliders className="h-5 w-5 text-cyan-accent" />
              <h3 className="text-lg font-bold text-white">What If Simulation</h3>
            </div>

            <div className="space-y-6">
              {/* Slider 1: Income */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Monthly Income</label>
                  <span className="text-sm font-bold text-white bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                    ${income.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="25000"
                  step="250"
                  value={income}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setIncome(val);
                    // auto scale expense relative to income if it exceeds
                    if (expenses > val) setExpenses(Math.round(val * 0.7));
                  }}
                  className="w-full cursor-pointer accent-cyan-accent bg-slate-800"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 font-medium">
                  <span>$2k</span>
                  <span>$12.5k</span>
                  <span>$25k</span>
                </div>
              </div>

              {/* Slider 2: Expenses */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Monthly Expenses</label>
                  <span className="text-sm font-bold text-white bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                    ${expenses.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="100"
                  value={expenses}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setExpenses(val);
                    // ensure investment does not exceed surplus
                    const surplus = income - val;
                    if (investment > surplus) setInvestment(Math.max(0, surplus));
                  }}
                  className="w-full cursor-pointer accent-cyan-accent bg-slate-800"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 font-medium">
                  <span>$1k</span>
                  <span>$8k</span>
                  <span>$15k</span>
                </div>
              </div>

              {/* Slider 3: Investment Amount */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Monthly Investment</label>
                  <span className="text-sm font-bold text-white bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                    ${adjustedInvestment.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxInvestment}
                  step="50"
                  value={adjustedInvestment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  disabled={maxInvestment <= 0}
                  className="w-full cursor-pointer accent-cyan-accent bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 font-medium">
                  <span>$0</span>
                  <span>Surplus: ${maxInvestment.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 bg-cyan-accent/5 -mx-6 md:-mx-8 -mb-6 md:-mb-8 p-4 flex items-start gap-2.5 rounded-b-3xl">
              <Sparkles className="h-4 w-4 text-cyan-accent shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-400 leading-normal">
                Twin calculations are generated assuming a starting wealth pool of $15,000, compounding at 8.5% annual return on investments, and 4% APY on liquid savings.
              </p>
            </div>
          </div>

          {/* Right panel: Results */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            
            {/* Future Wealth Card */}
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-5 md:p-6 flex flex-col justify-between">
              <div>
                <TrendingUp className="h-5 w-5 text-cyan-accent" />
                <span className="text-[10px] uppercase font-bold text-slate-500 mt-3 block">Projected 10-Yr Wealth</span>
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  ${Math.round(futureWealth).toLocaleString()}
                </h4>
                <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-0.5">
                  Based on current surplus allocation
                </p>
              </div>

              {/* Dynamic Mini Line Graph */}
              <div className="h-10 w-full mt-3">
                <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                  <path d={chartPoints} fill="none" stroke="#22D3EE" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* Retirement Age Card */}
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-5 md:p-6 flex flex-col justify-between">
              <div>
                <CalendarClock className="h-5 w-5 text-accent-purple" />
                <span className="text-[10px] uppercase font-bold text-slate-500 mt-3 block">Retirement Readiness</span>
              </div>
              <div>
                {income - expenses <= 0 ? (
                  <h4 className="text-xl font-black text-red-400 leading-tight">Never</h4>
                ) : (
                  <h4 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    Age {retirementAge}
                  </h4>
                )}
                <p className="text-[10px] text-slate-400 mt-1">
                  Target portfolio: ${(expenses * 12 * 25).toLocaleString()}
                </p>
              </div>
              <div className="border-t border-white/5 pt-2 text-[9px] text-slate-500">
                Assumes 25x annual expenses
              </div>
            </div>

            {/* Goal Completion Card */}
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-5 md:p-6 flex flex-col justify-between">
              <div>
                <Award className="h-5 w-5 text-amber-400" />
                <span className="text-[10px] uppercase font-bold text-slate-500 mt-3 block">Tesla Fund Goal</span>
              </div>
              <div>
                {goalMonths === -1 ? (
                  <h4 className="text-xl font-black text-red-400 leading-tight">Infinite</h4>
                ) : (
                  <h4 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {goalMonths} <span className="text-xs font-semibold text-slate-400">Months</span>
                  </h4>
                )}
                <p className="text-[10px] text-slate-400 mt-1">
                  To reach $50,000 target
                </p>
              </div>
              <div className="border-t border-white/5 pt-2 text-[9px] text-slate-500">
                Starting from $10,000
              </div>
            </div>

            {/* Financial Health Score Card */}
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-5 md:p-6 flex flex-col justify-between">
              <div>
                <BrainCircuit className="h-5 w-5 text-emerald-400" />
                <span className="text-[10px] uppercase font-bold text-slate-500 mt-3 block">Twin Financial Score</span>
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {financialScore}<span className="text-xs text-slate-400 font-semibold">/100</span>
                </h4>
                <p className={`text-[10px] mt-1 font-bold ${
                  financialScore > 80 ? "text-emerald-400" :
                  financialScore > 60 ? "text-cyan-accent" :
                  financialScore > 40 ? "text-amber-400" : "text-red-400"
                }`}>
                  {financialScore > 80 ? "Excellent Standing" :
                   financialScore > 60 ? "Good Balance" :
                   financialScore > 40 ? "Needs Coaching" : "High Alert Risk"}
                </p>
              </div>
              <div className="border-t border-white/5 pt-2 text-[9px] text-slate-500">
                Evaluates savings rate
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
