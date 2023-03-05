import {
  TransformControls,
  PivotControls,
  OrbitControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
  const cubeRef = useRef();
  const sphere = useRef();
  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={4}
        scale={100}
        fixed={true}
      >
        <mesh position-x={-2} ref={sphere}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html
            position={[1, 1, 0]}
            wrapperClass="label"
            center
            distanceFactor={8}
            //occlude={[sphere, cubeRef]}
          >
            <a target="_blank" href="https://www.google.de">
              {" "}
              <h1>That's a sphere</h1>
            </a>
          </Html>
        </mesh>
      </PivotControls>

      <mesh position-x={2} scale={1.5} ref={cubeRef}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls object={cubeRef} />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.6}
          color="greenyellow"
        />
        {/* <meshStandardMaterial color="greenyellow" /> */}
      </mesh>
      <Float speed={5} floatIntensity={2}>
        <Text
          position={[0, 2, 0]}
          font="./bangers-v20-latin-regular.woff"
          color="salmon"
          maxWidth={2}
          textAlign="center"
        >
          I love R3F
        </Text>
      </Float>
    </>
  );
}
