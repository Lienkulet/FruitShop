import { Lato } from "next/font/google";
import Footer from "@/shared/layout/Footer";
import Header from "@/shared/layout/Header";
import { LanguageProvider } from "@/shared/i18n/LanguageProvider";
import "./globals.css";
import styles from "./layout.module.css";

const lato = Lato({
  weight: ["400", "700", "900"],
  variable: "--font-lato",
  subsets: ["latin", "cyrillic"],
});

export const metadata = {
  title: "Fruit Burst",
  description: "Fresh fruit landing page inspired by Figma design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.variable}>
        <LanguageProvider>
          <div className={styles.page} id="top">
            <div className={styles.container}>
              <Header />
              <main className={styles.main}>{children}</main>
              <Footer />
            </div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
