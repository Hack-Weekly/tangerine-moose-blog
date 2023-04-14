import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  // TODO: add more locales
  locales: ["en", "fr"],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "en",
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
