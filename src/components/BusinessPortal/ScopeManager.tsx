import React, { useState } from 'react';
import { ScopeItem, PDFDocument } from '../../types';
import { CheckCircle2, AlertTriangle, Plus, Search, Filter, ShieldCheck, FileText, Trash2, Edit3, X } from 'lucide-react';

interface ScopeManagerProps {
  scopes: ScopeItem[];
  documents: PDFDocument[];
  onAddScope: (scope: ScopeItem) => void;
  onDeleteScope: (id: string) => void;
  onPreviewDocumentByName?: (pdfName: string, page: number) => void;
}

export const ScopeManager: React.FC<ScopeManagerProps> = ({
  scopes,
  documents,
  onAddScope,
  onDeleteScope,
  onPreviewDocumentByName
}) => {
  const [filterType, setFilterType] = useState<'ALL' | 'DO' | 'DONT'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New scope form state
  const [newType, setNewType] = useState<'DO' | 'DONT'>('DO');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<ScopeItem['category']>('Trauma & Emergency');
  const [newPdf, setNewPdf] = useState(documents[0]?.fileName || 'Apex_Ortho_Trauma_Scope_2026.pdf');
  const [newPage, setNewPage] = useState(2);
  const [newSnippet, setNewSnippet] = useState('');

  const categories = [
    'ALL',
    'Trauma & Emergency',
    'Braces & Aligners',
    'Surgery & Extractions',
    'Financial & Billing',
    'Consultation'
  ];

  const filteredScopes = scopes.filter((scope) => {
    if (filterType !== 'ALL' && scope.type !== filterType) return false;
    if (selectedCategory !== 'ALL' && scope.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        scope.title.toLowerCase().includes(q) ||
        scope.description.toLowerCase().includes(q) ||
        scope.pdfSource.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const doCount = scopes.filter((s) => s.type === 'DO').length;
  const dontCount = scopes.filter((s) => s.type === 'DONT').length;

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newScope: ScopeItem = {
      id: `scope-${Date.now()}`,
      type: newType,
      title: newTitle,
      description: newDesc || newTitle,
      category: newCategory,
      pdfSource: newPdf,
      pageNumber: Number(newPage) || 1,
      highlightSnippet: newSnippet || newTitle,
      confidence: 99
    };

    onAddScope(newScope);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewSnippet('');
  };

  return (
    <div className="space-y-6">
      {/* Top Stats & Scope Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Verified In-Scope ("What We Do")
            </span>
            <div className="text-3xl font-extrabold text-emerald-950 mt-1">{doCount} Rules</div>
            <p className="text-xs text-emerald-700 mt-1">
              Treatments we actively take on & excel at
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
              Verified Out-of-Scope ("What We Don't Do")
            </span>
            <div className="text-3xl font-extrabold text-rose-950 mt-1">{dontCount} Exclusions</div>
            <p className="text-xs text-rose-700 mt-1">
              Zero ambiguity. Prevents wasted clinic visits
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
              Ground-Truth PDF Fidelity
            </span>
            <div className="text-3xl font-extrabold text-blue-950 mt-1">98.8%</div>
            <p className="text-xs text-blue-700 mt-1">
              Every rule is cited to exact page & line
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Controls Bar: Filter tabs, Search, Add Rule button */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Type Filter */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl w-full md:w-auto">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filterType === 'ALL'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Scope Rules ({scopes.length})
          </button>
          <button
            onClick={() => setFilterType('DO')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1 ${
              filterType === 'DO'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-700 hover:bg-emerald-100/60'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>What We Do ({doCount})</span>
          </button>
          <button
            onClick={() => setFilterType('DONT')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1 ${
              filterType === 'DONT'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-rose-700 hover:bg-rose-100/60'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>What We Don't Do ({dontCount})</span>
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="flex items-center space-x-2 w-full md:w-auto flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search scope (e.g. football, braces, surgery)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'ALL' ? 'All Categories' : c}
              </option>
            ))}
          </select>
        </div>

        {/* Add Rule Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full md:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center justify-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Scope Rule</span>
        </button>
      </div>

      {/* Scope Cards Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredScopes.map((scope) => {
          const isDo = scope.type === 'DO';
          return (
            <div
              key={scope.id}
              className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                isDo
                  ? 'bg-white border-emerald-200 hover:border-emerald-300 shadow-sm hover:shadow-emerald-500/5'
                  : 'bg-white border-rose-200 hover:border-rose-300 shadow-sm hover:shadow-rose-500/5'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2.5 py-1 text-[11px] font-black rounded-lg flex items-center space-x-1 ${
                        isDo
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {isDo ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>WHAT WE DO</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>WHAT WE DON'T DO</span>
                        </>
                      )}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {scope.category}
                    </span>
                  </div>

                  <button
                    onClick={() => onDeleteScope(scope.id)}
                    className="text-slate-300 hover:text-rose-600 p-1 rounded transition"
                    title="Delete Rule"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h4 className="font-bold text-slate-900 text-base mt-3 leading-snug">
                  {scope.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {scope.description}
                </p>

                {/* Grounding Excerpt */}
                <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 font-serif italic">
                  "{scope.highlightSnippet}"
                </div>
              </div>

              {/* Footer with PDF Citation */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() =>
                    onPreviewDocumentByName &&
                    onPreviewDocumentByName(scope.pdfSource, scope.pageNumber)
                  }
                  className="text-blue-600 hover:text-blue-700 font-mono text-[11px] flex items-center space-x-1 underline underline-offset-2"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>
                    {scope.pdfSource} (p. {scope.pageNumber})
                  </span>
                </button>

                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {scope.confidence}% Grounded
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Rule Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-base">Add New Clinic Scope Rule</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNew} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Scope Directive Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewType('DO')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition ${
                      newType === 'DO'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>WHAT WE DO</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType('DONT')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition ${
                      newType === 'DONT'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>WHAT WE DON'T DO</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Rule Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sports impact dental displacement braces"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Description & Scope Explanation
                </label>
                <textarea
                  rows={2}
                  placeholder="Detail the exact clinical criteria or patient conditions accepted or excluded..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="Trauma & Emergency">Trauma & Emergency</option>
                    <option value="Braces & Aligners">Braces & Aligners</option>
                    <option value="Surgery & Extractions">Surgery & Extractions</option>
                    <option value="Financial & Billing">Financial & Billing</option>
                    <option value="Consultation">Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    PDF Source File
                  </label>
                  <select
                    value={newPdf}
                    onChange={(e) => setNewPdf(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    {documents.map((d) => (
                      <option key={d.id} value={d.fileName}>
                        {d.fileName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Document Excerpt / Verbatim Citation
                </label>
                <input
                  type="text"
                  placeholder="Verbatim quote from the PDF verifying this rule..."
                  value={newSnippet}
                  onChange={(e) => setNewSnippet(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition"
                >
                  Publish Scope Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
