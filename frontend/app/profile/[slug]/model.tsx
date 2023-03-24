"use client";

import { Html } from "@react-three/drei";
import { RaceCar } from "../../../components/models/racecar";
import { ProfileIcon } from "../../../components/profileIcon";

export const Model: React.FC = () => {
  return (
    <>
      <RaceCar rotation={[0.4, -3.5, 0]} scale={2.3} />
      {/* <Html occlude>
        <ProfileIcon />
      </Html> */}
    </>
  );
};
