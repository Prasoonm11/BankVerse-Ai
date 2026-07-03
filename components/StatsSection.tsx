"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

function Counter({ value, suffix = "", decimals = 0, duration = 1.5 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalFrames = Math.min(Math.floor(duration * 60), 100);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const currentVal = start + (end - start) * (progress * (2 - progress));
      
      setCount(currentVal);

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(counter);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [isInView, value, duration]);

  const formattedCount = count.toFixed(decimals);

  return (
    <span ref={ref} className="font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-accent bg-clip-text text-transparent">
      {formattedCount}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const stats = [
    {
      value: 250,
      suffix: "K+",
      decimals: 0,
      label: "Customers Assisted",
      description: "Autonomous onboarding & support requests solved.",
      glow: "border-electric-blue/15 shadow-electric-blue/5 hover:border-electric-blue/35",
    },
    {
      value: 99.8,
      suffix: "%",
      decimals: 1,
      label: "Fraud Detection",
      description: "Real-time mitigation of sophisticated threats.",
      glow: "border-cyan-accent/15 shadow-cyan-accent/5 hover:border-cyan-accent/35",
    },
    {
      value: 6,
      suffix: "",
      decimals: 0,
      label: "AI Agents",
      description: "Autonomous agents collaborating in real-time.",
      glow: "border-success-emerald/15 shadow-success-emerald/5 hover:border-success-emerald/35",
    },
  ];

  return (
    <section className="relative py-24 bg-navy-dark/40 border-y border-white/5 overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-8 rounded-3xl bg-slate-900/30 backdrop-blur-md border ${stat.glow} transition-all duration-300 shadow-lg`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-baseline">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white tracking-tight">{stat.label}</h4>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">{stat.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
