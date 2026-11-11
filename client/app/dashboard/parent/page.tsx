'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Trophy, 
  Calendar, 
  BookOpen, 
  Clock, 
  User, 
  LogOut, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function ParentDashboardPage() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (!mounted || loading || !user) {
    return (
      <div className="min-h-screen pt-36 pb-20 flex items-center justify-center bg-[#f8fafc]">
        <div className="spinner" />
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#f8fafc] relative">
      <div className="container">
        {/* Welcome Banner */}
        <div className="bg-white p-8 border border-slate-200/90 rounded-3xl shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#e5b839] to-[#b8860b] flex items-center justify-center text-2xl font-bold text-slate-950 shadow-md">
              {user.firstName ? user.firstName[0].toUpperCase() : '👨‍👧'}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-[#b8860b] text-xs font-bold uppercase mb-1">
                <Sparkles size={12} /> Parent Portal
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Playfair_Display']">
                Welcome, {user.firstName}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Track your child&apos;s training progress, attendance, and coach feedback.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/trial" className="btn-primary text-xs sm:text-sm shadow-sm">
              Book Another Trial
            </Link>
            <button
              onClick={handleLogout}
              className="btn-ghost text-xs sm:text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1.5 border border-slate-200 px-3 py-2 rounded-lg"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card bg-white border border-slate-200/90 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500 font-medium">Child Rating</span>
              <Trophy size={18} className="text-[#b8860b]" />
            </div>
            <div className="text-2xl font-black text-slate-900">1250</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp size={12} /> +50 pts this month
            </div>
          </div>

          <div className="card bg-white border border-slate-200/90 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500 font-medium">Attendance</span>
              <CheckCircle2 size={18} className="text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">100%</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">8 of 8 sessions</div>
          </div>

          <div className="card bg-white border border-slate-200/90 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500 font-medium">Active Course</span>
              <BookOpen size={18} className="text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">1</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Junior Masters Batch</div>
          </div>

          <div className="card bg-white border border-slate-200/90 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500 font-medium">Coach Feedback</span>
              <Sparkles size={18} className="text-[#b8860b]" />
            </div>
            <div className="text-2xl font-black text-slate-900">Excellent</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">High tactical focus</div>
          </div>
        </div>

        {/* Coach Remark */}
        <div className="bg-white p-6 border border-slate-200/90 rounded-2xl shadow-sm mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-2 font-['Playfair_Display']">
            Latest Coach Note & Recommendations
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/60">
            &ldquo;Great dedication shown during our tactical drills. Calculation speed has doubled in 4 weeks. Recommended daily activity: solve 10 lichess/chess.com puzzles before next weekend.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
