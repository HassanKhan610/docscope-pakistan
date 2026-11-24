import React, { useState } from 'react';
import { PDFDocument } from '../../types';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Eye, Sparkles, Loader2, ArrowRight } from 'lucide-react';

interface PdfUploaderProps {
  documents: PDFDocument[];
  onAddDocument: (doc: PDFDocument) => void;
  onPreviewDocument: (doc: PDFDocument) => void;
}

export const PdfUploader: React.FC<PdfUploaderProps> = ({
  documents,
  onAddDocument,
  onPreviewDocument
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('');

  const simulateUpload = (fileName: string, title: string) => {
    setIsProcessing(true);
    setProcessingProgress(15);
    setProcessingStatus('Extracting raw text from PDF vectors...');

    setTimeout(() => {
      setProcessingProgress(45);
      setProcessingStatus('Identifying Scope Directives: "What We Do" vs "What We Don\'t Do"...');
    }, 600);

    setTimeout(() => {
      setProcessingProgress(80);
      setProcessingStatus('Grounding package inclusions, pricing, and exclusions...');
    }, 1200);

    setTimeout(() => {
      setProcessingProgress(100);
      setProcessingStatus('Indexing complete. Ready for real-time patient queries!');

      const newDoc: PDFDocument = {
        id: `pdf-${Date.now()}`,
        name: title,
        fileName: fileName,
        fileSize: '3.1 MB',
        uploadDate: 'Just now',
        totalPages: 9,
        parsedScopeCount: { dos: 5, donts: 3 },
        status: 'Ready',
        summary: 'Extracted practice scope rules for emergency trauma, clear aligners, and payment policies.',
        contentPages: [
          {
            page: 1,
            title: 'Section 1: Treatment Modalities & Scope',
            excerpt: 'Our clinical team provides non-invasive teeth realignment for post-impact sports displacement, using clear aligners and modern self-ligating ceramic brackets.',
            identifiedScopes: [
              { type: 'DO', text: 'Post-impact sports alignment with 3D guided mechanics' },
              { type: 'DO', text: 'Digital smile simulation on initial visit' }
            ]
          },
          {
            page: 4,
            title: 'Section 4: Procedural Exclusions',
            excerpt: 'We do not perform surgical jaw repositioning or complex tooth extractions under general anesthesia. Cases requiring surgical jaw repositioning are referred out.',
            identifiedScopes: [
              { type: 'DONT', text: 'DO NOT perform general anesthesia surgical jaw reconstruction' }
            ]
          }
        ]
      };

      onAddDocument(newDoc);
      setTimeout(() => {
        setIsProcessing(false);
        setProcessingProgress(0);
      }, 700);
    }, 1800);
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateUpload(file.name, file.name.replace('.pdf', '') + ' Clinical Scope');
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-blue-200 text-xs font-semibold mb-4 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>AI Optical & Scope Parser</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
            Feed Your Clinic PDFs. Instantly Clarify What You Do & Don't Do.
          </h2>
          <p className="mt-3 text-blue-100/90 text-sm leading-relaxed">
            Upload your clinical policies, braces package brochures, and insurance guidelines. DocuScope converts your documents into clear, grounded answers so prospective patients like Hamza get transparent information in seconds instead of waiting a full day on WhatsApp.
          </p>
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) {
            simulateUpload(file.name, file.name.replace('.pdf', ''));
          }
        }}
        className={`border-2 border-dashed rounded-3xl p-8 transition-all flex flex-col items-center justify-center text-center ${
          isDragging
            ? 'border-blue-500 bg-blue-50/70 scale-[0.99]'
            : 'border-slate-300 hover:border-blue-400 bg-white shadow-sm'
        }`}
      >
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 shadow-sm border border-blue-100">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="font-bold text-slate-800 text-lg">
          Upload Clinic Scope PDF / Package Brochure
        </h3>
        <p className="text-slate-500 text-sm max-w-md mt-1">
          Drag and drop your PDF here, or select from your computer to auto-extract Do's, Don'ts, and Pricing.
        </p>

        {/* Input & Quick Presets */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <label className="cursor-pointer px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 transition flex items-center space-x-2">
            <span>Choose PDF File</span>
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleCustomUpload}
            />
          </label>

          <span className="text-xs text-slate-400 font-medium">or try pre-configured template:</span>

          <button
            onClick={() =>
              simulateUpload(
                'Sports_Trauma_Dental_Scope_2026.pdf',
                'Sports Trauma Orthodontic Scope & Fast-Track Protocol'
              )
            }
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition flex items-center space-x-1.5"
          >
            <span>⚽ Sports Trauma & Braces Scope</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live Processing Overlay */}
        {isProcessing && (
          <div className="w-full max-w-md mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-200 animate-in fade-in">
            <div className="flex items-center justify-between text-xs font-semibold text-blue-900 mb-2">
              <span className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                <span>{processingStatus}</span>
              </span>
              <span>{processingProgress}%</span>
            </div>
            <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${processingProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Uploaded Documents List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-slate-700" />
            <h3 className="font-bold text-slate-900 text-base">
              Active Ground-Truth Clinic Documents ({documents.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            All AI responses strictly verify against these documents
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm leading-snug line-clamp-1">
                        {doc.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        {doc.fileName} • {doc.fileSize}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-md border border-emerald-200 shrink-0">
                    {doc.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                  {doc.summary}
                </p>

                {/* Parsed Scopes Badge count */}
                <div className="mt-4 flex items-center space-x-2">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{doc.parsedScopeCount.dos} What We Do</span>
                  </span>
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-rose-50 text-rose-800 text-xs font-semibold rounded-lg border border-rose-200">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>{doc.parsedScopeCount.donts} What We Don't Do</span>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {doc.totalPages} Pages indexed
                </span>
                <button
                  onClick={() => onPreviewDocument(doc)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-semibold rounded-lg transition flex items-center space-x-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Document & Grounding</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
