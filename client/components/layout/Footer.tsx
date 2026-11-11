import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  academy: [
    { href: '/about', label: 'About Us' },
    { href: '/courses', label: 'Our Courses' },
    { href: '/blog', label: 'Blog' },
    { href: '/gallery', label: 'Gallery' },
  ],
  learning: [
    { href: '/trial', label: 'Book Trial Class' },
    { href: '/auth/register', label: 'Create Account' },
    { href: '/auth/login', label: 'Student Login' },
    { href: '/dashboard/student', label: 'Student Portal' },
  ],
  programs: [
    { href: '/courses?ageGroup=kids', label: 'Chess for Kids' },
    { href: '/courses?ageGroup=teens', label: 'Teen Programs' },
    { href: '/courses?skillLevel=beginner', label: 'Beginners' },
    { href: '/courses?skillLevel=advanced', label: 'Advanced' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#f8fafc] border-t border-slate-200/90 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 text-[20rem] leading-none opacity-[0.03] pointer-events-none select-none font-serif text-slate-700">
        ♛
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <Image
                src="/images/knightora-logo.jpg"
                alt="KnightOra Chess Academy"
                width={48}
                height={48}
                className="w-12 h-12 rounded-xl object-contain bg-white p-0.5 shadow-md border border-slate-200/60"
              />
              <div>
                <span className="font-['Playfair_Display'] font-bold text-xl text-slate-900">KnightOra</span>
                <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#b8860b] leading-none -mt-0.5">Chess Academy</div>
              </div>
            </Link>
            <p className="text-[#b8860b] font-medium text-sm leading-relaxed mb-2 max-w-xs italic">
              &ldquo;Better Thinkers. Stronger Moves.&rdquo;
            </p>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-xs">
              Nurturing chess champions of tomorrow through expert coaching, structured programs, and a passion for the royal game.
            </p>

            {/* Contact */}
            <div className="space-y-3">
              <a href="tel:+918459527115" className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-[#b8860b] transition-colors group">
                <Phone size={14} className="text-[#b8860b]" />
                +91 84595 27115
              </a>
              <a href="mailto:knightora.chess.academy@gmail.com" className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-[#b8860b] transition-colors">
                <Mail size={14} className="text-[#b8860b]" />
                knightora.chess.academy@gmail.com
              </a>
              <div className="flex items-start gap-2.5 text-sm text-slate-600">
                <MapPin size={14} className="text-[#b8860b] mt-0.5 shrink-0" />
                Online & In-person classes available
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {[
                {
                  href: 'https://www.instagram.com/knightora.chess?mdxt=MmlibXBjamliaDZz',
                  label: 'Instagram',
                  svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>,
                },
              ].map(({ href, label, svg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-[rgba(201,162,39,0.1)] border border-[rgba(201,162,39,0.25)] flex items-center justify-center text-[#b8860b] hover:bg-[rgba(201,162,39,0.18)] hover:border-[rgba(201,162,39,0.4)] transition-all duration-200"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            { title: 'Academy', links: footerLinks.academy },
            { title: 'Learning', links: footerLinks.learning },
            { title: 'Programs', links: footerLinks.programs },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-bold text-slate-900 text-sm mb-4 tracking-wide">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-[#b8860b] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 border border-slate-200/90 shadow-md">
          <div>
            <p className="font-['Playfair_Display'] text-lg font-bold text-slate-900">Ready to start your chess journey?</p>
            <p className="text-sm text-slate-600 mt-0.5">Chat with us on WhatsApp for instant answers</p>
          </div>
          <a
            href="https://wa.me/918459527115?text=Hi%20KnightOra!%20I%27d%20like%20to%20know%20more%20about%20your%20chess%20programs."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shrink-0 !bg-[#25D366] !from-[#25D366] !to-[#128C7E] !text-white hover:!brightness-105 shadow-md"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} KnightOra Chess Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-xs text-slate-500 hover:text-[#b8860b] transition-colors">About Us</Link>
            <Link href="/courses" className="text-xs text-slate-500 hover:text-[#b8860b] transition-colors">Courses</Link>
            <Link href="/trial" className="text-xs text-slate-500 hover:text-[#b8860b] transition-colors">Free Trial</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
