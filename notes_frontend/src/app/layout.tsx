import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Note Keeper",
  description: "Create, view, edit, and delete notes with a minimal UI.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[--background] text-[--secondary]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
