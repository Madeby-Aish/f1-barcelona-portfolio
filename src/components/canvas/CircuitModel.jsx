import React, { useMemo, useRef, useState, Suspense, Component } from 'react'
import { useThree } from '@react-three/fiber'
import { Html, useGLTF, useProgress } from '@react-three/drei'
import * as THREE from 'three'
import { TURNS_DATA } from '../../data/resumeData'
import { usePortfolioStore } from '../../store/usePortfolioStore'

// Error boundary for 3D GLTF model loading
class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error) {
    console.warn("Could not load barcelona.glb model, switching to procedural track:", error)
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || null
    }
    return this.props.children
  }
}

// Daylight Telemetry Loading Indicator
function TrackModelLoader() {
  const { progress, active } = useProgress()
  if (!active && progress >= 100) return null

  return (
    <Html center distanceFactor={220} position={[0, 20, 0]}>
      <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-black/85 border border-[#00ff87]/50 shadow-neon-emerald backdrop-blur-xl text-white font-mono select-none w-72 sm:w-80">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00ff87] animate-ping" />
          <span className="text-xs font-bold tracking-widest text-[#00ff87] uppercase">
            DOWNLINKING 3D CIRCUIT
          </span>
        </div>
        <span className="text-[11px] text-white/60 mb-2 text-center">
          CIRCUIT DE BARCELONA-CATALUNYA GLB
        </span>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/20 p-[1px]">
          <div 
            className="h-full bg-gradient-to-r from-[#00ff87] via-[#00e5ff] to-[#ffaa00] rounded-full transition-all duration-300"
            style={{ width: `${Math.max(progress, 5)}%` }}
          />
        </div>
        <div className="flex justify-between w-full text-[10px] text-white/50 mt-1.5">
          <span>PROGRESS</span>
          <span className="text-[#00ff87] font-bold">{progress.toFixed(0)}%</span>
        </div>
      </div>
    </Html>
  )
}

// Authentic Barcelona Grand Prix 3D Model with PBR daylight textures
function BarcelonaGLTFModel({ onTrackDoubleClick }) {
  const { scene } = useGLTF('/models/barcelona.glb')

  const processedModel = useMemo(() => {
    if (!scene) return null
    const cloned = scene.clone(true)

    // Calculate bounding box to center the track on (0, 0, 0)
    cloned.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(cloned)
    const center = box.getCenter(new THREE.Vector3())

    // Scale to fit ~380 units across and center on ground
    const scale = 0.22
    cloned.scale.set(scale, scale, scale)
    cloned.position.x = -center.x * scale
    cloned.position.y = -box.min.y * scale
    cloned.position.z = -center.z * scale

    cloned.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true
        node.receiveShadow = true
        // Keep authentic base textures, disable aggressive overrides
        if (node.material) {
          node.material.side = THREE.DoubleSide
          node.material.needsUpdate = true
        }
      }
    })

    return cloned
  }, [scene])

  if (!processedModel) return null
  return (
    <primitive 
      object={processedModel} 
      onDoubleClick={onTrackDoubleClick}
    />
  )
}

// Procedural Spline Fallback (Only used if GLTF model is loading or absent)
const BARCELONA_CONTROL_POINTS = [
  new THREE.Vector3(-180, 0, 90),
  new THREE.Vector3(-150, 0, 90),
  new THREE.Vector3(-120, 2, 90),
  new THREE.Vector3(-95, 3, 75),
  new THREE.Vector3(-30, 4, 70),
  new THREE.Vector3(40, 5, 85),
  new THREE.Vector3(90, 4, 110),
  new THREE.Vector3(125, 3, 105),
  new THREE.Vector3(145, 1, 80),
  new THREE.Vector3(140, 0, 50),
  new THREE.Vector3(110, 3, 20),
  new THREE.Vector3(120, 5, -15),
  new THREE.Vector3(145, 7, -35),
  new THREE.Vector3(170, 5, -60),
  new THREE.Vector3(140, 2, -100),
  new THREE.Vector3(115, 2, -115),
  new THREE.Vector3(80, 3, -135),
  new THREE.Vector3(40, 3, -150),
  new THREE.Vector3(0, 3, -145),
  new THREE.Vector3(-45, 2, -130),
  new THREE.Vector3(-80, 2, -110),
  new THREE.Vector3(-130, 1, -60),
  new THREE.Vector3(-170, 0, 15),
]

function ProceduralTrackFallback() {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(BARCELONA_CONTROL_POINTS, true, 'centripetal'), [])
  const trackGeometry = useMemo(() => new THREE.TubeGeometry(curve, 350, 6, 12, true), [curve])
  const neonLineGeometry = useMemo(() => new THREE.TubeGeometry(curve, 350, 0.5, 6, true), [curve])

  return (
    <group>
      <mesh geometry={trackGeometry} receiveShadow castShadow>
        <meshStandardMaterial color="#2d3748" roughness={0.6} metalness={0.1} />
      </mesh>
      <mesh geometry={neonLineGeometry} position={[0, 0.4, 0]}>
        <meshStandardMaterial color="#00ff87" emissive="#00ff87" emissiveIntensity={0.8} />
      </mesh>
    </group>
  )
}

export default function CircuitModel() {
  const { selectedTurn, selectTurn, playSound } = usePortfolioStore()
  const [hoveredTurn, setHoveredTurn] = useState(null)
  const controls = useThree((state) => state.controls)

  // Double click anywhere on track surface smoothly zooms into that surface point
  const handleTrackDoubleClick = (e) => {
    e.stopPropagation()
    if (controls?.setLookAt) {
      const p = e.point
      playSound('whoosh')
      controls.setLookAt(
        p.x - 22, Math.max(p.y + 9, 8), p.z + 22,
        p.x, p.y + 1, p.z,
        true
      )
    }
  }

  return (
    <group name="barcelona-circuit">
      {/* 1. Authentic 3D GLTF Barcelona Model with daylight textures */}
      <ModelErrorBoundary fallback={<ProceduralTrackFallback />}>
        <Suspense fallback={<TrackModelLoader />}>
          <BarcelonaGLTFModel onTrackDoubleClick={handleTrackDoubleClick} />
        </Suspense>
      </ModelErrorBoundary>

      {/* 2. Interactive Apex Pulsing Rings at the 5 Turn Checkpoints */}
      {TURNS_DATA.map((turn) => {
        const isSelected = selectedTurn === turn.turnNumber
        return (
          <group key={`curb-${turn.turnNumber}`} position={turn.trackPosition}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, 0]}>
              <ringGeometry args={[5, 7.5, 32]} />
              <meshBasicMaterial
                color={turn.color}
                transparent
                opacity={isSelected ? 0.9 : 0.4}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh position={[0, 10, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 20, 8]} />
              <meshBasicMaterial
                color={turn.color}
                transparent
                opacity={isSelected ? 0.85 : 0.25}
              />
            </mesh>
          </group>
        )
      })}

      {/* 3. 5 Glowing 3D HTML Checkpoint Markers with Sector badges */}
      {TURNS_DATA.map((turn) => {
        const isSelected = selectedTurn === turn.turnNumber
        const isHovered = hoveredTurn === turn.turnNumber

        return (
          <Html
            key={`marker-${turn.turnNumber}`}
            position={[turn.trackPosition[0], turn.trackPosition[1] + 14, turn.trackPosition[2]]}
            center
            distanceFactor={180}
            zIndexRange={[100, 0]}
          >
            <div 
              className="relative cursor-pointer transition-transform duration-300"
              style={{
                transform: isHovered || isSelected ? 'scale(1.15) translateY(-6px)' : 'scale(1.0)',
              }}
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
              {/* Pulsing Beacon Wave */}
              <div
                className="absolute -inset-3 rounded-xl animate-ping opacity-30 pointer-events-none"
                style={{ backgroundColor: turn.color }}
              />

              {/* Marker Card Box with high contrast */}
              <div 
                className={`relative px-3.5 py-2 rounded-lg font-mono text-xs flex items-center gap-2.5 shadow-2xl backdrop-blur-md transition-all border ${
                  isSelected 
                    ? 'bg-black/90 text-white border-2' 
                    : 'bg-black/80 text-white/95 border border-white/20 hover:border-white/60'
                }`}
                style={{
                  borderColor: isSelected || isHovered ? turn.color : 'rgba(255,255,255,0.3)',
                  boxShadow: isSelected || isHovered ? `0 0 25px ${turn.color}aa` : '0 10px 25px rgba(0,0,0,0.6)'
                }}
              >
                <div 
                  className="px-2 py-0.5 rounded font-black text-[11px] tracking-wider clip-slanted"
                  style={{
                    backgroundColor: turn.color,
                    color: '#000000'
                  }}
                >
                  T{turn.turnNumber}
                </div>

                <div className="flex flex-col text-left whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold tracking-wider text-[11px] uppercase text-white">
                      {turn.category}
                    </span>
                    <span className="text-[9px] px-1 rounded bg-white/20 text-white/80">
                      S{turn.sector}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/70 font-sans">
                    {turn.name}
                  </span>
                </div>

                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: turn.color }}
                />
              </div>

              {/* Stem pointing down to apex */}
              <div 
                className="w-0.5 h-6 mx-auto"
                style={{
                  background: `linear-gradient(to bottom, ${turn.color}, transparent)`
                }}
              />
            </div>
          </Html>
        )
      })}
    </group>
  )
}

