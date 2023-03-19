import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense } from "react";
import Fox from "./Fox";
import Hamburger from "./Hamburger";
import Model from "./Model";
import Placeholder from "./Placeholder";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
        shadow-normalBias={0.4}
      />
      <ambientLight intensity={0.5} />

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <Suspense
        fallback={<Placeholder position={[0, 0.5, 0]} scale={[2, 3, 2]} />}
      >
        <Hamburger scale={0.35} />
      </Suspense>

      <Suspense
        fallback={<Placeholder position={[-4, 0.5, 2]} scale={[2, 3, 2]} />}
      >
        <Fox scale={0.05} position={[-4, 0.5, 2]} rotation-y={0.3} />
      </Suspense>
    </>
  );
}
