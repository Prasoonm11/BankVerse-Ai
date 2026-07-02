"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  LogIn, 
  Cpu, 
  TrendingUp, 
  Target, 
  Gift, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  ArrowDown
} from "lucide-react";

interface WorkflowStep {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  color: string;
  borderColor: string;
  shadowColor: string;
}

export default function WorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps: WorkflowStep[] = [
    {
      id: 1,
      title: "Customer Login",
      subtitle: "Biometrics & Session Validation",
      icon: LogIn,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      borderColor: "border-blue-500/30",
      shadowColor: "shadow-blue-500/10"
    },
    {
      id: 2,
      title: "AI Orchestrator",
      subtitle: "Multi-Agent Task Allocation",
      icon: Cpu,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      borderColor: "border-indigo-500/30",
      shadowColor: "shadow-indigo-500/10"
    },
    {
      id: 3,
      title: "Finance Agent",
      subtitle: "Portfolio Analytics",
      icon: TrendingUp,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      borderColor: "border-purple-500/30",
      shadowColor: "shadow-purple-500/10"
    },
    {
      id: 4,
      title: "Goal Agent",
      subtitle: "Savings Milestones",
      icon: Target,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      borderColor: "border-emerald-500/30",
      shadowColor: "shadow-emerald-500/10"
    },
    {
      id: 5,
      title: "Rewards Agent",
      subtitle: "Points & Cashback Finder",
      icon: Gift,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      borderColor: "border-amber-500/30",
      shadowColor: "shadow-amber-500/10"
    },
    {
      id: 6,
      title: "Fraud Agent",
      subtitle: "Real-Time Risk Scoring",
      icon: ShieldCheck,
      color: "text-red-400 bg-red-500/10 border-red-500/20",
      borderColor: "border-red-500/30",
      shadowColor: "shadow-red-500/10"
    },
    {
      id: 7,
      title: "Recommendation",
      subtitle: "Hyper-Personalized Actions",
      icon: Sparkles,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      borderColor: "border-cyan-500/40",
      shadowColor: "shadow-cyan-500/20"
    }
  ];

  // Auto cycle through steps
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section id="architecture" className="relative py-32 bg-navy-dark/20 border-t border-white/5 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[20%] left-[-10%] w-[30%] h-[30%] bg-electric-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] bg-cyan-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-xs font-semibold uppercase tracking-wider mb-4">
            System Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            How BankVerse AI Orchestrates
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg">
            Watch the dynamic sequential path of how your login initiates the core AI Orchestrator, distributing tasks securely across multiple cognitive financial agents.
          </p>
        </div>

        {/* Workflow container */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-3 w-full">
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            
            return (
              <React.Fragment key={step.id}>
                {/* Step Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer w-full lg:w-36 flex flex-col items-center justify-center p-5 rounded-2xl border text-center transition-all duration-300 ${
                    isActive 
                      ? `bg-slate-900/90 ${step.borderColor} ${step.shadowColor} shadow-xl scale-105 z-20`
                      : "bg-slate-950/30 border-white/5 hover:border-white/10 hover:bg-slate-950/50 z-10"
                  }`}
                >
                  <div className={`p-3 rounded-xl border mb-3 flex items-center justify-center ${step.color} transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-bold text-white leading-tight tracking-tight line-clamp-1">{step.title}</h4>
                  <p className="text-[9px] text-slate-500 leading-tight mt-1 line-clamp-2 h-6">{step.subtitle}</p>
                </motion.div>

                {/* Arrow (Hidden after the last step) */}
                {idx < steps.length - 1 && (
                  <div className="flex items-center justify-center shrink-0 py-2 lg:py-0">
                    {/* Desktop Arrow */}
                    <div className="hidden lg:block relative">
                      <ArrowRight className={`h-5 w-5 transition-colors duration-300 ${isActive ? "text-cyan-accent animate-pulse" : "text-slate-700"}`} />
                      {isActive && (
                        <motion.div
                          layoutId="activeArrowGlow"
                          className="absolute -inset-1 bg-cyan-accent/20 blur-md rounded-full pointer-events-none"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </div>
                    {/* Mobile Arrow */}
                    <div className="lg:hidden py-1">
                      <ArrowDown className={`h-5 w-5 transition-colors duration-300 ${isActive ? "text-cyan-accent animate-pulse" : "text-slate-700"}`} />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}

        </div>

      </div>
    </section>
  );
}
