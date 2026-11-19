import React from 'react';
import { PROCESS_STEPS } from '../data/business';

export const ProcessSection: React.FC = () => {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="bg-[#F7F7F7] dark:bg-[#0E0E0E] border-b border-neutral-200 dark:border-neutral-900 py-20 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 sm:mb-14">
          <p className="text-sm font-semibold text-[#FF6500] mb-2">How It Works</p>
          <h2
            id="how-it-works-heading"
            className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[#0E0E0E] dark:text-white"
          >
            A Straightforward Process From Enquiry to Completion
          </h2>
        </div>

        {/* Horizontal Timeline on Desktop, Vertical Connected Timeline on Mobile */}
        <ol className="relative grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Desktop horizontal connecting track */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-6 left-6 right-6 h-px bg-neutral-300 dark:bg-neutral-800"
          />

          {PROCESS_STEPS.map((step, index) => (
            <li key={step.number} className="relative flex lg:flex-col gap-5 lg:gap-0">
              {/* Mobile vertical connecting line */}
              {index < PROCESS_STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="lg:hidden absolute left-6 top-12 -bottom-8 w-px bg-neutral-300 dark:bg-neutral-800"
                />
              )}

              {/* Step Number Node */}
              <div className="relative z-10 w-12 h-12 rounded-lg bg-[#0E0E0E] dark:bg-[#171717] border border-neutral-800 text-white font-display font-extrabold text-sm flex items-center justify-center shrink-0 tabular-nums lg:mb-6">
                <span className="text-[#FF6500]">{step.number}</span>
              </div>

              {/* Step Content */}
              <div className="pt-1 lg:pt-0">
                <h3 className="font-display font-bold text-lg text-[#0E0E0E] dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
