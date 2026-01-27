import HeroSlider from "../components/HeroSlider";
import { services } from "../data/service";
import { Service } from "../types/service";
import Card from "../components/ui/Card";

export default function ServicesPage() {
  const heroImages = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Slider with text overlay */}
      <HeroSlider
        images={heroImages}
        overlay={true}
        title="Professional Services Tailored for You"
        subtitle="Explore our wide range of services designed to help your business grow and succeed. Quality, reliability, and excellence are guaranteed."
      />

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">
          Our Services
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: Service) => (
            <Card
              key={service.slug}
              className="h-full p-6 transition-transform transform hover:-translate-y-2 hover:shadow-xl"
            >
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
              <span className="mt-4 inline-block text-indigo-600 font-medium hover:underline">
                Learn more →
              </span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
