import { Cabin } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, createTranslator, useLocale } from "next-intl";

import Navbar from "@/components/Navbar/Navbar";
import { AuthProvider } from "@/providers/AuthProvider";
import "../globals.css";

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    author: t("metadata.author"),
    charSet: t("metadata.charSet"),
    icons: {
      icon: "/favicon.ico",
    },
  };
}

const cabin = Cabin({ subsets: ["latin"] });

export default async function LocaleLayout({ children, params }) {
  const locale = useLocale();
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={cabin.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
