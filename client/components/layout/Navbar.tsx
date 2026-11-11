'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, User, Phone, Mail } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/courses', label: 'Courses' },
  { href: '/blog', label: 'Blog' },
  { href: '/gallery', label: 'Gallery' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const dashboardPath =
    user?.role === 'admin' ? '/dashboard/admin'
    : user?.role === 'coach' ? '/dashboard/coach'
    : user?.role === 'student' ? '/dashboard/student'
    : '/dashboard/parent';

  return (
    <>
      {/* Top info bar */}
      <div className={`fixed top-0 left-0 right-0 z-[51] transition-all duration-300 ${
        scrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-auto opacity-100'
      }`}>
        <div className="bg-slate-950/80 backdrop-blur-md border-b border-white/10">
          <div className="container">
            <div className="hidden md:flex items-center justify-between py-2 text-xs">
              <div className="flex items-center gap-5 text-white/80">
                <a href="mailto:knightora.chess.academy@gmail.com" className="flex items-center gap-1.5 hover:text-[#e5b839] transition-colors">
                  <Mail size={12} className="text-[#e5b839]" />
                  knightora.chess.academy@gmail.com
                </a>
                <a href="tel:+918459527115" className="flex items-center gap-1.5 hover:text-[#e5b839] transition-colors">
                  <Phone size={12} className="text-[#e5b839]" />
                  +91 84595 27115
                </a>
              </div>
              <div className="flex items-center gap-4">
                <a href="https://www.instagram.com/knightora.chess?mdxt=MmlibXBjamliaDZz" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#e5b839] transition-colors" aria-label="Instagram">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'top-0 bg-white/95 backdrop-blur-xl shadow-[0_4px_24px_rgba(15,23,42,0.06)] border-b border-slate-200/80'
            : 'top-0 md:top-[37px] bg-gradient-to-b from-slate-950/80 to-transparent'
        }`}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-20" aria-label="Main navigation">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="KnightOra Chess Academy Home">
              <Image
                src="/images/knightora-logo.jpg"
                alt="KnightOra Chess Academy"
                width={52}
                height={52}
                className="w-[52px] h-[52px] rounded-xl object-contain bg-white p-0.5 shadow-md border border-slate-200/60 group-hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] transition-shadow duration-300"
                priority
              />
              <div className="hidden sm:block">
                <span className={`font-['Playfair_Display'] font-bold text-xl tracking-tight transition-colors ${
                  scrolled ? 'text-slate-900' : 'text-white'
                }`}>
                  KnightOra
                </span>
                <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#e5b839] leading-none -mt-0.5">Chess Academy</div>
              </div>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-7 xl:gap-9">
              <nav className="flex items-center gap-6 xl:gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link px-2 py-1 text-[15px] font-medium tracking-wide transition-colors ${
                      pathname === link.href 
                        ? 'active text-[#e5b839]' 
                        : scrolled 
                        ? 'text-slate-600 hover:text-slate-900' 
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <Link
                href="/trial"
                className="btn-primary !py-2.5 !px-6 !text-sm whitespace-nowrap shadow-[0_4px_16px_rgba(184,134,11,0.25)] hover:shadow-[0_6px_22px_rgba(184,134,11,0.35)] transition-all"
              >
                Book Free Trial
              </Link>
            </div>

            {/* Auth area */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <div ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${
                      scrolled ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-white/10 text-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a227] to-[#b8860b] flex items-center justify-center text-slate-900 font-bold text-sm">
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                    <span className="text-sm font-semibold">{user.firstName}</span>
                    <ChevronDown size={14} className={`text-[#e5b839] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-200 animate-fade-in z-50">
                      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70">
                        <p className="text-sm font-semibold text-slate-900">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-[#b8860b] font-medium capitalize">{user.role}</p>
                      </div>
                      <Link
                        href={dashboardPath}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors"
                      >
                        <LayoutDashboard size={15} /> Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors"
                      >
                        <User size={15} /> My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut size={15} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link 
                    href="/auth/login" 
                    className={`btn-ghost text-sm ${!scrolled ? '!text-white/90 hover:!text-white hover:!bg-white/10' : ''}`}
                  >
                    Sign In
                  </Link>
                  <Link href="/auth/register" className="btn-secondary !py-2 !px-5 !text-sm">Register</Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100/10 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? (
                <X size={22} className={scrolled ? 'text-slate-900' : 'text-white'} />
              ) : (
                <Menu size={22} className={scrolled ? 'text-slate-900' : 'text-white'} />
              )}
            </button>
          </nav>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        } bg-white/98 backdrop-blur-xl border-t border-slate-200 shadow-xl`}>
          <div className="container py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-[rgba(201,162,39,0.12)] text-[#b8860b] font-semibold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/trial"
              className="block px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-[#e5b839] to-[#c9a227] text-slate-950 mt-2 text-center shadow-md"
            >
              Book Free Trial
            </Link>

            {user ? (
              <div className="pt-3 border-t border-slate-200 space-y-1">
                <Link href={dashboardPath} className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-slate-700 hover:bg-slate-50">
                  <LayoutDashboard size={15} /> Dashboard
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-rose-600 hover:bg-rose-50">
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-slate-200 flex gap-2">
                <Link href="/auth/login" className="flex-1 btn-ghost text-center text-sm">Sign In</Link>
                <Link href="/auth/register" className="flex-1 btn-secondary text-center text-sm">Register</Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
