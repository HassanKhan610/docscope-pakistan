import React, { useState } from 'react';
import { ScopeItem } from '../../types';
import { CheckCircle2, AlertTriangle, ShieldCheck, FileText, ArrowRight } from 'lucide-react';

interface ScopeMatrixPillsProps {
  scopes: ScopeItem[];
  onPreviewSource: (pdfName: string, page: number) => void;
  onSelectScopeForQuery: (scopeTitle: string) => void;
}

export const ScopeMatrixPills: React.FC<ScopeMatrixPillsProps> = ({
  scopes,
  onPreviewSource,
  onSelectScopeForQuery
}) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'DO' | 'DONT'>('ALL');

  const doScopes = scopes.filter((s) => s.type === 'DO');
  const dontScopes = scopes.filter((s) => s.type === 'DONT');

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>100% PDF Grounded Transparency</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Verified Scope of Practice: What We Do vs What We Don't Do
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Never wait a day on WhatsApp just to find out a clinic doesn't handle your condition. Below is our legally verified scope of orthodontic care extracted directly from our clinical handbook.
          </p>
        </div>

        {/* Tab pills */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl self-start md:self-auto">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'ALL'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({scopes.length})
          </button>
          <button
            onClick={() => setActiveTab('DO')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1 ${
              activeTab === 'DO'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-700 hover:bg-emerald-100/60'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>We Do ({doScopes.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('DONT')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1 ${
              activeTab === 'DONT'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-rose-700 hover:bg-rose-100/60'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>We Don't ({dontScopes.length})</span>
          </button>
        </div>
      </div>

      {/* Two Column Grid: DO vs DONT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* WHAT WE DO COLUMN */}
        {(activeTab === 'ALL' || activeTab === 'DO') && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-emerald-800 font-black text-xs uppercase tracking-wider bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>What We Do & Specialize In</span>
            </div>

            <div className="space-y-2.5">
              {doScopes.map((scope) => (
                <div
                  key={scope.id}
                  className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:border-emerald-300 transition group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <h4 className="font-bold text-slate-900 text-sm">{scope.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-4">
                        {scope.description}
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectScopeForQuery(scope.title)}
                      className="shrink-0 p-1.5 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 rounded-lg transition"
                      title="Ask AI about this"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-2.5 pl-4 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-50 pt-2">
                    <button
                      onClick={() => onPreviewSource(scope.pdfSource, scope.pageNumber)}
                      className="font-mono text-blue-600 hover:underline flex items-center space-x-1"
                    >
                      <FileText className="w-3 h-3" />
                      <span>{scope.pdfSource} (p.{scope.pageNumber})</span>
                    </button>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                      In-Scope
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WHAT WE DON'T DO COLUMN */}
        {(activeTab === 'ALL' || activeTab === 'DONT') && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-rose-800 font-black text-xs uppercase tracking-wider bg-rose-50 px-3.5 py-2 rounded-xl border border-rose-200">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>What We Explicitly DO NOT Do</span>
            </div>

            <div className="space-y-2.5">
              {dontScopes.map((scope) => (
                <div
                  key={scope.id}
                  className="p-4 rounded-2xl bg-white border border-rose-100 shadow-sm hover:border-rose-300 transition group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <h4 className="font-bold text-slate-900 text-sm">{scope.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-4">
                        {scope.description}
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectScopeForQuery(scope.title)}
                      className="shrink-0 p-1.5 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 rounded-lg transition"
                      title="Ask AI about this"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-2.5 pl-4 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-50 pt-2">
                    <button
                      onClick={() => onPreviewSource(scope.pdfSource, scope.pageNumber)}
                      className="font-mono text-blue-600 hover:underline flex items-center space-x-1"
                    >
                      <FileText className="w-3 h-3" />
                      <span>{scope.pdfSource} (p.{scope.pageNumber})</span>
                    </button>
                    <span className="text-rose-700 font-semibold bg-rose-50 px-1.5 py-0.5 rounded">
                      Out-of-Scope
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
