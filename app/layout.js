import {instrument_sans} from "@/fonts/instrument_sans";
import "./globals.css";
import Navbar from "@/components/Navbar";


export const metadata = {
  title: "Built @ UW",
  description: "Startups Built at the University of Washington",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={instrument_sans.className + " border-4 rounded-lg border-purple-500 min-h-screen"}>
        <Navbar />
        {children}
      </body>   </html>
  );
}
