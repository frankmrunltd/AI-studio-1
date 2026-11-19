import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/business';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="faqs"
      aria-labelledby="faqs-heading"
      className="bg-[#F7F7F7] dark:bg-[#0E0E0E] border-b border-neutral-200 dark:border-neutral-900 py-20 sm:py-24"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12">
          <p className="text-sm font-semibold text-[#FF6500] mb-2">Frequently Asked Questions</p>
          <h2
            id="faqs-heading"
            className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[#0E0E0E] dark:text-white"
          >
            Common Questions About Our Services
          </h2>
        </div>

        <div className="divide-y divide-neutral-200 dark:divide-neutral-800 rounded-xl bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `${item.id}-panel`;
            const buttonId = `${item.id}-button`;

            return (
              <div key={item.id}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-neutral-50 dark:hover:bg-[#181818] transition-colors cursor-pointer"
                  >
                    <span className="font-display font-bold text-base sm:text-lg text-[#0E0E0E] dark:text-white leading-snug">
                      {item.question}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`w-5 h-5 text-[#FF6500] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-6 pb-6 pt-1 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300"
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
