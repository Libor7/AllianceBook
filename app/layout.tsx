/** COMPONENTS */
import CustomLayout from "./customLayout";

/** LIBRARIES */
import { type Metadata } from "next";

/** MISC */
import { CharacterProvider } from "@/app/store/characterContext";

/** STYLES */
import "./globals.css";

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
