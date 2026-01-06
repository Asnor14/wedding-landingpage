import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lucas & Amelia | Wedding Invitation",
  description: "Together with their families, Lucas & Amelia joyfully invite you to celebrate their wedding on June 14, 202X.",
  keywords: ["wedding", "invitation", "Lucas", "Amelia", "celebration"],
  openGraph: {
    title: "Lucas & Amelia | Wedding Invitation",
    description: "You are cordially invited to celebrate our special day",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${playfairDisplay.variable} ${lora.variable} antialiased`}
        style={{ fontFamily: "'Lora', Georgia, serif" }}
      >
        {children}
      </body>
    </html>
  );
}
