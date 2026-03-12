import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer/idnex";

export default async function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-7xl mx-auto h-screen">
      <Header />
      <main className="px-4 md:px-16 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
