import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { usePortfolioStore } from './store/usePortfolioStore'
import TrackScene from './components/canvas/TrackScene'
import CharacterSelectMenu from './components/ui/CharacterSelectMenu'
import HUDOverlay from './components/ui/HUDOverlay'
import TurnCarouselModal from './components/ui/TurnCarouselModal'

export default function App() {
  const { activeScreen } = usePortfolioStore()

  return (
    <div className="relative w-screen h-[100dvh] min-h-[100dvh] overflow-hidden bg-[#0a0a0a] font-sans antialiased">
      {/* 1. 3D R3F Track Scene: mounted ONLY when race/track view is active */}
      {activeScreen !== 'character_select' && activeScreen !== 'character-select' && (
        <React.Suspense fallback={null}>
          <TrackScene />
        </React.Suspense>
      )}

      {/* 2. Top-level Screen Modes */}
      <AnimatePresence mode="wait">
        {(activeScreen === 'character_select' || activeScreen === 'character-select') && (
          <CharacterSelectMenu key="character-select" />
        )}
      </AnimatePresence>

      {/* 3. Racing Track HUD & Modals */}
      {(activeScreen === 'racing_track' || activeScreen === 'racing-track') && (
        <>
          <HUDOverlay />
          <TurnCarouselModal />
        </>
      )}

      {/* 4. Subtle Ambient Scanline & Vignette Effect (Landing only) */}
      {(activeScreen === 'character_select' || activeScreen === 'character-select') && (
        <>
          <div className="fixed inset-0 pointer-events-none scanlines opacity-20 z-20" />
          <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)] z-20" />
        </>
      )}
    </div>
  )
}

