import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "Дмитрий Жиляков — дизайнер интерьеров",
  description:
    "Портфолио Дмитрия Жилякова: интерьеры премиум-класса в эстетике осознанного минимализма и сдержанного благородства.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={montserrat.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
