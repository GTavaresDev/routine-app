import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Routine App Architecture",
  description: "Independent initial architecture for Routine App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
