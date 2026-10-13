import { motion } from 'framer-motion';
import { CheckCircle2, MessageSquareText, UserRoundPlus } from 'lucide-react';

const steps = [
  {
    icon: UserRoundPlus,
    title: 'Create your profile',
    text: 'Tell people who you are, what matters to you, and the kind of connection you are looking for.',
  },
  {
    icon: CheckCircle2,
    title: 'Match with intention',
    text: 'Explore thoughtfully curated profiles based on lifestyle, interests, and compatibility signals.',
  },
  {
    icon: MessageSquareText,
    title: 'Start meaningful conversations',
    text: 'Use voice notes, video calls, and secure chat to build trust and spark genuine chemistry.',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-[#f5f3f1] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm">
            How it works
          </div>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.06em] text-slate-900 sm:text-5xl">
            A better way to connect
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_44px_rgba(15,23,42,0.04)]"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 text-white shadow-lg">
                <Icon size={28} />
              </div>
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Step {index + 1}
              </div>
              <h3 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">{title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
