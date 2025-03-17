import { Header } from "@/components/homeComponent/Header";
import { Footer } from "@/components/homeComponent/Footer";

export default function TreatmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <section className="">{children}</section>
      <Footer />
    </>
  );
}
