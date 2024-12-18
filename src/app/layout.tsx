import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Snake Game",
  description: "A Snake Game built with React, nextjs and pixi.js (Good old nokia snake game)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
