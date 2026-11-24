import React from 'react';
import { UserCheck, Clock, Zap, ArrowRight, ShieldCheck, Sparkles, MessageCircle, AlertCircle } from 'lucide-react';

interface HamzaScenarioBannerProps {
  onAskHamzaQuery: (query: string) => void;
  onOpenBooking: () => void;
  onOpenPackages: () => void;
  onOpenWhatsAppSimulator: () => void;
}

export const HamzaScenarioBanner: React.FC<HamzaScenarioBannerProps> = ({
  onAskHamzaQuery,
  onOpenBooking,
  onOpenPackages,
  onOpenWhatsAppSimulator
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 lg:p-8 text-white shadow-2xl border border-slate-800 mb-8">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -ml-20 -mb-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Real-Life Case: Hamza's Football Dental Collision</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold rounded-full border border-emerald-500/30">
              <span>Lahore, Pakistan</span>
            </span>
          </div>

          <h2 className="text-xl lg:text-3xl font-black tracking-tight text-white leading-tight">
            "In football my teeth alignment got knocked off. I needed braces fast."
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-rose-500/20 text-xs">
              <div className="flex items-center space-x-1.5 text-rose-400 font-bold mb-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>The Pakistan Clinic Friction</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Hamza found a clinic on Google Search with only a WhatsApp number. He asked basic package and trauma questions and waited <strong>over 24 hours</strong> for a vague reply.
              </p>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-emerald-500/20 text-xs">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-bold mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>The DocuScope Fix</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                The clinic's official PDF scope is verified in <strong>1.2 seconds</strong>: sports trauma is covered, packages start at <strong>Rs. 14,500/mo</strong>, and chair is booked today!
              </p>
            </div>
          </div>
        </div>

        {/* Quick Simulation CTAs */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
          <button
            onClick={() =>
              onAskHamzaQuery(
                'I was hit in football and my teeth alignment shifted. Can braces fix this, what packages do you offer, and what are the payment plans?'
              )
            }
            className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center justify-between space-x-3 group"
          >
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Simulate Hamza's Query (Web)</span>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 transition" />
          </button>

          <button
            onClick={onOpenWhatsAppSimulator}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Test on WhatsApp Simulator</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition flex items-center justify-center space-x-2"
          >
            <span>Book Chair Slot Directly</span>
          </button>
        </div>
      </div>
    </div>
  );
};
