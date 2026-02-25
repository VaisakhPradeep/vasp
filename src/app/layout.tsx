import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";
import "./glitch.css";
import "@/styles/marquee.css";

export const metadata: Metadata = {
  title: "VASP Design",
  description: "VASP design system and style guide",
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
