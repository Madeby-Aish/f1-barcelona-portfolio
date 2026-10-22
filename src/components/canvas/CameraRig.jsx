import React, { useRef, useEffect } from 'react'
import { CameraControls } from '@react-three/drei'
import { SATELLITE_CAMERA, TURNS_DATA } from '../../data/resumeData'
import { usePortfolioStore } from '../../store/usePortfolioStore'

export default function CameraRig() {
  const controlsRef = useRef()
  const { selectedTurn, isCameraTransitioning, finishCameraTransition } = usePortfolioStore()

  // Initial setup: set camera to isometric diagonal perspective overlooking main straight & Turn 1
  useEffect(() => {
    if (!controlsRef.current) return
    controlsRef.current.setLookAt(
      SATELLITE_CAMERA.position[0],
      SATELLITE_CAMERA.position[1],
      SATELLITE_CAMERA.position[2],
      SATELLITE_CAMERA.target[0],
      SATELLITE_CAMERA.target[1],
      SATELLITE_CAMERA.target[2],
      false
    )
  }, [])

  // Smooth movement when selectedTurn changes
  useEffect(() => {
    if (!controlsRef.current) return

    if (selectedTurn === null) {
      // Transition smoothly back to overview satellite diagonal view
      controlsRef.current.setLookAt(
        SATELLITE_CAMERA.position[0],
        SATELLITE_CAMERA.position[1],
        SATELLITE_CAMERA.position[2],
        SATELLITE_CAMERA.target[0],
        SATELLITE_CAMERA.target[1],
        SATELLITE_CAMERA.target[2],
        true // smooth transition
      )
    } else {
      const turn = TURNS_DATA.find((t) => t.turnNumber === selectedTurn)
      if (turn) {
        // Transition down to tarmac level right at that turn's curb/apex
        controlsRef.current.setLookAt(
          turn.camera.position[0],
          turn.camera.position[1],
          turn.camera.position[2],
          turn.camera.target[0],
          turn.camera.target[1],
          turn.camera.target[2],
          true // smooth transition
        )
      }
    }
  }, [selectedTurn])

  // Finish transition when camera stops moving
  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return

    const handleRest = () => {
      if (isCameraTransitioning) {
        finishCameraTransition()
      }
    }

    controls.addEventListener('rest', handleRest)
    return () => controls.removeEventListener('rest', handleRest)
  }, [isCameraTransitioning, finishCameraTransition])

  return (
    <CameraControls
      ref={controlsRef}
      makeDefault
      smoothTime={0.7}
      draggingSmoothTime={0.08}
      minDistance={3}
      maxDistance={1200}
      maxPolarAngle={Math.PI / 2.05}
      dollyToCursor={true}
    />
  )
}
