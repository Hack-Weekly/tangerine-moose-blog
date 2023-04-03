import "./globals.css";

export const metadata = {
  title: "Tangerine Moose Blog App",
  description: "Blog app engineered by the Tangerine Moose team",
  author: "Tangerine Moose Team",
  charSet: "utf-8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
