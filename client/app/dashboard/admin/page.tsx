'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Users, Calendar, Award, BookOpen, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!loading && !user) router.push('/auth/login');
  }, [user, loading, router]);

  if (!mounted || loading || !user) {
    return (
      <div className="min-h-screen pt-36 pb-20 flex items-center justify-center bg-[#080c18]">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#080c18] relative">
      <div className="container">
        <div className="card-glass p-8 border border-[rgba(201,162,39,0.25)] shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c9a227] to-[#8c6b12] flex items-center justify-center text-2xl font-bold text-[#080c18] shadow-lg">
              ♛
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[rgba(201,162,39,0.15)] text-[#c9a227] text-xs font-semibold uppercase mb-1">
                <Sparkles size={12} /> Master Admin
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Playfair_Display']">
                KnightOra Command Center
              </h1>
              <p className="text-xs sm:text-sm text-[rgba(232,232,232,0.6)]">
                Manage academy enrollments, coaches, trial requests, and academy settings.
              </p>
            </div>
          </div>

          <button
            onClick={() => { logout(); router.push('/'); }}
            className="btn-ghost text-xs sm:text-sm text-[rgba(232,232,232,0.6)] hover:text-white flex items-center gap-1.5 border border-white/10 px-3 py-2 rounded-lg self-start md:self-auto"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card bg-[#0c1224] border border-[rgba(201,162,39,0.15)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="text-[#c9a227]" size={20} />
              <h3 className="font-bold text-white">Trial Bookings</h3>
            </div>
            <div className="text-3xl font-black text-white">12</div>
            <p className="text-xs text-[rgba(232,232,232,0.5)] mt-1">3 awaiting review</p>
          </div>

          <div className="card bg-[#0c1224] border border-[rgba(201,162,39,0.15)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-[#60a5fa]" size={20} />
              <h3 className="font-bold text-white">Students</h3>
            </div>
            <div className="text-3xl font-black text-white">150+</div>
            <p className="text-xs text-[rgba(232,232,232,0.5)] mt-1">Across all levels</p>
          </div>

          <div className="card bg-[#0c1224] border border-[rgba(201,162,39,0.15)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <Award className="text-[#34d399]" size={20} />
              <h3 className="font-bold text-white">Coaches</h3>
            </div>
            <div className="text-3xl font-black text-white">8</div>
            <p className="text-xs text-[rgba(232,232,232,0.5)] mt-1">FIDE Certified</p>
          </div>

          <div className="card bg-[#0c1224] border border-[rgba(201,162,39,0.15)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="text-[#c9a227]" size={20} />
              <h3 className="font-bold text-white">Courses</h3>
            </div>
            <div className="text-3xl font-black text-white">6</div>
            <p className="text-xs text-[rgba(232,232,232,0.5)] mt-1">Published syllabus</p>
          </div>
        </div>
      </div>
    </div>
  );
}
