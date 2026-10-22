import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePortfolioStore } from '../../store/usePortfolioStore'
import { PLAYER_PROFILE } from '../../data/resumeData'
import { 
  Zap, Trophy, Shield, Cpu, Sparkles, Volume2, VolumeX, 
  ChevronRight, Mail, ExternalLink, Flag, Gauge, User, Phone 
} from 'lucide-react'

// Brand Icons
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-xl overflow-hidden select-none h-[100dvh] min-h-[100dvh]"
    >
      {/* Background Animated Diagonal Polygon Stripes */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-racing-stripes overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-[1200px] h-[1200px] bg-gradient-to-br from-[#00ff87]/20 via-[#00e5ff]/10 to-transparent rounded-full blur-3xl transform rotate-12" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[900px] h-[900px] bg-gradient-to-tr from-[#ff0055]/15 via-[#ffaa00]/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Grid Floor */}
      <div 
        className="absolute inset-x-0 bottom-0 h-96 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0,255,135,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,135,0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(65deg)',
          transformOrigin: 'bottom center'
        }}
      />

      {/* Top Telemetry Header */}
      <header className="absolute top-0 inset-x-0 h-16 border-b border-white/10 px-6 sm:px-12 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-600/90 text-white font-mono text-xs font-bold tracking-widest clip-angled-tl uppercase">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            GRAND PRIX 2026
          </div>
          <span className="text-white/40 font-mono text-xs hidden md:inline">|</span>
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
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border border-white/10 hover:border-[#00ff87]/50 bg-black/40 hover:bg-[#00ff87]/10 transition-all text-white/80"
            title="Toggle Sound Effects"
          >
            {audioMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#00ff87]" />}
            <span className="hidden sm:inline">{audioMuted ? 'AUDIO: OFF' : 'AUDIO: ON'}</span>
          </button>

          <div className="hidden lg:flex items-center gap-1 font-mono text-xs text-white/50">
            <span>PRESS</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-white/10 rounded border border-white/20 text-white">ENTER</kbd>
            <span>TO START</span>
          </div>
        </div>
      </header>

      {/* Main Character Select Stage */}
      <div className="relative w-full max-w-7xl h-[100dvh] pt-16 pb-12 px-6 sm:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 z-10 overflow-y-auto lg:overflow-visible">
        
        {/* LEFT COLUMN: Fighter Stats, Bio, Player Badge, CTA */}
        <motion.div 
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex flex-col justify-center space-y-4 my-auto"
        >
          {/* Fighting Game P1 Ready Tag */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-gradient-to-r from-[#00ff87] to-[#00e5ff] text-black font-black font-mono text-xs tracking-widest clip-slanted shadow-neon-emerald">
              PLAYER 1 // READY
            </div>
            <div className="px-3 py-1 bg-black/60 border border-white/10 text-white/80 font-mono text-xs tracking-wider">
              {PLAYER_PROFILE.nationality} • {PLAYER_PROFILE.location}
            </div>
          </div>

          {/* Main Title & Driver Name */}
          <div>
            <div className="text-[#00ff87] font-mono text-xs tracking-widest uppercase flex items-center gap-2 mb-1">
              <span className="inline-block w-6 h-[2px] bg-[#00ff87]" />
              CALLSIGN: {PLAYER_PROFILE.callsign} • BE CSE-AIML (CGPA: 8.02)
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white uppercase glow-emerald">
              {PLAYER_PROFILE.name}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-[#00e5ff] tracking-wide mt-1">
              {PLAYER_PROFILE.role}
            </p>
          </div>

          {/* Bio paragraph with sleek glass background */}
          <div className="p-4 rounded-lg bg-black/40 border border-white/10 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00ff87] to-transparent" />
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
              {PLAYER_PROFILE.bio}
            </p>
          </div>

          {/* Spec & Stats Meters */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-white/60">
                DRIVER TELEMETRY & RATINGS
              </span>
              <span className="text-xs font-mono text-[#00ff87]">OVERALL: APEX CLASS</span>
            </div>

            <div className="space-y-2">
              {PLAYER_PROFILE.stats.map((stat, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {stat.label}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-[#00ff87] font-bold">{stat.value}%</span>
                      <span className="px-1 text-[10px] bg-white/10 rounded font-bold text-[#ffaa00]">
                        {stat.grade}
                      </span>
                    </span>
                  </div>
                  {/* Gauge Bar */}
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{ duration: 0.9, delay: 0.1 * idx, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#00ff87] via-[#00e5ff] to-[#ffaa00] rounded-full relative"
                    >
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_8px_#ffffff]" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links & Start Button Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            {/* Primary START RACE Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={() => playSound('click')}
              onClick={handleStart}
              disabled={isLaunching}
              className="w-full sm:w-auto flex-1 group relative px-8 py-3.5 bg-gradient-to-r from-[#00ff87] via-[#00e5ff] to-[#00ff87] text-black font-black font-display text-base sm:text-lg tracking-wider uppercase clip-angled-tl shadow-neon-emerald hover:shadow-[0_0_35px_rgba(0,255,135,0.7)] transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
              <div className="relative flex items-center justify-center gap-3">
                <Flag className="w-5 h-5 fill-black group-hover:rotate-12 transition-transform" />
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
                className="p-3 bg-black/50 border border-white/15 hover:border-[#00ff87] hover:bg-[#00ff87]/10 text-white hover:text-[#00ff87] rounded transition-all"
                title="GitHub: github.com/Madeby-Aish"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href={PLAYER_PROFILE.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playSound('click')}
                className="p-3 bg-black/50 border border-white/15 hover:border-[#00e5ff] hover:bg-[#00e5ff]/10 text-white hover:text-[#00e5ff] rounded transition-all"
                title="LinkedIn: linkedin.com/in/aishwaryahc5506"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href={PLAYER_PROFILE.socials.email}
                onMouseEnter={() => playSound('click')}
                className="p-3 bg-black/50 border border-white/15 hover:border-[#ffaa00] hover:bg-[#ffaa00]/10 text-white hover:text-[#ffaa00] rounded transition-all"
                title="Email: rya.hc007@gmail.com"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Floating Character Portrait Cutout with Glowing Rim-Light and Fallback */}
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
              className="absolute inset-0 bg-gradient-to-br from-[#161920] to-[#0e1117] border-2 border-[#00ff87]/40 clip-angled-tl shadow-hud-glass"
              style={{
                boxShadow: '0 0 40px rgba(0, 255, 135, 0.2), inset 0 0 30px rgba(0, 229, 255, 0.1)'
              }}
            />

            {/* Neon Speed Accent Bars */}
            <div className="absolute -top-3 -right-3 w-28 h-2 bg-[#ff0055] clip-slanted shadow-neon-red" />
            <div className="absolute top-2 -right-2 w-16 h-1.5 bg-[#ffaa00] clip-slanted shadow-neon-amber" />
            <div className="absolute -bottom-3 -left-3 w-32 h-2 bg-[#00ff87] clip-slanted shadow-neon-emerald" />

            {/* Holographic Watermark Badge */}
            <div className="absolute top-5 left-5 z-20 pointer-events-none">
              <span className="font-mono text-[10px] tracking-widest text-[#00ff87] bg-black/80 px-2 py-0.5 border border-[#00ff87]/40 uppercase clip-slanted">
                AUTHENTIC PROFILE // 07
              </span>
            </div>

            {/* Portrait Cutout Container */}
            <div className="relative w-[92%] h-[92%] overflow-hidden clip-angled-tl flex items-center justify-center bg-black/50">
              
              {!imgLoadError ? (
                <img
                  src="/images/profile-cutout.png"
                  alt="Aishwarya H.C. Character Portrait"
                  onError={() => setImgLoadError(true)}
                  className="w-full h-full object-contain object-bottom scale-100 hover:scale-105 transition-transform duration-700 ease-out filter contrast-105 drop-shadow-[0_15px_30px_rgba(0,255,135,0.25)]"
                />
              ) : (
                /* Elegant Cyberpunk Avatar Silhouette Fallback */
                <div className="w-full h-full flex flex-col items-center justify-center relative p-6 text-center">
                  <div className="w-32 h-32 rounded-full border-2 border-[#00ff87]/60 flex items-center justify-center bg-[#00ff87]/10 shadow-neon-emerald mb-4 animate-pulse">
                    <User className="w-16 h-16 text-[#00ff87]" />
                  </div>
                  <div className="font-display font-black text-2xl text-white tracking-wide uppercase">
                    AISHWARYA H.C.
                  </div>
                  <div className="font-mono text-xs text-[#00ff87] mt-1 tracking-widest">
                    // APEX DRIVER //
                  </div>
                </div>
              )}
              
              {/* Subtle Scanline Overlay */}
              <div className="absolute inset-0 scanlines pointer-events-none opacity-30" />

              {/* Glowing Rim Light Bottom Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent flex flex-col justify-end p-5 pointer-events-none">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-[#00ff87] uppercase">
                      ACTIVE FIGHTER
                    </div>
                    <div className="text-xl font-display font-black text-white uppercase tracking-tight">
                      AISHWARYA H.C.
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-white/50 uppercase">RATING</div>
                    <div className="text-lg font-mono font-black text-[#ffaa00]">99 OVR</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner Decorative HUD Targets */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#00ff87]" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#00ff87]" />
          </div>
        </motion.div>

      </div>

      {/* Bottom Telemetry Ticker */}
      <footer className="absolute bottom-0 inset-x-0 h-10 border-t border-white/10 px-6 sm:px-12 flex items-center justify-between text-[11px] font-mono text-white/40 bg-black/80 backdrop-blur-sm z-20">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#00ff87]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
            TELEMETRY ONLINE
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="hidden sm:inline">CIRCUIT DE BARCELONA-CATALUNYA: 4.675 KM</span>
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
