export const ProfileIcon: React.FC<{color: string }> = ({
  color,
})  => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill={color}
    >
      <rect width="40" height="40" rx="5" fill={color} />
      <path
        d="M29.62 29.75H23.62L25.84 17H20.83L21.58 12.56L28.39 11H32.89L29.62 29.75ZM22.69 29.66L9.97 28.31H22.93L22.69 29.66ZM23.71 23.87L10.99 22.52H23.95L23.71 23.87ZM24.22 20.99L11.5 19.64H24.46L24.22 20.99ZM19.72 18.11L7 16.76H19.96L19.72 18.11ZM20.2 15.23L7.48 13.88H20.41L20.2 15.23ZM23.2 26.75L10.48 25.4H23.44L23.2 26.75ZM20.71 12.08L11.35 11H24.31L20.77 11.81L20.71 12.08Z"
        fill="white"
      />
    </svg>
  );
};
