import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "AI Resume Analyzer",
  description: "Get AI-powered feedback on your resume",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}