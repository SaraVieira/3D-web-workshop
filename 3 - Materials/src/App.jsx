import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Backdrop,
  ContactShadows,
  Environment,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import { MeshPhysicalMaterial } from "three";

function Box(props) {
  const meshRef = useRef();

  const color = useTexture(
    "/Stylized_Fur_002_SD/Stylized_Fur_002_basecolor.jpg"
  );

  const normal = useTexture("/Stylized_Fur_002_SD/Stylized_Fur_002_normal.jpg");

  const ao = useTexture(
    "/Stylized_Fur_002_SD/Stylized_Fur_002_ambientOcclusion.jpg"
  );
  const height = useTexture("/Stylized_Fur_002_SD/Stylized_Fur_002_height.png");
  useFrame(
    (state) => (meshRef.current.rotation.x = state.clock.getElapsedTime() * 2)
  );

  // const material = new MeshPhysicalMaterial({
  //   color: "orange",
  //   roughness: 0,
  //   transmission: 1,
  //   thickness: 0.5,
  // });

  const material = new MeshPhysicalMaterial({
    map: color,
    normalMap: normal,
    roughness: 1,
    aoMap: ao,
    displacementMap: height,
    displacementScale: 0.1,
  });

  return (
    <mesh {...props} ref={meshRef} material={material}>
      <torusGeometry args={[1, 0.5, 80, 80]} />
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
