import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePortfolioStore } from '../../store/usePortfolioStore'
import { PLAYER_PROFILE } from '../../data/resumeData'
import { 
  Volume2, VolumeX, ChevronRight, Mail, Flag, User 
} from 'lucide-react'

// Brand Icons with F1 Carbon & Red Accent Styling
const GithubIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const LinkedinIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
)

export default function CharacterSelectMenu() {
  const { startRace, playSound, audioMuted, toggleAudio } = usePortfolioStore()
  const [isLaunching, setIsLaunching] = useState(false)
  const [imgLoadError, setImgLoadError] = useState(false)

  // Listen to keyboard Enter / Space to start race
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.code === 'Enter' || e.code === 'Space') && !isLaunching) {
        handleStart()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLaunching])

  const handleStart = () => {
    setIsLaunching(true)
    playSound('rev')
    setTimeout(() => {
      startRace()
    }, 400)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.05, 
        filter: 'blur(10px)',
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/95 backdrop-blur-xl overflow-hidden select-none h-[100dvh] min-h-[100dvh]"
    >
      {/* Background Animated Diagonal Polygon Stripes - Strict Carbon & F1 Red */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-racing-stripes overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-[1200px] h-[1200px] bg-gradient-to-br from-[#e10600]/15 via-transparent to-transparent rounded-full blur-3xl transform rotate-12" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[900px] h-[900px] bg-gradient-to-tr from-[#e10600]/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Grid Floor */}
      <div 
        className="absolute inset-x-0 bottom-0 h-96 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(225,6,0,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(65deg)',
          transformOrigin: 'bottom center'
        }}
      />

      {/* Top F1 Header */}
      <header className="absolute top-0 inset-x-0 h-16 border-b border-[#262626] px-6 sm:px-12 flex items-center justify-between z-20 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#e10600] text-white font-mono text-xs font-black tracking-widest clip-angled-tl uppercase shadow-[0_0_15px_rgba(225,6,0,0.5)]">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            GRAND PRIX 2026
          </div>
          <span className="text-white/20 font-mono text-xs hidden md:inline">|</span>
          <span className="text-white/70 font-mono text-xs tracking-wider uppercase hidden md:inline">
            CIRCUIT DE BARCELONA-CATALUNYA
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              playSound('click')
              toggleAudio()
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border border-[#262626] hover:border-[#e10600] bg-[#121212] hover:bg-[#e10600]/10 transition-all text-white/80"
            title="Toggle Audio"
          >
            {audioMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-white/40" />
                <span className="hidden sm:inline text-white/50">AUDIO: OFF</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#e10600]" />
                <span className="hidden sm:inline text-white">AUDIO: ON</span>
              </>
            )}
          </button>

          <div className="hidden lg:flex items-center gap-1.5 font-mono text-xs text-white/50">
            <span>PRESS</span>
            <kbd className="px-2 py-0.5 text-[10px] bg-white/10 rounded border border-[#262626] text-white font-bold">ENTER</kbd>
            <span>TO START</span>
          </div>
        </div>
      </header>

      {/* Main Character Select Stage */}
      <div className="relative w-full max-w-7xl h-[100dvh] pt-16 pb-12 px-6 sm:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 z-10 overflow-y-auto lg:overflow-visible">
        
        {/* LEFT COLUMN: Fighter Header, Biography, CTA, Socials */}
        <motion.div 
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex flex-col justify-center space-y-4 my-auto"
        >
          {/* Fighting Game P1 Ready Tag - Black Carbon with thin Red Border */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-[#121212] text-white font-mono font-black text-xs tracking-widest clip-slanted border border-[#e10600] shadow-[0_0_15px_rgba(225,6,0,0.3)]">
              PLAYER 1 // READY
            </div>
            <div className="px-3 py-1 bg-[#121212] border border-[#262626] text-white/80 font-mono text-xs tracking-wider">
              {PLAYER_PROFILE.nationality} • {PLAYER_PROFILE.location}
            </div>
          </div>

          {/* Main Title & Driver Name */}
          <div>
            <div className="text-[#e10600] font-mono text-xs tracking-widest uppercase flex items-center gap-2 mb-1 font-bold">
              <span className="inline-block w-6 h-[2px] bg-[#e10600]" />
              CALLSIGN: {PLAYER_PROFILE.callsign} • BE CSE-AIML (CGPA: 8.02)
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white uppercase">
              {PLAYER_PROFILE.name}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-[#a0a0a0] tracking-wide mt-1">
              {PLAYER_PROFILE.role}
            </p>
          </div>

          {/* Biographical Section (Replaces Old Telemetry Progress Bars) */}
          <div className="p-5 rounded-xl bg-[#121212]/95 border border-[#262626] relative overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#e10600]" />
            <div className="space-y-3 font-sans text-xs sm:text-sm leading-relaxed pl-1">
              <p className="text-white/95">
                Aishwarya is a driven AI/ML enthusiast, public speaker, and tech community leader currently pursuing a degree in Artificial Intelligence and Machine Learning (Class of 2028). A passionate advocate for peer learning, they serve as a GeeksforGeeks (GFG) Campus Ambassador, empowering students by bridging the gap between academia and the tech industry.
              </p>
              <p className="text-[#a0a0a0]">
                Beyond leadership, Aishwarya HC is an accomplished writer who has made global waves as a World Record Contributing Author. An eloquent communicator, they regularly engage audiences as a public speaker, sharing insights on emerging technologies and tech education. They are dedicated to leveraging AI/ML to solve real-world problems while building inclusive tech communities.
              </p>
            </div>
          </div>

          {/* Social Links & Start Button Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            {/* Primary START RACE Button - Solid F1 Red */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => playSound('click')}
              onClick={handleStart}
              disabled={isLaunching}
              className="w-full sm:w-auto flex-1 group relative px-8 py-3.5 bg-[#e10600] hover:bg-[#b80500] text-white font-black font-display text-base sm:text-lg tracking-wider uppercase clip-angled-tl shadow-[0_0_25px_rgba(225,6,0,0.6)] hover:shadow-[0_0_35px_rgba(225,6,0,0.9)] transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
              <div className="relative flex items-center justify-center gap-3">
                <Flag className="w-5 h-5 fill-white group-hover:rotate-12 transition-transform" />
                <span>{isLaunching ? 'REVIVING ENGINE...' : 'START RACE // ENTER TRACK'}</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>

            {/* Quick External Social Buttons */}
            <div className="flex items-center gap-2">
              <a
                href={PLAYER_PROFILE.socials.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playSound('click')}
                className="p-3 bg-[#121212] border border-[#262626] hover:border-[#e10600] hover:bg-[#e10600] text-white/90 hover:text-white rounded transition-all shadow-md"
                title="GitHub: github.com/Madeby-Aish"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href={PLAYER_PROFILE.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playSound('click')}
                className="p-3 bg-[#121212] border border-[#262626] hover:border-[#e10600] hover:bg-[#e10600] text-white/90 hover:text-white rounded transition-all shadow-md"
                title="LinkedIn: linkedin.com/in/aishwaryahc5506"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href={PLAYER_PROFILE.socials.email}
                onMouseEnter={() => playSound('click')}
                className="p-3 bg-[#121212] border border-[#262626] hover:border-[#e10600] hover:bg-[#e10600] text-white/90 hover:text-white rounded transition-all shadow-md"
                title="Email: rya.hc007@gmail.com"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Profile Card Frame with F1 Red Corner Brackets */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="w-full lg:w-1/2 flex items-center justify-center relative my-auto"
        >
          {/* Angled Polygon Backdrop Frame */}
          <div className="relative w-full max-w-[440px] aspect-[3/4] flex items-center justify-center">
            
            {/* Background angled polygon frame */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-[#121212] to-[#000000] border border-[#262626] clip-angled-tl"
              style={{
                boxShadow: '0 0 35px rgba(0, 0, 0, 0.9), inset 0 0 25px rgba(225, 6, 0, 0.08)'
              }}
            />

            {/* F1 Speed Accent Bars */}
            <div className="absolute -top-3 -right-3 w-28 h-1.5 bg-[#e10600] clip-slanted shadow-[0_0_10px_#e10600]" />
            <div className="absolute top-2 -right-2 w-16 h-1 bg-white/40 clip-slanted" />
            <div className="absolute -bottom-3 -left-3 w-32 h-1.5 bg-[#e10600] clip-slanted shadow-[0_0_10px_#e10600]" />

            {/* Holographic Watermark Badge */}
            <div className="absolute top-5 left-5 z-20 pointer-events-none">
              <span className="font-mono text-[10px] tracking-widest text-[#e10600] bg-black/90 px-2.5 py-0.5 border border-[#e10600]/40 uppercase clip-slanted font-bold">
                AUTHENTIC PROFILE // 07
              </span>
            </div>

            {/* Portrait Cutout Container */}
            <div className="relative w-[92%] h-[92%] overflow-hidden clip-angled-tl flex items-center justify-center bg-black/60">
              
              {!imgLoadError ? (
                <img
                  src="/images/profile-cutout.png"
                  alt="Aishwarya H.C. Character Portrait"
                  onError={() => setImgLoadError(true)}
                  className="w-full h-full object-contain object-bottom scale-100 hover:scale-105 transition-transform duration-700 ease-out filter contrast-105 drop-shadow-[0_15px_30px_rgba(225,6,0,0.2)]"
                />
              ) : (
                /* Elegant Avatar Fallback */
                <div className="w-full h-full flex flex-col items-center justify-center relative p-6 text-center">
                  <div className="w-32 h-32 rounded-full border-2 border-[#e10600]/60 flex items-center justify-center bg-[#e10600]/10 shadow-[0_0_20px_rgba(225,6,0,0.4)] mb-4 animate-pulse">
                    <User className="w-16 h-16 text-[#e10600]" />
                  </div>
                  <div className="font-display font-black text-2xl text-white tracking-wide uppercase">
                    AISHWARYA H.C.
                  </div>
                  <div className="font-mono text-xs text-[#e10600] mt-1 tracking-widest font-bold">
                    // APEX DRIVER //
                  </div>
                </div>
              )}
              
              {/* Subtle Scanline Overlay */}
              <div className="absolute inset-0 scanlines pointer-events-none opacity-20" />

              {/* Bottom Info Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent flex flex-col justify-end p-5 pointer-events-none">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-[#e10600] uppercase font-bold">
                      ACTIVE FIGHTER
                    </div>
                    <div className="text-xl font-display font-black text-white uppercase tracking-tight">
                      AISHWARYA H.C.
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-white/50 uppercase">RATING</div>
                    <div className="px-2.5 py-0.5 rounded bg-[#121212] border border-[#e10600]/50 text-[#e10600] font-mono font-black text-base shadow-[0_0_10px_rgba(225,6,0,0.3)]">
                      99 OVR
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner Decorative Ticks: F1 Scuderia Red & Graphite */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#e10600]" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#e10600]" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#262626]" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#262626]" />
          </div>
        </motion.div>

      </div>

      {/* Bottom Telemetry Ticker */}
      <footer className="absolute bottom-0 inset-x-0 h-10 border-t border-[#262626] px-6 sm:px-12 flex items-center justify-between text-[11px] font-mono text-white/50 bg-black/90 backdrop-blur-sm z-20">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#e10600] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e10600] animate-pulse" />
            TELEMETRY ONLINE
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="hidden sm:inline text-[#a0a0a0]">CIRCUIT DE BARCELONA-CATALUNYA: 4.675 KM</span>
        </div>
        <div className="flex items-center gap-3 text-white/60">
          <span>SECTORS: 3</span>
          <span>•</span>
          <span>CHECKPOINTS: 5 TURNS</span>
          <span>•</span>
          <span>VERSION 2026.1</span>
        </div>
      </footer>
    </motion.div>
  )
}
