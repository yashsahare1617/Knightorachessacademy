'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/auth-context';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'student' as 'student' | 'parent',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password rules validation
  const hasMinLen = formData.password.length >= 8;
  const hasUpper = /[A-Z]/.test(formData.password);
  const hasNumber = /[0-9]/.test(formData.password);
  const passwordsMatch = formData.password && formData.password === formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter a valid email');
      return;
    }
    if (!hasMinLen || !hasUpper || !hasNumber) {
      toast.error('Please ensure your password meets all requirements');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await register({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        role: formData.role,
        password: formData.password,
      });

      toast.success('Account created successfully!');
      if (formData.role === 'parent') {
        router.push('/dashboard/parent');
      } else {
        router.push('/dashboard/student');
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        'Failed to register account. Please check your details.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-[#f8fafc] relative flex items-center justify-center overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/4 -left-36 w-80 h-80 bg-[#c9a227]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-36 w-80 h-80 bg-blue-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 chess-bg opacity-30 pointer-events-none" />

      <div className="container max-w-lg relative z-10">
        <ScrollReveal y={24} duration={0.65}>
          <div className="bg-white p-8 sm:p-10 border border-slate-200/90 rounded-3xl shadow-xl">
            {/* Header */}
            <div className="text-center mb-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#b8860b] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles size={13} />
                Join the Academy
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Playfair_Display']">
                Create Your <span className="text-gold-gradient">Account</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Start learning chess with certified FIDE trainers today
              </p>
            </div>

            {/* Role Selector Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200 mb-6">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'student' })}
                className={`py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  formData.role === 'student'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ♟ I am a Student / Player
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'parent' })}
                className={`py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  formData.role === 'parent'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                👨‍👧 I am a Parent / Guardian
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="label">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="First name"
                      className="input pl-10 text-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="label">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Last name"
                    className="input text-sm"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="label">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="input pl-10 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="label">
                  Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="input pl-10 text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="At least 8 characters"
                    className="input pl-10 pr-10 text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Password strength checklist */}
                <div className="grid grid-cols-3 gap-1 mt-2 text-[11px] text-slate-500">
                  <span className={`flex items-center gap-1 ${hasMinLen ? 'text-emerald-600 font-medium' : ''}`}>
                    <Check size={11} className={hasMinLen ? 'opacity-100' : 'opacity-40'} /> 8+ chars
                  </span>
                  <span className={`flex items-center gap-1 ${hasUpper ? 'text-emerald-600 font-medium' : ''}`}>
                    <Check size={11} className={hasUpper ? 'opacity-100' : 'opacity-40'} /> 1 Uppercase
                  </span>
                  <span className={`flex items-center gap-1 ${hasNumber ? 'text-emerald-600 font-medium' : ''}`}>
                    <Check size={11} className={hasNumber ? 'opacity-100' : 'opacity-40'} /> 1 Number
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="label">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Repeat your password"
                    className="input pl-10 text-sm"
                    required
                  />
                </div>
                {formData.confirmPassword && (
                  <div className={`text-[11px] mt-1 font-medium ${passwordsMatch ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 text-base font-bold shadow-md flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <>
                    <div className="spinner" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>

            {/* Footer note */}
            <div className="text-center mt-6 text-xs text-slate-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-[#b8860b] font-bold hover:underline">
                Sign In here
              </Link>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mt-5 pt-4 border-t border-slate-100">
              <ShieldCheck size={14} className="text-[#b8860b]" />
              <span>By registering, you agree to KnightOra terms of service</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
