import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";
import Footer from "@/components/footer";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StreetCrisis Store",
  description: "StreetWear Brand For The Dreamers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <ModalProvider />
        <ToastProvider />
        {children}
        <Footer />
      </body>
    </html>
  );
}
