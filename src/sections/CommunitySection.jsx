import { motion } from 'framer-motion';
import { Heart, MessageCircleHeart, Sparkles } from 'lucide-react';

const communityProfiles = [
  {
    name: 'Ari',
    age: 29,
    city: 'Los Angeles',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=480&q=80',
    color: 'from-pink-500 to-violet-500',
    active: true,
  },
  {
    name: 'Lucas',
    age: 31,
    city: 'Barcelona',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=480&q=80',
    color: 'from-sky-500 to-cyan-400',
    active: false,
  },
  {
    name: 'Jade',
    age: 26,
    city: 'Tokyo',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=480&q=80',
    color: 'from-emerald-500 to-teal-400',
    active: true,
  },
];

export default function CommunitySection() {
  return (
    <section id="success-stories" className="bg-[#f5f3f1] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm">
            <Sparkles size={14} className="text-pink-500" />
            Community
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="max-w-xl text-4xl font-black leading-[1.05] tracking-[-0.06em] text-slate-900 sm:text-5xl">
              Explore diverse profiles in 150+ countries
            </h2>
            <p className="mt-6 max-w-lg text-xl leading-9 text-slate-600">
              Meet people from 150+ countries, build vibrant friendships, and create meaningful moments through thoughtful conversations and authentic interaction.
            </p>
            <div className="mt-8 flex items-center gap-4 text-slate-600">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg">
                <Heart size={22} fill="currentColor" />
              </div>
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-slate-500">Global reach</div>
                <div className="text-lg font-semibold text-slate-800">150+ countries</div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {communityProfiles.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative w-[220px] rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.07)]"
              >
                <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg">
                  <MessageCircleHeart size={18} />
                </div>
                <img
                  src={person.image}
                  alt={person.name}
                  className="h-60 w-full rounded-[1.4rem] object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xl font-bold text-slate-900">{person.name}, {person.age}</div>
                    <div className="text-sm text-slate-500">{person.city}</div>
                  </div>
                  <span className={`h-4 w-4 rounded-full ${person.active ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
