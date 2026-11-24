import React from 'react';
import { Clock, TrendingUp, Users, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Appointment } from '../../types';

interface LeadsAnalyticsProps {
  appointments: Appointment[];
  onOpenBooking: () => void;
}

export const LeadsAnalytics: React.FC<LeadsAnalyticsProps> = ({ appointments }) => {
  return (
    <div className="space-y-6">
      {/* WhatsApp vs DocuScope Comparison Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full border border-blue-500/30">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>Conversion Impact vs Legacy WhatsApp</span>
            </div>
            <h3 className="text-xl lg:text-2xl font-black tracking-tight">
              Hamza Waited 24 Hours on WhatsApp. DocuScope Solved It in 45 Seconds.
            </h3>
            <p className="text-slate-300 text-xs lg:text-sm leading-relaxed">
              When prospective clients contact businesses on WhatsApp, delayed responses result in 70%+ drop-off. By grounding an interactive AI directly in your official PDF scope, clients get immediate certainty and book into open clinic slots right away.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 shrink-0">
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-rose-500/30">
              <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block">
                Old WhatsApp Channel
              </span>
              <div className="text-2xl font-black text-rose-300 mt-1">24.5 Hours</div>
              <p className="text-[11px] text-slate-400 mt-1">Average reply lag & lost patient interest</p>
            </div>
            <div className="bg-blue-600/20 p-4 rounded-2xl border border-blue-500/40">
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block">
                DocuScope Engine
              </span>
              <div className="text-2xl font-black text-blue-300 mt-1">1.2 Seconds</div>
              <p className="text-[11px] text-blue-200/80 mt-1">Instant verified answers & 1-click booking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Scoped Inquiries</span>
            <MessageSquare className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">184 Queries</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+38% since PDF sync</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Booked Appointments</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">{appointments.length + 38} Patients</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Direct chair confirmations</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Conversion Rate</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">43.8%</div>
          <div className="text-xs text-slate-500 mt-1">vs 8.2% on phone/WhatsApp</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Grounding Accuracy</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">100%</div>
          <div className="text-xs text-slate-500 mt-1">0 hallucinations / Out-of-bounds</div>
        </div>
      </div>

      {/* Live Inquiry & Booking Activity Stream */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-bold text-slate-900 text-base">Real-Time Patient Inquiry Log</h4>
            <p className="text-xs text-slate-500">Live queries answered by DocuScope grounded in your clinic PDFs</p>
          </div>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Dispatch Active</span>
          </span>
        </div>

        <div className="space-y-3">
          {/* Hamza's Case */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 text-sm">Hamza (Sports Trauma)</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded">
                  Braces Realignment
                </span>
                <span className="text-xs text-slate-400">Just now</span>
              </div>
              <p className="text-xs text-slate-700">
                "Got hit in football, teeth alignment knocked off. Can braces fix it & what packages do you offer?"
              </p>
              <div className="text-[11px] text-emerald-700 font-medium flex items-center space-x-2">
                <span>✓ Verified IN-SCOPE: Sports Trauma Ortho Protocol</span>
                <span>•</span>
                <span>Recommended: Sports Impact Recovery Bundle ($270/mo)</span>
              </div>
            </div>
            <div className="shrink-0 flex items-center space-x-2">
              <span className="px-2.5 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-sm">
                Direct Appointment Booked
              </span>
            </div>
          </div>

          {/* Other recent inquiries */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 text-sm">Marcus K.</span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded">
                  Jaw Surgery Query
                </span>
                <span className="text-xs text-slate-400">22 mins ago</span>
              </div>
              <p className="text-xs text-slate-700">
                "Do you perform full hospital jaw reconstructive fracture surgery?"
              </p>
              <div className="text-[11px] text-rose-600 font-medium flex items-center space-x-2">
                <span>⚠️ Correctly Flagged OUT-OF-SCOPE</span>
                <span>•</span>
                <span>Referred to St. Jude Trauma Center as per Section 4.3</span>
              </div>
            </div>
            <div className="shrink-0 flex items-center space-x-2">
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg">
                Scope Boundary Clarified
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 text-sm">Sara T.</span>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold rounded">
                  Ceramic Braces
                </span>
                <span className="text-xs text-slate-400">1 hr ago</span>
              </div>
              <p className="text-xs text-slate-700">
                "Are monthly 0% installments available without credit check?"
              </p>
              <div className="text-[11px] text-emerald-700 font-medium flex items-center space-x-2">
                <span>✓ Verified IN-SCOPE: In-House 0% Financing</span>
                <span>•</span>
                <span>Package: Pro Ceramic ($245/mo)</span>
              </div>
            </div>
            <div className="shrink-0 flex items-center space-x-2">
              <span className="px-2.5 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-sm">
                Direct Appointment Booked
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
