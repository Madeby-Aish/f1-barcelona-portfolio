import React, { Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { usePortfolioStore } from './store/usePortfolioStore'
import TrackScene from './components/canvas/TrackScene'
import CharacterSelectMenu from './components/ui/CharacterSelectMenu'
import HUDOverlay from './components/ui/HUDOverlay'
import TurnCarouselModal from './components/ui/TurnCarouselModal'

export default function App() {
  const { activeScreen } = usePortfolioStore()

  return (
    <div className="relative w-screen h-[100dvh] min-h-[100dvh] overflow-hidden bg-[#b0d4ec] font-sans antialiased">
      {/* 1. Underlying 3D R3F Track Scene - mounted conditionally when entering track */}
      {activeScreen !== 'character_select' && (
        <Suspense fallback={null}>
          <TrackScene />
        </Suspense>
      )}

      {/* 2. Fullscreen Fighting Game Character Select Menu */}
      <AnimatePresence mode="wait">
        {activeScreen === 'character_select' && (
          <CharacterSelectMenu key="character-select" />
        )}
      </AnimatePresence>

      {/* 3. Racing Track Telemetry HUD & Turn Checkpoint Modals */}
      {activeScreen === 'racing_track' && (
        <>
          <HUDOverlay />
          <TurnCarouselModal />
        </>
      )}
    </div>
  )
}
