import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import CursorDot from "./components/ui/CursorDot";

export const metadata: Metadata = {
  title: "SIS | ICT Services",
  description:
    "Websites, applications, desktop systems, and part-time ICT teaching for schools and communities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Floating cursor dot (non-blocking) */}
        <CursorDot />

        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
