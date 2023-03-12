import { useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
} from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls } from "leva";

// softShadows({
//   frustum: 3.75,
//   size: 0.005,
//   near: 9.5,
//   samples: 17,
//   rings: 11,
// });

export default function Experience() {
  const cube = useRef();
  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  useFrame((state, delta) => {
    // const time = state.clock.elapsedTime;
    //cube.current.position.x = 2 + Math.sin(time);
    cube.current.rotation.y += delta * 0.2;
  });

  const { color, opacity, blur } = useControls("contact shadows", {
    color: "#000000",
    opacity: { value: 0.5, min: 0, max: 10 },
    blur: { value: 0.5, min: 0, max: 10 },
  });

  const { sunPosition } = useControls("sun position", {
    sunPosition: { value: [1, 2, 3] },
  });

  return (
    <>
      {/* <SoftShadows
        samples={17}
        rings={11}
        size={35}
        frustum={3.75}
        near={9.5}
      /> */}
      ;{/* <BakeShadows /> */}
      <color args={["lightblue"]} attach="background" />
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <Sky sunPosition={sunPosition} />
      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        <RandomizedLight
          position={[1, 2, 3]}
          amount={8}
          radius={1}
          intensity={1}
          ambient={0.5}
          bias={0.001}
        />
      </AccumulativeShadows> */}
      <ContactShadows
        position={[0, -0.99, 0]}
        resolution={512}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        frames={1}
      />
      <directionalLight
        position={sunPosition}
        intensity={1.5}
        ref={directionalLight}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-bottom={-5}
        shadow-camera-far={10}
        shadow-camera-near={1}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
      />
      <ambientLight intensity={0.5} />
      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh castShadow ref={cube} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
