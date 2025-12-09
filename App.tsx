import React, { useState, useEffect, useRef } from 'react';
import { AppState, WishMessage } from './types';
import { BASE_WISH_VN, PIANO_MUSIC_URL } from './constants';
import { generateWishes } from './services/geminiService';
import ParticleBackground from './components/ParticleBackground';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INTRO);
  const [wishes, setWishes] = useState<WishMessage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(0); // For fade in/out
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load wishes on mount (async)
  useEffect(() => {
    const fetchWishes = async () => {
      // 1. Get 19 foreign languages
      const foreignWishes = await generateWishes(BASE_WISH_VN);
      
      // 2. Define Vietnamese wish
      const vnWish: WishMessage = {
        language: "Vietnamese",
        message: BASE_WISH_VN
      };

      // 3. Sequence: Start with Vietnamese -> Foreign Wishes -> End with Vietnamese
      setWishes([vnWish, ...foreignWishes, vnWish]);
    };

    fetchWishes();
  }, []);

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      // loop is also set in the tag, but we can double ensure here
      audioRef.current.play().catch(e => console.error("Audio play failed. Check URL or browser permissions.", e));
    }
    setAppState(AppState.PLAYING);
  };

  // Animation Loop Logic
  useEffect(() => {
    if (appState !== AppState.PLAYING) return;
    if (wishes.length === 0) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const runSequence = async () => {
      // 1. Fade In
      setOpacity(1);

      // 2. Wait for reading (4 seconds)
      timeoutId = setTimeout(() => {
        
        // Check if this is the last message
        if (currentIndex === wishes.length - 1) {
          // It's the last one! Do NOT fade out.
          setAppState(AppState.FINISHED);
        } else {
          // 3. Fade Out
          setOpacity(0);
          
          // 4. Wait for fade out transition (1.5s) then increment
          setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
          }, 1500); 
        }
      }, 4000);
    };

    // Small delay to ensure render before fading in
    const startDelay = setTimeout(() => {
      runSequence();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(startDelay);
    };
  }, [appState, currentIndex, wishes.length]);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden text-white">
      {/* Background Layer - Fixed to ensure full coverage on mobile bounce */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 z-[-1]" />
      
      <audio ref={audioRef} src={PIANO_MUSIC_URL} loop preload="auto" />
      <ParticleBackground />

      {/* Main Content Container */}
      <div className="relative w-full h-full flex flex-col items-center justify-center z-10">

        {/* Intro Screen */}
        {appState === AppState.INTRO && (
          <div className="text-center animate-pulse cursor-pointer" onClick={handleStart}>
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/20 hover:scale-110 transition-transform duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
              </svg>
            </div>
            <h1 className="text-3xl font-light tracking-widest font-serif mb-4">A Gift For You</h1>
            <p className="text-white/60 text-sm tracking-widest uppercase">Click to open</p>
          </div>
        )}

        {/* Playing / Slideshow Screen */}
        {(appState === AppState.PLAYING || appState === AppState.FINISHED) && wishes[currentIndex] && (
          <div 
            className="max-w-4xl px-8 text-center transition-opacity duration-[1500ms] ease-in-out"
            style={{ opacity: opacity }}
          >
            {/* Language Label */}
            <p className="text-indigo-300/60 text-sm tracking-[0.3em] uppercase mb-6 font-sans">
              {wishes[currentIndex].language}
            </p>

            {/* Main Message */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl leading-tight font-serif text-white drop-shadow-lg mb-8">
              {wishes[currentIndex].message}
            </h2>

            {/* Optional Transliteration */}
            {wishes[currentIndex].transliteration && (
               <p className="text-white/40 text-lg italic font-light">
                 ({wishes[currentIndex].transliteration})
               </p>
            )}

            {/* Final decoration for the last slide */}
            {appState === AppState.FINISHED && (
               <div className="mt-12 opacity-0 animate-[fadeIn_2s_ease-out_2s_forwards]">
                  <div className="flex justify-center gap-4 text-rose-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 animate-bounce">
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 animate-bounce delay-100">
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 animate-bounce delay-200">
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                  </div>
                  <p className="font-script text-2xl mt-6 text-rose-200">Good luck, my love.</p>
               </div>
            )}
          </div>
        )}
        
        {/* Loading state hidden but keeps app ready */}
        {wishes.length === 0 && appState !== AppState.INTRO && (
          <div className="absolute top-10 right-10 animate-spin w-6 h-6 border-2 border-white/20 border-t-white rounded-full"></div>
        )}
        
      </div>
    </div>
  );
};

export default App;