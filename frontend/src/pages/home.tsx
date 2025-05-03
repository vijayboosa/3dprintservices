import { ArrowRight, Upload, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import HeroSection from "@/components/hero-section";
import ServiceCard from "@/components/service-card";
import TestimonialsSlider from "@/components/testimonials-slider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />

      {/* Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            We offer a wide range of 3D printing technologies to meet your
            specific needs, from rapid prototyping to production-ready parts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              title="FDM Printing"
              description="Fused Deposition Modeling for cost-effective prototyping and functional parts."
              icon="layers"
              color="bg-primary"
            />
            <ServiceCard
              title="SLS Printing"
              description="Selective Laser Sintering for durable, functional parts with complex geometries."
              icon="cube"
              color="bg-secondary"
            />
            <ServiceCard
              title="Resin Printing"
              description="High-detail resin printing for smooth surfaces and intricate designs."
              icon="droplet"
              color="bg-accent"
            />
            <ServiceCard
              title="Metal Printing"
              description="Direct metal printing for functional prototypes and end-use parts."
              icon="hammer"
              color="bg-[#607D8B]"
            />
          </div>
        </div>
      </section>

      {/* Invitation Banner */}
      <section className="py-10 px-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-y border-primary/20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">New to 3D Printing?</h3>
              <p className="text-muted-foreground max-w-xl">
                Not sure which service is right for your project? Our experts
                are ready to help you choose the perfect solution.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="gap-2" asChild>
                <Link to="/contact">
                  <MessageCircle className="h-4 w-4" />
                  Chat with an Expert
                </Link>
              </Button>
              <Button variant="secondary" className="gap-2" asChild>
                <Link to="tel:+1234567890">
                  <Phone className="h-4 w-4" />
                  Call Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upload & Estimate Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Get an Instant Quote
                </h2>
                <p className="text-muted-foreground mb-6">
                  Upload your 3D model and receive an instant price estimate.
                  Choose your material, finish, and quantity to see pricing in
                  real-time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="gap-2">
                    <Link to="/upload">
                      <Upload className="h-5 w-5" />
                      Upload & Get Quote
                    </Link>
                  </Button>
                  <Button variant="outline" asChild size="lg">
                    <Link to="/gallery">View Gallery</Link>
                  </Button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/90 to-primary h-64 md:h-auto flex items-center justify-center p-6 sm:p-8">
                <div className="text-primary-foreground text-center">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">
                    Fast Turnaround
                  </h3>
                  <p className="mb-4">
                    Most orders shipped within 3-5 business days
                  </p>
                  <Button variant="secondary" asChild className="gap-2">
                    <Link to="/services">
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to
              say about our 3D printing services.
            </p>
          </div>

          <TestimonialsSlider />

          <div className="text-center mt-10">
            <Button variant="outline" asChild>
              <Link to="/testimonials" className="gap-2">
                Read More Testimonials
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to bring your designs to life?
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            Our team of experts is here to help you turn your 3D models into
            reality. Get started today with a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 text-white border-white hover:bg-white/20"
              size="lg"
              asChild
            >
              <Link to="/upload">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
