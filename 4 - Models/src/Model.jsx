import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MeshStandardMaterial } from "three";
import { useState } from "react";

export function Model(props) {
  const gb = useRef();
  const { nodes, materials } = useGLTF("/gameboy.glb");
  const texture = useTexture("/n.jpg");

  const [emissive, setEmissive] = useState(0);

  useFrame((state) => {
    const { position, rotation } = gb.current;
    const sin = Math.sin(state.clock.elapsedTime) / 550;
    position.y += sin;
    rotation.x += sin / 5;
    rotation.y += sin / 5;
    rotation.z += sin / 5;
    if (emissive < 4) {
      setEmissive((e) => e + 0.01);
    }
  });

  const materialScreen = new MeshStandardMaterial({
    color: "green",
    emissiveIntensity: emissive,
    emissive: "green",
    emissiveMap: texture,
  });

  return (
    <group ref={gb} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.D_Pad_Button.geometry}
        material={materials.D_Pad}
        position={[-0.391, -0.299, 0.264]}
      />
      <group position={[0, 0.564, -0.168]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004.geometry}
          material={materials.Screen_Grey}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004_1.geometry}
          material={materialScreen}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.D_Pad_Bump.geometry}
        material={materials.D_Pad}
        position={[-0.391, -0.299, 0.264]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials.Gameboy}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002_1.geometry}
        material={materials.A_B_Button}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002_2.geometry}
        material={materials.Select_Start_Button}
      />
    </group>
  );
}

useGLTF.preload("/gameboy.glb");
