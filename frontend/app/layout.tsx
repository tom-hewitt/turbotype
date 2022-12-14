import "../styles/globals.css";

import { Anton } from "@next/font/google";
import { Inter } from "@next/font/google";

export const anton = Anton({ weight: "400", subsets: ["latin"] });
export const inter = Inter({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  );
}
