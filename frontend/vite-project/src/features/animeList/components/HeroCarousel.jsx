import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroCarousel = ({ items }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const slides = items?.slice(0, 10) || [];

  // Logic for Next Slide
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // Logic for Previous Slide
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  // Auto-slide effect
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [handleNext, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="pt-0 mt-0 relative h-[70vh] w-full overflow-hidden bg-gray-950 group">
      
      {/* Background Images */}
      {slides.map((anime, index) => (
        <div
          key={anime._id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={anime.posterImage}
            alt="Hero Background"
            className="h-full w-full object-cover scale-90 opacity-40 rounded-3xl"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-gray-900/80 via-transparent to-transparent" />

      {/* --- NAVIGATION BUTTONS --- */}
      {/* Left Button */}
      <button 
        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-violet-600 hover:scale-110 active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Right Button */}
      <button 
        onClick={(e) => { e.stopPropagation(); handleNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-violet-600 hover:scale-110 active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Content */}
      <div className="absolute bottom-16 left-6 max-w-4xl md:left-12 z-20 transition-all duration-700">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-violet-600 px-3 py-1 rounded text-xs font-black uppercase tracking-tighter shadow-lg shadow-violet-600/40">
            Trending #{currentIndex + 1}
          </span>
        </div>

        <h1 className="mb-4 text-3xl font-black md:text-5xl leading-none text-white drop-shadow-2xl">
          {slides[currentIndex].title.english || slides[currentIndex].title.romaji}
        </h1>

        <p className="mb-8 line-clamp-3 text-lg text-gray-300 md:text-xl md:max-w-1xl font-medium leading-relaxed">
          {slides[currentIndex].synopsis}
        </p>

        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate(`/anime/${slides[currentIndex]._id}`)}
            className="rounded-full bg-white px-5 py-2.5 font-black text-black transition-all hover:bg-violet-400 hover:text-white"
          >
            VIEW DETAILS
          </button>
          <button
            onClick={() => navigate(`/anime/full-list`)}
            className="rounded-full bg-violet-600 px-5 py-2.5 font-black text-white transition-all hover:bg-violet-400 hover:text-black"
          >
            ADD TO WATCHLIST+
          </button>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-10 right-12 flex items-center gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-500 rounded-full h-1.5 ${
              index === currentIndex ? "w-10 bg-violet-500 shadow-[0_0_10px_#8b5cf6]" : "w-2 bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;