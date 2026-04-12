import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer/idnex";

export default async function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl">
      <Header />
      <main className="px-4 pt-16 md:px-16">{children}</main>
      <Footer />
    </div>
  );
}
