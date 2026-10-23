import React, { useMemo, useRef, useState, Suspense, Component } from 'react'
import { useFrame } from '@react-three/fiber'
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
    console.warn("Could not render barcelona.glb model, using procedural track fallback:", error)
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
      <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-black/85 border border-[#00ff87]/40 shadow-neon-emerald backdrop-blur-xl text-white font-mono select-none w-72 sm:w-80">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00ff87] animate-ping" />
          <span className="text-xs font-bold tracking-widest text-[#00ff87] uppercase">
            DOWNLINKING 3D CIRCUIT
          </span>
        </div>
        <span className="text-[11px] text-white/60 mb-2 text-center">
          CIRCUIT DE BARCELONA-CATALUNYA GLB
        </span>
        {/* Progress Bar */}
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

    cloned.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true
        node.receiveShadow = true
        if (node.material) {
          node.material.roughness = Math.max(node.material.roughness || 0.6, 0.4)
          node.material.metalness = Math.min(node.material.metalness || 0.2, 0.5)
        }
      }
    })

    return cloned
  }, [scene])

  if (!processedModel) return null
  return <primitive object={processedModel} />
}

// Procedural Circuit de Barcelona-Catalunya Spline Coordinates
// Spline accurately tracing the authentic layout:
// Main Straight -> Turn 1 (Elf) -> Turn 4 (Repsol) -> Campsa -> Back Straight -> Turn 10 (La Caixa) -> Turn 12 (Sabadell) -> Turn 14 (Final Sweep)
const BARCELONA_CONTROL_POINTS = [
  new THREE.Vector3(-180, 0, 90),
  new THREE.Vector3(-150, 0, 90),
  new THREE.Vector3(-120, 2, 90),   // Turn 1
  new THREE.Vector3(-95, 3, 75),    // Turn 2
  new THREE.Vector3(-30, 4, 70),
  new THREE.Vector3(40, 5, 85),
  new THREE.Vector3(90, 4, 110),    // Turn 4
  new THREE.Vector3(125, 3, 105),
  new THREE.Vector3(145, 1, 80),
  new THREE.Vector3(140, 0, 50),
  new THREE.Vector3(110, 3, 20),
  new THREE.Vector3(120, 5, -15),
  new THREE.Vector3(145, 7, -35),
  new THREE.Vector3(170, 5, -60),
  new THREE.Vector3(140, 2, -100),  // Turn 10
  new THREE.Vector3(115, 2, -115),
  new THREE.Vector3(80, 3, -135),
  new THREE.Vector3(40, 3, -150),   // Turn 12
  new THREE.Vector3(0, 3, -145),
  new THREE.Vector3(-45, 2, -130),
  new THREE.Vector3(-80, 2, -110),  // Turn 14
  new THREE.Vector3(-130, 1, -60),
  new THREE.Vector3(-170, 0, 15),
]

export default function CircuitModel() {
  const { selectedTurn, selectTurn, playSound } = usePortfolioStore()
  const [hoveredTurn, setHoveredTurn] = useState(null)
  const pulseRef = useRef()

  // Generate smooth closed 3D Catmull-Rom spline
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(BARCELONA_CONTROL_POINTS, true, 'centripetal')
  }, [])

  // Procedural track asphalt tube geometry
  const trackGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 350, 6, 12, true)
  }, [curve])

  // Luminous inner racing line guideline
  const neonLineGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 350, 0.5, 6, true)
  }, [curve])

  // Outer boundary outline
  const outerLineGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 350, 6.4, 8, true)
  }, [curve])

  // Animate neon apex guide line glow
  useFrame((state) => {
    if (pulseRef.current) {
      pulseRef.current.emissiveIntensity = 0.8 + Math.sin(state.clock.elapsedTime * 3) * 0.4
    }
  })

  return (
    <group name="barcelona-circuit">
      {/* 1. Try to load the authentic 3D GLTF Barcelona Model with fallback */}
      <ModelErrorBoundary fallback={null}>
        <Suspense fallback={<TrackModelLoader />}>
          <BarcelonaGLTFModel />
        </Suspense>
      </ModelErrorBoundary>

      {/* 2. Procedural Asphalt Spline (Renders cleanly as base track & fallback) */}
      <mesh geometry={trackGeometry} receiveShadow castShadow>
        <meshStandardMaterial
          color="#14171d"
          roughness={0.78}
          metalness={0.2}
        />
      </mesh>

      {/* 3. Track Outer Boundary */}
      <mesh geometry={outerLineGeometry}>
        <meshBasicMaterial
          color="#334155"
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </mesh>

      {/* 4. Glowing Neon Apex Guide Line */}
      <mesh geometry={neonLineGeometry} position={[0, 0.4, 0]}>
        <meshStandardMaterial
          ref={pulseRef}
          color="#00ff87"
          emissive="#00ff87"
          emissiveIntensity={1.0}
          roughness={0.2}
        />
      </mesh>

      {/* 5. Start / Finish Gantry along Pit Straight */}
      <group position={[-165, 0, 90]}>
        <mesh position={[0, 10, 0]}>
          <boxGeometry args={[4, 20, 24]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[2.1, 14, 0]}>
          <planeGeometry args={[1, 16]} />
          <meshBasicMaterial color="#ff0055" />
        </mesh>
        <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 14]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </mesh>
      </group>

      {/* 6. Grandstands in Stadium Section */}
      <group position={[40, 0, -180]} rotation={[0, Math.PI / 8, 0]}>
        <mesh position={[0, 8, 0]}>
          <boxGeometry args={[70, 16, 20]} />
          <meshStandardMaterial color="#1f242d" metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[0, 17, 0]}>
          <boxGeometry args={[74, 2, 22]} />
          <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.2} />
        </mesh>
      </group>

      {/* 7. Pulsing Rings and Apex Beacons at Turn Locations */}
      {TURNS_DATA.map((turn) => (
        <group key={`curb-${turn.turnNumber}`} position={turn.trackPosition}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, 0]}>
            <ringGeometry args={[6, 8, 32]} />
            <meshBasicMaterial
              color={turn.color}
              transparent
              opacity={selectedTurn === turn.turnNumber ? 0.8 : 0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, 15, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 30, 8]} />
            <meshBasicMaterial
              color={turn.color}
              transparent
              opacity={selectedTurn === turn.turnNumber ? 0.9 : 0.35}
            />
          </mesh>
        </group>
      ))}

      {/* 8. 5 Glowing 3D HTML Markers for the Turns */}
      {TURNS_DATA.map((turn) => {
        const isSelected = selectedTurn === turn.turnNumber
        const isHovered = hoveredTurn === turn.turnNumber

        return (
          <Html
            key={`marker-${turn.turnNumber}`}
            position={[turn.trackPosition[0], turn.trackPosition[1] + 16, turn.trackPosition[2]]}
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
              {/* Pulsing beacon glow */}
              <div
                className="absolute -inset-3 rounded-xl animate-ping opacity-30 pointer-events-none"
                style={{ backgroundColor: turn.color }}
              />

              {/* Marker card */}
              <div
                className={`relative px-3.5 py-2 rounded-lg font-mono text-xs flex items-center gap-2.5 shadow-2xl backdrop-blur-md transition-all border ${isSelected
                  ? 'bg-black/90 text-white border-2'
                  : 'bg-black/80 text-white/90 border border-white/20 hover:border-white/50'
                  }`}
                style={{
                  borderColor: isSelected || isHovered ? turn.color : 'rgba(255,255,255,0.2)',
                  boxShadow: isSelected || isHovered ? `0 0 25px ${turn.color}88` : '0 10px 25px rgba(0,0,0,0.8)'
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
                    <span className="font-bold tracking-wider text-[11px] uppercase">
                      {turn.category}
                    </span>
                    <span className="text-[9px] px-1 rounded bg-white/10 text-white/60">
                      S{turn.sector}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/60 font-sans">
                    {turn.name}
                  </span>
                </div>

                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: turn.color }}
                />
              </div>

              {/* Indicator needle to apex */}
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

// Preload the GLTF track model so Drei starts caching it
useGLTF.preload('/models/barcelona.glb')
