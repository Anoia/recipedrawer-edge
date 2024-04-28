import type { Metadata } from "next";
import "./globals.css";
import Nav from "./_components/nav";
import Footer from "./_components/footer";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
export const metadata: Metadata = {
  title: "recipe-drawer",
  description: "recipes by eddy and enno",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <div className="flex flex-col h-screen w-screen">
            <Nav />
            <main className="my-12 p-5 container mx-auto max-w-3xl flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
