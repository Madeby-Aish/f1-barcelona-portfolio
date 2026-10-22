import { create } from 'zustand'

export const usePortfolioStore = create((set, get) => ({
  // Screen state: 'character_select' | 'racing_track'
  activeScreen: 'character_select',
  
  // Selected turn: null | 1 | 4 | 10 | 12 | 14
  selectedTurn: null,
  
  // Camera transition lock
  isCameraTransitioning: false,
  
  // Camera view mode: 'satellite' | 'street'
  cameraMode: 'satellite',

  // Current sector based on Barcelona circuit zones:
  // Sector 1: Turns 1-4 (Speed & Technical entry)
  // Sector 2: Turns 5-9 & 10 (Curva Campsa & Caixa hairpin)
  // Sector 3: Turns 11-14 (Technical stadium & chicane)
  currentSector: 1,

  // HUD & Telemetry
  lapNumber: 1,
  telemetrySpeed: 318, // km/h
  drsActive: true,
  audioMuted: false,

  // Sound generator
  playSound: (type = 'click') => {
    if (get().audioMuted) return
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      const ctx = new AudioContext()
      
      if (type === 'rev') {
        // F1 engine acceleration roar
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(140, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.8)
        
        // Low pass filter to give that guttural exhaust growl
        const filter = ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(1200, ctx.currentTime)
        filter.frequency.linearRampToValueAtTime(3200, ctx.currentTime + 0.8)

        gain.gain.setValueAtTime(0.08, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9)

        osc.connect(filter)
        filter.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.9)
      } else if (type === 'whoosh') {
        // Camera flyby transition whoosh
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(300, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.5)
        gain.gain.setValueAtTime(0.12, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.5)
      } else if (type === 'click') {
        // Clean game UI beep
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(880, ctx.currentTime)
        osc.frequency.setValueAtTime(1760, ctx.currentTime + 0.04)
        gain.gain.setValueAtTime(0.08, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.1)
      }
    } catch {
      // AudioContext might be blocked before first user gesture
    }
  },

  // Actions
  startRace: () => {
    get().playSound('rev')
    set({
      activeScreen: 'racing_track',
      selectedTurn: null,
      cameraMode: 'satellite',
      isCameraTransitioning: true
    })
    setTimeout(() => {
      set({ isCameraTransitioning: false })
    }, 1800)
  },

  selectTurn: (turnId) => {
    const current = get().selectedTurn
    if (current === turnId && !get().isCameraTransitioning) return

    get().playSound('whoosh')

    // Determine sector based on Barcelona turn layout
    let sector = 1
    if (turnId === 1 || turnId === 4) sector = 1
    else if (turnId === 10) sector = 2
    else if (turnId === 12 || turnId === 14) sector = 3

    set({
      selectedTurn: turnId,
      isCameraTransitioning: true,
      cameraMode: 'street',
      currentSector: sector
    })
  },

  finishCameraTransition: () => {
    set({ isCameraTransitioning: false })
  },

  resetToSatellite: () => {
    get().playSound('whoosh')
    set({
      selectedTurn: null,
      cameraMode: 'satellite',
      isCameraTransitioning: true
    })
    setTimeout(() => {
      set({ isCameraTransitioning: false })
    }, 1200)
  },

  toggleAudio: () => {
    set((state) => ({ audioMuted: !state.audioMuted }))
  },

  // Quick navigation between turns
  goToNextTurn: () => {
    const turnOrder = [1, 4, 10, 12, 14]
    const current = get().selectedTurn
    const nextIdx = current ? (turnOrder.indexOf(current) + 1) % turnOrder.length : 0
    get().selectTurn(turnOrder[nextIdx])
  },

  goToPrevTurn: () => {
    const turnOrder = [1, 4, 10, 12, 14]
    const current = get().selectedTurn
    const prevIdx = current ? (turnOrder.indexOf(current) - 1 + turnOrder.length) % turnOrder.length : turnOrder.length - 1
    get().selectTurn(turnOrder[prevIdx])
  }
}))
