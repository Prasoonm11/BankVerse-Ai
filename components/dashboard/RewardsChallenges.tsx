"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gift, 
  Sparkles, 
  Award, 
  CheckCircle, 
  Coins, 
  CreditCard, 
  ShoppingBag, 
  Check, 
  Info,
  DollarSign
} from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  desc: string;
  points: number;
  status: "active" | "completed" | "claimed";
}

interface RewardsChallengesProps {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  setTransactions: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function RewardsChallenges({
  balance,
  setBalance,
  setTransactions
}: RewardsChallengesProps) {
  // Gamified challenges states
  const [points, setPoints] = useState(130);
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: "1", title: "Spend-Free Weekend", desc: "Lock dining & entertainment spending from Friday night to Sunday night.", points: 50, status: "active" },
    { id: "2", title: "Budget Discipline Master", desc: "Maintain overall monthly expenditures below $4,500.", points: 100, status: "active" },
    { id: "3", title: "AutoPay Adoption Nudge", desc: "Turn on AutoPay sweeps for recurring utility bills.", points: 30, status: "claimed" }
  ]);
  const [claimedStoreItem, setClaimedStoreItem] = useState<string | null>(null);

  // Rewards Optimizer comparison matrix mock data
  const rewardsMatrix = [
    { category: "Dining out", sapphire: "3x Points", freedom: "5% Cashback ⭐", applePay: "2.0% Cash", debit: "0%" },
    { category: "Gas & Commute", sapphire: "1x Points", freedom: "1.5% Cash", applePay: "3.0% Cash ⭐", debit: "0%" },
    { category: "Flight Bookings", sapphire: "5x Points ⭐", freedom: "1.5% Cash", applePay: "2.0% Cash", debit: "0%" },
    { category: "Utilities / Bills", sapphire: "1x Points", freedom: "1.5% Cash", applePay: "2.0% Cash", debit: "1.5% Rebate ⭐" }
  ];

  // Complete challenge and claim points
  const handleCompleteChallenge = (id: string) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === id) {
        setPoints(p => p + c.points);
        return { ...c, status: "claimed" };
      }
      return c;
    }));
  };

  const storeItems = [
    { id: "amazon", name: "$10 Amazon Gift Card", cost: 100, rewardText: "Amazon Code sent to notifications." },
    { id: "fee-waiver", name: "Elite Card Fee Waiver", cost: 250, rewardText: "Annual account fee waived." },
    { id: "starbucks", name: "$15 Starbucks Voucher", cost: 150, rewardText: "Starbucks barcode sent to inbox." }
  ];

  const handleRedeemItem = (item: any) => {
    if (points < item.cost) return;

    setPoints(p => p - item.cost);
    setClaimedStoreItem(item.name);
    setTimeout(() => {
      setClaimedStoreItem(null);
    }, 3000);

    // If it's a cash equivalent, add it to balance
    if (item.id === "amazon") {
      setBalance(prev => prev + 10);
      setTransactions(prev => [
        {
          id: Math.random(),
          merchant: "Amazon Rewards Redemption",
          category: "Income",
          amount: 10.00,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: "Claimed via Points"
        },
        ...prev
      ]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full"
    >
      {/* Left panel: Rewards Optimizer (Feature 8) */}
      <div className="lg:col-span-6 bg-slate-900/10 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
        <div className="absolute top-[-30%] left-[-10%] w-72 h-72 bg-gradient-to-tr from-cyan-accent/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div>
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-4 mb-4">
            <div className="p-1.5 bg-cyan-accent/10 border border-cyan-accent/20 rounded-lg">
              <CreditCard className="h-4.5 w-4.5 text-cyan-accent" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Rewards Optimizer Agent</h4>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wide">Promotions comparison Engine</p>
            </div>
          </div>

          {/* Matrix table representation */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[8px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-2">Merchant Category</th>
                  <th className="py-2">Sapphire</th>
                  <th className="py-2">Freedom</th>
                  <th className="py-2">Apple Pay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rewardsMatrix.map((row, idx) => (
                  <tr key={idx} className="text-[10px] text-slate-300 hover:bg-white/2 transition-colors">
                    <td className="py-3 font-semibold text-white">{row.category}</td>
                    <td className={`py-3 ${row.sapphire.includes("⭐") ? "text-cyan-accent font-semibold" : ""}`}>{row.sapphire.replace(" ⭐", "")}</td>
                    <td className={`py-3 ${row.freedom.includes("⭐") ? "text-cyan-accent font-semibold" : ""}`}>{row.freedom.replace(" ⭐", "")}</td>
                    <td className={`py-3 ${row.applePay.includes("⭐") ? "text-cyan-accent font-semibold" : ""}`}>{row.applePay.replace(" ⭐", "")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-cyan-accent/5 border border-cyan-accent/15 rounded-2xl p-4 flex items-start gap-2.5">
          <Info className="h-4.5 w-4.5 text-cyan-accent shrink-0 mt-0.5" />
          <p className="text-[9px] text-slate-400 leading-normal">
            ⭐ indicates the optimal payment card calculated by the agent. Opt-in auto-rewards selection inside your system configuration settings.
          </p>
        </div>
      </div>

      {/* Right panel: Financial Challenges & Milestones (Feature 25) */}
      <div className="lg:col-span-6 bg-slate-900/10 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-72 h-72 bg-gradient-to-tr from-accent-purple/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Award className="h-4.5 w-4.5 text-[#A78BFA]" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Personalized Challenges</h4>
            </div>

            <div className="flex items-center gap-1 bg-[#7C3AED]/10 border border-[#7C3AED]/20 px-2.5 py-0.5 rounded-full text-[#A78BFA] text-[10px] font-bold">
              <Coins className="h-3.5 w-3.5" /> {points} Points
            </div>
          </div>

          {/* List of challenges */}
          <div className="space-y-3">
            {challenges.map((c) => {
              const isClaimed = c.status === "claimed";
              return (
                <div 
                  key={c.id} 
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    isClaimed 
                      ? "bg-slate-950/20 border-white/5 opacity-60" 
                      : "bg-slate-950/40 border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="max-w-[70%]">
                    <h6 className="text-[10px] font-bold text-white flex items-center gap-1.5">
                      {c.title}
                      {isClaimed && <Check className="h-3.5 w-3.5 text-emerald-400" />}
                    </h6>
                    <p className="text-[9px] text-slate-400 leading-normal mt-0.5">{c.desc}</p>
                    <span className="text-[8px] text-slate-500 font-bold block mt-1">Reward: +{c.points} Points</span>
                  </div>

                  {!isClaimed && (
                    <button 
                      onClick={() => handleCompleteChallenge(c.id)}
                      className="px-3 py-1.5 bg-white text-[#020205] text-[9px] font-bold rounded-xl shadow-md hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                    >
                      Complete
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Reward Store Redemption */}
        <div className="border-t border-white/5 pt-4 space-y-3">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            <span>Points Store</span>
            <span className="text-[8px] text-slate-400 normal-case">Deducts points on purchase</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {storeItems.map((item) => {
              const canAfford = points >= item.cost;
              return (
                <button
                  key={item.id}
                  disabled={!canAfford}
                  onClick={() => handleRedeemItem(item)}
                  className={`p-2.5 rounded-xl border flex flex-col justify-between items-start text-left transition-all h-24 cursor-pointer ${
                    canAfford 
                      ? "bg-slate-950/60 border-white/5 hover:border-[#7C3AED]/30 hover:bg-slate-950" 
                      : "bg-slate-950/10 border-white/2 opacity-30 cursor-not-allowed"
                  }`}
                >
                  <ShoppingBag className="h-4 w-4 text-slate-400" />
                  <div className="mt-2 w-full">
                    <span className="text-[8px] text-slate-500 font-bold uppercase block leading-tight truncate">{item.name}</span>
                    <span className="text-[9px] font-extrabold text-[#A78BFA]">{item.cost} Pts</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Success banner */}
          <AnimatePresence>
            {claimedStoreItem && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-2.5 text-center text-[9px] text-emerald-400 font-bold uppercase tracking-wider"
              >
                🎉 Successfully Redeemed: {claimedStoreItem}! Check notifications.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}
