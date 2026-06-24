import React from 'react';

import avis1 from '../../assets/avisclient/1.jpeg';
import avis2 from '../../assets/avisclient/2.jpeg';
import avis3 from '../../assets/avisclient/3.jpeg';
import avis4 from '../../assets/avisclient/4.jpeg';
import avis5 from '../../assets/avisclient/5.jpeg';

const images = [avis1, avis2, avis3, avis4, avis5];

// Only duplicate once — animation moves exactly -50% (one full set)
const track = [...images, ...images];

const AvisClient = () => {
  return (
    <section
      className="relative w-full bg-gray-50/50 py-16 md:py-20 lg:py-24 font-['Cairo',sans-serif]"
      dir="rtl"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Section header */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative text-center mb-10 md:mb-14">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-2 mb-5">
          <span className="w-2 h-2 bg-indigo-500 rounded-full" />
          <span className="text-indigo-600 text-xs font-normal">آراء حقيقية من طلابنا</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900 leading-snug mb-3">
          آراء <span className="text-indigo-500">المشتركين</span>
        </h2>
        <p className="text-gray-500 text-sm md:text-base font-normal max-w-md mx-auto leading-relaxed">
          شوف آراء وتجارب الطلاب اللي اشتركوا معانا فالمنصة ديالنا
        </p>
      </div>

      {/* Marquee wrapper — clips overflow, NO fade divs outside */}
      <div className="marquee-outer">
        {/* Fades sit inside, above the track */}
        <div className="marquee-fade-left" />
        <div className="marquee-fade-right" />

        {/* The moving track */}
        <div className="marquee-track">
          {track.map((src, i) => (
            <div key={i} className="marquee-card">
              <img
                src={src}
                alt={`avis ${(i % images.length) + 1}`}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Outer: clips the track, no overflow visible ── */
        .marquee-outer {
          position: relative;
          width: 100%;
          overflow: hidden;          /* <-- THIS is the only clip boundary */
          padding: 8px 0;
        }

        /* ── Fades: position:absolute inside the clip ── */
        .marquee-fade-left,
        .marquee-fade-right {
          position: absolute;
          top: 0;
          width: 100px;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }
        .marquee-fade-left  { left:  0; background: linear-gradient(to right, #f9fafb, transparent); }
        .marquee-fade-right { right: 0; background: linear-gradient(to left,  #f9fafb, transparent); }

        /* ── Track: flex row, wide enough for 2 copies ── */
        .marquee-track {
          display: flex;
          flex-direction: row;        /* always LTR regardless of dir="rtl" */
          width: max-content;
          gap: 16px;
          animation: marquee-ltr 25s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }

        /* ── Move exactly one full copy (50% of 2×) to the left ── */
        @keyframes marquee-ltr {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── Cards ── */
        .marquee-card {
          flex-shrink: 0;
          width: 220px;
          border-radius: 1rem;
          overflow: hidden;
          background: #fff;
          border: 1px solid #f1f5f9;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }
        @media (min-width: 768px)  { .marquee-card { width: 250px; } }
        @media (min-width: 1024px) { .marquee-card { width: 270px; } }

        .marquee-card img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }
      `}</style>
    </section>
  );
};

export default AvisClient;