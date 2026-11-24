import React from 'react';
import { ShieldCheck, FileText, User, Sparkles, Calendar, Layers, Zap, CheckCircle2, Smartphone, Code2 } from 'lucide-react';
import { ClinicProfile } from '../types';

interface HeaderProps {
  currentView: 'patient' | 'business' | 'whatsapp' | 'split';
  onChangeView: (view: 'patient' | 'business' | 'whatsapp' | 'split') => void;
  clinic: ClinicProfile;
  appointmentCount: number;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onChangeView,
  clinic,
  appointmentCount,
  onOpenBooking
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 shadow-xl text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Clinic Info */}
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 text-white flex items-center justify-center font-black shadow-lg shadow-blue-500/25 ring-1 ring-white/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-white text-lg tracking-tight">DocuScope</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-black rounded-md border border-emerald-500/30 uppercase tracking-wider">
                  Pakistan 🇵🇰
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-200">{clinic.name}</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">DHA Phase 5, Lahore</span>
              </div>
            </div>
          </div>

          {/* Navigation View Switcher */}
          <div className="flex items-center space-x-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
            <button
              onClick={() => onChangeView('patient')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition flex items-center space-x-1.5 ${
                currentView === 'patient'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Hamza's View</span>
            </button>

            <button
              onClick={() => onChangeView('whatsapp')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition flex items-center space-x-1.5 ${
                currentView === 'whatsapp'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>WhatsApp Bot Simulator</span>
            </button>

            <button
              onClick={() => onChangeView('business')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition flex items-center space-x-1.5 ${
                currentView === 'business'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Clinic Owner Hub</span>
            </button>

            <button
              onClick={() => onChangeView('split')}
              className={`hidden lg:flex px-3.5 py-2 rounded-xl text-xs font-extrabold transition items-center space-x-1.5 ${
                currentView === 'split'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Split Dual Demo</span>
            </button>
          </div>

          {/* Right Action: Direct Booking */}
          <div className="flex items-center space-x-3">
            <div className="hidden xl:flex items-center space-x-2 text-xs text-slate-400 font-medium">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>1.2s vs 24h WhatsApp Lag</span>
            </div>

            <button
              onClick={onOpenBooking}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-500/25 transition flex items-center space-x-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
              {appointmentCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white/20 text-white text-[10px] flex items-center justify-center font-bold">
                  {appointmentCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
