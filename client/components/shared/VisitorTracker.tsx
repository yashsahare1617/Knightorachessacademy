'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { visitorsAPI } from '@/lib/api';

function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') return '';
  const KEY = 'knightora_visitor_id';
  let vid = localStorage.getItem(KEY);
  if (!vid) {
    // Generate UUID or pseudo-UUID
    vid = 'v_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
    localStorage.setItem(KEY, vid);
  }
  return vid;
}

export default function VisitorTracker() {
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    // Prevent duplicate track fires on same path during render
    if (!pathname || lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;

    const visitorId = getOrCreateVisitorId();
    if (!visitorId) return;

    const payload = {
      visitorId,
      page: pathname,
      title: typeof document !== 'undefined' ? document.title : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      screenResolution:
        typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : '',
    };

    // Non-blocking fire-and-forget
    visitorsAPI.track(payload).catch(() => {
      // Silently fail without interrupting user experience
    });
  }, [pathname]);

  return null;
}

