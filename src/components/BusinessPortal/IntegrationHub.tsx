import React, { useState } from 'react';
import { ClinicProfile } from '../../types';
import { Code2, MessageSquare, Globe, QrCode, Copy, Check, ExternalLink, Sparkles, Smartphone, ShieldCheck, ArrowRight, Layers, Settings, Users } from 'lucide-react';

interface IntegrationHubProps {
  clinic: ClinicProfile;
  onOpenSimulator: () => void;
}

export const IntegrationHub: React.FC<IntegrationHubProps> = ({ clinic, onOpenSimulator }) => {
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'embed' | 'whatsapp' | 'portal' | 'webhook'>('embed');

  const embedCode = `<!-- DocuScope Pakistan AI Widget for ${clinic.name} -->
<script 
  src="https://cdn.docscope.pk/v2/embed.js" 
  data-clinic-slug="${clinic.slug}" 
  data-position="bottom-right" 
  data-accent-color="#25D366" 
  data-language="en-ur"
  defer>
</script>`;

  const directUrl = `https://docscope.pk/${clinic.slug}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(directUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Onboarding Master Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Distribution & Multi-Channel Deployment Engine</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black tracking-tight">
            How Clinic Owners Deploy DocuScope in Pakistan
          </h2>
          <p className="text-slate-300 text-xs lg:text-sm leading-relaxed">
            Your clinic documents are already indexed. Now activate DocuScope across your existing website, your active WhatsApp number, and your physical reception desk in minutes.
          </p>
        </div>
      </div>

      {/* Deployment Channel Navigation Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveTab('embed')}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeTab === 'embed'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-200'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <Code2 className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-black/10">
              1-Line Code
            </span>
          </div>
          <div>
            <div className="font-extrabold text-sm">Website Widget</div>
            <div className={`text-xs mt-0.5 ${activeTab === 'embed' ? 'text-blue-100' : 'text-slate-500'}`}>
              Replaces static Contact Us
            </div>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('whatsapp')}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeTab === 'whatsapp'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <Smartphone className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-black/10">
              Meta Cloud API
            </span>
          </div>
          <div>
            <div className="font-extrabold text-sm">WhatsApp Business</div>
            <div className={`text-xs mt-0.5 ${activeTab === 'whatsapp' ? 'text-emerald-100' : 'text-slate-500'}`}>
              Auto-replies in 1.5s
            </div>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('portal')}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeTab === 'portal'
              ? 'bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-200'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <Globe className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-black/10">
              Custom Link
            </span>
          </div>
          <div>
            <div className="font-extrabold text-sm">Hosted Clinic Portal</div>
            <div className={`text-xs mt-0.5 ${activeTab === 'portal' ? 'text-purple-100' : 'text-slate-500'}`}>
              For Insta Bio & Maps
            </div>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('webhook')}
          className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
            activeTab === 'webhook'
              ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-300'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <Layers className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-black/10">
              REST / Webhook
            </span>
          </div>
          <div>
            <div className="font-extrabold text-sm">Existing Bot Bridge</div>
            <div className={`text-xs mt-0.5 ${activeTab === 'webhook' ? 'text-slate-300' : 'text-slate-500'}`}>
              Tidio, Intercom, CRM
            </div>
          </div>
        </button>
      </div>

      {/* CHANNEL 1: WEBSITE EMBED CODE */}
      {activeTab === 'embed' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-200 mb-2">
                <span>Zero-Code Installation</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Replace Outdated "Contact Us" with the Live Scope Widget
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                Pastes directly into WordPress, Shopify, Webflow, or custom HTML. Converts standard website traffic into instant answers and booked appointments.
              </p>
            </div>

            <button
              onClick={handleCopyCode}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center space-x-2 shrink-0 self-start md:self-auto"
            >
              {copiedSnippet ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSnippet ? 'Copied to Clipboard!' : 'Copy Embed Code'}</span>
            </button>
          </div>

          {/* Code Box */}
          <div className="relative bg-slate-900 rounded-2xl p-5 font-mono text-xs text-blue-300 overflow-x-auto shadow-inner border border-slate-800">
            <div className="flex items-center justify-between text-slate-500 text-[11px] pb-3 mb-3 border-b border-slate-800">
              <span>HTML / WordPress Footer Script</span>
              <span>CDN Hosted • 18KB gzip</span>
            </div>
            <pre className="text-slate-200 leading-relaxed">{embedCode}</pre>
          </div>

          {/* Interactive Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-extrabold text-xs text-slate-900 block">⚡ Instant Answers On-Site</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Patients don't have to leave your website to WhatsApp. They ask questions and see verified scope in real time.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-extrabold text-xs text-slate-900 block">🇵🇰 Bilingual Support</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Seamlessly understands inquiries in both English and Roman Urdu (e.g. "daant hil gaye hain", "braces ka kharcha").
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-extrabold text-xs text-slate-900 block">📅 Direct Chair Booking</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Patients lock in an appointment slot with verified doctor availability without back-and-forth receptionist calls.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CHANNEL 2: WHATSAPP BUSINESS CLOUD API */}
      {activeTab === 'whatsapp' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200 mb-2">
                <span>Official Meta Cloud API</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Connect Clinic's Official WhatsApp Number ({clinic.whatsappNumber})
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                Replace 24-hour receptionist delays with automated 1.5-second replies on WhatsApp, grounded 100% in your PDF scope and PKR tariff sheet.
              </p>
            </div>

            <button
              onClick={onOpenSimulator}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center space-x-2 shrink-0 self-start md:self-auto"
            >
              <Smartphone className="w-4 h-4" />
              <span>Launch Live WhatsApp Simulator</span>
            </button>
          </div>

          {/* 3 Steps to Connect */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-sm flex items-center justify-center">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Add Webhook in Meta Console</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                In Meta WhatsApp Business settings, paste your unique DocuScope endpoint:
              </p>
              <div className="p-2 bg-white rounded-lg border border-slate-200 font-mono text-[11px] text-emerald-800 break-all">
                https://api.docscope.pk/webhook/v1/whatsapp/{clinic.slug}
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-sm flex items-center justify-center">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm">PDF Grounding Sync</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                DocuScope vectorizes your clinic handbook so every WhatsApp reply includes exact treatment packages, PKR prices, and exclusions.
              </p>
              <div className="text-xs text-emerald-700 font-semibold flex items-center space-x-1 pt-1">
                <Check className="w-4 h-4" />
                <span>2 Official PDFs Synced</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-sm flex items-center justify-center">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Receptionist Live Override</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                If a patient requests to speak with a human or has complex medical emergencies, the bot hands off to your front desk instantly.
              </p>
              <div className="text-xs text-blue-700 font-semibold flex items-center space-x-1 pt-1">
                <Users className="w-4 h-4" />
                <span>Smart Human Fallback Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHANNEL 3: HOSTED CLINIC PORTAL */}
      {activeTab === 'portal' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-purple-50 text-purple-700 rounded-full text-xs font-bold border border-purple-200 mb-2">
                <span>Public Hosted Link</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Shareable Clinic Portal & Reception Desk QR Code
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                For clinics that do not have a dedicated developer. Place this link on your Instagram bio, Google Business Profile, and display the QR code at your reception counter.
              </p>
            </div>

            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center space-x-2 shrink-0 self-start md:self-auto"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Portal URL'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Link box */}
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Your Public Clinic URL:
                </span>
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                  <span className="font-mono text-xs font-bold text-slate-900">
                    docscope.pk/{clinic.slug}
                  </span>
                  <a
                    href={directUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-700 p-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  <span><strong>Google Maps & Business:</strong> Add as "Appointment Booking URL"</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  <span><strong>Instagram / TikTok Bio:</strong> Drive direct patient traffic</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  <span><strong>WhatsApp Catalog Link:</strong> Add to WhatsApp Business profile</span>
                </div>
              </div>
            </div>

            {/* QR Code Card */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-6 rounded-3xl text-white flex items-center space-x-6 border border-slate-800 shadow-lg">
              <div className="w-28 h-28 bg-white p-2 rounded-2xl flex items-center justify-center shrink-0 shadow-md">
                <QrCode className="w-full h-full text-slate-900" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-widest uppercase text-purple-300 block">
                  Printable Counter Stand
                </span>
                <h4 className="font-extrabold text-white text-base">
                  Reception Desk QR Stand
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Walk-in patients scan this QR to see transparent packages & verified policies without overwhelming front desk staff.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHANNEL 4: REST API / EXISTING BOT WEBHOOK */}
      {activeTab === 'webhook' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-5">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-slate-100 text-slate-800 rounded-full text-xs font-bold border border-slate-200 mb-2">
              <span>Developer API</span>
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Integrate with Existing Chat Bots (Tidio, Intercom, Zendesk)
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              If your clinic website already has a chat widget, connect DocuScope as the grounding intelligence layer via our REST webhook API.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5 text-slate-200 font-mono text-xs space-y-3">
            <div className="text-emerald-400 font-bold">POST https://api.docscope.pk/v1/query</div>
            <div className="text-slate-400">Headers: Authorization: Bearer dcs_live_pk_498129034</div>
            <pre className="text-blue-300">
{`{
  "clinic_id": "${clinic.slug}",
  "query": "I got hit in football, can braces fix my shifted teeth and what are the packages?",
  "language": "en"
}`}
            </pre>
            <div className="text-slate-400 pt-2 border-t border-slate-800">Response (1.2s):</div>
            <pre className="text-emerald-300">
{`{
  "status": "IN_SCOPE",
  "verified_title": "Sports Collision & Trauma Teeth Realignment",
  "answer": "Yes! Post-sports dental displacement is 100% within our scope...",
  "recommended_package": "Sports Impact Realignment Bundle (Rs. 14,500/mo)",
  "booking_url": "https://docscope.pk/${clinic.slug}/book?slot=today-1530"
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
