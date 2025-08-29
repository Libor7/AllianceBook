import { type Metadata } from "next";
import "./globals.css";
import CustomLayout from "./customLayout";
import { CharacterProvider } from "@/app/store/characterContext";

export const metadata: Metadata = {
  title: "Alliance",
  description: "The Best App in the Universe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CharacterProvider>
          <CustomLayout>{children}</CustomLayout>
        </CharacterProvider>
      </body>
    </html>
  );
}
