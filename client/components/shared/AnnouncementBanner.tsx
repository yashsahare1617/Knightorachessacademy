'use client';

import { useEffect, useState } from 'react';
import { X, Megaphone } from 'lucide-react';
import { announcementsAPI } from '@/lib/api';

interface Announcement {
  _id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'event';
}

const typeStyles = {
  info: { bg: 'bg-blue-500/10 border-blue-500/20', text: 'text-blue-300', icon: '📢' },
  warning: { bg: 'bg-yellow-500/10 border-yellow-500/20', text: 'text-yellow-300', icon: '⚠️' },
  success: { bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-300', icon: '✅' },
  event: { bg: 'bg-purple-500/10 border-purple-500/20', text: 'text-purple-300', icon: '🏆' },
};

export default function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    announcementsAPI.getAll().then(({ data }) => {
      setAnnouncements(data.data.announcements || []);
    }).catch(() => {});
  }, []);

  const visible = announcements.filter(a => !dismissed.has(a._id));
  if (visible.length === 0) return null;

  return (
    <div className="fixed top-20 left-0 right-0 z-40 pointer-events-none">
      <div className="container">
        <div className="pointer-events-auto space-y-2">
          {visible.slice(0, 1).map(ann => {
            const style = typeStyles[ann.type] || typeStyles.info;
            return (
              <div
                key={ann._id}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm ${style.bg} ${style.text} animate-fade-in-up`}
              >
                <span>{style.icon}</span>
                <span className="font-semibold">{ann.title}:</span>
                <span className="flex-1 opacity-90">{ann.content}</span>
                <button
                  onClick={() => setDismissed(p => new Set(p).add(ann._id))}
                  className="p-1 rounded hover:bg-white/10 transition-colors shrink-0"
                  aria-label="Dismiss"
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
