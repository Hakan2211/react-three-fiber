import { useGLTF, useAnimations } from "@react-three/drei";
import { useControls } from "leva";
import React from "react";

export default function Fox(props) {
  const foxModel = useGLTF("./Fox/glTF/Fox.gltf");

  const animations = useAnimations(foxModel.animations, foxModel.scene);
  const { animationName } = useControls("animations", {
    animationName: { options: animations.names },
  });
  React.useEffect(() => {
    const action = animations.actions[animationName];
    action.reset().fadeIn(0.5).play();

    return () => {
      action.fadeOut(0.5);
    };

    // window.setTimeout(() => {
    //   animations.actions.Walk.play();
    //   animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1);
    // }, 2000);

    // return () => {
    //   window.clearTimeout();
    // };
  }, [animationName]);

  return <primitive {...props} object={foxModel.scene} />;
}
