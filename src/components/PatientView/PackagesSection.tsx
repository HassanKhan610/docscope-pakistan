import React, { useState } from 'react';
import { PricingPackage } from '../../types';
import { Check, X, FileText, Calendar, Sparkles, Shield, Trophy, CreditCard } from 'lucide-react';

interface PackagesSectionProps {
  packages: PricingPackage[];
  onSelectPackage: (pkg: PricingPackage) => void;
  onPreviewSource: (pdfName: string, page: number) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  packages,
  onSelectPackage,
  onPreviewSource
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'total'>('monthly');

  return (
    <div id="packages-section" className="space-y-6">
      {/* Header with Monthly vs Total Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Official 2026 PKR Tariff Sheet</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Transparent Braces Packages & 0% Bank Installments
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Published directly from our official Lahore clinic tariff PDF. Zero hidden dental lab costs, surprise retainer invoices, or vague WhatsApp estimates.
          </p>
        </div>

        {/* Toggle Pill */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              billingCycle === 'monthly'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            0% Monthly Installments
          </button>
          <button
            onClick={() => setBillingCycle('total')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              billingCycle === 'total'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Total One-Time Price
          </button>
        </div>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const isFeatured = pkg.popular;

          return (
            <div
              key={pkg.id}
              className={`rounded-3xl p-6 lg:p-7 flex flex-col justify-between transition-all duration-200 relative ${
                isFeatured
                  ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white shadow-2xl ring-2 ring-blue-500'
                  : 'bg-white border border-slate-200/90 text-slate-900 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Featured Badge */}
              {pkg.badge && (
                <div
                  className={`absolute -top-3.5 left-6 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm flex items-center space-x-1 ${
                    isFeatured
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 ring-2 ring-white/20'
                      : 'bg-slate-800 text-white'
                  }`}
                >
                  {isFeatured && <Trophy className="w-3.5 h-3.5 text-slate-950" />}
                  <span>{pkg.badge}</span>
                </div>
              )}

              <div>
                {/* Title & Target */}
                <div className="mt-2">
                  <h3 className="text-xl font-black tracking-tight">{pkg.name}</h3>
                  <p
                    className={`text-xs mt-1 leading-relaxed ${
                      isFeatured ? 'text-blue-200' : 'text-slate-500'
                    }`}
                  >
                    {pkg.idealFor}
                  </p>
                </div>

                {/* Price Display in PKR */}
                <div className="my-6 pb-6 border-b border-slate-200/20">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl lg:text-3xl font-extrabold tracking-tight">
                      Rs. {billingCycle === 'monthly' ? pkg.monthlyPrice.toLocaleString() : pkg.totalPrice.toLocaleString()}
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        isFeatured ? 'text-blue-200' : 'text-slate-500'
                      }`}
                    >
                      {billingCycle === 'monthly' ? '/ month (0% Markup)' : ' total in PKR'}
                    </span>
                  </div>

                  <div
                    className={`text-[11px] mt-1.5 ${
                      isFeatured ? 'text-blue-300' : 'text-slate-500'
                    }`}
                  >
                    {billingCycle === 'monthly' ? (
                      <span>
                        Rs. {pkg.deposit.toLocaleString()} advance • {pkg.durationMonths} monthly installments
                      </span>
                    ) : (
                      <span>Complete treatment + retainers included</span>
                    )}
                  </div>

                  {/* Payment partner pill */}
                  <div className="mt-3 flex items-center space-x-1.5 text-[10px] text-slate-400">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Pay via Bank Alfalah, Meezan, Raast, Nayapay, SadaPay</span>
                  </div>
                </div>

                {/* Included Features */}
                <div className="space-y-4">
                  <div>
                    <span
                      className={`text-[11px] font-black uppercase tracking-wider block mb-2.5 ${
                        isFeatured ? 'text-emerald-400' : 'text-emerald-700'
                      }`}
                    >
                      What's Included (Scope Verified)
                    </span>
                    <ul className="space-y-2 text-xs">
                      {pkg.includes.map((inc, i) => (
                        <li key={i} className="flex items-start space-x-2.5">
                          <Check
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isFeatured ? 'text-emerald-400' : 'text-emerald-600'
                            }`}
                          />
                          <span className={isFeatured ? 'text-blue-50' : 'text-slate-700'}>
                            {inc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Explicit Exclusions */}
                  <div className="pt-2">
                    <span
                      className={`text-[11px] font-black uppercase tracking-wider block mb-2.5 ${
                        isFeatured ? 'text-rose-400' : 'text-rose-700'
                      }`}
                    >
                      What's NOT Included (Exclusions)
                    </span>
                    <ul className="space-y-2 text-xs">
                      {pkg.doesNotInclude.map((exc, i) => (
                        <li key={i} className="flex items-start space-x-2.5">
                          <X
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isFeatured ? 'text-rose-400' : 'text-rose-500'
                            }`}
                          />
                          <span
                            className={isFeatured ? 'text-slate-400 line-through' : 'text-slate-500 line-through'}
                          >
                            {exc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom CTA & PDF Citation */}
              <div className="mt-8 pt-5 border-t border-slate-200/20 space-y-3">
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-3 px-4 rounded-xl font-extrabold text-xs shadow-md transition flex items-center justify-center space-x-2 ${
                    isFeatured
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Select & Book Chair Slot</span>
                </button>

                <div className="flex items-center justify-between text-[11px]">
                  <button
                    onClick={() => onPreviewSource(pkg.pdfSource, pkg.pageNumber)}
                    className={`font-mono flex items-center space-x-1 hover:underline ${
                      isFeatured ? 'text-blue-300' : 'text-blue-600'
                    }`}
                  >
                    <FileText className="w-3 h-3" />
                    <span>
                      {pkg.pdfSource} (p.{pkg.pageNumber})
                    </span>
                  </button>
                  <span
                    className={`font-semibold ${
                      isFeatured ? 'text-emerald-300' : 'text-emerald-700'
                    }`}
                  >
                    0% Markup Guaranteed
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
