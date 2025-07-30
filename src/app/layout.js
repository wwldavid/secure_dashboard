import "./globals.css";

export const metadata = {
  title: "secure dashbaord",
  description: "A simple Next.js layout",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
