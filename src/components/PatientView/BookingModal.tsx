import React, { useState } from 'react';
import { PricingPackage, Appointment } from '../../types';
import { X, Calendar, Clock, User, CheckCircle2, ShieldCheck, MapPin, Download, Sparkles, Phone, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packages: PricingPackage[];
  initialPackageId?: string;
  initialReason?: string;
  onBookingConfirmed: (appointment: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  packages,
  initialPackageId,
  initialReason = 'Sports Trauma Dental Alignment & 3D Scan',
  onBookingConfirmed
}) => {
  const [selectedPkgId, setSelectedPkgId] = useState<string>(initialPackageId || 'pkg-sports');
  const [reason, setReason] = useState(initialReason);
  const [doctor, setDoctor] = useState('Dr. Zeeshan Haider, BDS, FCPS (Orthodontics)');
  const [selectedDate, setSelectedDate] = useState('Today (Emergency Sports Trauma Slot)');
  const [selectedTime, setSelectedTime] = useState('3:30 PM');
  const [patientName, setPatientName] = useState('Hamza Al-Sayed');
  const [patientPhone, setPatientPhone] = useState('+92 300 7829134');
  const [patientEmail, setPatientEmail] = useState('hamza.sports@example.com');
  const [notes, setNotes] = useState('Football collision in DHA ground yesterday. Upper front teeth shifted inward.');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedAppt, setConfirmedAppt] = useState<Appointment | null>(null);

  if (!isOpen) return null;

  const availableSlots = [
    { date: 'Today (Emergency Sports Trauma Slot)', times: ['3:30 PM', '5:00 PM', '7:15 PM'] },
    { date: 'Tomorrow (Wednesday)', times: ['11:30 AM', '2:00 PM', '4:30 PM', '6:30 PM'] },
    { date: 'Thursday', times: ['12:00 PM', '3:45 PM', '5:30 PM'] }
  ];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedPkg = packages.find((p) => p.id === selectedPkgId);

    const newAppt: Appointment = {
      id: `LHR-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName,
      patientPhone,
      patientEmail,
      reason,
      selectedPackage: selectedPkg?.name || 'General Orthodontic Consult',
      doctorName: doctor,
      date: selectedDate,
      time: selectedTime,
      status: 'Confirmed',
      source: 'DocuScope Instant Booking',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConfirmedAppt(newAppt);
    setIsConfirmed(true);
    onBookingConfirmed(newAppt);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  const handleDownloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Apex Orthodontics Lahore//DocuScope Booking//EN
BEGIN:VEVENT
SUMMARY:Apex Orthodontics DHA Phase 5 Lahore - Dental Trauma Scan
DESCRIPTION:Appointment for ${patientName}. Reason: ${reason} with ${doctor}.
LOCATION:Plaza 28-CCA, Sector C, Phase 5 DHA, Lahore, Pakistan
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Apex_Lahore_Appointment.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {isConfirmed ? 'Chair Confirmed in DHA Phase 5!' : 'Book Direct Chair Slot'}
              </h3>
              <p className="text-xs text-slate-500">
                Apex Orthodontics DHA Lahore • Zero 24h WhatsApp delay
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isConfirmed ? (
            <form onSubmit={handleConfirm} className="space-y-5">
              {/* Reason */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                  1. Clinical Reason for Visit
                </label>
                <input
                  type="text"
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                />
                <div className="mt-1.5 flex items-center space-x-1.5 text-[11px] text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified in-scope under sports dental trauma protocol</span>
                </div>
              </div>

              {/* Package Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                  2. Select Preferred Braces Treatment Package (PKR)
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPkgId(pkg.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                        selectedPkgId === pkg.id
                          ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-100'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-900 text-xs">{pkg.name}</span>
                          {pkg.popular && (
                            <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">
                              Hamza's Match
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{pkg.idealFor}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-extrabold text-blue-900 text-sm">
                          Rs. {pkg.monthlyPrice.toLocaleString()}/mo
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          or Rs. {pkg.totalPrice.toLocaleString()} (0% markup)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialist Doctor */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                  3. Select Orthodontist
                </label>
                <select
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                >
                  <option value="Dr. Zeeshan Haider, BDS, FCPS (Orthodontics)">
                    Dr. Zeeshan Haider, BDS, FCPS (Orthodontics), MOrth RCS — PMDC Verified
                  </option>
                  <option value="Dr. Ayesha Tariq, BDS, RDS (Aligners Specialist)">
                    Dr. Ayesha Tariq, BDS, RDS (Certified Clear Aligners & 3D Imaging)
                  </option>
                </select>
              </div>

              {/* Date & Time Slot */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                  4. Pick Date & Urgent Time Slot
                </label>
                <div className="space-y-2">
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {availableSlots.map((s) => (
                      <option key={s.date} value={s.date}>
                        {s.date}
                      </option>
                    ))}
                  </select>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {availableSlots
                      .find((s) => s.date === selectedDate)
                      ?.times.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                            selectedTime === time
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                  </div>
                </div>
              </div>

              {/* Patient Details (Hamza) */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  5. Patient Details (Hamza)
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">WhatsApp / Mobile (+92)</label>
                    <input
                      type="text"
                      required
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">Sports Collision Notes</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Rs. 0 Initial 3D Scan Deposit • Cancel anytime
                </span>
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Direct Appointment</span>
                </button>
              </div>
            </form>
          ) : (
            /* Confirmation Pass */
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Appointment Confirmed, {patientName}!
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your chair is reserved at DHA Phase 5, Lahore. No 24-hour waiting for WhatsApp confirmation—your 3D sports trauma scan is locked in.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-blue-300 block">
                      Confirmed Lahore Booking Pass
                    </span>
                    <span className="text-lg font-black tracking-wider font-mono">
                      {confirmedAppt?.id}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-lg border border-emerald-500/30">
                    Direct Reserved
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Date & Time</span>
                    <span className="font-bold text-white text-sm">
                      {confirmedAppt?.date} • {confirmedAppt?.time}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Orthodontist</span>
                    <span className="font-bold text-white text-sm">
                      {confirmedAppt?.doctorName.split(',')[0]}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Treatment / Package</span>
                    <span className="font-bold text-blue-300">
                      {confirmedAppt?.selectedPackage}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Initial Diagnostic Fee</span>
                    <span className="font-bold text-emerald-400">Rs. 0 (Complimentary 3D Scan)</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Plaza 28-CCA, Phase 5 DHA, Lahore</span>
                  </div>
                  <span className="font-mono">DocuScope Pakistan</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDownloadCalendar}
                  className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Add to Apple / Google Calendar</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
