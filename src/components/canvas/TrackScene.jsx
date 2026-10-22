import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'
import CircuitModel from './CircuitModel'
import CameraRig from './CameraRig'
import { SATELLITE_CAMERA } from '../../data/resumeData'

export default function TrackScene() {
  return (
    <div className="absolute inset-0 w-full h-[100dvh] min-h-[100dvh] bg-[#b0d4ec]">
      <Canvas
        shadows
        camera={{
          position: SATELLITE_CAMERA.position,
          fov: 45,
          near: 1,
          far: 3500,
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.15
          gl.outputColorSpace = THREE.SRGBColorSpace
        }}
      >
        {/* Realistic Daylight Sky Background */}
        <color attach="background" args={['#b0d4ec']} />

        {/* Soft Atmospheric Horizon Fog */}
        <fog attach="fog" args={['#b0d4ec', 450, 2400]} />

        {/* Realistic PBR Environment Reflections */}
        <Environment preset="city" />

        {/* Balanced Sky Ambient Lighting */}
        <ambientLight intensity={1.2} />
        <hemisphereLight skyColor="#ffffff" groundColor="#788870" intensity={1.0} />

        {/* Strong Directional Sunlight */}
        <directionalLight
          position={[150, 250, 100]}
          intensity={2.8}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-near={10}
          shadow-camera-far={800}
          shadow-camera-left={-300}
          shadow-camera-right={300}
          shadow-camera-top={300}
          shadow-camera-bottom={-300}
        />

        <Suspense fallback={null}>
          <CircuitModel />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  )
}
