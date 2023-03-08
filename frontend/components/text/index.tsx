import { inter } from "../../app/fonts";

export const Text = ({ children }: { children: string }) => {
  return <span className={inter.className}>{children}</span>;
};
