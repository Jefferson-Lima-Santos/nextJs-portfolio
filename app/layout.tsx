'use client';
// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/src/components/header";
import { ThemeProvider } from "@mui/material";
import { createTheme } from '@/src/theme';
import { SettingsConsumer, SettingsProvider } from "@/src/contexts/settings";
import '@/src/locales/i18n';
import Footer from "@/src/components/footer";
import { ApolloProvider } from "@apollo/client";
import create from "@/src/libs";
import { Toaster } from "@/src/components/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const apolloClient = create();
  return (
    <html lang="pt-BR">
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <meta name="description" content="Esse site é um portfólio." />
      <ApolloProvider client={apolloClient}>
        <SettingsProvider>
          <SettingsConsumer>
            {(settings) => {
              // Prevent theme flicker when restoring custom settings from browser storage
              if (!settings.isInitialized) {
                // return null;
              }

              const theme = createTheme({
                colorPreset: settings.colorPreset,
                contrast: settings.contrast,
                direction: settings.direction,
                paletteMode: settings.paletteMode,
                responsiveFontSizes: settings.responsiveFontSizes
              });

              return (
                <ThemeProvider theme={theme}>
                  <body className={`${geistSans.variable} ${geistMono.variable}`}>
                    <Header />
                    {children}
                    <Footer />
                    <Toaster />
                  </body>
                </ThemeProvider>
              );
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </ApolloProvider>
    </html >
  );
}
