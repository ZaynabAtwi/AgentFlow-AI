import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgentFlow AI",
  description: "AI Agency Operating System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
