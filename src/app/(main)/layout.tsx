import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
        {children}
      </main>
      <Footer />
    </>
  );
}
