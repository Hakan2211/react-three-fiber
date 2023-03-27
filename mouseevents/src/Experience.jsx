import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import {
  EffectComposer,
  Vignette,
  Glitch,
  Noise,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchEffect, GlitchMode } from "postprocessing";

export default function Experience() {
  const cube = useRef();

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  function eventHandler(e) {
    cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);
  }

  return (
    <>
      <color args={["#000"]} attach="background" />
      <EffectComposer>
        {/* <Vignette
          offset={0.3}
          darkness={0.9}
          blendFunction={BlendFunction.Normal}
        /> */}
        {/* <Glitch
          delay={[0.5, 1]}
          duration={[0.1, 0.3]}
          strength={[0.2, 0.4]}
          mode={GlitchMode.SPORADIC}
        /> */}
        {/* <Noise blendFunction={BlendFunction.OVERLAY} premultiply /> */}
        {/* <Bloom intensity={1.0} luminanceThreshold={0.9} mipmapBlur /> */}
        {/* <DepthOfField
          focusDistance={0.025}
          foucsLength={0.025}
          bokehScale={6}
        /> */}
      </EffectComposer>

      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position-x={-2} onClick={(e) => e.stopPropagation()}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh ref={cube} position-x={2} scale={1.5} onClick={eventHandler}>
        <boxGeometry />
        <meshStandardMaterial
          color="purple"
          // emissive="skyblue"
          // emissiveIntensity={2}
          // toneMapped={false}
        />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
