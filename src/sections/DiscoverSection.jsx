import { motion } from 'framer-motion';
import { Heart, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';

const profiles = [
  {
    name: 'Elen, 30',
    online: true,
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    accent: 'from-pink-500 to-rose-400',
  },
  {
    name: 'Manuel, 32',
    online: true,
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    accent: 'from-sky-500 to-blue-400',
  },
];

export default function DiscoverSection() {
  return (
    <section id="discover" className="bg-[#f5f3f1] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm">
            <Sparkles size={14} className="text-pink-500" />
            Profile
          </div>

          <h2 className="text-4xl font-black leading-[1.05] tracking-[-0.06em] text-slate-900 sm:text-5xl">
            Enjoy chats with members online
          </h2>

          <p className="mt-6 max-w-md text-xl leading-9 text-slate-600">
            Join a premium paid social space where meaningful conversations flourish and diverse connections take center stage.
          </p>

          <div className="mt-8 flex items-center gap-4 text-slate-600">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg">
              <Heart size={20} fill="currentColor" />
            </div>
            <div className="text-lg font-medium text-slate-800">Real conversations, real chemistry</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
          className="relative flex justify-center"
        >
          <div className="relative grid w-full max-w-[520px] gap-6 sm:grid-cols-2">
            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_25px_60px_rgba(15,23,42,0.07)]">
              <div className="absolute -right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg">
                <ShieldCheck size={18} />
              </div>
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=640&q=80"
                alt="Profile of Elen"
                className="h-72 w-full rounded-[1.5rem] object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-slate-900">Elen, 30</span>
                </div>
                <span className="h-4 w-4 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.2)]" />
              </div>
            </div>

            <div className="relative mt-10 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_25px_60px_rgba(15,23,42,0.07)]">
              <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg">
                <MessageCircle size={18} />
              </div>
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&q=80"
                alt="Profile of Manuel"
                className="h-72 w-full rounded-[1.5rem] object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-slate-900">Manuel, 32</span>
                <span className="h-4 w-4 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.2)]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
