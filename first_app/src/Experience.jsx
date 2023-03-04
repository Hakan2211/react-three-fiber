import { useFrame, extend, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CustomObject from "./CustomObject";

extend({ OrbitControls: OrbitControls });
export default function Experience() {
  const { camera, gl } = useThree();
  const boxRef = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    //boxRef.current.rotation.y += delta;
    //groupRef.current.rotation.y += delta;
    //const angle = state.clock.elapsedTime;
    //state.camera.position.x = Math.sin(angle) * 8;
    //state.camera.position.z = Math.cos(angle) * 8;
    //state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <group ref={groupRef}>
        <mesh ref={boxRef} position-x={2} scale={1.5}>
          <boxGeometry scale={1.5} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <mesh position-x={-2}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </group>

      <mesh position-y={-1.5} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="green" />
      </mesh>

      <CustomObject />
    </>
  );
}
