import type { Metadata } from "next";

import "./styles.css";

export const metadata: Metadata = {
  title: "Technical Candidate Starter",
  description: "A deliberately small candidate starter repository.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
