import { Navbar } from "@/components/site/navbar";
import { HeroProfileSection } from "@/components/site/hero-profile-section";
import { FeaturedProjects } from "@/components/site/featured-projects";
import { AboutTimeline } from "@/components/site/about-timeline";
import { ServicesSection } from "@/components/site/services-section";
import { ContactSection } from "@/components/site/contact-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroProfileSection />
        <FeaturedProjects />
        <AboutTimeline />
        <ServicesSection />
        <ContactSection />
      </main>
    </>
  );
}
