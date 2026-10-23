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
    <div className="fixed inset-0 pointer-events-none z-10 select-none flex flex-col justify-between p-3 sm:p-6 h-[100dvh] min-h-[100dvh]">

      {/* TOP TELEMETRY RACING BAR */}
      <header className="w-full flex items-center justify-between gap-3 pointer-events-none">

        {/* Left: Driver Identity & Reset to Bird's Eye */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Driver Badge */}
          <button
            onClick={() => {
              playSound('click')
              usePortfolioStore.setState({ activeScreen: 'character_select' })
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#121212]/90 border border-[#262626] hover:border-[#e10600] hover:bg-[#e10600]/10 transition-all text-white group shadow-xl pointer-events-auto"
            title="Return to Driver Select"
          >
            <div className="w-2 h-2 rounded-full bg-[#e10600] shadow-[0_0_10px_rgba(225,6,0,0.8)] animate-pulse" />
            <div className="text-left font-mono">
              <span className="text-[10px] text-white/50 block leading-tight">DRIVER P1</span>
              <span className="text-xs font-bold tracking-wider group-hover:text-[#e10600] transition-colors">
                {PLAYER_PROFILE.name}
              </span>
            </div>
            <User className="w-3.5 h-3.5 text-white/40 ml-1 group-hover:text-[#e10600]" />
          </button>

          {/* Bird's Eye Reset Button */}
          <button
            onClick={() => resetToSatellite()}
            disabled={isCameraTransitioning && selectedTurn === null}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs tracking-wider transition-all shadow-xl pointer-events-auto ${
              selectedTurn === null
                ? 'bg-[#121212] border border-[#e10600] text-[#e10600] shadow-[0_0_15px_rgba(225,6,0,0.3)] font-bold'
                : 'bg-[#121212]/90 border border-[#262626] text-white/70 hover:border-white/40 hover:text-white'
            }`}
            title="Overview Satellite View"
          >
            <Map className="w-3.5 h-3.5" />
            <span>SATELLITE VIEW</span>
          </button>
        </div>

        {/* Center: Quick Turn Jump Selectors (Desktop) */}
        <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-[#121212]/90 border border-[#262626] shadow-xl pointer-events-auto">
          {TURNS_DATA.map((turn) => {
            const isActive = selectedTurn === turn.turnNumber
            return (
              <button
                key={`hud-turn-${turn.turnNumber}`}
                onClick={() => selectTurn(turn.turnNumber)}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg font-mono text-xs transition-all relative overflow-hidden pointer-events-auto ${
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
        <div className="flex items-center gap-2 pointer-events-auto">

          {/* Live Speedometer & DRS Widget */}
          <div className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-lg bg-[#121212]/90 border border-[#262626] font-mono text-xs shadow-xl pointer-events-auto">
            {/* Speed */}
            <div className="text-right">
              <span className="text-[9px] text-white/40 block leading-tight">SPEED</span>
              <span className="font-bold text-white text-sm tracking-tight">
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
                    currentSector === 1 ? 'bg-[#e10600] shadow-[0_0_8px_rgba(225,6,0,0.8)]' : 'bg-white/20'
                  }`}
                  title="Sector 1"
                />
                <span
                  className={`w-3.5 h-1.5 rounded-sm transition-colors ${
                    currentSector === 2 ? 'bg-[#e10600] shadow-[0_0_8px_rgba(225,6,0,0.8)]' : 'bg-white/20'
                  }`}
                  title="Sector 2"
                />
                <span
                  className={`w-3.5 h-1.5 rounded-sm transition-colors ${
                    currentSector === 3 ? 'bg-white shadow-sm' : 'bg-white/20'
                  }`}
                  title="Sector 3"
                />
              </div>
            </div>

            <div className="w-[1px] h-6 bg-white/10" />

            {/* DRS Status */}
            <div className="px-1.5 py-0.5 rounded bg-[#e10600]/20 border border-[#e10600]/60 text-[#e10600] font-bold text-[10px] tracking-widest clip-slanted">
              DRS
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              playSound('click')
              toggleAudio()
            }}
            className="p-2 rounded-lg bg-[#121212]/90 border border-[#262626] hover:border-[#e10600] text-white/80 hover:text-white transition-all shadow-xl pointer-events-auto"
            title="Toggle Audio"
          >
            {audioMuted ? <VolumeX className="w-4 h-4 text-white/40" /> : <Volume2 className="w-4 h-4 text-[#e10600]" />}
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#121212]/90 border border-[#262626] hover:border-white text-white transition-all shadow-xl pointer-events-auto"
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
            className="lg:hidden pointer-events-auto absolute top-20 inset-x-4 rounded-xl bg-[#121212]/95 p-4 border border-[#262626] text-white z-50 shadow-2xl space-y-2 backdrop-blur-2xl"
          >
            <div className="text-xs font-mono text-white/50 border-b border-white/10 pb-2 flex justify-between items-center">
              <span>SELECT CHECKPOINT TURN</span>
              <button
                onClick={() => {
                  resetToSatellite()
                  setMobileMenuOpen(false)
                }}
                className="text-[#e10600] hover:underline"
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
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-all pointer-events-auto ${
                      isActive
                        ? 'bg-white/15 border-[#e10600] text-white font-bold'
                        : 'bg-black/60 border-white/10 text-white/70'
                    }`}
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
        <div className="pointer-events-auto hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#121212]/90 border border-[#262626] font-mono text-[11px] text-white/70 shadow-xl">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e10600]" />
            DRAG TO ORBIT
          </span>
          <span className="text-white/20">•</span>
          <span>SCROLL TO ZOOM</span>
          <span className="text-white/20">•</span>
          <span>CLICK APEX MARKER TO INSPECT</span>
        </div>

        {/* Right Turn Indicator status */}
        {selectedTurn && (
          <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#121212]/90 border border-[#e10600]/60 font-mono text-xs text-[#e10600] shadow-xl">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>FOCUSED: TURN {selectedTurn} APEX</span>
          </div>
        )}

      </footer>

    </div>
  )
}

