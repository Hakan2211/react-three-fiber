import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { useGLTF, Clone } from "@react-three/drei";

export default function Model() {
  //   const model = useLoader(GLTFLoader, "./hamburger.glb", (loader) => {
  //     const dracoLoader = new DRACOLoader();
  //     dracoLoader.setDecoderPath("./draco/");
  //     loader.setDRACOLoader(dracoLoader);
  //   });

  const model = useGLTF("./hamburger-draco.glb");
  return (
    <>
      <Clone object={model.scene} scale={0.35} position={[-4, -1, 1]} />
      ;
      <Clone object={model.scene} scale={0.35} position={[0, -1, 1]} />
      ;
      <Clone object={model.scene} scale={0.35} position={[4, -1, 1]} />;
    </>
  );
}

useGLTF.preload("./hamburger-draco.glb");
