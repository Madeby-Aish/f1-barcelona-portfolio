import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Flag, Volume2, VolumeX, Menu, X, Compass, 
  Map, User, RotateCcw, Activity, Zap, CheckCircle2 
} from 'lucide-react'
import { TURNS_DATA, PLAYER_PROFILE } from '../../data/resumeData'
import { usePortfolioStore } from '../../store/usePortfolioStore'

export default function HUDOverlay() {
  const { 
    selectedTurn, 
    selectTurn, 
    resetToSatellite, 
    currentSector, 
    audioMuted, 
    toggleAudio, 
    playSound, 
    isCameraTransitioning,
    lapNumber 
  } = usePortfolioStore()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [liveSpeed, setLiveSpeed] = useState(318)
  const [liveRpm, setLiveRpm] = useState(11400)

  // Subtle telemetry jitter to mimic real F1 ECU telemetry stream
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveSpeed(315 + Math.floor(Math.random() * 12))
      setLiveRpm(11350 + Math.floor(Math.random() * 250))
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none flex flex-col justify-between p-3 sm:p-6 h-[100dvh] min-h-[100dvh]">
      
      {/* TOP TELEMETRY RACING BAR */}
      <header className="w-full flex items-center justify-between gap-3 pointer-events-auto">
        
        {/* Left: Driver Identity & Reset to Bird's Eye */}
        <div className="flex items-center gap-2">
          {/* Driver Badge */}
          <button
            onClick={() => {
              playSound('click')
              usePortfolioStore.setState({ activeScreen: 'character_select' })
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-panel hover:border-[#00ff87]/60 hover:bg-[#00ff87]/10 transition-all text-white group"
            title="Return to Driver Select"
          >
            <div className="w-2 h-2 rounded-full bg-[#00ff87] shadow-neon-emerald animate-pulse" />
            <div className="text-left font-mono">
              <span className="text-[10px] text-white/50 block leading-tight">DRIVER P1</span>
              <span className="text-xs font-bold tracking-wider group-hover:text-[#00ff87] transition-colors">
                {PLAYER_PROFILE.name}
              </span>
            </div>
            <User className="w-3.5 h-3.5 text-white/40 ml-1 group-hover:text-[#00ff87]" />
          </button>

          {/* Bird's Eye Reset Button */}
          <button
            onClick={() => resetToSatellite()}
            disabled={isCameraTransitioning && selectedTurn === null}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-panel text-xs font-mono tracking-wider transition-all ${
              selectedTurn === null 
                ? 'border-[#00ff87] bg-[#00ff87]/15 text-[#00ff87] shadow-neon-emerald' 
                : 'text-white/70 hover:border-white/40 hover:text-white'
            }`}
            title="Overview Satellite View"
          >
            <Map className="w-3.5 h-3.5" />
            <span>SATELLITE VIEW</span>
          </button>
        </div>

        {/* Center: Quick Turn Jump Selectors (Desktop) */}
        <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl glass-panel border border-white/10">
          {TURNS_DATA.map((turn) => {
            const isActive = selectedTurn === turn.turnNumber
            return (
              <button
                key={`hud-turn-${turn.turnNumber}`}
                onClick={() => selectTurn(turn.turnNumber)}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg font-mono text-xs transition-all relative overflow-hidden ${
                  isActive 
                    ? 'bg-white/15 text-white font-bold shadow-sm' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                style={{
                  borderBottom: isActive ? `2px solid ${turn.color}` : '2px solid transparent'
                }}
              >
                <span 
                  className="w-1.5 h-1.5 rounded-full" 
                  style={{ backgroundColor: turn.color }}
                />
                <span className="font-bold">T{turn.turnNumber}</span>
                <span className="text-[11px] opacity-80 uppercase">{turn.category}</span>
              </button>
            )
          })}
        </div>

        {/* Right: Telemetry Readout & Controls */}
        <div className="flex items-center gap-2">
          
          {/* Live Speedometer & DRS Widget */}
          <div className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-lg glass-panel font-mono text-xs">
            {/* Speed */}
            <div className="text-right">
              <span className="text-[9px] text-white/40 block leading-tight">SPEED</span>
              <span className="font-bold text-[#00ff87] text-sm tracking-tight">
                {liveSpeed} <span className="text-[10px] text-white/60 font-normal">KM/H</span>
              </span>
            </div>

            <div className="w-[1px] h-6 bg-white/10" />

            {/* Sectors 1, 2, 3 indicators */}
            <div>
              <span className="text-[9px] text-white/40 block leading-tight mb-0.5">SECTORS</span>
              <div className="flex items-center gap-1">
                <span 
                  className={`w-3.5 h-1.5 rounded-sm transition-colors ${
                    currentSector === 1 ? 'bg-[#00ff87] shadow-neon-emerald' : 'bg-white/20'
                  }`} 
                  title="Sector 1" 
                />
                <span 
                  className={`w-3.5 h-1.5 rounded-sm transition-colors ${
                    currentSector === 2 ? 'bg-[#00e5ff] shadow-neon-cyan' : 'bg-white/20'
                  }`} 
                  title="Sector 2" 
                />
                <span 
                  className={`w-3.5 h-1.5 rounded-sm transition-colors ${
                    currentSector === 3 ? 'bg-[#ff0055] shadow-neon-red' : 'bg-white/20'
                  }`} 
                  title="Sector 3" 
                />
              </div>
            </div>

            <div className="w-[1px] h-6 bg-white/10" />

            {/* DRS Status */}
            <div className="px-1.5 py-0.5 rounded bg-[#00ff87]/20 border border-[#00ff87]/40 text-[#00ff87] font-bold text-[10px] tracking-widest clip-slanted">
              DRS
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              playSound('click')
              toggleAudio()
            }}
            className="p-2 rounded-lg glass-panel hover:border-white/40 text-white/80 hover:text-white transition-all"
            title="Toggle Audio"
          >
            {audioMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#00ff87]" />}
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg glass-panel hover:border-white/40 text-white transition-all"
            title="Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </header>

      {/* MOBILE POPUP TURN SELECTOR DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden pointer-events-auto absolute top-20 inset-x-4 rounded-xl glass-panel p-4 border border-white/20 text-white z-50 shadow-2xl space-y-2 backdrop-blur-2xl"
          >
            <div className="text-xs font-mono text-white/50 border-b border-white/10 pb-2 flex justify-between items-center">
              <span>SELECT CHECKPOINT TURN</span>
              <button 
                onClick={() => resetToSatellite()} 
                className="text-[#00ff87] underline"
              >
                Reset to Satellite
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-1 font-mono text-xs">
              {TURNS_DATA.map((turn) => {
                const isActive = selectedTurn === turn.turnNumber
                return (
                  <button
                    key={`mobile-turn-${turn.turnNumber}`}
                    onClick={() => {
                      selectTurn(turn.turnNumber)
                      setMobileMenuOpen(false)
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-all ${
                      isActive 
                        ? 'bg-white/15 border-white text-white font-bold' 
                        : 'bg-black/40 border-white/10 text-white/70'
                    }`}
                    style={{ borderColor: isActive ? turn.color : 'rgba(255,255,255,0.1)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span 
                        className="px-1.5 py-0.5 rounded font-black text-[10px] text-black"
                        style={{ backgroundColor: turn.color }}
                      >
                        T{turn.turnNumber}
                      </span>
                      <span>{turn.name}</span>
                    </div>
                    <span className="text-[10px] text-white/50">{turn.category}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTTOM CONTROLS & CONTROLS HELPER */}
      <footer className="w-full flex items-end justify-between gap-4 pointer-events-none">
        
        {/* Left helper hints */}
        <div className="pointer-events-auto hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg glass-panel font-mono text-[11px] text-white/60">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87]" />
            DRAG TO ORBIT
          </span>
          <span className="text-white/20">•</span>
          <span>SCROLL TO ZOOM</span>
          <span className="text-white/20">•</span>
          <span>CLICK APEX MARKER TO INSPECT</span>
        </div>

        {/* Right Turn Indicator status */}
        {selectedTurn && (
          <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-lg glass-panel font-mono text-xs text-[#00ff87]">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>FOCUSED: TURN {selectedTurn} APEX</span>
          </div>
        )}

      </footer>

    </div>
  )
}
