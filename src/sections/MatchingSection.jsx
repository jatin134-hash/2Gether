import { motion } from 'framer-motion';
import { Video, Heart, MessageSquareText, Zap } from 'lucide-react';

export default function MatchingSection() {
  return (
    <section id="features" className="bg-[#f5f3f1] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-[500px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_22px_52px_rgba(15,23,42,0.07)]">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-[1.4rem]">
                <img
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=640&q=80"
                  alt="Person with headphones"
                  className="h-64 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="overflow-hidden rounded-[1.4rem]">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&q=80"
                  alt="Person with dog"
                  className="h-64 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-full border border-white/20 bg-slate-900/80 px-4 py-3 text-white shadow-2xl backdrop-blur-md">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-pink-400">
                <Heart size={18} fill="currentColor" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-blue-400">
                <Video size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm">
            <Zap size={14} className="text-violet-500" />
            Dynamic matching
          </div>

          <h2 className="text-4xl font-black leading-[1.05] tracking-[-0.06em] text-slate-900 sm:text-5xl">
            Dynamic virtual connection features
          </h2>

          <p className="mt-6 text-xl leading-9 text-slate-600">
            Discover features that make connecting easier — like video chat, voice messages, and virtual gifts. Our online entertainment platform is designed to enable smooth and engaging conversations.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {['Video calls', 'Voice notes', 'Virtual gifts', 'Live chat'].map((item) => (
              <div key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
