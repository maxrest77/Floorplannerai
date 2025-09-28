import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Workflow from "../components/Workflow";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <Workflow />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
}