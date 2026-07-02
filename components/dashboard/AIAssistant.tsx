"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Mic, 
  MicOff, 
  Cpu, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  User,
  ArrowRight,
  UserCheck
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "orchestrator";
  agentName?: string;
  text: string;
  timestamp: string;
}

interface AIAssistantProps {
  onExecuteCommand: (command: string) => void;
  healthScore: number;
}

export default function AIAssistant({ onExecuteCommand, healthScore }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "orchestrator",
      agentName: "AI Orchestrator",
      text: "Hello! I am your AI Orchestrator, coordinating 18 banking agents. Ask me to estimate loans, analyze your budget, predict life events, optimize rewards, or speak commands directly.",
      timestamp: "Just Now"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [voiceWave, setVoiceWave] = useState<number[]>([]);
  const [isTtsActive, setIsTtsActive] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Web Speech API
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Voice recording simulation loop
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setVoiceWave(Array.from({ length: 15 }, () => Math.random() * 30 + 5));
      }, 100);
    } else {
      setVoiceWave([]);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-US";

        rec.onstart = () => {
          setIsRecording(true);
        };

        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
        };

        rec.onerror = (err: any) => {
          console.error("Speech recognition error", err);
          setIsRecording(false);
        };

        rec.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = rec;
      }
    }
  }, []);

  const handleMicClick = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
      } else {
        // Fallback simulated voice typing
        setIsRecording(true);
        setTimeout(() => {
          const prompts = [
            "What is my financial health score?",
            "Predict my upcoming life events",
            "Calculate loan eligibility for $100k",
            "Optimize my credit card rewards"
          ];
          const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
          setInputText(randomPrompt);
          setIsRecording(false);
        }, 3000);
      }
    }
  };

  const speakText = (text: string) => {
    if (!isTtsActive || typeof window === "undefined") return;
    window.speechSynthesis?.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Select a sweet, polite female voice
    if (window.speechSynthesis) {
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => {
        const name = voice.name.toLowerCase();
        return (
          name.includes("samantha") || 
          name.includes("zira") || 
          name.includes("victoria") || 
          name.includes("hazel") ||
          name.includes("karen") ||
          name.includes("google us english") ||
          (name.includes("female") && voice.lang.startsWith("en")) ||
          (name.includes("english") && name.includes("google"))
        );
      });
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
    }
    
    utterance.pitch = 1.25; // Slightly higher pitch for sweetness
    utterance.rate = 0.95; // Slightly slower for polite delivery
    window.speechSynthesis?.speak(utterance);
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    // User Message
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setIsTyping(true);

    // Simulate Agent Coordination Delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    let replyText = "";
    let speakingAgent = "AI Orchestrator";
    const qLower = query.toLowerCase();

    if (qLower.includes("health") || qLower.includes("score")) {
      speakingAgent = "Finance Agent";
      replyText = `Your current Financial Health Score is ${healthScore}/100. The Finance Agent rates your standing as ${
        healthScore > 80 ? "Excellent. Your savings buffer ($12.4k) and investment ratios are highly optimized." : "Good, but we recommend increasing your monthly investment slider to compound your retirement FIRE path."
      }`;
    } else if (qLower.includes("life") || qLower.includes("event") || qLower.includes("predict")) {
      speakingAgent = "Prediction Agent";
      replyText = "Analyzing transaction history... The Life Event Prediction Engine estimates a 78% probability of a major travel purchase in Dec 2026, and a 62% probability of home buying interest by mid-2027 based on savings accumulation.";
    } else if (qLower.includes("loan") || qLower.includes("emi") || qLower.includes("eligibility")) {
      speakingAgent = "Loan Agent";
      replyText = "Based on your $8,000 monthly income and $15,000 liquid capital, you are pre-approved for up to $150,000 in mortgage loans at 6.1% APR. Your estimated 15-year EMI is $1,274/month.";
    } else if (qLower.includes("reward") || qLower.includes("cashback") || qLower.includes("optimize")) {
      speakingAgent = "Rewards Agent";
      replyText = "Scanning active merchant deals... Rewards Optimizer matched 5% cash back on food purchases using Chase Freedom. AutoPay adoption can save you 1.5% further in processing rebates.";
    } else {
      replyText = `Understood. Coordinated response compiled: I have routed your query to the appropriate agent sub-nets. You can adjust the simulation variables under the tabs to see real-time recalculations.`;
    }

    const replyMsg: Message = {
      id: Math.random().toString(),
      sender: "orchestrator",
      agentName: speakingAgent,
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, replyMsg]);
    setIsTyping(false);
    speakText(replyText);

    // Bubble command trigger upwards if dashboard can consume it
    onExecuteCommand(query);
  };

  const samplePrompts = [
    { title: "Financial Health Score", cmd: "Check my financial health score" },
    { title: "Predict Life Events", cmd: "Predict my upcoming life events" },
    { title: "Loan Eligibility", cmd: "Am I eligible for a $100,000 loan?" },
    { title: "Optimize Rewards", cmd: "How can I optimize credit rewards?" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-slate-900/10 border border-white/5 rounded-3xl p-6 flex flex-col h-[520px] justify-between relative overflow-hidden"
    >
      <div className="absolute top-[-30%] right-[-10%] w-72 h-72 bg-gradient-to-bl from-[#7C3AED]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#7C3AED]/20 border border-[#7C3AED]/30 rounded-lg">
            <Cpu className="h-4.5 w-4.5 text-[#A78BFA]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              AI Orchestrator Client
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </h4>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Multi-Agent Synced</p>
          </div>
        </div>
        
        <button 
          onClick={() => setIsTtsActive(!isTtsActive)}
          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
            isTtsActive 
              ? "border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#A78BFA]" 
              : "border-white/5 bg-transparent text-slate-500"
          }`}
          title={isTtsActive ? "Mute Voice Output" : "Enable Voice Output"}
        >
          {isTtsActive ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div 
              key={msg.id} 
              className={`flex items-start gap-2.5 max-w-[85%] ${
                isUser ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center border text-[9px] font-bold ${
                isUser 
                  ? "bg-slate-900 border-white/10 text-white" 
                  : "bg-[#7C3AED]/20 border-[#7C3AED]/30 text-[#A78BFA]"
              }`}>
                {isUser ? <User className="h-3.5 w-3.5" /> : <Cpu className="h-3.5 w-3.5" />}
              </div>

              <div>
                {!isUser && msg.agentName && (
                  <span className="text-[8px] font-bold text-[#A78BFA] bg-[#7C3AED]/10 border border-[#7C3AED]/20 px-1.5 py-0.2 rounded uppercase tracking-wide block w-fit mb-1">
                    {msg.agentName}
                  </span>
                )}
                <div className={`p-3.5 rounded-2xl text-[11px] leading-relaxed ${
                  isUser 
                    ? "bg-white text-[#020205] rounded-tr-none font-medium" 
                    : "bg-slate-950/60 border border-white/5 text-slate-300 rounded-tl-none"
                }`}>
                  {msg.text}
                </div>
                <span className={`text-[7px] text-slate-500 font-bold block mt-1 ${isUser ? "text-right" : "text-left"}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 max-w-[80%]">
            <div className="w-7 h-7 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-[#A78BFA] animate-spin" style={{ animationDuration: "3s" }} />
            </div>
            <div className="px-4 py-3 bg-slate-950/40 border border-white/5 rounded-2xl rounded-tl-none flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex flex-wrap gap-2 mb-3">
        {samplePrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p.cmd)}
            className="text-[9px] font-semibold bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 px-2.5 py-1 rounded-full cursor-pointer transition-colors"
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Voicewave Interface */}
      {isRecording && (
        <div className="flex items-center justify-center gap-1.5 bg-[#7C3AED]/5 border border-[#7C3AED]/20 rounded-2xl py-3 px-4 mb-3">
          <span className="text-[9px] font-bold text-[#A78BFA] uppercase tracking-wider mr-2">Streaming Enclave Mic...</span>
          <div className="flex items-end gap-0.5 h-6">
            {voiceWave.map((h, i) => (
              <div 
                key={i} 
                className="w-1 bg-[#22D3EE] rounded-full transition-all duration-100" 
                style={{ height: `${h}px` }} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Chat Input Area */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleMicClick}
          className={`p-3 rounded-2xl border transition-all cursor-pointer ${
            isRecording 
              ? "bg-red-500/20 border-red-500/30 text-red-400 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.25)]" 
              : "bg-slate-950/60 border-white/5 text-slate-400 hover:text-white hover:border-white/15"
          }`}
          title="Voice Banking Assistant"
        >
          {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Speak or type a command..."
          className="flex-1 bg-slate-950/60 border border-white/5 hover:border-white/10 focus:border-[#7C3AED]/40 px-4 py-3 rounded-2xl text-[11px] text-white placeholder-slate-500 focus:outline-none transition-colors"
        />

        <button
          onClick={() => handleSend()}
          className="p-3 bg-white hover:bg-slate-100 text-[#020205] rounded-2xl cursor-pointer shadow-md transition-colors"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
