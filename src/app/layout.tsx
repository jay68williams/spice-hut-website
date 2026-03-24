import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spice Hut — Built Different",
  description:
    "Bold flavours, premium vibes. 8 locations across the North East. Smash burgers, loaded fries, and food that hits different.",
  openGraph: {
    title: "Spice Hut — Built Different",
    description:
      "Bold flavours, premium vibes. 8 locations across the North East.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
