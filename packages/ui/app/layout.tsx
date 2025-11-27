import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChildProvider } from "@/contexts/ChildContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "TwinklePod - Personalized Stories for Kids",
  description: "Every child is the hero of their own adventure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <ChildProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ChildProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
