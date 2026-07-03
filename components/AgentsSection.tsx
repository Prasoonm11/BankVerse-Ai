"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  UserPlus, 
  Smartphone, 
  TrendingUp, 
  Shield, 
  Gift, 
  Bell, 
  Cpu, 
  Sparkles, 
  ArrowUpRight 
} from "lucide-react";

interface Agent {
  id: number;
  title: string;
  description: string;
  status: string;
  statusColor: string;
  icon: React.ComponentType<any>;
  themeColor: string;
  bgGlow: string;
  featured?: boolean;
}

export default function AgentsSection() {
  const agents: Agent[] = [
    {
      id: 1,
      title: "Customer Acquisition Agent",
      description: "Automates customer onboarding, identity check operations, and KYC compliance verifications instantly.",
      status: "Active",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      icon: UserPlus,
      themeColor: "text-electric-blue border-electric-blue/20 bg-electric-blue/10",
      bgGlow: "group-hover:shadow-electric-blue/15",
    },
    {
      id: 3,
      title: "Finance Coach",
      description: "Analyzes spending habits to formulate tailored investment plans and micro-portfolio recommendations.",
      status: "Active",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      icon: TrendingUp,
      themeColor: "text-accent-purple border-accent-purple/20 bg-accent-purple/10",
      bgGlow: "group-hover:shadow-accent-purple/15",
    },
    {
      id: 5,
      title: "Rewards Optimizer",
      description: "Scans credit profiles and merchant deals to auto-redeem cashbacks and optimize reward point conversion.",
      status: "Optimizing",
      statusColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      icon: Gift,
      themeColor: "text-amber-400 border-amber-400/20 bg-amber-400/10",
      bgGlow: "group-hover:shadow-amber-400/15",
    },
    {
      id: 6,
      title: "Engagement Agent",
      description: "Delivers highly contextual suggestions, financial warnings, and savings alerts in real time.",
      status: "Monitoring",
      statusColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      icon: Bell,
      themeColor: "text-pink-500 border-pink-500/20 bg-pink-500/10",
      bgGlow: "group-hover:shadow-pink-500/15",
    },
    {
      id: 7,
      title: "Digital Twin Simulation Engine",
      description: "Constructs a personalized mathematical replica of your financial future, simulating wealth trajectories, inflation models, goal achievements, and retirement paths under infinite what-if scenarios.",
      status: "Simulating",
      statusColor: "text-cyan-accent bg-cyan-accent/10 border-cyan-accent/20 animate-pulse",
      icon: Cpu,
      themeColor: "text-cyan-accent border-cyan-accent/30 bg-cyan-accent/15",
      bgGlow: "group-hover:shadow-cyan-accent/25",
      featured: true,
    },
  ];

  return (
    <section id="agents" className="relative py-32 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] bg-cyan-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[45%] h-[45%] bg-electric-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-accent/10 border border-cyan-accent/20 text-cyan-accent text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="h-3 w-3" /> Agent Ecosystem
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Autonomous Banking Agents
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 mt-4 text-base sm:text-lg"
          >
            Meet the 5 core AI agents that collaborate within the BankVerse AI ecosystem to completely automate your digital banking, wealth building, and security.
          </motion.p>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => {
            const IconComponent = agent.icon;
            
            // Standard Card Layout (1-6)
            if (!agent.featured) {
              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative flex flex-col justify-between rounded-3xl glass-card p-8 h-full transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    {/* Icon & Status */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3 rounded-2xl border ${agent.themeColor} flex items-center justify-center`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border tracking-wide uppercase flex items-center gap-1 ${agent.statusColor}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        {agent.status}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-accent transition-colors duration-300">
                      {agent.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {agent.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-cyan-accent transition-colors duration-300">
                    <span>Collaborative Node {agent.id}</span>
                    <ArrowUpRight className="h-4 w-4 transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </motion.div>
              );
            }

            // Featured Card Layout (Digital Twin)
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="group relative col-span-1 lg:col-span-2 rounded-3xl glass-card p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Visual Glow Layer */}
                <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-bl from-cyan-accent/10 to-electric-blue/10 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                
                <div className="relative flex flex-col lg:flex-row gap-6 items-center justify-between h-full">
                  
                  {/* Left content block */}
                  <div className="w-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-3 rounded-2xl border ${agent.themeColor} flex items-center justify-center shrink-0`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border tracking-wide uppercase flex items-center gap-1 w-fit ${agent.statusColor}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                          {agent.status}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-accent transition-colors duration-300">
                      {agent.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {agent.description}
                    </p>
                    
                    <div className="mt-8 flex flex-wrap gap-2.5">
                      <span className="text-[10px] font-medium text-slate-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-xl">Compound Wealth Modeling</span>
                      <span className="text-[10px] font-medium text-slate-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-xl">Retirement Projection</span>
                      <span className="text-[10px] font-medium text-slate-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-xl">Predictive Risk Analysis</span>
                    </div>
                  </div>

                  {/* Right simulated graphic */}
                  <div className="w-full lg:w-72 h-44 bg-slate-950/40 rounded-2xl border border-white/5 p-4 flex flex-col justify-between relative overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05)_0%,transparent_70%)]" />
                    
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Twin Simulation Status</span>
                      <span className="text-[10px] font-bold text-cyan-accent uppercase">99.8% Conf.</span>
                    </div>

                    <div className="flex items-center justify-center py-2 h-full">
                      {/* Animated SVG brain circuit waves */}
                      <svg className="w-full h-16" viewBox="0 0 200 60">
                        <path d="M 10 30 Q 30 10, 50 30 T 90 30 T 130 30 T 170 30 T 190 30" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="1.5" />
                        <path d="M 10 30 Q 35 45, 60 30 T 110 30 T 160 30 T 190 30" fill="none" stroke="rgba(37,99,235,0.25)" strokeWidth="1.5" />
                        {/* Interactive scanning pulse */}
                        <motion.circle
                          cx="10"
                          cy="30"
                          r="4"
                          fill="#22D3EE"
                          animate={{
                            cx: [10, 190],
                            cy: [30, 20, 40, 30, 30, 30]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <motion.circle
                          cx="10"
                          cy="30"
                          r="8"
                          stroke="#22D3EE"
                          strokeWidth="1"
                          fill="transparent"
                          opacity="0.3"
                          animate={{
                            cx: [10, 190],
                            cy: [30, 20, 40, 30, 30, 30]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </svg>
                    </div>

                    <div className="text-[9px] text-slate-400 flex items-center justify-between border-t border-white/5 pt-2">
                      <span>Interactive Twin Model</span>
                      <a href="#demo" className="text-cyan-accent hover:underline flex items-center gap-0.5">Simulate <ArrowUpRight className="h-3 w-3" /></a>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
