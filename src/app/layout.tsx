import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";
import "./glitch.css";
import "@/styles/marquee.css";

const favicons = "/images/favicons";

export const metadata: Metadata = {
  title: "VASP Design",
  description: "VASP design system and style guide",
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
