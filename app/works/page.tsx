import { Navbar } from "@/components/site/navbar";
import { WorksHero } from "@/components/site/works-hero";
import { FeaturedProject } from "@/components/site/featured-project";
import { ProjectsGrid } from "@/components/site/projects-grid";
import { WorksCTA } from "@/components/site/works-cta";

export default function WorksPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <WorksHero />
        <FeaturedProject />
        <ProjectsGrid />
        <WorksCTA />
      </main>
    </>
  );
}
