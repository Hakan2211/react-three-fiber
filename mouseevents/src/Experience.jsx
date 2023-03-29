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
  SSR,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchEffect, GlitchMode } from "postprocessing";
import { useControls } from "leva";
import Drunk from "./Drunk";

export default function Experience() {
  const cube = useRef();
  const drunkRef = useRef();

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  function eventHandler(e) {
    cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);
  }

  const ssrProps = useControls({
    temporalResolve: true,
    STRETCH_MISSED_RAYS: true,
    USE_MRT: true,
    USE_NORMALMAP: true,
    USE_ROUGHNESSMAP: true,
    ENABLE_JITTERING: true,
    ENABLE_BLUR: true,
    temporalResolveMix: { value: 0.9, min: 0, max: 1 },
    temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
    maxSamples: { value: 0, min: 0, max: 1 },
    resolutionScale: { value: 1, min: 0, max: 1 },
    blurMix: { value: 0.5, min: 0, max: 1 },
    blurKernelSize: { value: 8, min: 0, max: 8 },
    blurSharpness: { value: 0.5, min: 0, max: 1 },
    rayStep: { value: 0.3, min: 0, max: 1 },
    intensity: { value: 1, min: 0, max: 5 },
    maxRoughness: { value: 0.1, min: 0, max: 1 },
    jitter: { value: 0.7, min: 0, max: 5 },
    jitterSpread: { value: 0.45, min: 0, max: 1 },
    jitterRough: { value: 0.1, min: 0, max: 1 },
    roughnessFadeOut: { value: 1, min: 0, max: 1 },
    rayFadeOut: { value: 0, min: 0, max: 1 },
    MAX_STEPS: { value: 20, min: 0, max: 20 },
    NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
    maxDepthDifference: { value: 3, min: 0, max: 10 },
    maxDepth: { value: 1, min: 0, max: 1 },
    thickness: { value: 10, min: 0, max: 10 },
    ior: { value: 1.45, min: 0, max: 2 },
  });

  const drunkProps = useControls("Drunk Effect", {
    frequency: { value: 2, min: 0, max: 20, step: 0.01 },
    amplitude: { value: 0.1, min: 0, max: 1 },
  });

  return (
    <>
      <color args={["white"]} attach="background" />
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
        {/* <SSR {...ssrProps} /> */}
        <Drunk ref={drunkRef} {...drunkProps} />
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
        <meshStandardMaterial color="black" />
      </mesh>
    </>
  );
}
