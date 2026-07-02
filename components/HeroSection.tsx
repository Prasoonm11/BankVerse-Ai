"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, BrainCircuit, Activity, ShieldCheck, Zap, TrendingUp, Sparkles } from "lucide-react";

export default function HeroSection() {
  const [notificationIndex, setNotificationIndex] = useState(0);
  const notifications = [
    { id: 1, agent: "Fraud Guardian", text: "Suspicious login attempt blocked from unknown IP", status: "success", icon: ShieldCheck },
    { id: 2, agent: "Rewards Optimizer", text: "Saved ₹1,200 automatically on flight booking rewards", status: "rewards", icon: Sparkles },
    { id: 3, agent: "Finance Coach", text: "Identified ₹15,000 recurring leakage in unused sub", status: "recommendation", icon: TrendingUp },
    { id: 4, agent: "Digital Twin", text: "Simulated retirement scenario: +4.2% projected yield", status: "active", icon: BrainCircuit },
  ];

  // Cycle notifications every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setNotificationIndex((prev) => (prev + 1) % notifications.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [notifications.length]);

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-navy-bg z-0" />
      <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-electric-blue/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-accent-purple/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[40%] right-[30%] w-[30%] h-[30%] bg-cyan-accent/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "4s" }} />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-60 z-0 pointer-events-none" />

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md mb-6"
            >
              <Sparkles className="h-4 w-4 text-cyan-accent animate-pulse" />
              <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
                The Autonomous Banking Revolution
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-white mb-6"
            >
              BankVerse <span className="bg-gradient-to-r from-electric-blue via-cyan-accent to-accent-purple bg-clip-text text-transparent">AI</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl font-bold text-slate-200 mb-4"
            >
              The Future of Autonomous Banking with Agentic AI
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-400 text-base sm:text-lg max-w-lg mb-8 leading-relaxed"
            >
              Experience intelligent banking powered by multiple AI agents that acquire customers, drive digital adoption, optimize finances, detect fraud, and deliver hyper-personalized engagement.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <a
                href="#demo"
                className="px-8 py-4 bg-gradient-to-r from-electric-blue to-cyan-accent hover:from-electric-blue/90 hover:to-cyan-accent/90 text-white font-bold rounded-2xl shadow-lg shadow-electric-blue/20 flex items-center justify-center gap-2 group transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Launch Demo
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#features"
                className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore Features
              </a>
            </motion.div>
          </div>

          {/* Right Column: Premium Dashboard Mockup */}
          <div className="lg:col-span-6 relative flex items-center justify-center w-full min-h-[500px]">
            {/* Decorative background glow behind dashboard */}
            <div className="absolute w-[80%] h-[80%] bg-gradient-to-br from-electric-blue/10 to-accent-purple/10 rounded-full blur-[80px]" />

            {/* Main Mockup Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[500px] h-[400px] border border-white/10 rounded-[24px] bg-slate-900/60 backdrop-blur-xl shadow-2xl overflow-hidden shadow-black/50"
            >
              {/* Top bar header of Dashboard */}
              <div className="flex items-center justify-between border-b border-white/5 px-6 py-3.5 bg-slate-950/40">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-slate-500 text-xs font-semibold ml-2">BankVerse Engine v1.0</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Secure Connected</span>
                </div>
              </div>

              {/* Inner Dashboard Content */}
              <div className="p-6 grid grid-cols-12 gap-4 h-[calc(100%-55px)] overflow-hidden">
                {/* Score section (cols 5) */}
                <div className="col-span-5 flex flex-col justify-between h-full bg-slate-950/20 border border-white/5 rounded-xl p-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Autonomous Score</span>
                    <h3 className="text-xl font-bold text-white mt-0.5">Health Score</h3>
                  </div>

                  <div className="relative flex items-center justify-center my-2">
                    {/* SVG Circular Progress */}
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="transparent" />
                      <circle cx="48" cy="48" r="40" stroke="url(#cyanBlueGrad)" strokeWidth="6" fill="transparent"
                        strokeDasharray="251.2" strokeDashoffset="25.1" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="cyanBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#22D3EE" />
                          <stop offset="100%" stopColor="#2563EB" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-white tracking-tight">91</span>
                      <span className="text-[9px] font-semibold text-cyan-accent uppercase">Excellent</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 bg-cyan-accent/5 border border-cyan-accent/15 rounded-lg px-2 py-1 text-[10px] text-slate-300">
                    <Zap className="h-3 w-3 text-cyan-accent shrink-0" />
                    <span>AI Twin running (99.8%)</span>
                  </div>
                </div>

                {/* Savings Growth (cols 7) */}
                <div className="col-span-7 flex flex-col justify-between h-full bg-slate-950/20 border border-white/5 rounded-xl p-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Asset Valuation</span>
                        <h3 className="text-lg font-bold text-white mt-0.5">₹5,40,000</h3>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-500/15 flex items-center gap-0.5">
                        <TrendingUp className="h-2.5 w-2.5" /> +12.4%
                      </span>
                    </div>
                  </div>

                  {/* SVG Line Graph */}
                  <div className="h-24 w-full flex items-end">
                    <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,45 Q15,40 30,30 T60,25 T90,8 T100,5" fill="none" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M0,45 Q15,40 30,30 T60,25 T90,8 T100,5 L100,50 L0,50 Z" fill="url(#chartGrad)" />
                      {/* Dots on peak */}
                      <circle cx="90" cy="8" r="2.5" fill="#22D3EE" />
                      <circle cx="90" cy="8" r="4.5" fill="#22D3EE" opacity="0.4" className="animate-ping" />
                    </svg>
                  </div>

                  <span className="text-[10px] text-slate-500 text-center block mt-1">Savings Growth (Active Modeling)</span>
                </div>
              </div>
            </motion.div>

            {/* Overlapping Glass Element 1: AI Agent Status (Top Left) */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute top-12 -left-8 md:-left-12 glass-card rounded-2xl p-4 flex items-center gap-3.5 shadow-xl max-w-[210px] z-20 pointer-events-none"
            >
              <div className="p-2.5 bg-electric-blue/15 border border-electric-blue/20 rounded-xl text-electric-blue">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">AI Orchestrator</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Core System online</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-semibold text-emerald-400">7 Agents Active</span>
                </div>
              </div>
            </motion.div>

            {/* Overlapping Glass Element 2: Live Notifications Feed (Bottom Right) */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-6 -right-4 md:-right-8 glass-card rounded-2xl p-4 shadow-xl w-full max-w-[260px] z-20 pointer-events-none"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-2.5">
                <div className="flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5 text-cyan-accent" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live Agent Actions</span>
                </div>
                <span className="text-[9px] text-slate-500">Real-time</span>
              </div>

              <div className="h-[48px] relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {notifications.map((notif, index) => {
                    if (index !== notificationIndex) return null;
                    const IconComponent = notif.icon;
                    return (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-2.5 items-start absolute w-full"
                      >
                        <div className={`p-1.5 rounded-lg shrink-0 ${
                          notif.status === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                          notif.status === "rewards" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
                          notif.status === "recommendation" ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" :
                          "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        }`}>
                          <IconComponent className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-white leading-tight">{notif.agent}</span>
                          </div>
                          <p className="text-[9px] text-slate-400 leading-tight mt-0.5">{notif.text}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
