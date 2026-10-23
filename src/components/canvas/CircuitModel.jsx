import React, { useMemo, useState, Suspense, Component } from 'react'
import { Html, useGLTF, useProgress } from '@react-three/drei'
import * as THREE from 'three'
import { TURNS_DATA } from '../../data/resumeData'
import { usePortfolioStore } from '../../store/usePortfolioStore'

// Error boundary for 3D model loading
class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error) {
    console.warn("Could not render barcelona_v2.glb model:", error)
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || null
    }
    return this.props.children
  }
}

// 3D Telemetry Loading Progress Indicator
function TrackModelLoader() {
  const { progress, active } = useProgress()
  if (!active && progress >= 100) return null

  return (
    <Html center distanceFactor={220} position={[0, 20, 0]}>
      <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-black/85 border border-[#e10600]/40 shadow-xl backdrop-blur-xl text-white font-mono select-none w-72 sm:w-80">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e10600] animate-ping" />
          <span className="text-xs font-bold tracking-widest text-white uppercase">
            LOADING 3D CIRCUIT
          </span>
        </div>
        <span className="text-[11px] text-white/60 mb-2 text-center">
          CIRCUIT DE BARCELONA-CATALUNYA
        </span>
        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/20 p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-[#e10600] via-[#ff4d4d] to-white rounded-full transition-all duration-300"
            style={{ width: `${Math.max(progress, 5)}%` }}
          />
        </div>
        <div className="flex justify-between w-full text-[10px] text-white/50 mt-1.5">
          <span>PROGRESS</span>
          <span className="text-white font-bold">{progress.toFixed(0)}%</span>
        </div>
      </div>
    </Html>
  )
}

// Actual 3D GLTF Model Loader for Barcelona Circuit
function BarcelonaGLTFModel() {
  const { scene } = useGLTF('/models/barcelona_v2.glb')

  const processedModel = useMemo(() => {
    if (!scene) return null
    const cloned = scene.clone(true)

    // Center and auto-scale model to fit the track footprint (~380 units across)
    const box = new THREE.Box3().setFromObject(cloned)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)

    if (maxDim > 0) {
      const scale = 380 / maxDim
      cloned.scale.set(scale, scale, scale)
      cloned.position.x = -center.x * scale
      cloned.position.y = -box.min.y * scale + 0.5
      cloned.position.z = -center.z * scale
    }

    // Traverse and hide any separate floating outline ribbons, splines, or curves
    cloned.traverse((child) => {
      if (
        child.isMesh &&
        (child.name.toLowerCase().includes('ribbon') ||
         child.name.toLowerCase().includes('curve') ||
         child.name.toLowerCase().includes('spline') ||
         child.name.toLowerCase().includes('track_outline'))
      ) {
        child.visible = false
      }
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (child.material) {
          child.material.roughness = Math.max(child.material.roughness || 0.6, 0.4)
          child.material.metalness = Math.min(child.material.metalness || 0.2, 0.5)
        }
      }
    })

    return cloned
  }, [scene])

  if (!processedModel) return null
  return <primitive object={processedModel} />
}

export default function CircuitModel() {
  const { selectedTurn, selectTurn, playSound } = usePortfolioStore()
  const [hoveredTurn, setHoveredTurn] = useState(null)

  return (
    <group name="barcelona-circuit">
      {/* 1. Authentic 3D GLTF Barcelona Model */}
      <ModelErrorBoundary fallback={null}>
        <Suspense fallback={<TrackModelLoader />}>
          <BarcelonaGLTFModel />
        </Suspense>
      </ModelErrorBoundary>

      {/* 2. Static Apex Ground Markers (Crisp White Circle + Accent Ring) */}
      {TURNS_DATA.map((turn) => (
        <group key={`apex-pin-${turn.turnNumber}`} position={turn.trackPosition}>
          {/* Static crisp white circular ground disc */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
            <circleGeometry args={[2.0, 32]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
          </mesh>
          {/* Clean outer accent ring */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
            <ringGeometry args={[2.0, 2.6, 32]} />
            <meshBasicMaterial color={turn.color} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}

      {/* 3. Clean Static HTML Turn Apex Badges (Zero Pulsing / Flashing Auras) */}
      {TURNS_DATA.map((turn) => {
        const isSelected = selectedTurn === turn.turnNumber
        const isHovered = hoveredTurn === turn.turnNumber

        return (
          <Html
            key={`marker-${turn.turnNumber}`}
            position={[turn.trackPosition[0], turn.trackPosition[1] + 8, turn.trackPosition[2]]}
            center
            distanceFactor={140}
            zIndexRange={[100, 0]}
          >
            <div
              className="relative cursor-pointer transition-transform duration-200 hover:scale-105"
              onMouseEnter={() => {
                setHoveredTurn(turn.turnNumber)
                playSound('click')
              }}
              onMouseLeave={() => setHoveredTurn(null)}
              onClick={(e) => {
                e.stopPropagation()
                selectTurn(turn.turnNumber)
              }}
            >
              {/* Clean Static Marker Badge */}
              <div
                className={`relative px-3 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2.5 shadow-xl backdrop-blur-md transition-all border ${
                  isSelected
                    ? 'bg-black text-white border-white'
                    : 'bg-[#121212]/95 text-white/90 border-[#262626] hover:border-white/50'
                }`}
                style={{
                  borderColor: isSelected ? '#ffffff' : (isHovered ? turn.color : '#262626'),
                }}
              >
                {/* Crisp White Circle Marker with Turn Number */}
                <div
                  className="w-5 h-5 rounded-full bg-white text-black font-black text-[10px] flex items-center justify-center tracking-tight shadow-sm"
                >
                  T{turn.turnNumber}
                </div>

                <div className="flex flex-col text-left whitespace-nowrap">
                  <span className="font-bold tracking-wider text-[11px] uppercase text-white">
                    {turn.category}
                  </span>
                  <span className="text-[10px] text-white/60 font-sans">
                    {turn.name}
                  </span>
                </div>

                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: turn.color }}
                />
              </div>

              {/* Clean static needle to track surface */}
              <div
                className="w-0.5 h-4 mx-auto"
                style={{
                  background: `linear-gradient(to bottom, #ffffff, transparent)`
                }}
              />
            </div>
          </Html>
        )
      })}
    </group>
  )
}

// Preload the GLTF track model so Drei caches it
useGLTF.preload('/models/barcelona_v2.glb')

