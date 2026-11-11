'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/auth-context';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password) {
      toast.error('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      await login(formData.email.trim(), formData.password);
      toast.success('Welcome back!');
      
      const stored = localStorage.getItem('user');
      const user = stored ? JSON.parse(stored) : null;
      if (user?.role === 'admin') router.push('/dashboard/admin');
      else if (user?.role === 'coach') router.push('/dashboard/coach');
      else if (user?.role === 'parent') router.push('/dashboard/parent');
      else router.push('/dashboard/student');
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        'Invalid email or password. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-[#f8fafc] relative flex items-center justify-center overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/3 -left-36 w-80 h-80 bg-[#c9a227]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-36 w-80 h-80 bg-blue-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 chess-bg opacity-30 pointer-events-none" />

      <div className="container max-w-md relative z-10">
        <ScrollReveal y={24} duration={0.65}>
          <div className="bg-white p-8 sm:p-10 border border-slate-200/90 rounded-3xl shadow-xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#b8860b] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles size={13} />
                Portal Access
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Playfair_Display']">
                Sign In to <span className="text-gold-gradient">KnightOra</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Access your classes, game analysis, and assignments
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="label">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={17} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="input pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="label !mb-0">Password</label>
                  <Link
                    href="/trial"
                    className="text-xs text-[#b8860b] font-medium hover:underline"
                    tabIndex={-1}
                  >
                    Need an account?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={17} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                    className="input pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 text-base font-bold shadow-md flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <div className="spinner" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-7 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative bg-white px-3 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                New to KnightOra?
              </span>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <Link
                href="/auth/register"
                className="btn-secondary w-full py-3 text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                Create a Free Student or Parent Account
              </Link>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mt-6">
              <ShieldCheck size={14} className="text-[#b8860b]" />
              <span>Secure 256-bit encrypted authentication</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
