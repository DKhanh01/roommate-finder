import "./globals.css";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ReactQueryProvider>
          <Navbar />
          <div className="pt-16">
            {children}
          </div>
          </ReactQueryProvider>
          </AuthProvider>
      </body>
    </html>
  );
}
