import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ContainersStack from "@/components/ContainersStack";
import HowItWorks from "@/components/HowItWorks";
import WhyUs from "@/components/WhyUs";
import Reviews from "@/components/Reviews";
import ContactForm from "@/components/ContactForm";
import Guarantee from "@/components/Guarantee";
import Contacts from "@/components/Contacts";
import StickyCallBar from "@/components/StickyCallBar";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ContainersStack />
        <HowItWorks />
        <WhyUs />
        <Reviews />
        <ContactForm />
        <Guarantee />
        <Contacts />
      </main>
      <StickyCallBar />
    </>
  );
}
