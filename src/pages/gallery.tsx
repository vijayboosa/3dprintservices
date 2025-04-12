import GallerySection from "@/components/gallery-section";
import PageHead from "@/components/page-head";

export const metadata = {
  title: "Project Gallery - 3D-ZNation",
  description:
    "Explore our portfolio of 3D printed projects across various industries, materials, and applications.",
};

export default function GalleryPage() {
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
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
              <span className="text-primary font-medium">Our Work</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Project <span className="text-primary">Gallery</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Explore our portfolio of 3D printed projects across various
              industries, materials, and applications. From prototypes to
              production parts, see what we can create for you.
            </p>
          </div>

          <GallerySection />
        </div>
      </main>
    </PageHead>
  );
}
