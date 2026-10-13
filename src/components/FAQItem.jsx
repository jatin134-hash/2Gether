import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

export default function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8"
      >
        <span className="text-lg font-semibold text-slate-900 sm:text-xl">{question}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-200 px-6 pb-5 pt-4 text-base leading-7 text-slate-600 sm:px-8">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
