import React, { useState, useRef, useEffect } from 'react';
import { WhatsAppMessage, ScopeItem, PricingPackage } from '../../types';
import { Send, CheckCheck, Phone, Video, MoreVertical, Paperclip, Smile, Mic, Sparkles, RefreshCw, AlertCircle, Calendar } from 'lucide-react';

interface WhatsAppSimulatorProps {
  clinicName: string;
  whatsappNumber: string;
  scopes: ScopeItem[];
  packages: PricingPackage[];
  onOpenBooking: () => void;
}

export const WhatsAppSimulator: React.FC<WhatsAppSimulatorProps> = ({
  clinicName,
  whatsappNumber,
  scopes,
  packages,
  onOpenBooking
}) => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([
    {
      id: 'w1',
      sender: 'patient',
      text: 'Assalam o Alaikum! Kal DHA ground mein football khelte huay mera front tooth displace ho gaya hai. Kya aap braces se theek kar saktay hain aur packages kya hain?',
      time: '11:42 AM',
      status: 'read'
    },
    {
      id: 'w2',
      sender: 'clinic_bot',
      text: 'Walaikum Assalam Hamza! 👋\n\nYes, acute sports collision dental displacement is **100% within our verified clinical scope** (Apex Trauma Protocol Section 2.1).\n\nFor sports trauma, we recommend our **Sports Impact Recovery Bundle**:\n• Total: **Rs. 145,000** or **Rs. 14,500/month** (10-month 0% markup installments via Raast/Nayapay/Bank)\n• Includes: 3D iTero scan, high-impact Damon brackets, dual athletic mouthguards, and 3 emergency bracket repairs.\n\n⚠️ *Clinical Scope Boundary:* We treat dental displacement; inpatient hospital jaw bone fracture surgeries are referred to tertiary hospital trauma centers.',
      time: '11:42 AM',
      status: 'read',
      actionCard: {
        title: 'Sports Impact Realignment & 3D Scan',
        price: 'Rs. 14,500/mo (0% Markup)',
        buttonText: '📅 Reserve Chair Today at 3:30 PM',
        buttonAction: 'book'
      }
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  const testPrompts = [
    {
      label: '⚽ Football Collision Query (Roman Urdu)',
      text: 'Football match mein daant hit hua hai, kya braces se theek ho sakta hai?'
    },
    {
      label: '💳 Installments & Sehat Card?',
      text: 'Kya Sehat Sahulat Card chalay ga ya monthly installments hain?'
    },
    {
      label: '🏥 Jaw Bone Fracture Policy?',
      text: 'Agar jaw bone toot gayi ho to kya aap surgery karte hain?'
    },
    {
      label: '📅 Today Appointment?',
      text: 'Doctor Zeeshan Haider se aaj ki appointment mil sakti hai?'
    }
  ];

  const handleSend = (userText: string) => {
    if (!userText.trim() || isBotTyping) return;

    const newMsg: WhatsAppMessage = {
      id: `w-${Date.now()}`,
      sender: 'patient',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered'
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');
    setIsBotTyping(true);

    setTimeout(() => {
      // Mark patient message as read
      setMessages((prev) =>
        prev.map((m) => (m.id === newMsg.id ? { ...m, status: 'read' } : m))
      );

      const q = userText.toLowerCase();
      let botReply: WhatsAppMessage;

      if (q.includes('sehat') || q.includes('card') || q.includes('insurance')) {
        botReply = {
          id: `w-reply-${Date.now()}`,
          sender: 'clinic_bot',
          text: '⚠️ **Transparency Notice (Section 6.2):**\nGovernment **Sehat Sahulat Card** does NOT cover elective aesthetic orthodontic braces.\n\nHowever, we provide **0% markup in-house monthly installments**:\n• Metal Braces: Rs. 9,500/mo\n• Sports Trauma Bundle: Rs. 14,500/mo\n• Frosted Ceramic: Rs. 16,500/mo\n\nPayable via Bank Alfalah, Meezan Bank, SadaPay, or Nayapay with zero markup!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read'
        };
      } else if (q.includes('jaw') || q.includes('fracture') || q.includes('surgery') || q.includes('toot')) {
        botReply = {
          id: `w-reply-${Date.now()}`,
          sender: 'clinic_bot',
          text: '🚫 **Out-of-Scope Boundary (Section 4.3):**\nApex Orthodontics DOES NOT perform inpatient surgical jaw bone reconstructive plating in-clinic.\n\nIf you have a fractured mandibular or maxillary bone, please visit the emergency maxillofacial trauma center at **Mayo Hospital** or **Shaikh Zayed Hospital Lahore** immediately.\n\nOnce the bone is medically stabilized, we will handle your full dental alignment with braces!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read'
        };
      } else if (q.includes('appointment') || q.includes('aaj') || q.includes('today') || q.includes('zeeshan') || q.includes('time')) {
        botReply = {
          id: `w-reply-${Date.now()}`,
          sender: 'clinic_bot',
          text: '✅ **Direct Booking Available:**\nDr. Zeeshan Haider, BDS, FCPS (Orthodontics) has reserved urgent sports trauma slots today at **3:30 PM** and **5:00 PM**.\n\nInitial 3D iTero scan is **Rs. 0 (Complimentary)**. Tap below to confirm your slot directly:',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read',
          actionCard: {
            title: 'Emergency Sports Trauma Slot',
            price: 'Today at 3:30 PM (DHA Phase 5)',
            buttonText: 'Confirm Chair Reservation',
            buttonAction: 'book'
          }
        };
      } else {
        botReply = {
          id: `w-reply-${Date.now()}`,
          sender: 'clinic_bot',
          text: 'Yes! Sports collision dental realignment is our clinical specialty (Section 2.1). We offer full braces packages from **Rs. 9,500/mo** to **Rs. 14,500/mo** with custom sports mouthguards included.\n\nWould you like to reserve a complimentary 3D scan chair today?',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read',
          actionCard: {
            title: 'Sports Impact Realignment Bundle',
            price: 'Rs. 14,500/mo (0% Markup)',
            buttonText: 'Book 3D Scan Chair',
            buttonAction: 'book'
          }
        };
      }

      setMessages((prev) => [...prev, botReply]);
      setIsBotTyping(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Banner explaining WhatsApp integration */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 rounded-3xl p-6 lg:p-7 text-white shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pakistan’s #1 Patient Channel: WhatsApp Business API</span>
          </div>
          <h3 className="text-xl lg:text-2xl font-black tracking-tight">
            How DocuScope Plugs into Your Clinic's Existing WhatsApp Number
          </h3>
          <p className="text-emerald-100/90 text-xs lg:text-sm leading-relaxed">
            In Pakistan, 90%+ of patients message clinics on WhatsApp, only to be left waiting for hours or days because receptionists are busy. DocuScope connects to your WhatsApp Business number via Meta Cloud API or webhook, instantly answering queries in English or Roman Urdu within 1.5 seconds—100% grounded in your practice scope PDF!
          </p>
        </div>
      </div>

      {/* Simulator Layout: Left side controls & prompts, Right side Phone frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Business Controls & Test Prompts */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="font-extrabold text-slate-900 text-sm">
                Live WhatsApp Webhook Status: Active
              </h4>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              When Hamza or any prospective client messages your WhatsApp number (<code>{whatsappNumber}</code>), DocuScope intercepts the message, performs vectorized lookup on your clinic PDFs, and dispatches verified answers with direct booking buttons.
            </p>

            {/* Test Prompt Pills */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                Click to Test Patient WhatsApp Inquiries:
              </span>
              <div className="space-y-2">
                {testPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(p.text)}
                    disabled={isBotTyping}
                    className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 text-xs transition group"
                  >
                    <div className="font-bold text-slate-800 group-hover:text-emerald-800">
                      {p.label}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 italic">
                      "{p.text}"
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Integration Details Box */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-700 font-semibold">
                <span>Webhook URL:</span>
                <span className="font-mono text-[11px] text-blue-600">/api/v1/whatsapp/webhook</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 font-semibold">
                <span>Connected Number:</span>
                <span className="font-mono text-[11px] text-emerald-700">{whatsappNumber}</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 font-semibold">
                <span>Language Support:</span>
                <span className="text-[11px] text-slate-600">English + Roman Urdu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Realistic Phone Mockup */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-[420px] bg-slate-900 rounded-[44px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-700/50">
            {/* Phone Screen Container */}
            <div className="bg-[#EFEAE2] rounded-[36px] overflow-hidden flex flex-col h-[650px] shadow-inner relative">
              {/* WhatsApp Green Top Header */}
              <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-md shrink-0">
                <div className="flex items-center space-x-2.5">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=120&q=80"
                      alt="Clinic"
                      className="w-10 h-10 rounded-full object-cover border border-white/20"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="font-bold text-sm tracking-tight leading-tight">
                        Apex Orthodontics DHA
                      </span>
                      <span className="text-[10px] bg-emerald-400 text-[#075E54] font-black rounded-full px-1">
                        ✓
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-100 flex items-center space-x-1">
                      <span>Verified Clinic Bot • Active</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-emerald-100">
                  <Video className="w-4 h-4 cursor-pointer" />
                  <Phone className="w-4 h-4 cursor-pointer" />
                  <MoreVertical className="w-4 h-4 cursor-pointer" />
                </div>
              </div>

              {/* Chat Message Scroll Area */}
              <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px]">
                {/* Security Encryption Notice */}
                <div className="flex justify-center">
                  <div className="bg-[#FFEECD] text-[#54656F] text-[10px] font-medium px-3 py-1.5 rounded-lg shadow-2xs max-w-xs text-center border border-amber-200">
                    🔒 Messages are end-to-end encrypted. AI responses are verified against official clinic scope PDFs.
                  </div>
                </div>

                {messages.map((m) => {
                  const isPatient = m.sender === 'patient';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isPatient ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 shadow-xs text-xs relative ${
                          isPatient
                            ? 'bg-[#E7FFDB] text-slate-900 rounded-tr-xs'
                            : 'bg-white text-slate-900 rounded-tl-xs'
                        }`}
                      >
                        <div className="whitespace-pre-line leading-relaxed">{m.text}</div>

                        {/* Interactive WhatsApp Action Card */}
                        {m.actionCard && (
                          <div className="mt-2.5 pt-2 border-t border-slate-100 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100 space-y-1.5">
                            <div className="font-bold text-emerald-950 text-[11px]">
                              {m.actionCard.title}
                            </div>
                            <div className="text-[11px] font-extrabold text-emerald-800">
                              {m.actionCard.price}
                            </div>
                            <button
                              onClick={onOpenBooking}
                              className="w-full py-1.5 px-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-[11px] rounded-lg shadow-xs transition flex items-center justify-center space-x-1"
                            >
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{m.actionCard.buttonText}</span>
                            </button>
                          </div>
                        )}

                        <div className="flex items-center justify-end space-x-1 mt-1 text-[10px] text-slate-400">
                          <span>{m.time}</span>
                          {isPatient && (
                            <CheckCheck
                              className={`w-3.5 h-3.5 ${
                                m.status === 'read' ? 'text-blue-500' : 'text-slate-400'
                              }`}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Bot Typing indicator */}
                {isBotTyping && (
                  <div className="flex items-center space-x-1.5 bg-white p-2.5 rounded-2xl shadow-xs w-fit text-xs text-slate-500">
                    <RefreshCw className="w-3 h-3 text-emerald-600 animate-spin" />
                    <span>Apex AI is consulting clinic PDF scope...</span>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* WhatsApp Message Input Bar */}
              <div className="p-2 bg-[#F0F2F5] flex items-center space-x-2 border-t border-slate-200 shrink-0">
                <Smile className="w-5 h-5 text-slate-500 cursor-pointer" />
                <Paperclip className="w-5 h-5 text-slate-500 cursor-pointer" />

                <input
                  type="text"
                  placeholder="Type a message (English or Roman Urdu)..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend(inputVal);
                  }}
                  className="flex-1 px-3 py-2 text-xs bg-white rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />

                {inputVal.trim() ? (
                  <button
                    onClick={() => handleSend(inputVal)}
                    className="p-2 bg-[#00A884] text-white rounded-full shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                ) : (
                  <Mic className="w-5 h-5 text-slate-500 cursor-pointer" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
