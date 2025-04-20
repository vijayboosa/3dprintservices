import { Link } from "react-router";

import {
  Layers,
  CuboidIcon as Cube,
  Droplet,
  Hammer,
  Printer,
  Cpu,
  Cog,
  Zap,
  CheckCircle,
  ArrowRight,
  Upload,
  MessageCircle,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ServiceComparisonTable from "@/components/service-comparison-table";
import ServiceProcessSteps from "@/components/service-process-steps";
import PageHead from "@/components/page-head";

export const metadata = {
  title: "3D Printing Services - 3D PrintMaster",
  description:
    "Explore our comprehensive range of 3D printing services including FDM, SLS, SLA, and metal printing with instant quotes and fast turnaround times.",
};

export default function ServicesPage() {
  return (
    <PageHead {...metadata}>
      <main className="min-h-screen bg-[#263238] pt-24 pb-16">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,57,53,0.1),transparent_70%)]"></div>
          <div className="grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(20,1fr)] h-full w-full">
            {Array.from({ length: 800 }).map((_, i) => (
              <div
                key={i}
                className="border-[0.5px] border-primary/10"
                style={{
                  boxShadow:
                    i % 50 === 0 ? "0 0 15px rgba(229, 57, 53, 0.2)" : "none",
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
              <span className="text-primary font-medium">
                Professional 3D Printing
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              From rapid prototyping to production-ready parts, we offer a
              comprehensive range of 3D printing services to meet your specific
              needs.
            </p>
          </div>

          {/* Services Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <ServiceCard
              title="FDM Printing"
              description="Fused Deposition Modeling for cost-effective prototyping and functional parts."
              icon="layers"
              color="bg-primary"
              features={["Affordable", "Durable", "Fast turnaround"]}
              startingPrice={9.99}
            />
            <ServiceCard
              title="SLS Printing"
              description="Selective Laser Sintering for durable, functional parts with complex geometries."
              icon="cube"
              color="bg-secondary"
              features={[
                "Strong parts",
                "No supports needed",
                "Complex geometries",
              ]}
              startingPrice={19.99}
            />
            <ServiceCard
              title="Resin Printing"
              description="High-detail resin printing for smooth surfaces and intricate designs."
              icon="droplet"
              color="bg-accent"
              features={["High detail", "Smooth finish", "Precise parts"]}
              startingPrice={24.99}
            />
            <ServiceCard
              title="Metal Printing"
              description="Direct metal printing for functional prototypes and end-use parts."
              icon="hammer"
              color="bg-[#607D8B]"
              features={["High strength", "Heat resistant", "Functional parts"]}
              startingPrice={999.0}
            />
          </div>

          {/* Detailed Services Tabs */}
          <div className="mb-16">
            <Tabs defaultValue="fdm" className="w-full">
              <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 bg-[#1A2327] border-white/10 mb-8">
                <TabsTrigger
                  value="fdm"
                  className="text-white data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  FDM Printing
                </TabsTrigger>
                <TabsTrigger
                  value="sls"
                  className="text-white data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary"
                >
                  SLS Printing
                </TabsTrigger>
                <TabsTrigger
                  value="resin"
                  className="text-white data-[state=active]:bg-accent/20 data-[state=active]:text-accent"
                >
                  Resin Printing
                </TabsTrigger>
                <TabsTrigger
                  value="metal"
                  className="text-white data-[state=active]:bg-[#607D8B]/20 data-[state=active]:text-[#607D8B]"
                >
                  Metal Printing
                </TabsTrigger>
              </TabsList>

              <TabsContent value="fdm">
                <ServiceDetailCard
                  title="Fused Deposition Modeling (FDM)"
                  description="FDM is one of the most popular and cost-effective 3D printing technologies. It works by extruding thermoplastic filament layer-by-layer to build parts."
                  image="/desktop-fdm-printer.png"
                  color="primary"
                  materials={["PLA", "ABS", "PETG", "TPU", "Nylon"]}
                  applications={[
                    "Rapid Prototyping",
                    "Functional Parts",
                    "Concept Models",
                    "Manufacturing Aids",
                  ]}
                  specifications={{
                    "Build Volume": "Up to 300 x 300 x 300 mm",
                    "Layer Height": "0.1 - 0.4 mm",
                    Tolerance: "±0.1 mm",
                    "Surface Finish":
                      "Layer lines visible, can be post-processed",
                  }}
                  advantages={[
                    "Cost-effective for prototypes and small production runs",
                    "Wide range of available materials",
                    "Quick turnaround times",
                    "Good mechanical properties for functional parts",
                  ]}
                  limitations={[
                    "Visible layer lines",
                    "Limited detail compared to resin printing",
                    "May require support structures",
                    "Anisotropic strength (weaker between layers)",
                  ]}
                />
              </TabsContent>

              <TabsContent value="sls">
                <ServiceDetailCard
                  title="Selective Laser Sintering (SLS)"
                  description="SLS uses a high-powered laser to fuse small particles of polymer powder together. This technology creates strong, durable parts without the need for support structures."
                  image="/industrial-sls-printer.png"
                  color="secondary"
                  materials={[
                    "Nylon PA12",
                    "Nylon PA11",
                    "TPU",
                    "Polypropylene",
                    "Alumide",
                  ]}
                  applications={[
                    "Functional Prototypes",
                    "End-use Parts",
                    "Complex Assemblies",
                    "Aerospace Components",
                  ]}
                  specifications={{
                    "Build Volume": "Up to 380 x 380 x 550 mm",
                    "Layer Height": "0.1 mm",
                    Tolerance: "±0.3% (with a lower limit of ±0.3 mm)",
                    "Surface Finish": "Slightly grainy, can be smoothed",
                  }}
                  advantages={[
                    "No support structures needed",
                    "Excellent mechanical properties",
                    "Complex geometries possible",
                    "Isotropic strength (uniform in all directions)",
                  ]}
                  limitations={[
                    "Higher cost than FDM",
                    "Grainy surface finish",
                    "Limited color options",
                    "Longer lead times",
                  ]}
                />
              </TabsContent>

              <TabsContent value="resin">
                <ServiceDetailCard
                  title="Resin Printing (SLA/DLP)"
                  description="Resin printing uses light (either a laser or digital projector) to cure liquid photopolymer resin into solid parts. This technology offers exceptional detail and smooth surface finishes."
                  image="/desktop-resin-printer.png"
                  color="accent"
                  materials={[
                    "Standard Resin",
                    "Tough Resin",
                    "Flexible Resin",
                    "Castable Resin",
                    "Dental Resin",
                  ]}
                  applications={[
                    "Detailed Prototypes",
                    "Jewelry Casting",
                    "Dental Applications",
                    "Miniatures",
                  ]}
                  specifications={{
                    "Build Volume": "Up to 300 x 175 x 200 mm",
                    "Layer Height": "0.025 - 0.1 mm",
                    Tolerance: "±0.05 mm",
                    "Surface Finish": "Smooth, minimal layer lines",
                  }}
                  advantages={[
                    "Exceptional detail and accuracy",
                    "Smooth surface finish",
                    "Fine features and thin walls possible",
                    "Wide range of specialized materials",
                  ]}
                  limitations={[
                    "Smaller build volumes",
                    "Requires post-processing (washing and curing)",
                    "More brittle than FDM or SLS parts",
                    "UV sensitivity can cause degradation over time",
                  ]}
                />
              </TabsContent>

              <TabsContent value="metal">
                <ServiceDetailCard
                  title="Metal Printing (DMLS/SLM)"
                  description="Direct Metal Laser Sintering (DMLS) and Selective Laser Melting (SLM) use a high-powered laser to fuse metal powder particles together. These technologies create fully functional metal parts with complex geometries."
                  image="/industrial-metal-printer.png"
                  color="[#607D8B]"
                  materials={[
                    "Aluminum",
                    "Stainless Steel",
                    "Titanium",
                    "Inconel",
                    "Cobalt Chrome",
                  ]}
                  applications={[
                    "Aerospace Components",
                    "Medical Implants",
                    "Automotive Parts",
                    "Industrial Tooling",
                  ]}
                  specifications={{
                    "Build Volume": "Up to 250 x 250 x 325 mm",
                    "Layer Height": "0.02 - 0.05 mm",
                    Tolerance: "±0.1 mm",
                    "Surface Finish":
                      "As-printed is rough, can be post-processed",
                  }}
                  advantages={[
                    "Full metal parts with excellent mechanical properties",
                    "Complex internal features possible",
                    "Heat resistant and durable",
                    "Reduced assembly with consolidated parts",
                  ]}
                  limitations={[
                    "Higher cost than polymer printing",
                    "Requires support structures",
                    "Post-processing often required",
                    "Longer lead times",
                  ]}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Service Process Steps */}
          <ServiceProcessSteps />

          {/* Service Comparison Table */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Service Comparison
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Compare our different 3D printing technologies to find the best
                fit for your project requirements.
              </p>
            </div>

            <ServiceComparisonTable />
          </div>

          {/* Materials Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Available Materials
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                We offer a wide range of materials to suit different
                applications and requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MaterialCard
                name="PLA"
                description="Biodegradable thermoplastic with good rigidity and detail. Ideal for prototypes and models."
                properties={["Rigid", "Biodegradable", "Easy to print"]}
                color="#E53935"
              />
              <MaterialCard
                name="ABS"
                description="Durable thermoplastic with good impact resistance and heat tolerance. Good for functional parts."
                properties={[
                  "Durable",
                  "Impact resistant",
                  "Heat resistant to 85°C",
                ]}
                color="#FF9800"
              />
              <MaterialCard
                name="PETG"
                description="Combines strength and flexibility with good chemical resistance. Suitable for mechanical parts."
                properties={["Strong", "Flexible", "Chemical resistant"]}
                color="#00BCD4"
              />
              <MaterialCard
                name="Nylon"
                description="Strong and flexible material with excellent durability and wear resistance."
                properties={["Strong", "Flexible", "Wear resistant"]}
                color="#B0BEC5"
              />
              <MaterialCard
                name="Resin"
                description="Photopolymer resin for high-detail prints with smooth surface finish."
                properties={[
                  "High detail",
                  "Smooth finish",
                  "Various formulations",
                ]}
                color="#78909C"
              />
              <MaterialCard
                name="Metal"
                description="Various metal powders for functional, durable parts with excellent mechanical properties."
                properties={["Strong", "Heat resistant", "Functional"]}
                color="#607D8B"
              />
            </div>
          </div>

          {/* Pricing Section */}
          {/* <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Pricing</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Our transparent pricing is based on material volume, complexity,
                and finish requirements. Get an instant quote by uploading your
                model.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PricingCard
                title="Standard"
                description="For basic prototypes and models"
                price="9.99"
                features={[
                  "FDM Printing",
                  "PLA Material",
                  "Standard Resolution",
                  "5-7 Business Days",
                  "Basic Support Removal",
                ]}
                color="primary"
              />
              <PricingCard
                title="Professional"
                description="For functional prototypes and parts"
                price="24.99"
                features={[
                  "SLS or Resin Printing",
                  "Engineering Materials",
                  "High Resolution",
                  "3-5 Business Days",
                  "Advanced Post-Processing",
                ]}
                color="secondary"
                highlighted={true}
              />
              <PricingCard
                title="Industrial"
                description="For end-use parts and production"
                price="99.99"
                features={[
                  "Metal or Advanced Polymer Printing",
                  "Premium Materials",
                  "Ultra-High Resolution",
                  "Custom Turnaround Options",
                  "Comprehensive Quality Control",
                ]}
                color="accent"
              />
            </div>

            <div className="text-center mt-8">
              <p className="text-white/70 mb-4">
                Need a custom quote for your specific project requirements?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="gap-2">
                  <Link to="/upload">
                    <Upload className="h-4 w-4" />
                    Get Instant Quote
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 gap-2"
                  asChild
                >
                  <Link to="/contact">
                    <MessageCircle className="h-4 w-4" />
                    Contact for Custom Quote
                  </Link>
                </Button>
              </div>
            </div>
          </div> */}

          {/* FAQ Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Find answers to common questions about our 3D printing services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FaqCard
                question="What is the difference between FDM and SLS printing?"
                answer="FDM (Fused Deposition Modeling) extrudes melted plastic layer by layer, while SLS (Selective Laser Sintering) uses a laser to fuse powder particles together. SLS generally produces stronger parts with more complex geometries, but FDM is more cost-effective for simpler designs."
              />
              <FaqCard
                question="How long does 3D printing take?"
                answer="Turnaround time depends on the size, complexity, and quantity of parts, as well as the chosen printing technology. Standard orders typically take 5-7 business days, while rush orders can be completed in 24-48 hours for an additional fee."
              />
              <FaqCard
                question="What file formats do you accept?"
                answer="We accept all standard 3D model formats including STL, OBJ, 3MF, and AMF. For the best results, we recommend using STL or 3MF formats with properly manifold (watertight) geometry."
              />
              <FaqCard
                question="Do you offer design services?"
                answer="Yes, we have a team of experienced designers who can help create or optimize your 3D models. Whether you need a concept brought to life or modifications to an existing design, our design team can assist."
              />
              <FaqCard
                question="What is your quality control process?"
                answer="Every print undergoes a rigorous quality control process. We inspect each item for dimensional accuracy, surface finish, and structural integrity. For critical applications, we can provide detailed inspection reports and material certifications."
              />
              <FaqCard
                question="Do you offer discounts for bulk orders?"
                answer="Yes, we offer volume discounts starting at 10 units. The discount increases with larger quantities. For very large orders, please contact us directly for a custom quote."
              />
            </div>

            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="border-white/20  hover:text-white hover:bg-white/10"
                asChild
              >
                <Link to="/contact">View All FAQs</Link>
              </Button>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-8 border border-primary/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to bring your ideas to life?
                </h2>
                <p className="text-white/70 mb-6">
                  Upload your 3D model and get an instant quote for your
                  project. Our team of experts is ready to help you turn your
                  designs into reality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    className="bg-primary text-white hover:bg-primary/90 gap-2"
                  >
                    <Link to="/upload">
                      <Upload className="h-4 w-4" />
                      Upload Your Model
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/20 hover:text-white hover:bg-white/10 gap-2"
                  >
                    <Link to="/contact">
                      Contact Our Team
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="hidden md:block relative h-64">
                <div className="absolute inset-0 bg-[#1A2327] rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,57,53,0.2),transparent_70%)]"></div>
                  <div className="grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(10,1fr)] h-full w-full">
                    {Array.from({ length: 200 }).map((_, i) => (
                      <div
                        key={i}
                        className="border-[0.5px] border-primary/10"
                        style={{
                          boxShadow:
                            i % 20 === 0
                              ? "0 0 15px rgba(229, 57, 53, 0.2)"
                              : "none",
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Printer className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-white font-medium">
                      Start Your Project Today
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageHead>
  );
}

// Service Card Component
function ServiceCard({
  title,
  description,
  icon,
  color,
  features,
  startingPrice,
}: {
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  startingPrice: number;
}) {
  const getIcon = (): JSX.Element => {
    const iconProps = { className: "h-8 w-8 text-white" };

    switch (icon) {
      case "layers":
        return <Layers {...iconProps} />;
      case "cube":
        return <Cube {...iconProps} />;
      case "droplet":
        return <Droplet {...iconProps} />;
      case "hammer":
        return <Hammer {...iconProps} />;
      case "printer":
        return <Printer {...iconProps} />;
      case "cpu":
        return <Cpu {...iconProps} />;
      case "cog":
        return <Cog {...iconProps} />;
      case "zap":
        return <Zap {...iconProps} />;
      default:
        return <Cube {...iconProps} />;
    }
  };

  return (
    <Card className="bg-[#1A2327] border-white/10 overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all">
      <CardHeader className="pb-2">
        <div
          className={`${color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}
        >
          {getIcon()}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-white/70 mb-4">{description}</p>
        <ul className="space-y-2 mb-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-white/70">
              <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/60">Starting at</p>
              <p className="text-xl font-bold text-white">
                ₹{startingPrice.toFixed(2)}
              </p>
            </div>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/upload">Get Quote</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Service Detail Card Component
function ServiceDetailCard({
  title,
  description,
  image,
  color,
  materials,
  applications,
  specifications,
  advantages,
  limitations,
}: {
  title: string;
  description: string;
  image: string;
  color: string;
  materials: string[];
  applications: string[];
  specifications: Record<string, string>;
  advantages: string[];
  limitations: string[];
}) {
  return (
    <div className="bg-[#1A2327] rounded-xl border border-white/10 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="relative h-64 lg:h-full">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A2327] to-transparent opacity-60"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <Badge
              className={`bg-${color}/20 text-${color} border-${color}/30 mb-2`}
            >
              {title}
            </Badge>
            <h3 className="text-white font-bold text-xl">{title}</h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-white/70 mb-6">{description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-2">Materials</h4>
              <ul className="space-y-1">
                {materials.map((material, index) => (
                  <li key={index} className="text-white/70 flex items-center">
                    <CheckCircle
                      className={`h-3 w-3 text-${color} mr-2 flex-shrink-0`}
                    />
                    {material}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Applications</h4>
              <ul className="space-y-1">
                {applications.map((application, index) => (
                  <li key={index} className="text-white/70 flex items-center">
                    <CheckCircle
                      className={`h-3 w-3 text-${color} mr-2 flex-shrink-0`}
                    />
                    {application}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-white font-semibold mb-2">Specifications</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
              {Object.entries(specifications).map(([key, value], index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-white/60">{key}:</span>
                  <span className="text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="text-white font-semibold mb-2 flex items-center">
                <CheckCircle className={`h-4 w-4 text-${color} mr-2`} />
                Advantages
              </h4>
              <ul className="space-y-1">
                {advantages.map((advantage, index) => (
                  <li key={index} className="text-white/70 text-sm">
                    • {advantage}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2 flex items-center">
                <AlertCircle className={`h-4 w-4 text-${color} mr-2`} />
                Limitations
              </h4>
              <ul className="space-y-1">
                {limitations.map((limitation, index) => (
                  <li key={index} className="text-white/70 text-sm">
                    • {limitation}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex justify-between">
            <Button
              variant="outline"
              className="border-white/20 hover:text-white hover:bg-white/10"
              asChild
            >
              <Link to="/gallery">View Examples</Link>
            </Button>
            <Button
              className={`bg-${color} text-white hover:bg-${color}/90`}
              asChild
            >
              <Link to="/upload">Get Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Material Card Component
function MaterialCard({
  name,
  description,
  properties,
  color,
}: {
  name: string;
  description: string;
  properties: string[];
  color: string;
}) {
  return (
    <Card className="bg-[#1A2327] border-white/10 overflow-hidden hover:shadow-lg transition-all">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
          <h3 className="text-lg font-bold text-white">{name}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-white/70 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {properties.map((property, index) => (
            <Badge
              key={index}
              variant="outline"
              className="border-white/20 text-white/70"
            >
              {property}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// FAQ Card Component
function FaqCard({ question, answer }: { question: string; answer: string }) {
  return (
    <Card className="bg-[#1A2327] border-white/10">
      <CardHeader>
        <CardTitle className="text-white text-lg">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-white/70">{answer}</p>
      </CardContent>
    </Card>
  );
}

// Pricing Card Component
function PricingCard({
  title,
  description,
  price,
  features,
  color,
  highlighted = false,
}: {
  title: string;
  description: string;
  price: string;
  features: string[];
  color: string;
  highlighted?: boolean;
}) {
  return (
    <Card
      className={`${
        highlighted
          ? `bg-${color}/10 border-${color}/30`
          : "bg-[#1A2327] border-white/10"
      } overflow-hidden relative`}
    >
      {highlighted && (
        <div
          className={`absolute top-0 left-0 right-0 py-1 bg-${color} text-white text-center text-sm font-medium`}
        >
          Most Popular
        </div>
      )}
      <CardHeader className={highlighted ? "pt-8" : ""}>
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-white/70">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline mb-6">
          <span className="text-3xl font-bold text-white">₹{price}</span>
          <span className="text-white/60 ml-1">/ unit</span>
        </div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-white/70">
              <CheckCircle
                className={`h-5 w-5 text-${color} mr-2 flex-shrink-0 mt-0.5`}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className={
            highlighted
              ? `bg-${color} text-white hover:bg-${color}/90 w-full`
              : "w-full"
          }
          asChild
        >
          <Link to="/upload">Get Started</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
