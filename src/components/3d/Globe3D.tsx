import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface GlobeProps {
  speed?: number;
  distortion?: number;
  scale?: number;
}

const GlobeMesh: React.FC<GlobeProps> = ({ 
  speed = 0.5, 
  distortion = 0.4, 
  scale = 1 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * speed;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, 'rgba(147, 51, 234, 0.8)');
    gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.4)');
    gradient.addColorStop(1, 'rgba(147, 51, 234, 0.1)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={scale}>
      <MeshDistortMaterial
        map={gradientTexture}
        distort={distortion}
        speed={2}
        transparent
        opacity={0.3}
        color="#8b5cf6"
      />
    </Sphere>
  );
};

const Globe3D: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <GlobeMesh speed={0.3} distortion={0.3} scale={2} />
        
        {/* Additional floating elements */}
        <group position={[3, 2, 0]}>
          <Sphere args={[0.1, 16, 16]}>
            <meshStandardMaterial 
              color="#3b82f6" 
              transparent 
              opacity={0.6}
            />
          </Sphere>
        </group>
        
        <group position={[-2, -1, 1]}>
          <Sphere args={[0.05, 16, 16]}>
            <meshStandardMaterial 
              color="#8b5cf6" 
              transparent 
              opacity={0.8}
            />
          </Sphere>
        </group>
        
        <group position={[1, -2, -1]}>
          <Sphere args={[0.08, 16, 16]}>
            <meshStandardMaterial 
              color="#06b6d4" 
              transparent 
              opacity={0.7}
            />
          </Sphere>
        </group>
      </Canvas>
    </div>
  );
};

export default Globe3D;
