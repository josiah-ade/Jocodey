import type { Metadata } from "next";
import ClientProviders from "./ClientProviders";
import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Jocodey Digital Agency",
    template: "%s - Jocodey Digital Agency",
  },
  description:
    "Jocodey is your trusted digital partner, specializing in web and app development, marketing, and SEO. We create innovative solutions that help your business grow online, enhance visibility, and reach its full potential.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Jocodey Digital Agency",
    description:
      "Jocodey is your trusted digital partner, specializing in web and app development, marketing, and SEO. We create innovative solutions that help your business grow online, enhance visibility, and reach its full potential.",
    url: siteUrl,
    siteName: "Jocodey",
    images: [
      {
        url: `${siteUrl}/default-og.jpg`,
        width: 1200,
        height: 630,
        alt: "Jocodey Digital Agency",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CGHXYXN6LB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CGHXYXN6LB');
          `}
        </Script>
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
