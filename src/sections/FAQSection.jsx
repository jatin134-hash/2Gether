import { useState } from 'react';
import FAQItem from '../components/FAQItem';

const faqs = [
  {
    question: 'How do I get started on 2Gether?',
    answer:
      'Create your profile, add a few authentic details, upload a clear photo, and personalize your preferences. Then start exploring matches and conversations that feel aligned with what you want.',
  },
  {
    question: 'How do I find people I am interested in?',
    answer:
      'You can browse curated matches, use filters like interests and lifestyle, and view people who match your preferences. The platform is designed to help you discover meaningful, compatible connections more naturally.',
  },
  {
    question: 'How do I keep chatting with someone I like when communicating online?',
    answer:
      'Start with a short message, ask a thoughtful question, and continue the conversation through chat, voice notes, or live video sessions. Consistent and respectful communication makes it easier to build momentum.',
  },
  {
    question: 'How do I change my online platform notifications and message preferences?',
    answer:
      'Open your profile settings and navigate to the notifications section. From there, you can choose which alerts you want to receive, how often, and which communication styles are best for you.',
  },
  {
    question: 'How does online chat work on this platform?',
    answer:
      'Once you connect with someone, you can start a real-time conversation, send voice messages, share reactions, and continue the interaction through secure in-app messaging designed for comfort and clarity.',
  },
  {
    question: 'What online chat and virtual communications features can I use?',
    answer:
      'You can use one-to-one messaging, voice notes, live video calls, emoji reactions, and digital gifts. These features are built to help you connect in a way that feels warm, natural, and personal.',
  },
  {
    question: 'How do I manage membership on the website?',
    answer:
      'You can upgrade, pause, or cancel your membership anytime from your account settings. Billing and subscription changes are clearly shown so you always stay in control.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#f5f3f1] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black tracking-[-0.06em] text-slate-900 sm:text-5xl">FAQ</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
