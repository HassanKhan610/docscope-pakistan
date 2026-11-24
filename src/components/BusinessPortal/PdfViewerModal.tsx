import React from 'react';
import { PDFDocument } from '../../types';
import { X, FileText, CheckCircle2, AlertTriangle, Download, ExternalLink } from 'lucide-react';

interface PdfViewerModalProps {
  pdf: PDFDocument | null;
  onClose: () => void;
  activePage?: number;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ pdf, onClose, activePage = 1 }) => {
  const [currentPage, setCurrentPage] = React.useState(activePage);

  if (!pdf) return null;

  const pageData = pdf.contentPages.find(p => p.page === currentPage) || pdf.contentPages[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-slate-800 text-base">{pdf.name}</h3>
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                  Ground-Truth Indexed
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                {pdf.fileName} • {pdf.fileSize} • {pdf.totalPages} Pages total
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Left sidebar (Page thumb) + Right simulated PDF preview */}
        <div className="flex-1 flex overflow-hidden">
          {/* Thumbnails Sidebar */}
          <div className="w-64 border-r border-slate-200 bg-slate-100/70 p-4 overflow-y-auto space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Parsed Scope Pages
            </div>
            {pdf.contentPages.map((pg) => {
              const hasDos = pg.identifiedScopes.some(s => s.type === 'DO');
              const hasDonts = pg.identifiedScopes.some(s => s.type === 'DONT');
              const isSelected = pg.page === currentPage;

              return (
                <button
                  key={pg.page}
                  onClick={() => setCurrentPage(pg.page)}
                  className={`w-full text-left p-3 rounded-xl border transition flex flex-col space-y-1.5 ${
                    isSelected
                      ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-100'
                      : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Page {pg.page}</span>
                    <div className="flex items-center space-x-1">
                      {hasDos && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500" title="Includes 'What We Do' rules" />
                      )}
                      {hasDonts && (
                        <span className="w-2 h-2 rounded-full bg-rose-500" title="Includes 'What We Don't Do' rules" />
                      )}
                    </div>
                  </div>
                  <div className="text-xs font-medium text-slate-600 truncate">{pg.title}</div>
                  <div className="text-[11px] text-slate-400">
                    {pg.identifiedScopes.length} verified rules extracted
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Simulated Document Canvas */}
          <div className="flex-1 bg-slate-200/60 p-6 overflow-y-auto flex justify-center">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg border border-slate-300 p-8 min-h-[600px] flex flex-col justify-between">
              <div>
                {/* Simulated Document Header */}
                <div className="border-b border-slate-200 pb-4 mb-6 flex justify-between items-start">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Official Clinic Documentation
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 mt-2">{pageData.title}</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-mono">Page {pageData.page} of {pdf.totalPages}</span>
                  </div>
                </div>

                {/* Excerpt with Grounded Highlighting */}
                <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed mb-6 bg-slate-50/80 p-5 rounded-xl border border-slate-200/80 font-serif">
                  <p className="italic text-slate-600 leading-7">
                    "{pageData.excerpt}"
                  </p>
                </div>

                {/* Extracted Scope Entities */}
                <div className="space-y-3 mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
                    <span>Parsed Scope Directives from this page</span>
                  </h4>
                  {pageData.identifiedScopes.map((scope, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border flex items-start space-x-3 ${
                        scope.type === 'DO'
                          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                          : 'bg-rose-50/80 border-rose-200 text-rose-950'
                      }`}
                    >
                      {scope.type === 'DO' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded ${
                              scope.type === 'DO'
                                ? 'bg-emerald-200/80 text-emerald-800'
                                : 'bg-rose-200/80 text-rose-800'
                            }`}
                          >
                            {scope.type === 'DO' ? 'WHAT WE DO (IN-SCOPE)' : 'WHAT WE DO NOT DO (OUT-OF-SCOPE)'}
                          </span>
                        </div>
                        <p className="text-xs font-semibold mt-1">{scope.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Footer */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Verified by DocuScope Clinical Extraction Engine v2.4</span>
                <span className="font-mono">Doc ID: {pdf.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>All AI responses for Hamza & prospective patients are strictly locked to these cited pages.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-xl transition"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
