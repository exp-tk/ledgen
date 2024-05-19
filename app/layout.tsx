import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "./provider";

const myFont = localFont({
  src: "./fonts/JF-Dot-jiskan24.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LED Generator",
  description: "LED Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={myFont.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
