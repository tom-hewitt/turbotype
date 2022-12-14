import { inter } from "../../app/layout";

export const Text = ({ children }: { children: string }) => {
  return <span className={inter.className}>{children}</span>;
};
