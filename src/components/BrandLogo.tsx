import React from 'react';

interface BrandLogoProps {
  compact?: boolean;
  onDark?: boolean;
}

/**
 * Clean vector wordmark inspired directly by the supplied JTR Plumbing and Maintenance brand mark:
 * bold #FF6500 roofline with chimney and window panes above bold JTR lettering.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({ compact = false, onDark = false }) => {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0">
      <svg
        width={compact ? 36 : 42}
        height={compact ? 30 : 34}
        viewBox="0 0 64 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Orange Roofline & Chimney */}
        <path
          d="M4 24L32 5L60 24"
          stroke="#FF6500"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="44" y="8" width="5.5" height="9" rx="0.75" fill="#FF6500" />
        {/* 4-pane window */}
        <rect x="27.2" y="13.5" width="4" height="4" rx="0.5" fill="#FF6500" />
        <rect x="32.8" y="13.5" width="4" height="4" rx="0.5" fill="#FF6500" />
        <rect x="27.2" y="19" width="4" height="4" rx="0.5" fill="#FF6500" />
        <rect x="32.8" y="19" width="4" height="4" rx="0.5" fill="#FF6500" />
        {/* Bold JTR Monogram */}
        <text
          x="32"
          y="44"
          textAnchor="middle"
          fill="#FF6500"
          fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
          fontWeight="800"
          fontSize="21"
          letterSpacing="0.8"
        >
          JTR
        </text>
      </svg>

      <span className="inline-flex items-baseline whitespace-nowrap">
        <span
          className={`font-display font-extrabold tracking-tight text-[15px] sm:text-base ${
            onDark ? 'text-white' : 'text-[#0E0E0E] dark:text-white'
          }`}
        >
          JTR Plumbing
        </span>
        <span
          className={`font-display font-semibold tracking-tight text-[15px] sm:text-base ml-1 ${
            compact ? 'hidden xl:inline' : 'inline'
          } ${
            onDark ? 'text-neutral-300' : 'text-neutral-600 dark:text-neutral-300'
          }`}
        >
          &amp; Maintenance
        </span>
      </span>
    </span>
  );
};

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M9.5 9.5c.3 1.4 1.6 3.1 3.5 3.9.4.2.9.1 1.2-.2l.7-.6c.3-.2.7-.2 1 0l1.1.7c.3.2.4.6.2 1-.5.9-1.6 1.4-2.7 1.2-2.4-.5-5.1-2.8-5.9-5.2-.3-1 .1-2.1 1-2.7.3-.2.8-.1 1 .2l.7 1.1c.2.3.1.7-.1 1l-.5.5c-.2.2-.3.5-.2.8z" />
  </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z" />
  </svg>
);
