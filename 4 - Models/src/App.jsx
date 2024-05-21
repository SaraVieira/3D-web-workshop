import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Backdrop,
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import { Model } from "./Model";

export const Scene = () => {
  return (
    <Canvas>
      <Environment preset="dawn" />
      <ContactShadows
        opacity={0.3}
        scale={10}
        blur={1}
        far={10}
        resolution={256}
        position={[0, -2, 0]}
        color="#000000"
      />
      <Backdrop floor={1} position={[0, -3, -1]} scale={[80, 40, 20]}>
        <meshStandardMaterial color="#353540" />
      </Backdrop>

      <Model position={[0, 0, 0]} scale={1.6} />
      <OrbitControls />
    </Canvas>
  );
};
