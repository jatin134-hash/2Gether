import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section id="download" className="bg-[#f5f3f1] px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-5xl rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-white via-[#fff7fb] to-[#f1f5ff] p-8 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-12"
      >
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-3 py-1.5 text-sm font-medium text-pink-600">
              <Sparkles size={14} />
              Ready to meet someone special?
            </div>
            <h2 className="text-4xl font-black leading-[1.04] tracking-[-0.06em] text-slate-900 sm:text-5xl">
              Start your next chapter with 2Gether.
            </h2>
          </div>

          <Link className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 px-7 py-4 text-base font-semibold text-white shadow-[0_18px_35px_rgba(168,85,247,0.35)] transition hover:scale-[1.02]" to="/signup">
            Join 2Gether
            <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
