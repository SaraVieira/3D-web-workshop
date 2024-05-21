import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Backdrop,
  ContactShadows,
  Environment,
  OrbitControls,
} from "@react-three/drei";

function Box(props) {
  const meshRef = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(
    (state) => (meshRef.current.rotation.x = state.clock.getElapsedTime() * 2)
  );

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <torusGeometry args={[1, 0.5, 20]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

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
      <Backdrop floor={1} position={[0, -3, -2]} scale={[80, 40, 20]}>
        <meshStandardMaterial color="#353540" />
      </Backdrop>

      <Box position={[0, 0, 0]} />
      <OrbitControls />
    </Canvas>
  );
};
