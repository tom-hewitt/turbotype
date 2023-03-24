"use client";

import { Canvas } from "@react-three/fiber"

export const Model: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <Canvas>{children}<pointLight position={[10, 10, 10]} /></Canvas>
}