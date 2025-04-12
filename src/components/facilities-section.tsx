import { useState } from "react";
import Image from "./image";
import {
  Printer,
  Cpu,
  Microscope,
  Cog,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Facility type
type Facility = {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  capabilities: string[];
};

// Technology type
type Technology = {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
};

// Sample facilities data
const facilities: Facility[] = [
  {
    id: "1",
    name: "Main Production Facility",
    location: "San Francisco, CA",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=600&width=800",
    description:
      "Our flagship facility houses our most advanced 3D printing equipment, including industrial SLS, SLA, and metal printing systems.",
    capabilities: [
      "Metal Printing",
      "SLS",
      "SLA",
      "FDM",
      "Material Development",
    ],
  },
  {
    id: "2",
    name: "East Coast Production Center",
    location: "Boston, MA",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=600&width=800",
    description:
      "Specializing in high-volume production and medical device applications, our Boston facility serves clients throughout the eastern United States.",
    capabilities: [
      "Medical Grade Printing",
      "High Volume Production",
      "FDM",
      "SLA",
    ],
  },
  {
    id: "3",
    name: "Midwest Manufacturing Hub",
    location: "Chicago, IL",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=600&width=800",
    description:
      "Our Chicago facility focuses on automotive and industrial applications, with specialized equipment for large-format printing.",
    capabilities: [
      "Large Format Printing",
      "Automotive Parts",
      "Industrial Applications",
      "FDM",
    ],
  },
  {
    id: "4",
    name: "Research & Development Center",
    location: "Austin, TX",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=600&width=800",
    description:
      "Our R&D center is where we develop new materials, test emerging technologies, and refine our printing processes.",
    capabilities: [
      "Material Research",
      "Process Development",
      "Quality Testing",
      "Prototyping",
    ],
  },
];

// Sample technologies data
const technologies: Technology[] = [
  {
    id: "1",
    name: "Industrial SLS Systems",
    description:
      "Our Selective Laser Sintering systems create durable, functional parts from a variety of polymer powders, ideal for end-use applications.",
    icon: "printer",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    name: "Direct Metal Printing",
    description:
      "Our metal printing technology produces high-strength, complex metal parts for aerospace, medical, and industrial applications.",
    icon: "cog",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    name: "High-Resolution SLA",
    description:
      "Our stereolithography systems create ultra-detailed parts with smooth surface finishes, perfect for visual prototypes and patterns.",
    icon: "microscope",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=600",
  },
  {
    id: "4",
    name: "Advanced Material Development",
    description:
      "Our materials lab develops and tests custom materials with specific properties for specialized applications.",
    icon: "cpu",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=600",
  },
];

export default function FacilitiesSection() {
  const [activeFacility, setActiveFacility] = useState(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "printer":
        return <Printer className="h-6 w-6" />;
      case "cog":
        return <Cog className="h-6 w-6" />;
      case "microscope":
        return <Microscope className="h-6 w-6" />;
      case "cpu":
        return <Cpu className="h-6 w-6" />;
      default:
        return <Printer className="h-6 w-6" />;
    }
  };

  const nextFacility = () => {
    setActiveFacility((prev) => (prev + 1) % facilities.length);
  };

  const prevFacility = () => {
    setActiveFacility(
      (prev) => (prev - 1 + facilities.length) % facilities.length
    );
  };

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">
          Our Facilities & Technology
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          We operate state-of-the-art production facilities across the country,
          equipped with the latest 3D printing technology.
        </p>
      </div>

      {/* Facilities Slider */}
      <div className="mb-16">
        <div className="relative">
          <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
            <Image
              src={facilities[activeFacility].image || "/placeholder.svg"}
              alt={facilities[activeFacility].name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#263238] to-transparent opacity-70"></div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  {facilities[activeFacility].location}
                </Badge>
              </div>

              <h3 className="text-white font-bold text-2xl mb-2">
                {facilities[activeFacility].name}
              </h3>
              <p className="text-white/70 mb-4 max-w-2xl">
                {facilities[activeFacility].description}
              </p>

              <div className="flex flex-wrap gap-2">
                {facilities[activeFacility].capabilities.map(
                  (capability, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-white/20 text-white/70"
                    >
                      {capability}
                    </Badge>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 border-white/10 text-white hover:bg-black/70 z-10"
            onClick={prevFacility}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 border-white/10 text-white hover:bg-black/70 z-10"
            onClick={nextFacility}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next</span>
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-4 gap-2">
            {facilities.map((_, i) => (
              <button
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === activeFacility ? "w-6 bg-primary" : "w-2 bg-white/20"
                }`}
                onClick={() => setActiveFacility(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Technologies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {technologies.map((tech) => (
          <Card
            key={tech.id}
            className="bg-[#1A2327] border-white/10 overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
              <div className="relative h-full min-h-[160px] sm:h-auto">
                <Image
                  src={tech.image || "/placeholder.svg"}
                  alt={tech.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="sm:col-span-2 p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 text-primary">
                  {getIcon(tech.icon)}
                </div>
                <h3 className="text-white font-bold text-xl mb-2">
                  {tech.name}
                </h3>
                <p className="text-white/70">{tech.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
