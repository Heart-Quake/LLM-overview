import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hubble - Surveillance de visibilité IA",
  description: "Surveillez la visibilité de votre marque dans les réponses générées par les IA comme ChatGPT, Claude, Perplexity et Gemini. Analysez votre part de voix et optimisez votre présence IA.",
  keywords: ["IA", "surveillance", "marque", "visibilité", "ChatGPT", "Claude", "monitoring"],
  authors: [{ name: "Hubble Team" }],
  openGraph: {
    title: "Hubble - Surveillance de visibilité IA",
    description: "Surveillez la visibilité de votre marque dans les réponses IA",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hubble - Surveillance de visibilité IA",
    description: "Surveillez la visibilité de votre marque dans les réponses IA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
