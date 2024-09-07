import "./globals.css";

export const metadata = {
  title: "GitHub Finder",
  description: "GitHub foydalanuvchilarini qidirish va ko'rish",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
