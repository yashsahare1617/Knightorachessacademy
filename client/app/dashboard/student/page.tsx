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
  Target,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function StudentDashboardPage() {
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
              {user.firstName ? user.firstName[0].toUpperCase() : '♞'}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-[#b8860b] text-xs font-bold uppercase mb-1">
                <Sparkles size={12} /> Student Portal
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Playfair_Display']">
                Welcome back, {user.firstName}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Ready for your next chess breakthrough? Keep practicing!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/trial" className="btn-primary text-xs sm:text-sm shadow-sm">
              Book Another Session
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
              <span className="text-xs text-slate-500 font-medium">Chess Rating</span>
              <Trophy size={18} className="text-[#b8860b]" />
            </div>
            <div className="text-2xl font-black text-slate-900">{user.chessRating || 1200}</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp size={12} /> Progressing nicely
            </div>
          </div>

          <div className="card bg-white border border-slate-200/90 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500 font-medium">Enrolled Courses</span>
              <BookOpen size={18} className="text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">1</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Active Batch</div>
          </div>

          <div className="card bg-white border border-slate-200/90 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500 font-medium">Attendance Rate</span>
              <CheckCircle2 size={18} className="text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">95%</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Last 30 days</div>
          </div>

          <div className="card bg-white border border-slate-200/90 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500 font-medium">Assignments Done</span>
              <Target size={18} className="text-[#b8860b]" />
            </div>
            <div className="text-2xl font-black text-slate-900">8/10</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">Puzzles completed</div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content: Schedule & Next Class */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 border border-slate-200/90 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 font-['Playfair_Display'] mb-4 flex items-center justify-between">
                <span>Upcoming Scheduled Class</span>
                <span className="badge badge-gold text-xs font-semibold">Live on Google Meet</span>
              </h2>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="text-base font-bold text-slate-900">
                    Intermediate Strategy: Rook Endgames & King Activity
                  </div>
                  <div className="text-xs text-slate-600 flex items-center gap-3 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-[#b8860b]" /> Saturday, 10:00 AM IST
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-[#b8860b]" /> 60 Mins
                    </span>
                  </div>
                </div>

                <a
                  href="https://meet.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs !py-2.5 !px-5 whitespace-nowrap self-start sm:self-auto shadow-sm"
                >
                  Join Class <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Assignments */}
            <div className="bg-white p-6 border border-slate-200/90 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 font-['Playfair_Display'] mb-4">
                Tactics & Homework
              </h2>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-sm">
                  <div>
                    <div className="font-semibold text-slate-900">Knight Fork & Pin Puzzles (Set 4)</div>
                    <div className="text-xs text-slate-500">Due in 2 days • 10 puzzles</div>
                  </div>
                  <span className="badge badge-blue text-xs font-semibold">Pending</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-sm">
                  <div>
                    <div className="font-semibold text-slate-900">Back-Rank Mate Defenses</div>
                    <div className="text-xs text-slate-500">Submitted • Graded: 95/100</div>
                  </div>
                  <span className="badge badge-green text-xs font-semibold">Completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Student Profile Card */}
            <div className="bg-white p-6 border border-slate-200/90 rounded-2xl shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <User size={18} className="text-[#b8860b]" /> Student Info
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Name:</span>
                  <span className="text-slate-900 font-medium">{user.firstName} {user.lastName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Email:</span>
                  <span className="text-slate-900 font-medium truncate max-w-[160px]">{user.email}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Role:</span>
                  <span className="text-[#b8860b] font-bold uppercase">{user.role}</span>
                </div>
                <div className="flex justify-between">
                  <span>Academy Coach:</span>
                  <span className="text-slate-900 font-medium">Grandmaster Coach</span>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Support */}
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-slate-700">
              <div className="font-bold text-slate-900 mb-1">Need help with class schedules?</div>
              <p className="mb-3 text-slate-600">
                Message our academy support on WhatsApp for quick schedule adjustments.
              </p>
              <a
                href="https://wa.me/918459527115?text=Hi%20KnightOra%20Support!%20Need%20assistance%20with%20my%20dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-700 font-bold hover:underline"
              >
                Chat on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
