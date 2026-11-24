import React, { useState } from 'react';
import { sampleClinicProfile, initialPDFs, initialScopes, initialPackages } from './data/initialData';
import { ClinicProfile, ScopeItem, PricingPackage, PDFDocument, Appointment } from './types';
import { Header } from './components/Header';
import { HamzaScenarioBanner } from './components/HamzaScenarioBanner';
import { ScopeAIChat } from './components/PatientView/ScopeAIChat';
import { ScopeMatrixPills } from './components/PatientView/ScopeMatrixPills';
import { PackagesSection } from './components/PatientView/PackagesSection';
import { BookingModal } from './components/PatientView/BookingModal';
import { PdfUploader } from './components/BusinessPortal/PdfUploader';
import { ScopeManager } from './components/BusinessPortal/ScopeManager';
import { LeadsAnalytics } from './components/BusinessPortal/LeadsAnalytics';
import { IntegrationHub } from './components/BusinessPortal/IntegrationHub';
import { WhatsAppSimulator } from './components/BusinessPortal/WhatsAppSimulator';
import { PdfViewerModal } from './components/BusinessPortal/PdfViewerModal';
import { FloatingWhatsAppWidget } from './components/FloatingWhatsAppWidget';
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Phone,
  FileText,
  CheckCircle2,
  Calendar,
  Sparkles,
  Zap,
  ArrowRight,
  TrendingUp,
  Sliders,
  Check,
  Smartphone,
  Code2
} from 'lucide-react';

export function App() {
  const [clinic, setClinic] = useState<ClinicProfile>(sampleClinicProfile);
  const [documents, setDocuments] = useState<PDFDocument[]>(initialPDFs);
  const [scopes, setScopes] = useState<ScopeItem[]>(initialScopes);
  const [packages, setPackages] = useState<PricingPackage[]>(initialPackages);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Navigation & View State
  const [viewMode, setViewMode] = useState<'patient' | 'business' | 'whatsapp' | 'split'>('patient');
  const [businessTab, setBusinessTab] = useState<'integrations' | 'uploader' | 'scopes' | 'analytics'>('integrations');

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPackageId, setBookingPackageId] = useState<string | undefined>('pkg-sports');
  const [bookingReason, setBookingReason] = useState<string>('Sports Trauma Dental Realignment & 3D Scan');

  // PDF Viewer Modal State
  const [previewPdf, setPreviewPdf] = useState<{
    isOpen: boolean;
    doc: PDFDocument | null;
    page: number;
  }>({
    isOpen: false,
    doc: null,
    page: 1
  });

  // Query pre-fill state for the chat
  const [chatQueryTrigger, setChatQueryTrigger] = useState<string | undefined>(undefined);

  // Handlers
  const handleAddDocument = (newDoc: PDFDocument) => {
    setDocuments((prev) => [newDoc, ...prev]);

    // Also auto-add any new extracted scopes
    const newExtractedScopes: ScopeItem[] = [];
    newDoc.contentPages.forEach((page) => {
      page.identifiedScopes.forEach((s, idx) => {
        newExtractedScopes.push({
          id: `scope-${Date.now()}-${idx}`,
          type: s.type,
          title: s.text,
          description: `Extracted from ${newDoc.fileName} page ${page.page}: "${page.excerpt.slice(0, 80)}..."`,
          category: s.type === 'DO' ? 'Trauma & Emergency' : 'Surgery & Extractions',
          pdfSource: newDoc.fileName,
          pageNumber: page.page,
          highlightSnippet: page.excerpt,
          confidence: 98
        });
      });
    });

    if (newExtractedScopes.length > 0) {
      setScopes((prev) => [...newExtractedScopes, ...prev]);
    }
  };

  const handleAddScope = (newScope: ScopeItem) => {
    setScopes((prev) => [newScope, ...prev]);
  };

  const handleDeleteScope = (id: string) => {
    setScopes((prev) => prev.filter((s) => s.id !== id));
  };

  const handleOpenSourcePreview = (pdfName: string, page: number) => {
    const doc = documents.find((d) => d.fileName === pdfName) || documents[0];
    setPreviewPdf({
      isOpen: true,
      doc: doc || null,
      page: page || 1
    });
  };

  const handleBookingConfirmed = (newAppt: Appointment) => {
    setAppointments((prev) => [newAppt, ...prev]);
  };

  const handleTriggerQuery = (query: string) => {
    setChatQueryTrigger(query);
    const chatElem = document.getElementById('chat-container');
    chatElem?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPackageForBooking = (pkg: PricingPackage) => {
    setBookingPackageId(pkg.id);
    setBookingReason(`${pkg.name} Consultation & 3D Scan`);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Main Navigation Header */}
      <Header
        currentView={viewMode}
        onChangeView={setViewMode}
        clinic={clinic}
        appointmentCount={appointments.length}
        onOpenBooking={() => {
          setBookingPackageId('pkg-sports');
          setBookingReason('Sports Impact Dental Trauma Realignment');
          setIsBookingOpen(true);
        }}
      />

      {/* Main Body Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HAMZA SCENARIO SPOTLIGHT BANNER */}
        <HamzaScenarioBanner
          onAskHamzaQuery={handleTriggerQuery}
          onOpenBooking={() => {
            setBookingPackageId('pkg-sports');
            setBookingReason('Football Collision Alignment & 3D Scan');
            setIsBookingOpen(true);
          }}
          onOpenPackages={() => {
            const pkgElem = document.getElementById('packages-section');
            pkgElem?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenWhatsAppSimulator={() => setViewMode('whatsapp')}
        />

        {/* VIEW 1: PATIENT EXPERIENCE (HAMZA'S VIEW) */}
        {viewMode === 'patient' && (
          <div className="space-y-12">
            {/* Clinic Hero Profile Banner (Lahore Pakistan) */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-5">
                <img
                  src={clinic.avatarUrl}
                  alt={clinic.name}
                  className="w-22 h-22 rounded-2xl object-cover shadow-md border-2 border-white ring-2 ring-slate-100 shrink-0"
                />
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
                      {clinic.name}
                    </h1>
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>PMDC Verified Specialist</span>
                    </span>
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
                      <span>DHA Phase 5, Lahore 🇵🇰</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium">{clinic.tagline}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <div className="flex items-center space-x-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{clinic.rating}</span>
                      <span className="text-slate-400 font-normal">({clinic.reviewCount} verified reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{clinic.address}, Lahore</span>
                    </div>
                    <div className="flex items-center space-x-1 text-emerald-600 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Open Today 11 AM - 9 PM • Emergency Slots Active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="shrink-0 flex items-center space-x-3 w-full lg:w-auto">
                <button
                  onClick={() => {
                    setBookingPackageId('pkg-sports');
                    setBookingReason('Sports Injury Evaluation & 3D Scan');
                    setIsBookingOpen(true);
                  }}
                  className="w-full lg:w-auto px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-500/25 transition flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book DHA Chair (Rs. 0 Initial Scan)</span>
                </button>
              </div>
            </div>

            {/* Instant AI Scope Assistant Grounded in PDFs */}
            <div id="chat-container">
              <ScopeAIChat
                scopes={scopes}
                packages={packages}
                documents={documents}
                initialQuery={chatQueryTrigger}
                onOpenBookingWithPackage={(pkgId, reason) => {
                  setBookingPackageId(pkgId || 'pkg-sports');
                  setBookingReason(reason || 'Sports Trauma Consultation');
                  setIsBookingOpen(true);
                }}
                onPreviewSource={handleOpenSourcePreview}
              />
            </div>

            {/* Public Verified Scope Matrix */}
            <ScopeMatrixPills
              scopes={scopes}
              onPreviewSource={handleOpenSourcePreview}
              onSelectScopeForQuery={(title) => handleTriggerQuery(`Tell me more about your policy on: ${title}`)}
            />

            {/* Braces & Ortho Pricing Packages Section (PKR) */}
            <PackagesSection
              packages={packages}
              onSelectPackage={handleSelectPackageForBooking}
              onPreviewSource={handleOpenSourcePreview}
            />
          </div>
        )}

        {/* VIEW 2: DEDICATED WHATSAPP SIMULATOR */}
        {viewMode === 'whatsapp' && (
          <div className="space-y-6">
            <WhatsAppSimulator
              clinicName={clinic.name}
              whatsappNumber={clinic.whatsappNumber}
              scopes={scopes}
              packages={packages}
              onOpenBooking={() => {
                setBookingPackageId('pkg-sports');
                setBookingReason('WhatsApp Referral: Sports Collision Braces');
                setIsBookingOpen(true);
              }}
            />
          </div>
        )}

        {/* VIEW 3: CLINIC OWNER HUB (HOW BUSINESS OWNERS USE THE APP) */}
        {viewMode === 'business' && (
          <div className="space-y-8">
            {/* Business Navigation Tabs */}
            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between overflow-x-auto">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setBusinessTab('integrations')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center space-x-2 whitespace-nowrap ${
                    businessTab === 'integrations'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Code2 className="w-4 h-4" />
                  <span>1. Integrations & Website Embed</span>
                </button>

                <button
                  onClick={() => setBusinessTab('uploader')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center space-x-2 whitespace-nowrap ${
                    businessTab === 'uploader'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>2. PDF Scope Ingestion ({documents.length})</span>
                </button>

                <button
                  onClick={() => setBusinessTab('scopes')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center space-x-2 whitespace-nowrap ${
                    businessTab === 'scopes'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Sliders className="w-4 h-4" />
                  <span>3. Scope Rule Manager ({scopes.length})</span>
                </button>

                <button
                  onClick={() => setBusinessTab('analytics')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center space-x-2 whitespace-nowrap ${
                    businessTab === 'analytics'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>4. Conversion vs WhatsApp Analytics</span>
                </button>
              </div>

              <div className="hidden lg:flex items-center space-x-2 pr-3 text-xs text-slate-500 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Grounding Engine: Online (Pakistan)</span>
              </div>
            </div>

            {/* Tab 1: Integration & Distribution Hub */}
            {businessTab === 'integrations' && (
              <IntegrationHub
                clinic={clinic}
                onOpenSimulator={() => setViewMode('whatsapp')}
              />
            )}

            {/* Tab 2: PDF Ingestion */}
            {businessTab === 'uploader' && (
              <PdfUploader
                documents={documents}
                onAddDocument={handleAddDocument}
                onPreviewDocument={(doc) =>
                  setPreviewPdf({
                    isOpen: true,
                    doc,
                    page: 1
                  })
                }
              />
            )}

            {/* Tab 3: Scope Rule Matrix */}
            {businessTab === 'scopes' && (
              <ScopeManager
                scopes={scopes}
                documents={documents}
                onAddScope={handleAddScope}
                onDeleteScope={handleDeleteScope}
                onPreviewDocumentByName={handleOpenSourcePreview}
              />
            )}

            {/* Tab 4: Leads & Analytics */}
            {businessTab === 'analytics' && (
              <LeadsAnalytics
                appointments={appointments}
                onOpenBooking={() => setIsBookingOpen(true)}
              />
            )}
          </div>
        )}

        {/* VIEW 4: SPLIT DUAL DEMO */}
        {viewMode === 'split' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between text-xs text-blue-900">
              <div className="flex items-center space-x-2 font-bold">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Split Screen Live Demo: Patient (Hamza) vs Clinic Ground-Truth Scope Matrix</span>
              </div>
              <span className="text-slate-500">Every response on the left is backed by the exact rule on the right</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left Column: Patient Experience */}
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                    Patient Interface (Hamza's Inquiry in PKR)
                  </span>
                  <span className="text-xs text-emerald-600 font-bold">1.2s Response Time</span>
                </div>
                <ScopeAIChat
                  scopes={scopes}
                  packages={packages}
                  documents={documents}
                  initialQuery={chatQueryTrigger}
                  onOpenBookingWithPackage={(pkgId, reason) => {
                    setBookingPackageId(pkgId || 'pkg-sports');
                    setBookingReason(reason || 'Sports Trauma Consultation');
                    setIsBookingOpen(true);
                  }}
                  onPreviewSource={handleOpenSourcePreview}
                />
              </div>

              {/* Right Column: Business Scope Rules & Verification */}
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                    Clinic Scope Ground-Truth (Official Documents)
                  </span>
                  <span className="text-xs text-blue-600 font-mono">2 Indexed Lahore PDFs</span>
                </div>
                <ScopeManager
                  scopes={scopes}
                  documents={documents}
                  onAddScope={handleAddScope}
                  onDeleteScope={handleDeleteScope}
                  onPreviewDocumentByName={handleOpenSourcePreview}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FLOATING WHATSAPP / SCOPE WIDGET (Representing the embedded widget on existing sites) */}
      <FloatingWhatsAppWidget
        clinic={clinic}
        onOpenBooking={() => {
          setBookingPackageId('pkg-sports');
          setBookingReason('Widget Lead: Sports Collision Braces');
          setIsBookingOpen(true);
        }}
        onOpenWhatsAppSimulator={() => setViewMode('whatsapp')}
      />

      {/* FOOTER */}
      <footer className="mt-16 bg-slate-950 border-t border-slate-800 py-10 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white">DocuScope Pakistan</span>
            <span>— Transforming practice documents into instant, verified client answers & bookings.</span>
          </div>
          <div>
            Built for Hamza's sports dental trauma & transparent orthodontic care in DHA Phase 5, Lahore.
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        packages={packages}
        initialPackageId={bookingPackageId}
        initialReason={bookingReason}
        onBookingConfirmed={handleBookingConfirmed}
      />

      <PdfViewerModal
        pdf={previewPdf.doc}
        activePage={previewPdf.page}
        onClose={() => setPreviewPdf({ isOpen: false, doc: null, page: 1 })}
      />
    </div>
  );
}
export default App;
