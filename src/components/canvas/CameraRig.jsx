import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { TURNS_DATA } from '../../data/resumeData'
import { usePortfolioStore } from '../../store/usePortfolioStore'

export default function CameraRig() {
  const { camera, controls } = useThree()
  const { selectedTurn, isCameraTransitioning, finishCameraTransition } = usePortfolioStore()

  // Trackside default camera position [0, 45, 95] looking at track center [0, 5, 0]
  const targetCamPos = useRef(new THREE.Vector3(0, 45, 95))
  const targetLookAt = useRef(new THREE.Vector3(0, 5, 0))
  const currentLookAt = useRef(new THREE.Vector3(0, 5, 0))

  // Update target when selectedTurn changes
  useEffect(() => {
    if (selectedTurn === null) {
      targetCamPos.current.set(0, 45, 95)
      targetLookAt.current.set(0, 5, 0)
    } else {
      const turn = TURNS_DATA.find((t) => t.turnNumber === selectedTurn)
      if (turn) {
        targetCamPos.current.set(...turn.camera.position)
        targetLookAt.current.set(...turn.camera.target)
      }
    }
  }, [selectedTurn])

  useFrame((_, delta) => {
    // CRITICAL: Only interpolate when transitioning between camera views or turns.
    // When idle, return immediately so OrbitControls is 100% free and responsive.
    if (!isCameraTransitioning) return

    const lerpFactor = Math.min(delta * 2.8, 0.12)

    camera.position.lerp(targetCamPos.current, lerpFactor)
    currentLookAt.current.lerp(targetLookAt.current, lerpFactor)

    if (controls) {
      controls.target.copy(currentLookAt.current)
      controls.update()
    } else {
      camera.lookAt(currentLookAt.current)
    }

    // Check if camera reached destination
    const posDist = camera.position.distanceTo(targetCamPos.current)
    const lookDist = currentLookAt.current.distanceTo(targetLookAt.current)

    if (posDist < 1.5 && lookDist < 1.0) {
      finishCameraTransition()
    }
  })

  // OrbitControls is managed directly in TrackScene.jsx with makeDefault
  return null
}

