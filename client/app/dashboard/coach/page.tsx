'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Users, Calendar, Award, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function CoachDashboardPage() {
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
              {user.firstName ? user.firstName[0].toUpperCase() : '♔'}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[rgba(201,162,39,0.15)] text-[#c9a227] text-xs font-semibold uppercase mb-1">
                <Sparkles size={12} /> Coach Workspace
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Playfair_Display']">
                Coach {user.firstName}
              </h1>
              <p className="text-xs sm:text-sm text-[rgba(232,232,232,0.6)]">
                Manage your training batches, mark attendance, and evaluate assignments.
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-[#0c1224] border border-[rgba(201,162,39,0.15)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-[#c9a227]" size={20} />
              <h3 className="font-bold text-white">Active Students</h3>
            </div>
            <div className="text-3xl font-black text-white">24</div>
            <p className="text-xs text-[rgba(232,232,232,0.5)] mt-1">Across 3 batches</p>
          </div>

          <div className="card bg-[#0c1224] border border-[rgba(201,162,39,0.15)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="text-[#60a5fa]" size={20} />
              <h3 className="font-bold text-white">Today&apos;s Sessions</h3>
            </div>
            <div className="text-3xl font-black text-white">2</div>
            <p className="text-xs text-[rgba(232,232,232,0.5)] mt-1">Next: 4:30 PM Beginner Batch</p>
          </div>

          <div className="card bg-[#0c1224] border border-[rgba(201,162,39,0.15)] p-6">
            <div className="flex items-center gap-3 mb-2">
              <Award className="text-[#34d399]" size={20} />
              <h3 className="font-bold text-white">Pending Reviews</h3>
            </div>
            <div className="text-3xl font-black text-white">5</div>
            <p className="text-xs text-[rgba(232,232,232,0.5)] mt-1">Tactics submissions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
