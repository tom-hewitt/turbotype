/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 frontend/components/models/crown/crown.glb --transform --types
*/
"use client"

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { ToonMaterial } from "../../materials/ToonMaterial";

type GLTFResult = GLTF & {
  nodes: {
    Circle032: THREE.Mesh;
    Circle032_1: THREE.Mesh;
  };
  materials: {
    ["Premium Golden"]: THREE.MeshStandardMaterial;
    ["Color - Gem"]: THREE.MeshPhysicalMaterial;
  };
};

type ActionName = "Circle.009Action";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export function Crown(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(
    "/crown-transformed.glb"
  ) as GLTFResult;
  const { actions } = useAnimations<GLTFActions>(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Circle009" position={[0, -0.63, -0.06]}>
          <mesh
            name="Circle032"
            geometry={nodes.Circle032.geometry}
            // material={materials["Premium Golden"]}
          >
            <ToonMaterial color="#bf8221" />
          </mesh>
          <mesh
            name="Circle032_1"
            geometry={nodes.Circle032_1.geometry}
            // material={materials["Color - Gem"]}
          >
            <ToonMaterial color="#8c0303" />
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/crown-transformed.glb");
