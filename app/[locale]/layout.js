import "../globals.css";
import { Cabin } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, useLocale } from "next-intl";

import Navbar from "@/components/Navbar/Navbar";
import { AuthProvider } from "@/providers/AuthProvider";

export const metadata = {
  title: "Tangerine Moose Blog App",
  description: "Blog app engineered by the Tangerine Moose team",
  author: "Tangerine Moose Team",
  charSet: "utf-8",
};

const cabin = Cabin({ subsets: ["latin"] });

export default async function LocaleLayout({ children, params }) {
  const locale = useLocale();
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  // if (params.locale !== locale) {
  //   notFound();
  // }

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
