import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";
import "./glitch.css";
import "@/styles/marquee.css";

const favicons = "/images/favicons";
const ogImage = "/images/zen_garden.png";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vasp.design";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Vaisakh Pradeep",
  description: "Personal website of Vaisakh Pradeep",
  openGraph: {
    title: "Vaisakh Pradeep",
    description: "Personal website of Vaisakh Pradeep",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 800,
        alt: "Serene Japanese garden with torii gate, pond, and bamboo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaisakh Pradeep",
    description: "Personal website of Vaisakh Pradeep",
    images: [ogImage],
  },
  icons: {
    icon: [
      { url: `${favicons}/favicon-32x32.png`, sizes: "32x32", type: "image/png" },
      { url: `${favicons}/favicon-16x16.png`, sizes: "16x16", type: "image/png" },
    ],
    apple: `${favicons}/apple-touch-icon.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        <ThemeProvider>
          <div
            className="bg-background text-foreground flex min-h-screen flex-col
              font-sans"
          >
            <Navbar />
            <main
              className="max-w-page border-border mx-auto h-full w-full flex-1
                border-r border-l"
            >
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
