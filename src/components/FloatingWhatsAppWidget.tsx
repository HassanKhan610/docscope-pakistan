import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, CheckCircle2, Calendar, Phone } from 'lucide-react';
import { ClinicProfile } from '../types';

interface FloatingWhatsAppWidgetProps {
  clinic: ClinicProfile;
  onOpenBooking: () => void;
  onOpenWhatsAppSimulator: () => void;
}

export const FloatingWhatsAppWidget: React.FC<FloatingWhatsAppWidgetProps> = ({
  clinic,
  onOpenBooking,
  onOpenWhatsAppSimulator
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickInput, setQuickInput] = useState('');
  const [replied, setReplied] = useState<string | null>(null);

  const handleQuickAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;

    setReplied(
      `Yes! Sports collision teeth realignment is 100% within our scope. Our Sports Ortho Bundle is Rs. 14,500/month (0% bank installments). Would you like to reserve a chair today with Dr. Zeeshan Haider?`
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center space-x-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 fill-white text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
          </div>
          <div className="text-left">
            <span className="text-xs font-black tracking-tight block">Need Instant Scope & Tariff?</span>
            <span className="text-[10px] text-emerald-100 font-medium block">
              Ask AI or WhatsApp • 1.2s reply
            </span>
          </div>
        </button>
      ) : (
        /* Floating Popup Window */
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-80 sm:w-96 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-bold text-white border border-white/20">
                <Sparkles className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm">{clinic.name}</h4>
                <p className="text-[11px] text-emerald-100">Live Website Scope Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-slate-50 text-xs">
            <div className="bg-white p-3 rounded-2xl border border-slate-200 text-slate-700 leading-relaxed space-y-1">
              <span className="font-bold text-emerald-700 block">Assalam o Alaikum! 👋</span>
              <p>
                Got a question about our braces packages, sports trauma treatments, or 0% bank installment plans? Type below for an instant grounded answer!
              </p>
            </div>

            {replied && (
              <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 text-emerald-950 space-y-2 animate-in fade-in">
                <div className="flex items-center space-x-1.5 text-[11px] font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified In-Scope (Section 2.1)</span>
                </div>
                <p className="text-xs leading-relaxed">{replied}</p>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition flex items-center justify-center space-x-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book 3D Scan Chair (Rs. 0)</span>
                </button>
              </div>
            )}

            {!replied && (
              <form onSubmit={handleQuickAsk} className="flex items-center space-x-1.5 pt-1">
                <input
                  type="text"
                  placeholder="Ask e.g. Football accident braces..."
                  value={quickInput}
                  onChange={(e) => setQuickInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Direct WhatsApp channel button */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Prefer WhatsApp chat?</span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenWhatsAppSimulator();
                }}
                className="text-[#075E54] hover:underline font-bold flex items-center space-x-1"
              >
                <span>Open in WhatsApp</span>
                <Phone className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
