import type { Metadata } from "next";
import { DirectionProvider } from "@/components/direction-provider";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/500.css";
import "@fontsource/vazirmatn/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "گروه اردیبهشت | Ordibehesht-Group", template: "%s | گروه اردیبهشت" },
  description: "وب‌سایت رسمی گروه اردیبهشت",
  applicationName: "Ordibehesht-Group",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className="h-full antialiased">
      <body className="min-h-full font-sans">
        <DirectionProvider>{children}</DirectionProvider>
      </body>
    </html>
  );
}
