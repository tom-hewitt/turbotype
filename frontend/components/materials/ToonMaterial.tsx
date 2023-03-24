export const ToonMaterial: React.FC<{ color: string }> = ({ color }) => {
  // const gradientMap = useTexture("threeTone.jpg");

  // console.log(gradientMap);

  return (
    <meshToonMaterial
      attach="material"
      color={color}
      // gradientMap={gradientMap}
    />
  );
};
