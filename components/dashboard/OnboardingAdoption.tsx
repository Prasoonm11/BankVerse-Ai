"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserCheck, 
  UploadCloud, 
  RefreshCw, 
  Camera, 
  CheckCircle2, 
  Smartphone, 
  Zap, 
  CreditCard, 
  Award, 
  BookOpen, 
  ShieldCheck 
} from "lucide-react";

interface OnboardingAdoptionProps {
  kycStatus: string;
  setKycStatus: (status: string) => void;
  digitalAdoptionRate: number;
  setDigitalAdoptionRate: (rate: number) => void;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  setTransactions: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function OnboardingAdoption({
  kycStatus,
  setKycStatus,
  digitalAdoptionRate,
  setDigitalAdoptionRate,
  setBalance,
  setTransactions
}: OnboardingAdoptionProps) {
  // Onboarding Wizard states
  const [onboardStep, setOnboardStep] = useState(1);
  const [profileForm, setProfileForm] = useState({
    name: "Prasoon Mathur",
    income: "96000",
    risk: "Moderate"
  });
  const [isScanningDoc, setIsScanningDoc] = useState(false);
  const [docScanSuccess, setDocScanSuccess] = useState(false);
  
  const [isFacialScanning, setIsFacialScanning] = useState(false);
  const [faceScanSuccess, setFaceScanSuccess] = useState(false);

  // Digital Adoption states
  const [activeServices, setActiveServices] = useState<string[]>(["mobile-banking"]);
  const [guideModal, setGuideModal] = useState<any | null>(null);

  const adoptionServices = [
    {
      id: "upi",
      title: "UPI instant Transfer",
      desc: "Enable instant bank-to-bank UPI transfers directly on your account.",
      reward: "UPI Node Active"
    },
    {
      id: "autopay",
      title: "Smart AutoPay",
      desc: "Automate recurrent utility and bill payments based on AI recommendations.",
      reward: "+₹1,500 SignUp Cashback"
    },
    {
      id: "investment",
      title: "AI Mutual Fund SIP",
      desc: "Activate recurring systematic investment sweeps tailored by the coach.",
      reward: "+100 Challenge Points"
    },
    {
      id: "mobile-banking",
      title: "Mobile App Access",
      desc: "Already set up for secure dev environment access.",
      reward: "Default Activated"
    }
  ];

  // Sync digital adoption rating percentage based on active services
  useEffect(() => {
    const rate = Math.round((activeServices.length / adoptionServices.length) * 100);
    setDigitalAdoptionRate(rate);
  }, [activeServices]);

  const handleActivateService = (service: any) => {
    // Open instructions modal first
    setGuideModal(service);
  };

  const confirmServiceActivation = (serviceId: string) => {
    if (activeServices.includes(serviceId)) return;
    
    setActiveServices(prev => [...prev, serviceId]);
    setGuideModal(null);

    // Apply cashback or reward if autopay is activated
    if (serviceId === "autopay") {
      setBalance(prev => prev + 1500);
      setTransactions(prev => [
        {
          id: Math.random(),
          merchant: "AutoPay Activation Credit",
          category: "Income",
          amount: 1500.00,
          date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: "Processed"
        },
        ...prev
      ]);
    }
  };

  // Onboarding flow control
  const triggerDocScan = () => {
    setIsScanningDoc(true);
    setTimeout(() => {
      setIsScanningDoc(false);
      setDocScanSuccess(true);
      setOnboardStep(3);
    }, 2000);
  };

  const triggerFacialScan = () => {
    setIsFacialScanning(true);
    setTimeout(() => {
      setIsFacialScanning(false);
      setFaceScanSuccess(true);
      setOnboardStep(4);
      setKycStatus("verified");
    }, 2500);
  };

  // Product recommendation suggestions based on user risk
  const getProductRecommendation = () => {
    const incVal = Number(profileForm.income);
    if (profileForm.risk === "Aggressive") {
      return {
        card: "Metal Black Elite Credit Card",
        limit: "₹2,50,000 Limit",
        details: "Includes 5x points on flight bookings and automated mileage conversion optimizations.",
        fund: "Quantum Growth SIP Mutual Fund",
        expectedYield: "Estimated 14.5% Yield Projection"
      };
    } else if (profileForm.risk === "Conservative") {
      return {
        card: "Platinum Shield Secured Credit Card",
        limit: "₹50,000 Limit",
        details: "1.5% flat cashback with secure transactions auto-audited by Guardian.",
        fund: "Treasury Bonds Sweep Account",
        expectedYield: "Guaranteed 4.8% APY Secure Yield"
      };
    } else {
      return {
        card: "Titanium Prime Rewards Card",
        limit: "₹1,20,000 Limit",
        details: "3x points on dining and utilities with auto-redeem capability.",
        fund: "Balanced Horizon Index Portfolio",
        expectedYield: "Balanced 8.5% Compound Return"
      };
    }
  };

  const product = getProductRecommendation();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full"
    >
      {/* Onboarding Wizard Sandbox (Customer Acquisition Agent) */}
      <div className="lg:col-span-6 bg-slate-900/10 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
        <div className="absolute top-[-30%] left-[-10%] w-72 h-72 bg-gradient-to-tr from-cyan-accent/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
        
        <div>
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-4 mb-4">
            <div className="p-1.5 bg-cyan-accent/10 border border-cyan-accent/20 rounded-lg">
              <UserCheck className="h-4.5 w-4.5 text-cyan-accent" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                Acquisition Agent Sandbox
                <span className="text-[8px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  KYC Portal
                </span>
              </h4>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wide">Customer Onboarding Wizard</p>
            </div>
          </div>

          {/* Wizard Steps Content */}
          <div className="h-[280px] flex flex-col justify-center">
            {onboardStep === 1 && (
              <div className="space-y-4">
                <h5 className="text-xs font-bold text-white uppercase tracking-wider">Step 1: Configure Personal Profile</h5>
                <div className="space-y-3">
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      value={profileForm.name} 
                      onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-950/60 border border-white/5 px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-accent/40 mt-1" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Annual Income (₹)</label>
                      <input 
                        type="number" 
                        value={profileForm.income} 
                        onChange={(e) => setProfileForm(prev => ({ ...prev, income: e.target.value }))}
                        className="w-full bg-slate-950/60 border border-white/5 px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-accent/40 mt-1" 
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Risk Profile</label>
                      <select 
                        value={profileForm.risk} 
                        onChange={(e) => setProfileForm(prev => ({ ...prev, risk: e.target.value }))}
                        className="w-full bg-slate-950/60 border border-white/5 px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-accent/40 mt-1"
                      >
                        <option>Conservative</option>
                        <option>Moderate</option>
                        <option>Aggressive</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setOnboardStep(2)}
                  className="w-full py-2.5 bg-white text-[#020205] text-xs font-bold rounded-xl shadow-md hover:bg-slate-100 transition-all cursor-pointer mt-3"
                >
                  Continue to Document Scan
                </button>
              </div>
            )}

            {onboardStep === 2 && (
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-4">
                <h5 className="text-xs font-bold text-white uppercase tracking-wider">Step 2: Authenticate Identity Document</h5>
                <p className="text-[10px] text-slate-400 max-w-[320px] leading-normal">
                  Upload a scanned copy of your ID. The Acquisition Agent will execute automated OCR validation checks.
                </p>

                {isScanningDoc ? (
                  <div className="flex flex-col items-center space-y-2 py-4">
                    <RefreshCw className="h-8 w-8 text-cyan-accent animate-spin" />
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest animate-pulse">Running OCR ID Decryption...</span>
                  </div>
                ) : (
                  <button 
                    onClick={triggerDocScan}
                    className="w-56 h-28 border border-dashed border-white/10 hover:border-cyan-accent/30 bg-slate-950/40 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <UploadCloud className="h-6 w-6 text-slate-500" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Simulate ID Upload</span>
                  </button>
                )}
              </div>
            )}

            {onboardStep === 3 && (
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-4">
                <h5 className="text-xs font-bold text-white uppercase tracking-wider">Step 3: Biometric Video Verification</h5>
                <p className="text-[10px] text-slate-400 max-w-[320px] leading-normal">
                  Engage webcam scan frame for facial recognition cross-referencing.
                </p>

                {isFacialScanning ? (
                  <div className="relative w-24 h-24 rounded-full border-2 border-cyan-accent overflow-hidden flex items-center justify-center bg-slate-950/60 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                    <Camera className="h-6 w-6 text-cyan-accent animate-bounce" />
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-cyan-accent animate-scan" style={{ animation: "scan 2s linear infinite" }} />
                  </div>
                ) : (
                  <button 
                    onClick={triggerFacialScan}
                    className="px-6 py-3 bg-white text-[#020205] text-xs font-bold rounded-xl shadow-md hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Camera className="h-4 w-4" /> Initialize Video Scan
                  </button>
                )}
              </div>
            )}

            {onboardStep === 4 && (
              <div className="space-y-4 py-2">
                <div className="flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-3.5">
                  <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-[10px] text-slate-300 leading-normal">
                    <span className="font-bold text-emerald-400 block mb-0.5">Biometrics Successfully Verified</span>
                    KYC scan completed. Identity match confidence score verified at 99.85%.
                  </div>
                </div>

                <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4 space-y-2">
                  <span className="text-[8px] font-bold text-[#A78BFA] uppercase tracking-wider">Specialized Recommendations (Personalized Products)</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[8px] text-slate-500 font-bold uppercase">Card Suggestion</p>
                      <h6 className="text-[10px] font-bold text-white">{product.card}</h6>
                      <p className="text-[8px] text-slate-400 leading-relaxed mt-0.5">{product.limit}</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-slate-500 font-bold uppercase">Investment Suggestion</p>
                      <h6 className="text-[10px] font-bold text-white">{product.fund}</h6>
                      <p className="text-[8px] text-slate-400 leading-relaxed mt-0.5">{product.expectedYield}</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setOnboardStep(1);
                    setDocScanSuccess(false);
                    setFaceScanSuccess(false);
                  }}
                  className="w-full py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-[10px] font-bold rounded-xl cursor-pointer transition-colors"
                >
                  Restart KYC Simulation Sandbox
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex justify-between items-center text-[9px] text-slate-500 font-bold uppercase border-t border-white/5 pt-4">
          <span>Acquisition Node State</span>
          <span className={kycStatus === "verified" ? "text-emerald-400" : "text-cyan-accent animate-pulse"}>
            {kycStatus === "verified" ? "KYC Compliant" : "Awaiting Verification"}
          </span>
        </div>
      </div>

      {/* Digital Adoption Guide Checklist */}
      <div className="lg:col-span-6 bg-slate-900/10 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-72 h-72 bg-gradient-to-tr from-accent-purple/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div>
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-4 mb-4">
            <div className="p-1.5 bg-[#7C3AED]/20 border border-[#7C3AED]/30 rounded-lg">
              <Smartphone className="h-4.5 w-4.5 text-[#A78BFA]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                Digital Adoption Agent
                <span className="text-[8px] font-bold text-[#A78BFA] bg-[#7C3AED]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Guides
                </span>
              </h4>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wide">Interactive Feature Adoption Hub</p>
            </div>
          </div>

          <div className="space-y-3">
            {adoptionServices.map((service) => {
              const isServiceActive = activeServices.includes(service.id);
              return (
                <div 
                  key={service.id} 
                  className={`p-3 rounded-2xl flex items-center justify-between border transition-all ${
                    isServiceActive 
                      ? "bg-emerald-500/5 border-emerald-500/15" 
                      : "bg-slate-950/40 border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="max-w-[70%]">
                    <h6 className="text-[10px] font-bold text-white flex items-center gap-1.5">
                      {service.title}
                      {isServiceActive && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                    </h6>
                    <p className="text-[9px] text-slate-400 leading-normal mt-0.5">{service.desc}</p>
                  </div>

                  <button
                    onClick={() => handleActivateService(service)}
                    disabled={isServiceActive}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-bold transition-all cursor-pointer ${
                      isServiceActive 
                        ? "bg-transparent text-emerald-400 border border-emerald-500/20" 
                        : "bg-white text-[#020205] hover:bg-slate-100 shadow-md"
                    }`}
                  >
                    {isServiceActive ? "Active" : "Activate"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Adoption percentage bar */}
        <div className="border-t border-white/5 pt-4 space-y-2">
          <div className="flex justify-between items-center text-[9px] text-slate-500 font-bold uppercase">
            <span>Overall Adoption score</span>
            <span className="text-cyan-accent">{digitalAdoptionRate}% Complete</span>
          </div>
          <div className="w-full bg-slate-950/60 border border-white/5 h-2.5 rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-[#7C3AED] to-cyan-accent rounded-full transition-all duration-500" 
              style={{ width: `${digitalAdoptionRate}%` }} 
            />
          </div>
        </div>

        {/* Interactive Guide Tour Modal (Digital Adoption Agent Simulation) */}
        <AnimatePresence>
          {guideModal && (
            <div className="fixed inset-0 z-50 bg-[#020205]/80 flex items-center justify-center p-6 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-[400px] bg-slate-900 border border-white/10 rounded-3xl p-6 relative shadow-2xl"
              >
                <div className="flex items-center gap-2.5 border-b border-white/5 pb-4 mb-4">
                  <BookOpen className="h-5 w-5 text-cyan-accent" />
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">{guideModal.title} Tutorial Guide</h5>
                </div>

                <div className="space-y-4">
                  <div className="text-[10px] text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 border border-white/5 rounded-2xl">
                    <span className="font-bold text-cyan-accent block mb-1">Interactive Agent Instructions</span>
                    To complete registration for {guideModal.title}, our agent has pre-compiled your verified KYC data structure. Simply authorize below.
                  </div>

                  <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl p-3">
                    <Zap className="h-4 w-4 text-[#A78BFA] shrink-0" />
                    <div className="text-[9px] text-slate-400 leading-normal">
                      <span className="font-semibold text-slate-300 block">Reward for Activating</span>
                      {guideModal.reward}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => setGuideModal(null)}
                      className="flex-1 py-2 bg-transparent border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white text-[10px] font-bold rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => confirmServiceActivation(guideModal.id)}
                      className="flex-1 py-2 bg-cyan-accent hover:bg-cyan-400 text-[#020205] text-[10px] font-bold rounded-xl shadow-md cursor-pointer"
                    >
                      Authorize & Activate
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
