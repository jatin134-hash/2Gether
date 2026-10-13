import { Camera, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import logo from '../assets/2gether-logo.png';

export default function Footer() {
  return (
    <footer className="bg-transparent px-4 pb-10 pt-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="2Gether logo"
                className="h-12 w-12 rounded-2xl object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="text-3xl font-black tracking-[-0.08em] text-white">2Gether</div>
            </div>
            <p className="mt-5 max-w-sm text-base leading-7 text-slate-300">
              Meet genuine people, build meaningful connections, and enjoy a memorable journey toward lasting relationships.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-slate-200/80">
              <ShieldCheck size={16} className="text-pink-400" />
              Verified community for safer connections
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Company</h3>
            <ul className="mt-4 space-y-3 text-slate-200/80">
              <li><a href="#" className="transition hover:text-white">About</a></li>
              <li><a href="#" className="transition hover:text-white">Careers</a></li>
              <li><a href="#" className="transition hover:text-white">Press</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Platform</h3>
            <ul className="mt-4 space-y-3 text-slate-200/80">
              <li><a href="#" className="transition hover:text-white">Discover</a></li>
              <li><a href="#" className="transition hover:text-white">Security</a></li>
              <li><a href="#" className="transition hover:text-white">Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Follow</h3>
            <div className="mt-4 flex items-center gap-3">
              {[Camera, Sparkles, Heart].map((Icon, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-200 transition hover:bg-white/10"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row">
          <p>© 2026 2Gether. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition hover:text-white">Privacy</a>
            <a href="#" className="transition hover:text-white">Terms</a>
            <a href="#" className="transition hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
