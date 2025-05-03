import UploadEstimationForm from "@/components/upload-estimation-form";
import PageHead from "@/components/page-head";

export const metadata = {
  title: "Upload & Get Estimation - 3D-ZNation",
  description:
    "Upload your 3D model and get an instant price estimate for our professional 3D printing services.",
};

export default function UploadPage() {
  return (
    <PageHead {...metadata}>
      <main className="min-h-screen bg-[#263238] pt-24 pb-16">
        {/* Background grid effect */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,57,53,0.15),transparent_70%)]"></div>
          <div className="grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(20,1fr)] h-full w-full">
            {Array.from({ length: 800 }).map((_, i) => (
              <div
                key={i}
                className="border-[0.5px] border-primary/10"
                style={{
                  boxShadow:
                    i % 20 === 0 ? "0 0 15px rgba(229, 57, 53, 0.3)" : "none",
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-primary/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
                <span className="text-primary font-medium">
                  Advanced 3D Printing Estimation
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Turn Your <span className="text-primary">3D Models</span> Into
                Reality
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Upload your 3D model file, select your preferences, and receive
                an instant price estimate. Our advanced system calculates
                pricing based on material, size, and complexity.
              </p>
            </div>

            <UploadEstimationForm />
          </div>
        </div>
      </main>
    </PageHead>
  );
}
