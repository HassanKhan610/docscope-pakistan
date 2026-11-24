import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ScopeItem, PricingPackage, PDFDocument } from '../../types';
import { Send, Sparkles, CheckCircle2, AlertTriangle, FileText, ArrowRight, Calendar, User, Zap, RefreshCw, MessageSquare } from 'lucide-react';

interface ScopeAIChatProps {
  scopes: ScopeItem[];
  packages: PricingPackage[];
  documents: PDFDocument[];
  onOpenBookingWithPackage?: (packageId?: string, reason?: string) => void;
  onPreviewSource: (pdfName: string, page: number) => void;
  initialQuery?: string;
}

export const ScopeAIChat: React.FC<ScopeAIChatProps> = ({
  scopes,
  packages,
  documents,
  onOpenBookingWithPackage,
  onPreviewSource,
  initialQuery
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: "Assalam o Alaikum Hamza! I am the verified Clinic Scope Assistant for Apex Orthodontics (DHA Phase 5, Lahore). Every answer I provide is indexed directly from our official clinical scope PDFs and PKR tariff catalog. No waiting 24 hours on WhatsApp—ask me anything about braces, sports collision trauma, PKR packages, or doctor availability!",
      timestamp: 'Just now',
      statusTag: 'DO_VERIFIED'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested prompt pills specifically addressing Hamza's situation in Pakistan
  const suggestedPrompts = [
    {
      label: '⚽ Football Collision Teeth Realignment',
      query: 'I was hit in football yesterday and my teeth alignment shifted. Can braces fix this, and what packages do you offer?'
    },
    {
      label: '💳 Packages & 0% Bank Installments (PKR)',
      query: 'What are your braces package prices in PKR and do you have 0% monthly installment plans?'
    },
    {
      label: '🇵🇰 Sehat Sahulat Card Coverage?',
      query: 'Does the government Sehat Sahulat Card cover braces at your clinic?'
    },
    {
      label: '🚫 Jaw Bone Fracture vs Braces Limits',
      query: 'Do you perform hospital jaw bone fracture surgery or just outpatient tooth alignment?'
    },
    {
      label: '📅 Same-Day 3D Scan Chair in DHA Lahore',
      query: 'Can I book an appointment today in DHA Lahore for a complimentary 3D digital scan?'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleUserSubmit(initialQuery);
    }
  }, [initialQuery]);

  const handleUserSubmit = (queryText: string) => {
    if (!queryText.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const q = queryText.toLowerCase();
      let botResponse: ChatMessage;

      // 1. Hamza's Football / Sports Trauma Query
      if (q.includes('football') || q.includes('sport') || q.includes('hit') || q.includes('shifted') || q.includes('trauma') || q.includes('daant')) {
        botResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `Yes, Hamza! Teeth alignment shifted from athletic collisions (football, cricket, or futsal) is **100% within our verified clinical scope** (Apex Trauma Protocol Section 2.1). Dr. Zeeshan Haider specializes in acute sports orthodontic repositioning.\n\nFor sports trauma, we specifically recommend our **Sports Impact Recovery Bundle**:\n• Total: **Rs. 145,000** or **Rs. 14,500/month** (10-month 0% markup installments via Raast/Nayapay/Bank)\n• Includes: Continuous 3D iTero scan tracking, reinforced Damon brackets, dual custom athletic mouthguards, and 3 emergency bracket repairs.\n\n⚠️ *Clinical Scope Boundary:* We treat dental alignment displacement; inpatient hospital jaw bone fracture plating is referred to tertiary hospital trauma units.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          statusTag: 'DO_VERIFIED',
          sources: [
            {
              docName: 'Apex_Dental_Trauma_Scope_Lahore_2026.pdf',
              page: 2,
              snippet: 'We accept emergency and sub-acute dental malalignment resulting from contact sports collisions (e.g. football, futsal).'
            },
            {
              docName: 'Apex_Braces_Packages_PKR_2026.pdf',
              page: 3,
              snippet: 'Includes high-durability brackets, dual custom thermo-fitted athletic mouthguards compatible with active brackets.'
            }
          ],
          recommendedPackageId: 'pkg-sports',
          canBookDirectly: true,
          appointmentIntent: true
        };
      }
      // 2. Sehat Sahulat Card Query
      else if (q.includes('sehat') || q.includes('card') || q.includes('government') || q.includes('sahulat')) {
        botResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `⚠️ **Policy Clarification (What We Don't Do):**\n\nThe government **Sehat Sahulat Card** DOES NOT cover elective aesthetic orthodontic braces or clear aligners (Section 6.2).\n\n**What We Do Instead:** To make braces accessible, we offer **0% markup in-house monthly installment plans**:\n• Metal Braces: Rs. 9,500/month\n• Sports Realignment: Rs. 14,500/month\n• Ceramic Aesthetic: Rs. 16,500/month\n\nPayable via Raast, Bank Alfalah, Meezan Bank, SadaPay, or Nayapay with zero markup or hidden bank charges!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          statusTag: 'DONT_WARNING',
          sources: [
            {
              docName: 'Apex_Dental_Trauma_Scope_Lahore_2026.pdf',
              page: 6,
              snippet: 'Elective orthodontic realignment and cosmetic brackets ARE NOT covered under the government Sehat Sahulat Card.'
            }
          ],
          canBookDirectly: true
        };
      }
      // 3. Package / Pricing Query (PKR)
      else if (q.includes('price') || q.includes('package') || q.includes('cost') || q.includes('month') || q.includes('pkr') || q.includes('installment') || q.includes('kharcha')) {
        botResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `Here is our transparent braces package pricing in PKR extracted directly from our official 2026 tariff sheet. All packages feature **0% markup in-house installments**:\n\n• **Sports Impact Ortho Bundle**: Rs. 145,000 total or **Rs. 14,500/month** (Best for football/athletic trauma)\n• **Pro Ceramic Aesthetic Braces**: Rs. 165,000 total or **Rs. 16,500/month** (Discreet frosted tooth-colored brackets)\n• **Essential Damon Metal Braces**: Rs. 95,000 total or **Rs. 9,500/month** (Low-friction Damon precision brackets)\n\nAll packages include all monthly tightenings, digital 3D scans, and 2 sets of post-treatment retainers. Zero hidden lab charges!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          statusTag: 'PACKAGE_INFO',
          sources: [
            {
              docName: 'Apex_Braces_Packages_PKR_2026.pdf',
              page: 1,
              snippet: '0% markup in-house installment plans spread over 10 to 14 months with zero bank processing fee.'
            }
          ],
          recommendedPackageId: 'pkg-sports',
          canBookDirectly: true
        };
      }
      // 4. Jaw Fracture / Out-of-Scope Surgery
      else if (q.includes('jaw') || q.includes('surgery') || q.includes('fracture') || q.includes('hospital') || q.includes('bone') || q.includes('toot')) {
        botResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `🚫 **Clinical Scope Boundary Notice (What We Don't Do):**\n\nApex Orthodontics **DOES NOT** perform inpatient maxillofacial jaw bone fracture surgery (Section 4.3). If your football impact caused an open fracture to the jaw bone, immediate hospital ER triage is required at **Mayo Hospital** or **Shaikh Zayed Maxillofacial Surgery Unit Lahore**.\n\n**What We DO Do:** Once the bone is stabilized, we perform all the dental repositioning and bite correction with braces!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          statusTag: 'DONT_WARNING',
          sources: [
            {
              docName: 'Apex_Dental_Trauma_Scope_Lahore_2026.pdf',
              page: 4,
              snippet: 'Apex Orthodontics DOES NOT perform inpatient maxillofacial orthognathic bone fracture surgery.'
            }
          ],
          canBookDirectly: true
        };
      }
      // 5. Booking / Availability
      else if (q.includes('appointment') || q.includes('book') || q.includes('visit') || q.includes('today') || q.includes('scan') || q.includes('dha') || q.includes('zeeshan')) {
        botResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `Yes! Dr. Zeeshan Haider, BDS, FCPS (Orthodontics) reserves urgent sports trauma slots daily at our DHA Phase 5 Lahore clinic.\n\nYour initial consult includes a **complimentary iTero 5D digital scan (Rs. 0)** with zero upfront diagnostic fees. Available slots for today: **3:30 PM** and **5:00 PM**!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          statusTag: 'BOOKING_READY',
          sources: [
            {
              docName: 'Apex_Dental_Trauma_Scope_Lahore_2026.pdf',
              page: 9,
              snippet: 'All new consultations include an iTero Element 5D digital oral scan with zero upfront imaging commitment fees.'
            }
          ],
          canBookDirectly: true,
          appointmentIntent: true
        };
      } else {
        botResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: `Based on our official Practice Scope and 2026 Tariff Sheet (DHA Phase 5, Lahore):\n\nWe provide specialized orthodontic alignment for sports trauma dental displacement, comprehensive braces (metal & frosted ceramic), and 0% monthly bank installments. What we **do not do** is hospital jaw bone fracture surgery or Sehat Card billing.\n\nWould you like to review our braces packages or book a complimentary 3D scan chair slot?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          statusTag: 'DO_VERIFIED',
          sources: [
            {
              docName: 'Apex_Dental_Trauma_Scope_Lahore_2026.pdf',
              page: 1,
              snippet: 'Practice scope covers comprehensive outpatient orthodontic correction and sports impact realignment.'
            }
          ],
          canBookDirectly: true
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  const getRecommendedPkg = (pkgId?: string) => {
    if (!pkgId) return null;
    return packages.find((p) => p.id === pkgId);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden flex flex-col h-[720px]">
      {/* Chat Header */}
      <div className="px-6 py-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold shadow-md shadow-blue-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-white text-base">DocuScope Practice AI</h3>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-black rounded-full border border-emerald-500/30">
                100% PDF-GROUNDED
              </span>
            </div>
            <p className="text-xs text-slate-400">
              DHA Phase 5, Lahore • Dr. Zeeshan Haider (FCPS Ortho) • 1.2s Response Latency
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-xl text-xs text-slate-300 border border-white/10">
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>No 24h WhatsApp Wait</span>
        </div>
      </div>

      {/* Suggested Prompt Pills */}
      <div className="px-6 py-3 bg-slate-50/80 border-b border-slate-200/80 flex items-center space-x-2 overflow-x-auto text-xs">
        <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider shrink-0">
          Quick Prompts:
        </span>
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleUserSubmit(p.query)}
            className="px-3 py-1.5 bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-semibold rounded-xl border border-slate-200 shadow-2xs whitespace-nowrap transition shrink-0"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-slate-50/30">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const recPkg = getRecommendedPkg(msg.recommendedPackageId);

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-2`}
            >
              <div className="flex items-center space-x-2 text-xs text-slate-400 px-1">
                <span>{isUser ? 'Hamza (You)' : 'Apex Practice Scope AI'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`rounded-2xl p-4 sm:p-5 max-w-2xl text-sm leading-relaxed shadow-sm ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                }`}
              >
                {!isUser && msg.statusTag && (
                  <div className="mb-3">
                    {msg.statusTag === 'DO_VERIFIED' && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-black rounded-lg border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>VERIFIED IN-SCOPE (WHAT WE DO)</span>
                      </span>
                    )}
                    {msg.statusTag === 'DONT_WARNING' && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-rose-100 text-rose-800 text-[11px] font-black rounded-lg border border-rose-200">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        <span>CLINICAL SCOPE EXCLUSION (WHAT WE DON'T DO)</span>
                      </span>
                    )}
                    {msg.statusTag === 'PACKAGE_INFO' && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-blue-100 text-blue-800 text-[11px] font-black rounded-lg border border-blue-200">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>OFFICIAL 2026 PKR TARIFF SHEET</span>
                      </span>
                    )}
                    {msg.statusTag === 'BOOKING_READY' && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-purple-100 text-purple-800 text-[11px] font-black rounded-lg border border-purple-200">
                        <Calendar className="w-3.5 h-3.5 text-purple-600" />
                        <span>SAME-DAY CHAIR OPEN IN DHA LAHORE</span>
                      </span>
                    )}
                  </div>
                )}

                <div className="whitespace-pre-line text-sm">{msg.text}</div>

                {/* Grounding Citations */}
                {!isUser && msg.sources && msg.sources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
                      Cited Practice Documentation:
                    </span>
                    {msg.sources.map((src, i) => (
                      <div
                        key={i}
                        className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-xs flex items-start justify-between gap-2"
                      >
                        <div className="space-y-1">
                          <button
                            onClick={() => onPreviewSource(src.docName, src.page)}
                            className="font-mono font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center space-x-1 text-left"
                          >
                            <FileText className="w-3.5 h-3.5 shrink-0" />
                            <span>
                              {src.docName} (Page {src.page})
                            </span>
                          </button>
                          <p className="text-[11px] text-slate-500 italic">
                            "{src.snippet}"
                          </p>
                        </div>
                        <button
                          onClick={() => onPreviewSource(src.docName, src.page)}
                          className="shrink-0 px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 text-[11px] font-semibold rounded-md transition"
                        >
                          View PDF
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Embedded Recommended Package Card */}
                {!isUser && recPkg && (
                  <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-black rounded uppercase">
                        Recommended For Hamza
                      </span>
                      <div className="text-right">
                        <span className="text-base font-extrabold text-blue-900">
                          Rs. {recPkg.monthlyPrice.toLocaleString()}/mo
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          or Rs. {recPkg.totalPrice.toLocaleString()} total (0% Markup)
                        </span>
                      </div>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm mt-1">{recPkg.name}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{recPkg.idealFor}</p>

                    <div className="mt-3 flex items-center space-x-2">
                      <button
                        onClick={() =>
                          onOpenBookingWithPackage &&
                          onOpenBookingWithPackage(recPkg.id, 'Sports Impact Realignment & 3D Scan')
                        }
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center space-x-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book This Treatment (Rs. 0 Initial Scan)</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Direct Booking CTA */}
                {!isUser && msg.canBookDirectly && !recPkg && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Emergency trauma slots available today in DHA Phase 5
                    </span>
                    <button
                      onClick={() =>
                        onOpenBookingWithPackage &&
                        onOpenBookingWithPackage(undefined, 'Orthodontic Evaluation & 3D Scan')
                      }
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center space-x-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Direct Chair</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center space-x-2 text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200/80 w-fit shadow-xs">
            <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" />
            <span>Consulting clinic PDF scope pages (Section 2.1)...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUserSubmit(inputQuery);
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Ask anything (e.g. 'Can braces fix football collision teeth?', 'Packages in PKR?')..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            disabled={isTyping}
            className="flex-1 px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-2xl shadow-md transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="mt-2 text-center">
          <span className="text-[11px] text-slate-400">
            Answers are legally locked to official clinical scope PDFs. No hallucinated medical advice.
          </span>
        </div>
      </div>
    </div>
  );
};
