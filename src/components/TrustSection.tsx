import React from 'react';
import { Home, MessageSquare, ShieldCheck, Wrench } from 'lucide-react';
import { TRUST_VALUES } from '../data/business';

const ICON_MAP = {
  shield: ShieldCheck,
  wrench: Wrench,
  message: MessageSquare,
  home: Home,
};

export const TrustSection: React.FC = () => {
  return (
    <section
      aria-labelledby="why-choose-jtr-heading"
      className="bg-[#F7F7F7] dark:bg-[#0E0E0E] border-b border-neutral-200 dark:border-neutral-900 py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <p className="text-sm font-semibold text-[#FF6500] mb-2">Why Choose JTR</p>
            <h2
              id="why-choose-jtr-heading"
              className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-[#0E0E0E] dark:text-white"
            >
              Built on Dependable, Practical Workmanship
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-md">
            Straightforward communication, tidy work inside and outside your property, and lasting plumbing care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRUST_VALUES.map((item) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <article
                key={item.id}
                className="group rounded-xl bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800/90 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FF6500]/60"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-lg bg-[#FF6500]/10 dark:bg-[#FF6500]/15 text-[#FF6500] flex items-center justify-center transition-colors group-hover:bg-[#FF6500] group-hover:text-white">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-display text-xs font-bold text-neutral-400 dark:text-neutral-500 tabular-nums">
                    {item.index}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-[#0E0E0E] dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
