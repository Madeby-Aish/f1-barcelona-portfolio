import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { 
  X, ChevronLeft, ChevronRight, ExternalLink, Zap, 
  Trophy, BookOpen, PenTool, Cpu, Activity, Compass, 
  Flag, Terminal, Users, Mic, GraduationCap, Sparkles, 
  Award, Code2, Layers, Smartphone, Gauge, MapPin 
} from 'lucide-react'
import { TURNS_DATA } from '../../data/resumeData'
import { usePortfolioStore } from '../../store/usePortfolioStore'

// Icon resolver for items
const ICON_MAP = {
  Code2,
  Cpu,
  Layers,
  Smartphone,
  Trophy,
  BookOpen,
  PenTool,
  Activity,
  Compass,
  Flag,
  Terminal,
  Users,
  Mic,
  GraduationCap,
  Sparkles,
  Award,
}

export default function TurnCarouselModal() {
  const { 
    selectedTurn, 
    resetToSatellite, 
    goToNextTurn, 
    goToPrevTurn, 
    playSound, 
    isCameraTransitioning 
  } = usePortfolioStore()

  const [currentIndex, setCurrentIndex] = useState(0)

  // Find active turn data
  const activeTurn = TURNS_DATA.find((t) => t.turnNumber === selectedTurn)

  // Reset carousel index when switching turns
  useEffect(() => {
    setCurrentIndex(0)
    if (selectedTurn === 4 || selectedTurn === 14) {
      // Celebrate World Record & Graduation checkpoints
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#00ff87', '#00e5ff', '#ffaa00', '#ff0055']
        })
      } catch {
        // fallback
      }
    }
  }, [selectedTurn])

  // Keyboard navigation: Arrows navigate cards, Escape closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedTurn) return
      if (e.key === 'Escape') {
        resetToSatellite()
      } else if (e.key === 'ArrowRight') {
        handleNextCard()
      } else if (e.key === 'ArrowLeft') {
        handlePrevCard()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedTurn, currentIndex, activeTurn])

  if (!selectedTurn || !activeTurn) return null

  const items = activeTurn.items || []
  const currentItem = items[currentIndex] || items[0]

  const handleNextCard = () => {
    playSound('click')
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const handlePrevCard = () => {
    playSound('click')
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const ItemIcon = ICON_MAP[currentItem?.icon] || Zap

  return (
    <AnimatePresence>
      <motion.div
        key={`turn-modal-${selectedTurn}`}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-4 sm:inset-x-auto sm:right-8 bottom-6 sm:bottom-10 z-40 max-w-2xl w-full mx-auto select-none pointer-events-auto"
      >
        {/* Main Glassmorphic Racing HUD Card */}
        <div 
          className="relative rounded-2xl glass-panel-glow p-5 sm:p-7 overflow-hidden text-white shadow-2xl backdrop-blur-2xl"
          style={{
            borderColor: `${activeTurn.color}66`,
            boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 35px ${activeTurn.color}25`
          }}
        >
          {/* Neon Corner Accents */}
          <div 
            className="absolute top-0 left-0 w-24 h-1"
            style={{ backgroundColor: activeTurn.color }}
          />
          <div 
            className="absolute top-0 right-0 w-16 h-1"
            style={{ backgroundColor: activeTurn.color }}
          />

          {/* Header Bar */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 mb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span 
                  className="px-2.5 py-0.5 rounded text-[11px] font-black font-mono tracking-widest clip-slanted text-black uppercase"
                  style={{ backgroundColor: activeTurn.color }}
                >
                  TURN {activeTurn.turnNumber} // {activeTurn.category}
                </span>
                <span className="text-xs font-mono text-white/50">
                  SECTOR {activeTurn.sector}
                </span>
                <span className="text-white/30">•</span>
                <span className="text-xs font-mono text-[#00ff87]">
                  {activeTurn.name}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white uppercase">
                {activeTurn.title}
              </h2>
            </div>

            {/* Close Button / Return to Satellite */}
            <button
              onClick={() => resetToSatellite()}
              className="group p-2 rounded-lg bg-black/60 border border-white/15 hover:border-red-500 hover:bg-red-500/10 text-white/70 hover:text-red-400 transition-all flex items-center gap-1.5"
              title="Return to Satellite View (ESC)"
            >
              <span className="text-[10px] font-mono tracking-wider hidden sm:inline text-white/50 group-hover:text-red-400">
                SATELLITE
              </span>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Telemetry Strip for Turn */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5 p-2 rounded-lg bg-black/40 border border-white/5 font-mono text-[11px]">
            <div>
              <span className="text-white/40 block">ENTRY SPEED</span>
              <span className="text-white font-bold">{activeTurn.telemetry.entrySpeed}</span>
            </div>
            <div>
              <span className="text-white/40 block">APEX SPEED</span>
              <span className="text-[#00ff87] font-bold">{activeTurn.telemetry.apexSpeed}</span>
            </div>
            <div>
              <span className="text-white/40 block">GEARBOX</span>
              <span className="text-[#ffaa00] font-bold">{activeTurn.telemetry.gear}</span>
            </div>
            <div>
              <span className="text-white/40 block">LATERAL G</span>
              <span className="text-[#00e5ff] font-bold">{activeTurn.telemetry.lateralG}</span>
            </div>
          </div>

          {/* Carousel Item Content Body */}
          <div className="min-h-[220px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem?.id || currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-3.5"
              >
                {/* Item Badge & Icon Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="p-2 rounded-lg bg-black/60 border text-white"
                      style={{ borderColor: `${activeTurn.color}55`, color: activeTurn.color }}
                    >
                      <ItemIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-wider text-white/50 uppercase block">
                        {currentItem?.badge} {currentItem?.period && `• ${currentItem.period}`}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold font-sans text-white">
                        {currentItem?.title}
                      </h3>
                    </div>
                  </div>

                  {currentItem?.company && (
                    <span className="px-2.5 py-1 text-xs font-mono bg-white/10 rounded border border-white/10 text-white/90">
                      {currentItem.company}
                    </span>
                  )}
                  {currentItem?.institution && (
                    <span className="px-2.5 py-1 text-xs font-mono bg-white/10 rounded border border-white/10 text-[#00ff87]">
                      {currentItem.institution}
                    </span>
                  )}
                </div>

                {/* Highlight banner if present */}
                {currentItem?.highlight && (
                  <div className="px-3 py-2 rounded-md bg-[#00ff87]/10 border-l-2 border-[#00ff87] text-xs font-mono text-[#00ff87]">
                    ⚡ {currentItem.highlight}
                  </div>
                )}

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                  {currentItem?.description}
                </p>

                {/* Achievements List if applicable */}
                {currentItem?.achievements && (
                  <ul className="space-y-1.5 pl-4 border-l border-white/10 text-xs text-gray-300">
                    {currentItem.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="list-disc pl-1 text-white/80">
                        {ach}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Key Metrics Grid if applicable */}
                {currentItem?.metrics && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                    {currentItem.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="p-2 rounded bg-black/50 border border-white/10 font-mono text-center">
                        <span className="text-[10px] text-white/50 block">{m.label}</span>
                        <span className="text-xs font-bold text-[#00e5ff]">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags / Pills */}
                {currentItem?.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentItem.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-white/80 hover:border-[#00ff87]/50 hover:text-[#00ff87] transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* External Link Button if applicable */}
                {currentItem?.link && (
                  <div className="pt-2">
                    <a
                      href={currentItem.link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/60 border hover:border-white text-xs font-mono font-bold tracking-wider text-white transition-all shadow-md"
                      style={{ borderColor: activeTurn.color }}
                    >
                      <span>{currentItem.link.label}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Footer Controls & Quick Turn Navigation */}
          <div className="mt-5 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
            
            {/* Card Stepper: Prev & Next buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              <button
                onClick={handlePrevCard}
                className="p-1.5 rounded bg-black/60 border border-white/15 hover:border-white/50 text-white/80 hover:text-white transition-colors"
                title="Previous Item (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 px-2">
                {items.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => {
                      playSound('click')
                      setCurrentIndex(dotIdx)
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      currentIndex === dotIdx 
                        ? 'w-6 bg-[#00ff87]' 
                        : 'w-2 bg-white/20 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextCard}
                className="p-1.5 rounded bg-black/60 border border-white/15 hover:border-white/50 text-white/80 hover:text-white transition-colors"
                title="Next Item (Right Arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <span className="text-white/40 text-[11px] ml-1">
                {currentIndex + 1} / {items.length}
              </span>
            </div>

            {/* Quick Hop to Prev/Next Turn */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPrevTurn()}
                className="px-2.5 py-1 rounded bg-black/50 border border-white/10 hover:border-[#00e5ff] text-[11px] text-white/70 hover:text-[#00e5ff] transition-all"
              >
                ← PREV APEX
              </button>
              <button
                onClick={() => goToNextTurn()}
                className="px-2.5 py-1 rounded bg-black/50 border border-white/10 hover:border-[#00ff87] text-[11px] text-white/70 hover:text-[#00ff87] transition-all"
              >
                NEXT APEX →
              </button>
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
