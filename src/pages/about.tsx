import Image from "@/components/image";
import { Link } from "react-router";
import PageHead from "@/components/page-head";

import {
  Users,
  Building,
  Award,
  Target,
  Zap,
  Upload,
  MessageCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import TeamSection from "@/components/team-section";
import TimelineSection from "@/components/timeline-section";
import FacilitiesSection from "@/components/facilities-section";

export const metadata = {
  title: "About Us - 3D-ZNation",
  description:
    "Learn about our company, our mission, our team, and the technology we use to bring your 3D designs to life.",
};

export default function AboutPage() {
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
          <div className="text-center mb-16">
            <div className="inline-block bg-primary/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
              <span className="text-primary font-medium">Our Story</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              About <span className="text-primary">3D-ZNation</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              We're a team of passionate engineers, designers, and manufacturing
              experts dedicated to bringing your 3D designs to life with
              precision and care.
            </p>
          </div>

          {/* Mission & Values Section */}
          <section className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <Image
                  src="https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=800&width=600"
                  alt="3D-ZNation facility"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#263238] to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex gap-2 mb-2">
                    <div className="bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-primary text-sm font-medium">
                        Est. 2015
                      </span>
                    </div>
                    <div className="bg-secondary/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-secondary text-sm font-medium">
                        Global Reach
                      </span>
                    </div>
                  </div>
                  <h3 className="text-white text-xl font-bold">
                    Transforming Ideas into Reality
                  </h3>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-white/70 mb-6">
                  At 3D-ZNation, our mission is to democratize manufacturing by
                  making high-quality 3D printing accessible to everyone—from
                  individual creators to large enterprises. We believe that
                  additive manufacturing is revolutionizing how products are
                  designed, prototyped, and produced.
                </p>
                <p className="text-white/70 mb-8">
                  We're committed to providing exceptional service, technical
                  expertise, and cutting-edge technology to help our clients
                  bring their ideas to life quickly, affordably, and with
                  precision.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-[#1A2327] rounded-lg p-5 border border-white/10">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">
                      Quality First
                    </h3>
                    <p className="text-white/70 text-sm">
                      We never compromise on quality, using premium materials
                      and rigorous quality control processes.
                    </p>
                  </div>

                  <div className="bg-[#1A2327] rounded-lg p-5 border border-white/10">
                    <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                      <Zap className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">
                      Innovation
                    </h3>
                    <p className="text-white/70 text-sm">
                      We continuously invest in the latest technologies to offer
                      cutting-edge solutions.
                    </p>
                  </div>

                  <div className="bg-[#1A2327] rounded-lg p-5 border border-white/10">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">
                      Customer Focus
                    </h3>
                    <p className="text-white/70 text-sm">
                      We prioritize our clients' needs, providing personalized
                      service and technical support.
                    </p>
                  </div>

                  <div className="bg-[#1A2327] rounded-lg p-5 border border-white/10">
                    <div className="w-12 h-12 rounded-lg bg-[#78909C]/20 flex items-center justify-center mb-4">
                      <Award className="h-6 w-6 text-[#78909C]" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">
                      Sustainability
                    </h3>
                    <p className="text-white/70 text-sm">
                      We're committed to environmentally responsible
                      manufacturing practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Company Timeline */}
          {/* <TimelineSection /> */}

          {/* Team Section */}
          {/* <TeamSection /> */}

          {/* Facilities Section */}
          {/* <FacilitiesSection /> */}

          {/* CTA Section */}
          <section className="mt-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-8 border border-primary/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to work with us?
                </h2>
                <p className="text-white/70 mb-6">
                  Whether you need a single prototype or full production run,
                  our team is ready to help bring your ideas to life with
                  precision and care.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    className="bg-primary text-white hover:bg-primary/90 gap-2"
                  >
                    <Link to="/upload">
                      <Upload className="h-4 w-4" />
                      Start a Project
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/20 text-black hover:text-white hover:bg-white/10 gap-2"
                  >
                    <Link to="/contact">
                      <MessageCircle className="h-4 w-4" />
                      Contact Our Team
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
                      <Building className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-white font-medium">
                      Join Our Growing Client Base
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </PageHead>
  );
}
