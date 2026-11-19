import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Info, Maximize2, X } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/business';
import { SafeImage } from './SafeImage';

type FilterCategory = 'All' | GalleryItem['category'];

const FILTER_OPTIONS: FilterCategory[] = [
  'All',
  'Kitchen & Bath',
  'Internal Plumbing',
  'External & Maintenance',
];

interface GallerySectionProps {
  onEnquireService: (serviceName: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onEnquireService }) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleItems =
    selectedFilter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedFilter);

  const activeItem = lightboxIndex !== null ? visibleItems[lightboxIndex] ?? null : null;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % visibleItems.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + visibleItems.length) % visibleItems.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, visibleItems.length]);

  const handleFilterChange = (category: FilterCategory) => {
    setSelectedFilter(category);
    setLightboxIndex(null);
  };

  return (
    <section
      id="our-work"
      aria-labelledby="our-work-heading"
      className="bg-white dark:bg-[#080808] border-b border-neutral-200 dark:border-neutral-900 py-20 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Interactive Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#FF6500] mb-2">Our Work</p>
            <h2
              id="our-work-heading"
              className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[#0E0E0E] dark:text-white"
            >
              Types of Plumbing &amp; Maintenance Work
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter gallery by work area"
            className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-[#F3F3F3] dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 self-start lg:self-auto"
          >
            {FILTER_OPTIONS.map((option) => {
              const isActive = selectedFilter === option;
              return (
                <button
                  key={option}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleFilterChange(option)}
                  className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0E0E0E] dark:bg-[#FF6500] text-white'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-[#0E0E0E] dark:hover:text-white'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clear Illustrative Photography Notice */}
        <div className="mb-8 flex items-start gap-2.5 text-sm text-neutral-600 dark:text-neutral-400">
          <Info className="w-4 h-4 text-[#FF6500] shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              Illustrative Gallery:
            </span>{' '}
            The photographs below illustrate the types of internal and external plumbing and
            property maintenance work we cover, and are structured to be replaced with verified JTR
            completed project photographs as they are added.
          </p>
        </div>

        {/* Gallery Grid */}
        <div
          data-testid="gallery-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visibleItems.map((item, idx) => (
            <figure
              key={item.id}
              className="group rounded-xl overflow-hidden bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800/90 transition-colors hover:border-[#FF6500]/60"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`Enlarge ${item.title} photograph`}
                className="relative block w-full aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-[#1A1A1A] text-left cursor-pointer"
              >
                <SafeImage
                  src={item.image}
                  alt={item.imageAlt}
                  fallbackTitle={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <span className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-black/65 text-white flex items-center justify-center opacity-90 group-hover:bg-[#FF6500] transition-colors">
                  <Maximize2 className="w-4 h-4" aria-hidden="true" />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="text-xs font-medium text-neutral-300 mb-1">
                    {item.category} · Illustrative Example
                  </p>
                  <p className="font-display font-bold text-base sm:text-lg text-white leading-snug">
                    {item.title}
                  </p>
                </div>
              </button>

              <figcaption className="px-5 py-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xs"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-xl overflow-hidden bg-[#121212] border border-neutral-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-800 text-sm text-neutral-300">
              <span className="tabular-nums font-medium">
                {lightboxIndex + 1} / {visibleItems.length} · Illustrative Example
              </span>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close image lightbox"
                className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Image Viewport */}
            <div className="relative bg-black flex items-center justify-center max-h-[65vh] overflow-hidden">
              <SafeImage
                src={activeItem.image}
                alt={activeItem.imageAlt}
                fallbackTitle={activeItem.title}
                className="w-full max-h-[65vh] object-contain"
              />

              {visibleItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + visibleItems.length) % visibleItems.length
                      )
                    }
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-lg bg-black/75 hover:bg-[#FF6500] text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex((lightboxIndex + 1) % visibleItems.length)}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-lg bg-black/75 hover:bg-[#FF6500] text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {/* Caption & Action Bar */}
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121212]">
              <div>
                <h3
                  id="lightbox-title"
                  className="font-display font-bold text-lg sm:text-xl text-white"
                >
                  {activeItem.title}
                </h3>
                <p className="text-sm text-neutral-300 mt-1">{activeItem.caption}</p>
                <p className="text-xs text-neutral-400 mt-1.5">
                  Illustrative reference photo — not presented as a verified JTR customer project.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const targetService = activeItem.relatedService;
                  setLightboxIndex(null);
                  onEnquireService(targetService);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#FF6500] hover:bg-[#E55A00] text-white font-display font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Enquire About Similar Work</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
