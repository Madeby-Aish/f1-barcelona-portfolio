import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import CircuitModel from './CircuitModel'
import CameraRig from './CameraRig'

// Natural daylight terrain ground plane around the circuit
function DayTerrain() {
  return (
    <group position={[0, -0.6, 0]}>
      {/* Daylight ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2500, 2500]} />
        <meshStandardMaterial
          color="#4b5842"
          roughness={0.92}
          metalness={0.05}
        />
      </mesh>
    </group>
  )
}

export default function TrackScene() {
  return (
    <div className="absolute inset-0 w-full h-[100dvh] min-h-[100dvh] bg-[#a2d2ff]">
      <Canvas
        shadows
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
        }}
      >
        {/* 1. Bright Daylight Sky Background */}
        <color attach="background" args={['#a2d2ff']} />

        {/* 2. Natural Trackside Camera Perspective */}
        <PerspectiveCamera
          makeDefault
          position={[0, 45, 95]}
          fov={50}
          near={0.1}
          far={5000}
        />

        {/* 3. OrbitControls with Locked Ground Horizon & Free Orbiting */}
        <OrbitControls
          makeDefault
          enableZoom={true}
          enableRotate={true}
          enablePan={false}
          minDistance={20}
          maxDistance={350}
          minPolarAngle={0.1}
          maxPolarAngle={Math.PI / 2.05}
        />


        {/* 4. Strong Natural Daylight Illumination */}
        <ambientLight intensity={1.8} />
        <directionalLight
          position={[120, 150, 80]}
          intensity={2.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={10}
          shadow-camera-far={800}
          shadow-camera-left={-250}
          shadow-camera-right={250}
          shadow-camera-top={250}
          shadow-camera-bottom={-250}
        />
        <hemisphereLight groundColor="#3a3a3a" color="#ffffff" intensity={1.2} />

        {/* 5. Bright Daylight Environment Preset */}
        <Environment preset="city" environmentIntensity={1.2} />

        <Suspense fallback={null}>
          <DayTerrain />
          <CircuitModel />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  )
}

