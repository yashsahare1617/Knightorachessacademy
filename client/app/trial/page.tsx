'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  ArrowRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { trialsAPI } from '@/lib/api';
import ScrollReveal from '@/components/shared/ScrollReveal';

const timeSlots = [
  '10:00 AM - 11:00 AM',
  '11:30 AM - 12:30 PM',
  '03:00 PM - 04:00 PM',
  '04:30 PM - 05:30 PM',
  '06:00 PM - 07:00 PM',
  '07:30 PM - 08:30 PM',
];

const skillLevels = [
  { id: 'beginner', label: 'Complete Beginner', desc: 'New to chess or learning piece movements' },
  { id: 'intermediate', label: 'Knows the Basics', desc: 'Plays casually, understands checkmate and basic tactics' },
  { id: 'advanced', label: 'Competitive / Rated', desc: 'Participates in tournaments or online rated 1200+' },
];

export default function BookTrialPage() {
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    whatsapp: '',
    studentName: '',
    studentAge: '',
    currentLevel: 'beginner',
    preferredDate: '',
    preferredTime: timeSlots[2],
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Set minimum date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.studentName.trim()) {
      toast.error('Please enter the student name');
      return;
    }
    if (!formData.parentName.trim()) {
      toast.error('Please enter parent or guardian name');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!formData.phone.trim()) {
      toast.error('Please enter a contact number');
      return;
    }
    const age = parseInt(formData.studentAge, 10);
    if (isNaN(age) || age < 4 || age > 80) {
      toast.error('Student age must be between 4 and 80');
      return;
    }
    if (!formData.preferredDate) {
      toast.error('Please select a preferred date');
      return;
    }
    if (!formData.preferredTime) {
      toast.error('Please select a preferred time slot');
      return;
    }

    setLoading(true);

    const levelLabel =
      formData.currentLevel === 'beginner'
        ? 'Complete Beginner'
        : formData.currentLevel === 'intermediate'
        ? 'Knows the Basics'
        : 'Competitive / Rated';

    const dateFormatted = new Date(formData.preferredDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const waMessage = [
      `Hi KnightOra! I'd like to book a FREE TRIAL class. 🎉`,
      ``,
      `👤 Student: ${formData.studentName.trim()} (Age: ${formData.studentAge})`,
      `📚 Level: ${levelLabel}`,
      `👨‍👩 Parent/Guardian: ${formData.parentName.trim()}`,
      `📧 Email: ${formData.email.trim()}`,
      `📞 Phone: ${formData.phone.trim()}`,
      `📅 Preferred Date: ${dateFormatted}`,
      `⏰ Preferred Time: ${formData.preferredTime}`,
      ...(formData.message.trim() ? [`📝 Goals: ${formData.message.trim()}`] : []),
      ``,
      `Please confirm my free trial booking. Thank you! 🙏`,
    ].join('\n');

    // 1. Save booking details to MongoDB Atlas
    const payload = {
      parentName: formData.parentName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      whatsapp: formData.whatsapp.trim() || formData.phone.trim(),
      studentName: formData.studentName.trim(),
      studentAge: age,
      currentLevel: formData.currentLevel,
      preferredDate: new Date(formData.preferredDate).toISOString(),
      preferredTime: formData.preferredTime,
      message: formData.message.trim(),
    };

    trialsAPI
      .book(payload)
      .then(() => {
        console.log('✅ Trial booking saved in MongoDB Atlas');
      })
      .catch((err) => {
        console.warn('Booking API notification:', err);
      })
      .finally(() => {
        // 2. Open WhatsApp with formatted booking message
        const waUrl = `https://wa.me/918459527115?text=${encodeURIComponent(waMessage)}`;
        window.open(waUrl, '_blank');

        setLoading(false);
        setSubmitted(true);
        toast.success('Trial booking saved! Confirming on WhatsApp...');
      });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#f8fafc] relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#c9a227]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-blue-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 chess-bg opacity-30 pointer-events-none" />

      <div className="container relative z-10">
        {/* Header Breadcrumb & Title */}
        <ScrollReveal y={24} duration={0.65}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-[#b8860b] text-xs font-bold tracking-wider uppercase mb-4 shadow-sm">
              <Sparkles size={14} />
              100% Free • No Obligation
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-['Playfair_Display'] tracking-tight mb-4">
              Book Your Free <span className="text-gold-gradient">Trial Class</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Experience our interactive teaching methodology firsthand. Our grandmaster-trained coaches assess skill level, identify strengths, and outline a tailored roadmap.
            </p>
          </div>
        </ScrollReveal>

        {submitted ? (
          /* WhatsApp Sent Success Card */
          <ScrollReveal y={20} duration={0.65}>
            <div className="max-w-xl mx-auto bg-white p-8 sm:p-10 text-center border border-slate-200/90 rounded-3xl shadow-xl">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-['Playfair_Display'] mb-3">
                WhatsApp Opened! 🎉
              </h2>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Your booking details for <strong className="text-[#b8860b]">{formData.studentName}</strong> have been pre-filled in WhatsApp. Just hit <strong className="text-slate-900">Send</strong> to confirm your free trial with KnightOra!
              </p>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-left mb-8 flex items-start gap-3">
                <ShieldCheck className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                <p className="text-xs text-slate-700 leading-relaxed">
                  Our coordinator will confirm your slot and send a Google Meet link within <strong className="text-slate-900">2-4 hours</strong> via WhatsApp.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/" className="btn-secondary text-sm">
                  Return to Home
                </Link>
                <Link href="/courses" className="btn-primary text-sm shadow-md">
                  Explore Courses <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        ) : (
          /* Booking Layout: Features Column + Form Column */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
            {/* Left Column: What to expect & Trust */}
            <ScrollReveal x={-20} y={0} duration={0.65} className="lg:col-span-5 space-y-6">
              <div className="bg-white p-7 border border-slate-200/90 rounded-3xl shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 font-['Playfair_Display'] mb-4 flex items-center gap-2">
                  <Award className="text-[#b8860b]" size={22} />
                  What Happens in Your Free Trial?
                </h3>
                <ul className="space-y-4 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-500/15 text-[#b8860b] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-slate-900 block font-semibold">1-on-1 Live Assessment</strong>
                      45 minutes interactive evaluation with a FIDE-certified trainer.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-500/15 text-[#b8860b] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-slate-900 block font-semibold">Strengths & Tactical Analysis</strong>
                      Discover calculation speed, tactical awareness, and opening knowledge.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-500/15 text-[#b8860b] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-slate-900 block font-semibold">Customized Improvement Plan</strong>
                      Receive a recommended syllabus and batch timing suitable for your goals.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Quick highlight cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 text-center shadow-sm">
                  <div className="text-2xl font-black text-[#b8860b] mb-1 font-['Playfair_Display']">1:4</div>
                  <div className="text-xs text-slate-600 font-medium">Low Student-Coach Ratio</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 text-center shadow-sm">
                  <div className="text-2xl font-black text-[#b8860b] mb-1 font-['Playfair_Display']">45 Min</div>
                  <div className="text-xs text-slate-600 font-medium">Comprehensive Session</div>
                </div>
              </div>

              {/* Need Assistance card */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#b8860b]/20 flex items-center justify-center text-[#b8860b] shrink-0">
                  <Phone size={18} />
                </div>
                <div className="text-xs text-slate-700">
                  Need immediate help or prefer booking over a call?{' '}
                  <a href="tel:+918459527115" className="text-[#b8860b] font-bold hover:underline block mt-0.5">
                    +91 84595 27115
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: The Booking Form */}
            <ScrollReveal x={20} y={0} duration={0.65} className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="bg-white p-7 sm:p-9 border border-slate-200/90 rounded-3xl shadow-xl relative">
                <div className="mb-6 pb-4 border-b border-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900 font-['Playfair_Display']">
                    Student & Booking Details
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Please provide your contact info and preferred schedule.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Student Name & Age */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="label">
                        Student Full Name <span className="text-[#b8860b]">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                        <input
                          type="text"
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleChange}
                          placeholder="e.g. Aarav Patel"
                          className="input !pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label">
                        Age <span className="text-[#b8860b]">*</span>
                      </label>
                      <input
                        type="number"
                        name="studentAge"
                        value={formData.studentAge}
                        onChange={handleChange}
                        placeholder="e.g. 8"
                        min="4"
                        max="80"
                        className="input"
                        required
                      />
                    </div>
                  </div>

                  {/* Chess Level Selection */}
                  <div>
                    <label className="label mb-2">
                      Current Chess Knowledge <span className="text-[#b8860b]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {skillLevels.map((lvl) => (
                        <button
                          key={lvl.id}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, currentLevel: lvl.id }))}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            formData.currentLevel === lvl.id
                              ? 'bg-amber-50 border-[#b8860b] text-slate-900 shadow-sm'
                              : 'bg-slate-50/80 border-slate-200 text-slate-600 hover:border-[#b8860b]/40'
                          }`}
                        >
                          <div className="font-semibold text-xs sm:text-sm text-slate-900 mb-0.5">{lvl.label}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-2 leading-tight">{lvl.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Parent Name */}
                  <div>
                    <label className="label">
                      Parent / Guardian Name <span className="text-[#b8860b]">*</span>
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      placeholder="e.g. Rajesh Patel"
                      className="input"
                      required
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">
                        Email Address <span className="text-[#b8860b]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="rajesh@example.com"
                          className="input !pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label">
                        Phone / WhatsApp Number <span className="text-[#b8860b]">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="input !pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preferred Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">
                        Preferred Date <span className="text-[#b8860b]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          min={minDate}
                          onChange={handleChange}
                          className="input"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label">
                        Preferred Time Slot <span className="text-[#b8860b]">*</span>
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="input"
                        required
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot} className="bg-white text-slate-900">
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Optional Message */}
                  <div>
                    <label className="label">
                      Special Goals or Questions <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any particular tournament goals, preferred languages, or chess experience to share..."
                      className="input resize-none text-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 text-base font-bold flex items-center justify-center gap-2.5 mt-4 rounded-xl bg-[#25D366] hover:bg-[#1da851] text-white shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.5)] transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="spinner" />
                        <span>Opening WhatsApp...</span>
                      </>
                    ) : (
                      <>
                        {/* WhatsApp SVG icon */}
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                          <path d="M12.003 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.304A9.97 9.97 0 0012.003 22C17.529 22 22 17.523 22 12S17.529 2 12.003 2zm0 18.188a8.17 8.17 0 01-4.17-1.145l-.299-.178-3.095.811.825-3.018-.195-.31A8.188 8.188 0 1112.003 20.188z" />
                        </svg>
                        <span>Book Free Trial via WhatsApp</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
                    <ShieldCheck size={14} className="text-[#b8860b]" />
                    <span>No credit card required. Instant confirmation.</span>
                  </div>
                </div>
              </form>
            </ScrollReveal>
          </div>
        )}
      </div>
    </div>
  );
}
