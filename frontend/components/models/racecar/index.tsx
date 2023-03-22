"use client";

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 race.glb --transform --types
*/

import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Mesh_body: THREE.Mesh;
    Mesh_body_1: THREE.Mesh;
    Mesh_body_2: THREE.Mesh;
    Mesh_body_3: THREE.Mesh;
    Mesh_wheel_frontLeft: THREE.Mesh;
    Mesh_wheel_frontLeft_1: THREE.Mesh;
    Mesh_wheel_frontLeft_2: THREE.Mesh;
  };
  materials: {
    paintRed: THREE.MeshStandardMaterial;
    plastic: THREE.MeshStandardMaterial;
    window: THREE.MeshStandardMaterial;
    _defaultMat: THREE.MeshStandardMaterial;
    carTire: THREE.MeshStandardMaterial;
    paintYellow: THREE.MeshStandardMaterial;
  };
};

export function RaceCar(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/race-transformed.glb"
  ) as unknown as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.1, 0]}>
        <mesh
          geometry={nodes.Mesh_body.geometry}
          material={materials.paintRed}
        />
        <mesh
          geometry={nodes.Mesh_body_1.geometry}
          material={materials.plastic}
        />
        <mesh
          geometry={nodes.Mesh_body_2.geometry}
          material={materials.window}
        />
        <mesh
          geometry={nodes.Mesh_body_3.geometry}
          material={materials._defaultMat}
        />
      </group>
      <group position={[-0.35, 0.3, 0.88]} rotation={[-Math.PI, 0, -Math.PI]}>
        <mesh
          geometry={nodes.Mesh_wheel_frontLeft.geometry}
          material={materials.carTire}
        />
        <mesh
          geometry={nodes.Mesh_wheel_frontLeft_1.geometry}
          material={materials.plastic}
        />
        <mesh
          geometry={nodes.Mesh_wheel_frontLeft_2.geometry}
          material={materials.paintYellow}
        />
      </group>
      <group position={[0.35, 0.3, 0.88]}>
        <mesh
          geometry={nodes.Mesh_wheel_frontLeft.geometry}
          material={materials.carTire}
        />
        <mesh
          geometry={nodes.Mesh_wheel_frontLeft_1.geometry}
          material={materials.plastic}
        />
        <mesh
          geometry={nodes.Mesh_wheel_frontLeft_2.geometry}
          material={materials.paintYellow}
        />
      </group>
      <group position={[-0.35, 0.3, -0.64]} rotation={[-Math.PI, 0, -Math.PI]}>
        <mesh
          geometry={nodes.Mesh_wheel_frontLeft.geometry}
          material={materials.carTire}
        />
        <mesh
          geometry={nodes.Mesh_wheel_frontLeft_1.geometry}
          material={materials.plastic}
        />
        <mesh
          geometry={nodes.Mesh_wheel_frontLeft_2.geometry}
          material={materials.paintYellow}
        />
      </group>
      <group position={[0.35, 0.3, -0.64]}>
        <mesh
          geometry={nodes.Mesh_wheel_frontLeft.geometry}
          material={materials.carTire}
        />
        <mesh
          geometry={nodes.Mesh_wheel_frontLeft_1.geometry}
          material={materials.plastic}
        />
        <mesh
          geometry={nodes.Mesh_wheel_frontLeft_2.geometry}
          material={materials.paintYellow}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/race-transformed.glb");
