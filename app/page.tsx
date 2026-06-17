import HeroSlider from "@/app/components/home/HeroSlider";
import TechStackStrip from "@/app/components/home/TechStackStrip";
import InstitutionalServices from "@/app/components/home/InstitutionalServices";
import LatestNews from "@/app/components/home/LatestNews";
import Testimonials from "@/app/components/home/Testimonials";
import FeaturedProjects from "@/app/components/home/FeaturedProjects";

export default function HomePage() {
  return (
    <main className="bg-white overflow-x-hidden">
      <HeroSlider />
      <TechStackStrip />
      <InstitutionalServices />
      <FeaturedProjects />
      <LatestNews />
      <Testimonials />
    </main>
  );
}