import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "جهاز قاتل البعوض الأصلي في الجزائر - اطلبه الآن | Mosquito Killer DZ",
  description:
    "اطلب الآن جهاز قاتل البعوض الأصلي من خلال موقعنا الرسمي. توصيل سريع لجميع ولايات الجزائر والدفع عند الاستلام. احمِ عائلتك من لسعات البعوض! 🇩🇿🦟",
  keywords: [
    "جهاز قاتل البعوض",
    "مكافحة الحشرات",
    "mosquito killer",
    "طلب جهاز قاتل البعوض",
    "توصيل مجاني",
    "الدفع عند الاستلام",
    "التوصيل في الجزائر",
    "الطلب من الانترنت الجزائر",
  ],
  applicationName: "Mosquito Killer DZ",
  authors: [{ name: "Homeesia Store", url: "https://homeesia.store" }],
  creator: "Homeesia",
  publisher: "Homeesia",
  openGraph: {
    title: "اطلب جهاز قاتل البعوض الأصلي الآن في الجزائر - Homeesia",
    description:
      "احصل على جهاز قاتل البعوض بفعالية عالية. اطلب الآن والدفع عند الاستلام مع توصيل لكل الولايات.",
    url: "https://homeesia.store",
    siteName: "Homeesia Store",
    locale: "ar_DZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "جهاز قاتل البعوض - اطلب الآن",
    description:
      "جهاز فعال للقضاء على البعوض 🦟. اطلب الآن مع خدمة التوصيل لكل الولايات والدفع عند الاستلام.",
    creator: "@homeesia_dz",
  },
  alternates: {
    canonical: "https://homeesia.store/mosquito-killer",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
