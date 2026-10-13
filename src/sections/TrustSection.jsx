import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Sparkles, Users } from 'lucide-react';

const trustItems = [
  {
    icon: Heart,
    title: 'Protection',
    description: 'Your safety is supported by dedicated anti-scam systems and proactive moderation.',
    accent: 'from-pink-500 to-pink-400',
  },
  {
    icon: Users,
    title: 'Deep affinity',
    description: 'Make it meaningfully by seeking out shared interests and mutual passions.',
    accent: 'from-violet-500 to-violet-400',
  },
  {
    icon: ShieldCheck,
    title: 'Verification',
    description: 'Verified members have confirmed their identity using a government-issued ID.',
    accent: 'from-blue-500 to-sky-400',
  },
  {
    icon: Sparkles,
    title: 'Community',
    description: 'Our community consists of paying members and free users with meaningful connections.',
    accent: 'from-emerald-500 to-teal-400',
  },
];

export default function TrustSection() {
  return (
    <section id="safety" className="bg-[#f5f3f1] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-4">
          {trustItems.map(({ icon: Icon, title, description, accent }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group rounded-[2rem] border border-slate-200/80 bg-[#fbfaf9] p-6 text-center shadow-[0_18px_40px_rgba(15,23,42,0.03)]"
            >
              <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${accent} text-white shadow-lg`}>
                <Icon size={28} />
              </div>
              <h3 className="text-2xl font-semibold tracking-[-0.05em] text-slate-900">{title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
