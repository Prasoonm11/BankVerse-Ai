"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Sparkles, 
  TrendingUp, 
  Check, 
  Lock, 
  Unlock, 
  ChevronRight,
  Info 
} from "lucide-react";

interface SecurityGuardianProps {
  transactions: any[];
  setTransactions: React.Dispatch<React.SetStateAction<any[]>>;
  agentLogs: any[];
  setAgentLogs: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function SecurityGuardian({
  transactions,
  setTransactions,
  agentLogs,
  setAgentLogs
}: SecurityGuardianProps) {
  // Fraud Guardian Alert states
  const [fraudAlerts, setFraudAlerts] = useState<any[]>([
    {
      id: "alert-1",
      merchant: "Walmart Supercenter",
      location: "Chicago, IL",
      amount: 1240.00,
      reason: "Travel Velocity Violation: Card POS swipe registered in Chicago. Mobile GPS coordinate matches Austin, TX 4 minutes prior.",
      status: "pending"
    }
  ]);
  const [cardLocked, setCardLocked] = useState(false);

  // Life Event Predictions (Feature 10)
  const predictions = [
    {
      id: "pred-1",
      event: "Major International Travel",
      probability: "78%",
      timeframe: "Winter 2026",
      basis: "High-confidence model based on 14% expense increase in travel subcategories, airline ticket queries, and annual flight patterns."
    },
    {
      id: "pred-2",
      event: "Home Downpayment Purchase",
      probability: "62%",
      timeframe: "Mid-2027",
      basis: "Goal Sweep Agent reports savings accumulation inside the 'Property downpayment' vault is tracking 8% ahead of schedules."
    },
    {
      id: "pred-3",
      event: "Vehicle Acquisition",
      probability: "40%",
      timeframe: "Next 4 Months",
      basis: "Calculated based on active Tesla Goal Fund sweeps and 5 consecutive queries on the Loan Calculator page."
    }
  ];

  const [expandedPredId, setExpandedPredId] = useState<string | null>(null);

  // Resolve Fraud Alert
  const resolveAlert = (id: string, action: "confirm" | "dismiss") => {
    setFraudAlerts(prev => prev.map(alert => {
      if (alert.id === id) {
        return { ...alert, status: action === "confirm" ? "confirmed" : "dismissed" };
      }
      return alert;
    }));

    if (action === "confirm") {
      setCardLocked(true);
      // Prepend fraudulent transaction to ledger
      setTransactions(prev => [
        {
          id: Math.random(),
          merchant: "Walmart (Chicago)",
          category: "Shopping",
          amount: -1240.00,
          date: "Today",
          status: "Blocked & Flagged as Fraud"
        },
        ...prev
      ]);
    } else {
      // Prepend verified transaction to ledger
      setTransactions(prev => [
        {
          id: Math.random(),
          merchant: "Walmart (Chicago)",
          category: "Shopping",
          amount: -1240.00,
          date: "Today",
          status: "Authorized (Matches device GPS)"
        },
        ...prev
      ]);
    }
  };

  // Sync logs in real time
  const triggerSyncCycle = () => {
    const logs = [
      "[Fraud Guardian] Auditing pending transaction feeds... Clean.",
      "[Rewards Optimizer] Automatically matched 5% dining rewards for Chase Freedom.",
      "[Finance Coach] Scanned surplus balance. Sweping $500 cash to Wealth Growth SIP.",
      "[Digital Twin]FIRE retirement index recalculated. FIRE projection: Age 53 (-1 month adjustment)."
    ];
    const randomLog = logs[Math.floor(Math.random() * logs.length)];
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setAgentLogs(prev => [
      { time: timeStr, agent: "AI Orchestrator", action: randomLog },
      ...prev
    ]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full"
    >
      {/* Left panel: Fraud Guardian Alerts */}
      <div className="lg:col-span-7 flex flex-col gap-6 justify-between">
        
        {/* Fraud Guardian (Feature 7) */}
        <div className="bg-slate-900/10 border border-white/5 rounded-3xl p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h5 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase">
              <ShieldAlert className="h-4.5 w-4.5 text-red-400" /> Fraud Guardian Audits
            </h5>

            <button
              onClick={() => setCardLocked(!cardLocked)}
              className={`px-3 py-1 rounded-lg text-[9px] font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                cardLocked 
                  ? "bg-red-500/20 text-red-400 border border-red-500/30" 
                  : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              }`}
            >
              {cardLocked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
              {cardLocked ? "Card Locked" : "Card Unlocked"}
            </button>
          </div>

          <div className="space-y-4">
            {fraudAlerts.map((alert) => (
              <div 
                key={alert.id}
                className={`p-4 rounded-2xl border transition-all ${
                  alert.status === "confirmed" ? "bg-red-500/5 border-red-500/20" :
                  alert.status === "dismissed" ? "bg-emerald-500/5 border-emerald-500/20" :
                  "bg-slate-950/40 border-white/5"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h6 className="text-[11px] font-bold text-white flex items-center gap-1.5">
                      Suspicious POS Charge: ${alert.amount.toLocaleString()}
                    </h6>
                    <p className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">{alert.merchant} • {alert.location}</p>
                  </div>
                  
                  {alert.status !== "pending" && (
                    <span className={`text-[8px] font-bold uppercase border px-2 py-0.5 rounded ${
                      alert.status === "confirmed" ? "text-red-400 border-red-500/20 bg-red-500/10" : "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"
                    }`}>
                      {alert.status === "confirmed" ? "Blocked Fraud" : "Authorized"}
                    </span>
                  )}
                </div>

                <p className="text-[9px] text-slate-400 mt-2 leading-relaxed bg-slate-950/20 p-2.5 rounded-xl border border-white/2">
                  {alert.reason}
                </p>

                {alert.status === "pending" && (
                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={() => resolveAlert(alert.id, "dismiss")}
                      className="flex-1 py-1.5 bg-transparent border border-white/10 hover:bg-white/5 text-slate-300 hover:text-white text-[9px] font-bold rounded-xl cursor-pointer"
                    >
                      Authorize Charge
                    </button>
                    <button 
                      onClick={() => resolveAlert(alert.id, "confirm")}
                      className="flex-1 py-1.5 bg-red-500 hover:bg-red-400 text-white text-[9px] font-bold rounded-xl shadow-md cursor-pointer"
                    >
                      Confirm Fraud
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Life Event Predictions (Feature 10) */}
        <div className="bg-slate-900/10 border border-white/5 rounded-3xl p-6 space-y-4">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider">Life Event Predictions</h5>

          <div className="grid grid-cols-3 gap-3">
            {predictions.map((p) => {
              const isExpanded = expandedPredId === p.id;
              return (
                <div 
                  key={p.id}
                  onClick={() => setExpandedPredId(isExpanded ? null : p.id)}
                  className={`p-3 bg-slate-950/40 border rounded-2xl flex flex-col justify-between text-left cursor-pointer transition-all h-28 ${
                    isExpanded ? "border-cyan-accent/40 bg-slate-950" : "border-white/5 hover:border-white/10"
                  }`}
                >
                  <div>
                    <span className="text-[8px] text-slate-500 font-bold uppercase">{p.timeframe}</span>
                    <h6 className="text-[10px] font-bold text-white mt-1 leading-tight truncate">{p.event}</h6>
                  </div>
                  <div className="flex justify-between items-center border-t border-white/5 pt-1.5 mt-2 text-[8px] font-bold uppercase">
                    <span className="text-slate-500">Confidence</span>
                    <span className="text-cyan-accent">{p.probability}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <AnimatePresence>
            {expandedPredId && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-[#7C3AED]/5 border border-[#7C3AED]/15 rounded-xl p-3 flex items-start gap-2.5">
                  <Info className="h-4 w-4 text-[#A78BFA] shrink-0 mt-0.5" />
                  <div className="text-[10px] text-slate-300 leading-normal">
                    <span className="font-bold text-[#A78BFA] block mb-0.5">Prediction Model Rationale</span>
                    {predictions.find(p => p.id === expandedPredId)?.basis}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Right panel: Live Agent Timeline (Feature 15) */}
      <div className="lg:col-span-5 bg-slate-900/10 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-72 h-72 bg-gradient-to-tr from-accent-purple/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4.5 w-4.5 text-[#A78BFA]" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Live Agent Timeline</h4>
            </div>

            <button 
              onClick={triggerSyncCycle}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 text-[#020205] text-[9px] font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
            >
              Sync Cycle
            </button>
          </div>

          <div className="relative pl-3 border-l border-white/5 space-y-4 max-h-[340px] overflow-y-auto pr-1">
            {agentLogs.map((log, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-[19.5px] top-1 w-2 h-2 rounded-full bg-[#7C3AED] border-2 border-[#020205]" />
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-bold text-cyan-accent uppercase">{log.agent}</span>
                  <span className="text-[8px] text-slate-500 font-bold">{log.time}</span>
                </div>
                <p className="text-[10px] text-slate-300 mt-0.5 leading-normal">{log.action}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
