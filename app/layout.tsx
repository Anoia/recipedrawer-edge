import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import Nav from "./_components/nav";
import Footer from "./_components/footer";

const roboto = Roboto_Flex({ subsets: ["latin"] });

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
      <body className={roboto.className}>
        <div className="flex flex-col h-screen w-screen">
          <Nav />
          <main className="flex-grow grid grid-cols-1 container mx-auto">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
