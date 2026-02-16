"use client";

import { useEffect, useRef, useState } from "react";

// ========== FLOATING HEARTS ==========
const FloatingHeart = ({ 
  className, delay = 0, size = "md", color = "pink"
}: { 
  className?: string; delay?: number; size?: "sm" | "md" | "lg" | "xl";
  color?: "pink" | "gold" | "light"
}) => {
  const sizeClasses = { sm: "w-3 h-3", md: "w-5 h-5", lg: "w-8 h-8", xl: "w-12 h-12" };
  const colorClasses = { pink: "text-pink-medium", gold: "text-gold-accent", light: "text-pink-light" };

  return (
    <div className={`absolute ${sizeClasses[size]} ${colorClasses[color]} ${className} opacity-50`} style={{ animationDelay: `${delay}s` }}>
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-lg">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </div>
  );
};

// ========== SPARKLE ==========
const Sparkle = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <div className={`absolute ${className}`} style={style}>
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gold-light animate-sparkle">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
    </svg>
  </div>
);

// ========== CONFETTI PARTICLE ==========
const ConfettiParticle = ({ delay, left }: { delay: number; left: string }) => (
  <div 
    className="absolute w-2 h-2 animate-confetti opacity-50"
    style={{ left, animationDelay: `${delay}s`, background: delay % 2 === 0 ? '#E8A0B5' : '#D4AF37', borderRadius: delay % 3 === 0 ? '50%' : '2px' }}
  />
);

// ========== FALLING PETAL ==========
const FallingPetal = ({ delay, left }: { delay: number; left: string }) => (
  <div 
    className="absolute w-3 h-4 animate-petal-fall opacity-60"
    style={{ left, animationDelay: `${delay}s` }}
  >
    <svg viewBox="0 0 20 30" fill="#F5C6D6" className="w-full h-full">
      <ellipse cx="10" cy="15" rx="8" ry="14" />
    </svg>
  </div>
);

// ========== SLIDE NAV ==========
const SlideNav = ({ currentSlide, totalSlides, goToSlide }: { currentSlide: number; totalSlides: number; goToSlide: (i: number) => void }) => (
  <div className="fixed bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 z-50 flex gap-1.5 md:gap-2">
    {Array.from({ length: totalSlides }).map((_, i) => (
      <button 
        key={i} 
        onClick={() => goToSlide(i)}
        className={`rounded-full transition-all duration-300 ${
          currentSlide === i 
            ? "w-4 h-1.5 md:w-5 md:h-2 bg-white/60" 
            : "w-1.5 h-1.5 md:w-2 md:h-2 bg-white/20 hover:bg-white/30"
        }`}
      />
    ))}
  </div>
);

// ========== ARROW BUTTONS ==========
const ArrowButtons = ({ prevSlide, nextSlide, currentSlide, totalSlides }: { prevSlide: () => void; nextSlide: () => void; currentSlide: number; totalSlides: number }) => (
  <>
    <button 
      onClick={prevSlide}
      className={`fixed left-3 md:left-4 top-1/2 -translate-y-1/2 z-50 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
        currentSlide === 0 
          ? "opacity-0 pointer-events-none" 
          : "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="white" className="w-4 h-4 opacity-60" strokeWidth={2}>
        <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
    
    <button 
      onClick={nextSlide}
      className={`fixed right-3 md:right-4 top-1/2 -translate-y-1/2 z-50 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
        currentSlide === totalSlides - 1 
          ? "opacity-0 pointer-events-none" 
          : "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="white" className="w-4 h-4 opacity-60" strokeWidth={2}>
        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  </>
);

// ========== MUSIC PLAYER ==========
const MusicPlayer = ({ isPlaying, togglePlay }: { isPlaying: boolean; togglePlay: () => void }) => (
  <button onClick={togglePlay} className="fixed top-4 right-4 md:top-5 md:right-5 z-50 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all" title={isPlaying ? "Pause Music" : "Play Music"}>
    {isPlaying ? (
      <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-80"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
    ) : (
      <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5 md:w-4 md:h-4 ml-0.5 opacity-80"><path d="M8 5v14l11-7z"/></svg>
    )}
  </button>
);

// ========== START OVERLAY ==========
const StartOverlay = ({ onStart }: { onStart: () => void }) => (
  <div className="start-overlay" onClick={onStart} style={{ background: 'linear-gradient(180deg, #1A0A1F 0%, #2D1440 50%, #1A0A1F 100%)' }}>
    <div className="text-center animate-bounce-in" style={{ color: 'white' }}>
      {/* Animated Heart */}
      <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-8">
        <div className="absolute inset-0 bg-pink-medium/40 rounded-full blur-2xl animate-glow-pulse" />
        <div className="relative w-full h-full animate-heart-3d">
          <svg viewBox="0 0 24 24" fill="url(#startGradient)" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="startGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C06C84" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#C06C84" />
              </linearGradient>
            </defs>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </div>
      
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: 'white', marginBottom: '0.5rem' }}>HAPPY VALENTINES DAYY</h1>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: '#D4AF37', marginBottom: '0.5rem' }}>MY BABYYYYYYYY</h1>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#F5C6D6', marginBottom: '1rem' }}>NOMNOM 💋</h1>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: '#F5C6D6' }}>~ Niki 💜</p>
      
      <div style={{ marginTop: '2rem' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>tap anywhere to start</p>
      </div>
    </div>
  </div>
);

// ========== AUDIO OPTION ==========
const AudioOption = ({ 
  title, 
  subtitle, 
  emoji, 
  audioSrc, 
  onPlay, 
  onPause,
  isPlaying,
  delay = 0
}: { 
  title: string; 
  subtitle: string; 
  emoji: string; 
  audioSrc: string; 
  onPlay: (audio: HTMLAudioElement) => void;
  onPause: () => void;
  isPlaying: boolean;
  delay?: number;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentIsPlaying, setCurrentIsPlaying] = useState(false);

  const handlePlay = () => {
    if (audioRef.current) {
      if (currentIsPlaying) { 
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        onPause();
        setCurrentIsPlaying(false);
      } 
      else { 
        audioRef.current.play();
        onPlay(audioRef.current);
        setCurrentIsPlaying(true);
      }
    }
  };

  return (
    <div 
      className="bg-white/5 rounded-2xl p-4 md:p-5 border border-gold-accent/20 hover:border-gold-accent/40 transition-all duration-300 hover:bg-white/10 cursor-pointer group animate-float-up"
      style={{ animationDelay: `${delay}ms` }}
      onClick={handlePlay}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-pink-medium/30 to-gold-accent/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
          {emoji}
        </div>
        <div className="flex-1">
          <p className="font-playfair text-lg md:text-xl text-white group-hover:text-gold-accent transition-colors">{title}</p>
          <p className="font-cormorant text-white/50 text-sm">{subtitle}</p>
        </div>
        <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-pink-medium to-gold-accent flex items-center justify-center flex-shrink-0 shadow-lg hover:scale-110 transition-transform">
          {currentIsPlaying ? (
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 md:w-5 md:h-5"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 md:w-5 md:h-5 ml-0.5"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>
      </div>
      <div className="flex items-center gap-1 mt-3 h-6">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className={`flex-1 h-full rounded-full transition-all duration-150 ${
              currentIsPlaying 
                ? "bg-gradient-to-t from-pink-medium to-gold-accent animate-audio-bar" 
                : "bg-white/10"
            }`}
            style={{ animationDelay: `${i * 50}ms` }}
          />
        ))}
      </div>
      <audio 
        ref={audioRef} 
        onEnded={() => { 
          setCurrentIsPlaying(false); 
          onPause();
        }}
      >
        <source src={audioSrc} type="audio/mpeg" />
      </audio>
    </div>
  );
};

// ========== VOICE MESSAGE ==========
const VoiceMessage = ({ onPlay, onPause }: { onPlay: () => void; onPause: () => void }) => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const handleAudioPlay = (index: number) => (audio: HTMLAudioElement) => {
    setPlayingIndex(index);
    onPlay();
  };

  const handleAudioPause = () => {
    setPlayingIndex(null);
    onPause();
  };

  const audioOptions = [
    {
      title: "Cinematic Masterpiece",
      subtitle: "",
      emoji: "🎬",
      audioSrc: "/voice-message-1.mp3"
    },
    {
      title: "LAADIESSSSSSS TYPE SHIII", 
      subtitle: "",
      emoji: "😎",
      audioSrc: "/voice-message-2.mp3"
    },
    {
      title: "NOMNOMMWAH",
      subtitle: "",
      emoji: "💋",
      audioSrc: "/voice-message-3.mp3"
    }
  ];

  return (
    <div className="glass-card-pink rounded-3xl p-5 md:p-6 max-w-sm mx-auto pink-glow hover-lift animate-glow-pulse">
      <div className="space-y-3">
        {audioOptions.map((option, i) => (
          <AudioOption
            key={i}
            title={option.title}
            subtitle={option.subtitle}
            emoji={option.emoji}
            audioSrc={option.audioSrc}
            onPlay={handleAudioPlay(i)}
            onPause={handleAudioPause}
            isPlaying={playingIndex === i}
            delay={i * 100}
          />
        ))}
      </div>
    </div>
  );
};

// ========== 3D FLIP CARD ==========
const FlipCard3D = ({ frontText, backText, delay = 0 }: { frontText: string; backText: string; delay?: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className={`flip-card-3d cursor-pointer h-36 md:h-40 ${isFlipped ? "flipped" : ""}`} onClick={() => setIsFlipped(!isFlipped)} style={{ animationDelay: `${delay}ms` }}>
      <div className="flip-card-3d-inner relative w-full h-full">
        <div className="flip-card-3d-front absolute inset-0 glass-card-pink rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center border border-gold-accent/20 hover-lift animate-shake">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-pink-medium/30 to-gold-accent/30 flex items-center justify-center mb-2 animate-float-bounce">
            <svg viewBox="0 0 24 24" fill="#D4AF37" className="w-5 h-5 md:w-6 md:h-6 animate-heartbeat"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>
          <p className="font-playfair text-lg md:text-xl text-white text-center">{frontText}</p>
          <p className="font-cormorant text-pink-light/50 text-xs mt-1">tap to flip</p>
        </div>
        <div className="flip-card-3d-back absolute inset-0 bg-gradient-to-br from-pink-deep via-purple-medium to-purple-light rounded-2xl p-4 md:p-5 flex items-center justify-center border border-gold-accent/40 shadow-2xl">
          <p className="font-lora text-sm md:text-base text-white text-center leading-relaxed px-2">{backText}</p>
        </div>
      </div>
    </div>
  );
};

// ========== CHOCOLATE PIECE ==========
const ChocolatePiece = ({ filled = true, delay = 0 }: { filled?: boolean; delay?: number }) => (
  <div 
    className={`w-10 h-10 md:w-12 md:h-12 rounded-lg chocolate-piece animate-chocolate-3d ${!filled ? 'opacity-40' : ''}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {filled && (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-6 h-6 md:w-8 md:h-8 rounded bg-gradient-to-br from-amber-800 to-amber-900 shadow-inner" />
      </div>
    )}
  </div>
);

// ========== VIRTUAL CHOCOLATES ==========
const VirtualChocolates = () => (
  <div className="glass-card-gold rounded-3xl p-6 md:p-8 max-w-xs mx-auto chocolate-glow hover-lift animate-glow-pulse">
    <p className="font-playfair text-lg text-white text-center mb-4">A Box For You</p>
    <div className="chocolate-box rounded-2xl p-4 mx-auto max-w-xs">
      <div className="grid grid-cols-3 gap-2">
        <ChocolatePiece delay={0} />
        <ChocolatePiece delay={0.2} />
        <ChocolatePiece delay={0.4} />
        <ChocolatePiece delay={0.6} />
        <ChocolatePiece delay={0.8} />
        <ChocolatePiece delay={1.0} />
        <ChocolatePiece delay={1.2} />
        <ChocolatePiece delay={1.4} />
        <ChocolatePiece filled={false} delay={1.6} />
      </div>
    </div>
    <p className="font-cormorant text-white/40 text-center mt-4 text-sm">0 calories, 100% love 🤷</p>
  </div>
);

// ========== POLAROID PHOTO ==========
const PolaroidPhoto = () => (
  <div className="glass-card-pink rounded-3xl p-6 md:p-8 max-w-xs mx-auto flower-glow hover-lift relative overflow-hidden animate-glow-pulse">
    {[...Array(4)].map((_, i) => (
      <FallingPetal key={i} delay={i * 1.5} left={`${15 + i * 20}%`} />
    ))}
    
    <p className="font-playfair text-lg text-white text-center mb-4 relative z-10">A Bouquet For You 💐</p>
    
    {/* Polaroid Frame */}
    <div className="relative z-10 flex justify-center">
      <div className="relative bg-white p-3 pb-10 rounded-sm shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300" style={{ width: '200px' }}>
        {/* Bouquet Photo */}
        <img 
          src="/bouquet.jpg" 
          alt="Bouquet for you"
          className="w-full object-cover"
          style={{ height: '180px' }}
        />
        {/* Polaroid caption */}
        <p className="font-cormorant text-gray-600 text-center mt-2 text-sm italic">for you 💕</p>
      </div>
    </div>
    
    <p className="font-cormorant text-white/40 text-center mt-4 text-sm relative z-10">Never wilting, always yours 🌹</p>
  </div>
);

// ========== LOVE LETTER ==========
const LoveLetter = () => (
  <div className="glass-card-gold rounded-3xl p-5 md:p-6 max-w-md mx-auto gold-glow hover-lift animate-glow-pulse">
    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 md:p-5 border border-gold-accent/30">
      <div className="font-lora text-white/90 text-sm leading-relaxed space-y-3 max-h-[50vh] overflow-y-auto pr-2">
        <p className="text-gold-accent font-medium">Hey babe um we didn&apos;t get to share valentine because you were out with your friends (really not salty about it LMFAO JKJK)</p>
        
        <p>I am glad you went with them well things didn&apos;t go as planned and we both missed each other so much to the extend we both were calling each other the moment we got and also um day after valentine when you could call I ruined it by saying some absolute bs</p>
        
        <p>well not bs tbf that was not something I should have ever called you but well FAAAH it happened not gonna say it was just a slip of tongue cause it really did hurt you and embarrass you a lot cause at that time you were with your friends too so it was really stupid of me to say that to you too</p>
        
        <p>so yeah I said sorry and stuff but I am not gonna just settle for words I will prove it mhm? we talked it out and stuff lemme get back to the main topic this is me just adding today cause I wanted to add it lmao now the real script I had for you is below this so read it all babe mwah</p>
        
        <div className="border-t border-white/20 pt-3 mt-3">
          <p className="text-pink-light font-medium">HIIIIIIII NOMNOM MAAAN I MISS YOU SM THE NETWORK AT YO PLACE IS AHHH BUT I GETCHU BABYY EHEEHEHE</p>
          
          <p>hii babe ik you miss me a lot I miss you a lot too ik you tried to call me a lot of times but the calls are not connecting because the network is ahh so its fine babe imma be here</p>
          
          <p>I just wanted to say somethings to you baby so like this is the first time I am ever spending valentines with someone as clueless I am with most of these stuffs because I haven&apos;t spend valentines with anyone I am glad its you who I could spend it with</p>
          
          <p>AURGH I LOVE YOU SM SQUISHY WUISHY BABY MWAAAAH</p>
          
          <p>dawg Istg like I am just so happy bro I am kinda salty that I cant spend valentines with you BUT YK you deserve a break cause you really are very busy and you need spend sometime with your friends ik your sad that you cant spend time with me but I will be always here for you mhm?</p>
          
          <p>I wanted to buy you chocolates and shi too dawg BUT MY AHH IS TOO BROKE AHHHH but yk I will soon buy a lot of things for you irl cause I want to treat you like a princess too mhm?</p>
          
          <p>anyways your my first ever valentine and you will be my eternal valentine too</p>
          
          <p>BRO ISTG THAT AUDIO CLIPS ARE SO CRINGEY AHAHAHAAHAH but cringey is a part of me so ik your ahh is gonna laugh at it I just wanna make your mood better too lmfaoooo.</p>
          
          <p>so yeah that&apos;s the gist of it I am just super happy that your my valentine you mean so much to me and I love you so much babe thank you for being my valentine for this lifetime mwah 💜</p>
        </div>
      </div>
    </div>
  </div>
);

// ========== MAIN COMPONENT ==========
export default function ValentinesPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);
  const totalSlides = 9;

  // Calculate days together since December 9, 2025
  const startDate = new Date('2025-12-09');
  const today = new Date('2026-02-16'); // Feb 16, 2026
  const daysTogether = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  // Distance: Kerala, India to Davao, Philippines ≈ 3,400 miles
  const milesApart = "3,400";

  // Handle start click
  const handleStart = () => {
    setHasStarted(true);
    if (musicRef.current) {
      musicRef.current.volume = 0.5;
      musicRef.current.play().catch(() => {});
      setIsMusicPlaying(true);
    }
  };

  // Voice message handlers
  const handleVoicePlay = () => {
    setIsVoicePlaying(true);
    if (musicRef.current) {
      musicRef.current.volume = 0;
    }
  };

  const handleVoicePause = () => {
    setIsVoicePlaying(false);
    if (musicRef.current && isMusicPlaying) {
      musicRef.current.volume = 0.5;
    }
  };

  const goToSlide = (index: number) => {
    if (containerRef.current) {
      const slideWidth = window.innerWidth;
      containerRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
      setCurrentSlide(index);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
  };

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
  };

  const toggleMusic = () => {
    if (musicRef.current) {
      if (isMusicPlaying) { 
        musicRef.current.pause(); 
      } 
      else { 
        musicRef.current.volume = 0.5;
        musicRef.current.play().catch(() => {}); 
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollLeft;
        const slideWidth = window.innerWidth;
        const newSlide = Math.round(scrollPosition / slideWidth);
        if (newSlide !== currentSlide) setCurrentSlide(newSlide);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const loveNotes = [
    { front: "Worth Every Mile", back: `${milesApart} miles is roughly ${Math.floor(3400 * 1.609).toLocaleString()} km. That's a lot of kilometers. Worth it though.` },
    { front: "Notification King", back: "Every time my phone buzzes, I hope it's you. My family probably thinks I have a problem. I do - it's you." },
    { front: "Best Part of Day", back: "Video calls with you > everything else. My screen time report is embarrassing. Worth it." },
    { front: "The Math", back: `${daysTogether} days and counting. That's ${Math.floor(daysTogether * 24)} hours of loving you. A+, would recommend.` },
    { front: "Worth Waiting", back: "I'd wait longer if I had to. Not patiently, but I'd do it. You're kinda stuck with me now." },
    { front: "LDR Pro Tips", back: "Step 1: Find someone worth the distance. Step 2: Don't let them escape. Step 3: ??? Step 4: Profit (love)." },
  ];

  if (!hasStarted) {
    return (
      <>
        <audio ref={musicRef} loop preload="auto"><source src="/romantic-music.mp3" type="audio/mpeg" /></audio>
        <StartOverlay onStart={handleStart} />
      </>
    );
  }

  return (
    <>
      <audio ref={musicRef} loop preload="auto"><source src="/romantic-music.mp3" type="audio/mpeg" /></audio>
      <MusicPlayer isPlaying={isMusicPlaying} togglePlay={toggleMusic} />
      <ArrowButtons prevSlide={prevSlide} nextSlide={nextSlide} currentSlide={currentSlide} totalSlides={totalSlides} />
      <SlideNav currentSlide={currentSlide} totalSlides={totalSlides} goToSlide={goToSlide} />

      <div ref={containerRef} className="slide-container">
        
        {/* SLIDE 1: HERO */}
        <section className={`slide-section px-4 md:px-6 relative overflow-hidden ${currentSlide === 0 ? 'active' : ''}`}>
          {[...Array(10)].map((_, i) => <ConfettiParticle key={i} delay={i * 1.5} left={`${10 + i * 8}%`} />)}
          
          <FloatingHeart className="top-16 left-8 md:left-16 animate-float-3d" delay={0} size="lg" color="pink" />
          <FloatingHeart className="top-28 right-8 md:right-20 animate-float-3d" delay={1} size="md" color="gold" />
          <FloatingHeart className="bottom-28 left-12 md:left-24 animate-float-3d" delay={2} size="sm" color="light" />
          <FloatingHeart className="top-44 left-1/4 animate-float-3d" delay={0.5} size="md" color="gold" />
          <FloatingHeart className="bottom-44 right-1/4 animate-float-3d" delay={1.5} size="lg" color="pink" />
          <FloatingHeart className="top-20 right-1/3 animate-float-3d" delay={2.5} size="md" color="gold" />
          
          <Sparkle className="top-1/4 left-1/4 w-3 h-3" />
          <Sparkle className="top-1/3 right-1/3 w-4 h-4" style={{ animationDelay: "0.5s" }} />
          <Sparkle className="bottom-1/4 left-1/3 w-3 h-3" style={{ animationDelay: "1s" }} />
          <Sparkle className="top-1/2 right-1/4 w-4 h-4" style={{ animationDelay: "1.5s" }} />
          
          <div className="text-center z-10 animate-fade-in-up px-4 max-w-full">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-8 md:mb-10">
              <div className="absolute inset-0 bg-pink-medium/40 rounded-full blur-xl animate-pulse-glow" />
              <div className="relative w-full h-full animate-heart-3d">
                <svg viewBox="0 0 24 24" fill="url(#heartGradient)" className="w-full h-full drop-shadow-2xl">
                  <defs>
                    <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C06C84" />
                      <stop offset="50%" stopColor="#D4AF37" />
                      <stop offset="100%" stopColor="#C06C84" />
                    </linearGradient>
                  </defs>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>
            
            <div className="mb-6 md:mb-8">
              <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight tracking-wide drop-shadow-lg animate-float-up">
                HAPPY VALENTINES DAYY
              </h1>
              <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gold-accent leading-tight tracking-wide drop-shadow-lg animate-float-up animate-eternal-glow" style={{ animationDelay: "0.2s" }}>
                MY BABYYYYYYYY
              </h1>
              <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-pink-light leading-tight tracking-wide drop-shadow-lg animate-float-up" style={{ animationDelay: "0.4s" }}>
                NOMNOM 💋
              </h1>
            </div>
            
            <div className="mb-6 animate-scale-in" style={{ animationDelay: "0.6s" }}>
              <p className="font-playfair text-2xl sm:text-3xl md:text-4xl text-pink-light/80">
                ~ Niki 💜
              </p>
            </div>
            
            <p className="font-cormorant text-base sm:text-lg text-white/50 max-w-xs mx-auto animate-float-up" style={{ animationDelay: "0.8s" }}>
              Kerala 🇮🇳 ↔️ Davao 🇵🇭
            </p>
            
            <div className="mt-8 md:mt-10 animate-float-bounce">
              <p className="font-cormorant text-white/30 text-sm">swipe →</p>
              <div className="flex justify-center gap-2 mt-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="#C06C84" className="w-5 h-5" strokeWidth={2}>
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" className="w-5 h-5" strokeWidth={2}>
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 2: DISTANCE COUNTER */}
        <section className={`slide-section px-4 md:px-6 ${currentSlide === 1 ? 'active' : ''}`}>
          <div className="glass-card-pink rounded-3xl p-6 sm:p-8 md:p-10 max-w-sm md:max-w-md w-full pink-glow animate-glow-pulse hover-lift">
            <p className="font-playfair text-xl md:text-2xl text-white text-center mb-1">The Distance</p>
            <p className="font-cormorant text-white/40 text-center text-sm mb-6">Kerala to Davao, but who's counting?</p>
            
            <div className="flex items-center justify-center gap-6 md:gap-10">
              <div className="text-center">
                <p className="font-playfair text-5xl sm:text-6xl md:text-7xl text-gold-accent text-glow animate-pulse-scale">{milesApart}</p>
                <p className="font-cormorant text-white/40 text-xs md:text-sm mt-2">miles apart</p>
              </div>
              <div className="text-2xl md:text-3xl animate-heartbeat opacity-50">💕</div>
              <div className="text-center">
                <p className="font-playfair text-5xl sm:text-6xl md:text-7xl text-pink-medium text-glow animate-pulse-scale">{daysTogether}</p>
                <p className="font-cormorant text-white/40 text-xs md:text-sm mt-2">days together</p>
              </div>
            </div>
            
            <p className="font-cormorant text-white/30 text-center text-xs mt-6 italic">
              Worth every single mile
            </p>
          </div>
        </section>

        {/* SLIDE 3: FIRST VALENTINE */}
        <section className={`slide-section px-4 md:px-6 ${currentSlide === 2 ? 'active' : ''}`}>
          <div className="glass-card-gold rounded-3xl p-6 sm:p-8 md:p-10 max-w-sm md:max-w-md w-full gold-glow animate-glow-pulse hover-lift">
            <p className="font-playfair text-lg md:text-xl text-white mb-4 leading-tight text-center">
              YOU&apos;RE MY FIRST VALENTINE
              <br />
              <span className="text-gold-accent">AND I AM GLAD ITS YOU</span>
              <br />
              <span className="text-pink-light">MWAAAAH 💋</span>
            </p>
            
            <div className="text-left mt-6 space-y-3">
              <p className="font-lora text-white/80 text-sm md:text-base leading-relaxed">
                HEYYYYYY my pretty princess, I never knew what actually having a Valentine is like fr. 
              </p>
              <p className="font-lora text-white/80 text-sm md:text-base leading-relaxed">
                I thought I can&apos;t do anything for you on Valentine&apos;s because well... we are not IRL yet. 
              </p>
              <p className="font-lora text-white/80 text-sm md:text-base leading-relaxed">
                That&apos;s what I thought but I should do what I can so lmfao I had to make something for you.
              </p>
              <p className="font-lora text-white/80 text-sm md:text-base leading-relaxed">
                I&apos;m not much of a creative person but my intentions are clear – I&apos;m tryna be more for you and I promise I will be.
              </p>
              <p className="font-lora text-white/90 text-sm md:text-base leading-relaxed font-medium">
                Thank you for being my first ever Valentine and you will always be my Valentine, my love 💜
              </p>
            </div>
          </div>
        </section>

        {/* SLIDE 4: VOICE MESSAGE */}
        <section className={`slide-section px-4 md:px-6 ${currentSlide === 3 ? 'active' : ''}`}>
          <div className="max-w-sm w-full">
            <p className="font-playfair text-2xl md:text-3xl text-white text-center mb-1">Voice Messages</p>
            <p className="font-cormorant text-white/40 text-center text-sm mb-6">Because texting is too mainstream. Pick your vibe:</p>
            <VoiceMessage onPlay={handleVoicePlay} onPause={handleVoicePause} />
          </div>
        </section>

        {/* SLIDE 5: VIRTUAL CHOCOLATES */}
        <section className={`slide-section px-4 md:px-6 ${currentSlide === 4 ? 'active' : ''}`}>
          <div className="max-w-xs w-full">
            <p className="font-playfair text-2xl md:text-3xl text-white text-center mb-1">Chocolates 🍫</p>
            <p className="font-cormorant text-white/40 text-center text-sm mb-6">Can't ship real ones, so here's digital ones. Same thing, right?</p>
            <VirtualChocolates />
          </div>
        </section>

        {/* SLIDE 6: POLAROID BOUQUET */}
        <section className={`slide-section px-4 md:px-6 ${currentSlide === 5 ? 'active' : ''}`}>
          <div className="max-w-xs w-full">
            <p className="font-playfair text-xl md:text-2xl text-white text-center mb-1">FLOWAAAS FOR YOU RAAAH</p>
            <p className="font-playfair text-lg md:text-xl text-pink-light text-center mb-2">IMMA GIVE MORE IRL TOO 🌹</p>
            <p className="font-cormorant text-white/40 text-center text-sm mb-6">imma buy you new ones every week EHEHEHEHEHE</p>
            <PolaroidPhoto />
          </div>
        </section>

        {/* SLIDE 7: LOVE LETTER */}
        <section className={`slide-section px-4 md:px-6 ${currentSlide === 6 ? 'active' : ''}`}>
          <div className="max-w-md w-full">
            <LoveLetter />
          </div>
        </section>

        {/* SLIDE 8: LOVE NOTES + DEDICATION */}
        <section className={`slide-section px-4 md:px-6 ${currentSlide === 7 ? 'active' : ''}`}>
          <div className="max-w-lg w-full">
            <p className="font-playfair text-2xl md:text-3xl text-white text-center mb-1">Love Notes</p>
            <p className="font-cormorant text-white/40 text-center text-sm mb-6">Tap each card to reveal something cheesy I wrote about you</p>
            
            <div className="grid grid-cols-2 gap-3 mb-8">
              {loveNotes.map((note, i) => <FlipCard3D key={i} frontText={note.front} backText={note.back} delay={i * 50} />)}
            </div>
            
            <div className="text-center">
              <p className="font-playfair text-lg md:text-xl text-gold-accent text-glow">Your Favorite Simp 💜</p>
              <p className="font-cormorant text-white/30 text-sm mt-4">Made with ♥ for Niki</p>
            </div>
          </div>
        </section>

        {/* SLIDE 9: CREDITS */}
        <section className={`slide-section px-4 md:px-6 ${currentSlide === 8 ? 'active' : ''}`}>
          <div className="h-screen flex items-center justify-center overflow-hidden">
            <div className="animate-credits text-center px-4">
              <p className="font-playfair text-2xl sm:text-3xl md:text-5xl text-white mb-3">happy valentines</p>
              <p className="font-playfair text-xl sm:text-2xl md:text-4xl text-pink-light mb-4">my love</p>
              <p className="font-cormorant text-base sm:text-lg md:text-xl text-gold-accent mb-8">yours solely, faru 💜</p>
              
              <div className="w-12 sm:w-16 h-px bg-white/20 mx-auto mb-8" />
              
              <p className="font-lora text-white/40 text-xs sm:text-sm mb-2">Thank you for being mine</p>
              <p className="font-lora text-white/30 text-xs">3,400 miles means nothing when you mean everything</p>
              
              <div className="mt-10 sm:mt-16 space-y-2">
                <p className="font-cormorant text-white/20 text-xs">Made with love</p>
                <p className="font-cormorant text-white/15 text-xs">February 14, 2026</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
