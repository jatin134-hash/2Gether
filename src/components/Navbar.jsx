import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Heart, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Features', href: '#features' },
  { label: 'Success Stories', href: '#success-stories' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Download', href: '#download' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoutError, setLogoutError] = useState('');
  const scrollFrame = useRef(0);
  const { isAuthenticated, isLoading, sessionError, user, logout } = useAuth();
  const { pathname } = useLocation();
  const sectionHref = (href) => (pathname === '/' ? href : `/${href}`);

  async function handleLogout() {
    setLogoutError('');
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      setLogoutError(
        error instanceof Error ? error.message : 'Could not end your session. Please try again.',
      );
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (scrollFrame.current) return;
      scrollFrame.current = window.requestAnimationFrame(() => {
        scrollFrame.current = 0;
        const nextScrolled = window.scrollY > 24;
        setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollFrame.current) window.cancelAnimationFrame(scrollFrame.current);
    };
  }, []);

  const navClass = 'border-white/15 bg-[#090b12]/70 shadow-[0_12px_30px_rgba(17,24,39,0.18)] backdrop-blur-xl';
  const textClass = 'text-white';
  const bodyTextClass = 'text-white/80 hover:text-white';
  const buttonClass = 'border border-white/15 bg-white/5 text-white hover:bg-white/10';
  const mobilePanelClass = 'border-white/15 bg-[#120f1d]/95 text-white';
  const mobileItemClass = 'hover:bg-white/5 hover:text-white';

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Main navigation"
        className={`site-nav mx-auto flex max-w-7xl items-center justify-between transition-all duration-300 ease-out ${navClass} ${
          scrolled ? 'translate-y-0 is-scrolled' : 'translate-y-0'
        }`}
      >
        <Link to="/" className="brand-lockup" aria-label="2Gether home">
          <span className="brand-mark" aria-hidden="true">
            <Heart className="brand-heart brand-heart-pink" size={27} fill="currentColor" />
            <Heart className="brand-heart brand-heart-blue" size={27} fill="currentColor" />
          </span>
          <span className="brand-words">
            <span className={`brand-name ${textClass}`}>2Gether</span>
            <span className="brand-tagline">Two Hearts. One Journey.</span>
          </span>
        </Link>

        <div className={`site-nav-links hidden items-center gap-5 text-sm font-medium transition-colors duration-300 lg:flex 2xl:gap-7 ${bodyTextClass}`}>
          {navItems.map((item) => (
            <a key={item.label} href={sectionHref(item.href)} className="transition-colors duration-300">
              {item.label}
            </a>
          ))}
        </div>

        {isLoading ? (
          <span className="hidden text-sm text-white/65 lg:inline">Checking session…</span>
        ) : isAuthenticated ? (
          <>
            <span className="hidden max-w-32 truncate text-sm text-white/80 xl:inline">
              Hi, {user.name}
            </span>
            <button
              className="hidden rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 lg:inline-flex"
              onClick={handleLogout}
              type="button"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link
              className="hidden rounded-full px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:text-white lg:inline-flex"
              to="/login"
            >
              Log in
            </Link>
            <Link
              className="site-nav-auth-primary hidden items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(168,85,247,0.35)] transition hover:scale-[1.02] lg:inline-flex"
              to="/signup"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 lg:hidden ${buttonClass}`}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {(sessionError || logoutError) && (
        <p
          className="mx-auto mt-2 w-fit max-w-[min(90vw,32rem)] rounded-xl border border-rose-200/20 bg-[#120f1d]/95 px-4 py-2 text-center text-xs text-rose-200 shadow-lg"
          role="alert"
        >
          {logoutError || sessionError}
        </p>
      )}

      {isOpen && (
        <div className={`mx-auto mt-3 max-w-7xl rounded-3xl border p-4 shadow-2xl backdrop-blur-xl transition-colors duration-300 lg:hidden ${mobilePanelClass}`}>
          <div className={`flex flex-col gap-3 text-sm font-medium transition-colors duration-300 ${bodyTextClass}`}>
            {navItems.map((item) => (
              <a key={item.label} href={sectionHref(item.href)} className={`rounded-full px-3 py-2 transition-colors duration-300 ${mobileItemClass}`}>
                {item.label}
              </a>
            ))}
            {isLoading ? (
              <span className="rounded-full px-3 py-2 text-white/65">Checking session…</span>
            ) : isAuthenticated ? (
              <>
                <span className="rounded-full px-3 py-2 text-white/70">Signed in as {user.name}</span>
                <button
                  className="mt-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 font-semibold text-white"
                  onClick={handleLogout}
                  type="button"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  className="rounded-full px-3 py-2 transition-colors duration-300 hover:bg-white/5 hover:text-white"
                  onClick={() => setIsOpen(false)}
                  to="/login"
                >
                  Log in
                </Link>
                <Link
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 px-4 py-2.5 font-semibold text-white"
                  onClick={() => setIsOpen(false)}
                  to="/signup"
                >
                  Get Started <ArrowRight size={16} />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
