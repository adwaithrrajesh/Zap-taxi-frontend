'use client'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useRef, useEffect } from 'react'
import { Group, Vector3 } from 'three'

function Car() {
  const { scene } = useGLTF('/assets/glb/car.glb')
  const carRef = useRef<Group>(null)

  // Increased car size
  const scale = 1.2 // Default size increased

  return <primitive ref={carRef} object={scene} scale={scale} position={[0, -0.6, 0]} />
}

function FixedCamera() {
  const { camera } = useThree()

  useEffect(() => {
    const fixedPosition = new Vector3(2, 1.2, 5) // Define inside useEffect
    camera.position.copy(fixedPosition)
    camera.lookAt(0, 0, 0)
  }, [camera]) // Only `camera` in dependencies

  return null
}

export default function CarModel() {
  return (
    <Canvas camera={{ position: [2, 1.2, 5], fov: 50 }}>
      <FixedCamera />
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 2]} intensity={1.2} />
      <Suspense fallback={null}>
        <Car />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}
