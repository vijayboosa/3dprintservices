import { useState } from "react";
import {
  Upload,
  FileCheck,
  Settings,
  Printer,
  Package,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServiceProcessSteps() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Upload Your Model",
      description:
        "Upload your 3D model file in STL, OBJ, 3MF, or AMF format. Our system will automatically analyze it for printability.",
      icon: <Upload className="h-6 w-6 text-primary" />,
      color: "primary",
    },
    {
      title: "File Check & Preparation",
      description:
        "Our team reviews your model to ensure it's printable. We'll fix minor issues or contact you if significant changes are needed.",
      icon: <FileCheck className="h-6 w-6 text-secondary" />,
      color: "secondary",
    },
    {
      title: "Select Options",
      description:
        "Choose your material, finish, quantity, and delivery timeline. Get an instant price quote based on your selections.",
      icon: <Settings className="h-6 w-6 text-accent" />,
      color: "accent",
    },
    {
      title: "Production",
      description:
        "Your model is printed using the selected technology and material, with careful attention to quality and detail.",
      icon: <Printer className="h-6 w-6 text-[#607D8B]" />,
      color: "[#607D8B]",
    },
    {
      title: "Post-Processing",
      description:
        "We clean, cure, and finish your prints according to your specifications, ensuring they meet our quality standards.",
      icon: <Package className="h-6 w-6 text-[#78909C]" />,
      color: "[#78909C]",
    },
    {
      title: "Shipping",
      description:
        "Your completed prints are carefully packaged and shipped to your address using tracked delivery services.",
      icon: <Truck className="h-6 w-6 text-[#B0BEC5]" />,
      color: "[#B0BEC5]",
    },
  ];

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Our Process</h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          From upload to delivery, here's how we turn your 3D models into
          reality.
        </p>
      </div>

      <div className="bg-[#1A2327] rounded-xl border border-white/10 p-6 md:p-8">
        {/* Desktop Process Steps */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Progress bar */}
            <div className="absolute top-10 left-0 right-0 h-0.5 bg-white/10"></div>
            <div
              className="absolute top-10 left-0 h-0.5 bg-primary transition-all duration-500"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            ></div>

            {/* Steps */}
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => setActiveStep(index)}
                >
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                      index <= activeStep
                        ? `bg-${step.color}/20 border-2 border-${step.color}`
                        : "bg-[#263238] border-2 border-white/10"
                    }`}
                  >
                    <div
                      className={
                        index <= activeStep ? "text-white" : "text-white/40"
                      }
                    >
                      {step.icon}
                    </div>
                  </div>
                  <h3
                    className={`mt-4 font-medium text-center ${
                      index <= activeStep ? "text-white" : "text-white/40"
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 p-6 bg-[#263238] rounded-lg border border-white/10">
            <h3 className="text-xl font-bold text-white mb-2">
              {steps[activeStep].title}
            </h3>
            <p className="text-white/70">{steps[activeStep].description}</p>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              className="border-white/20 text-black hover:bg-white/10"
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              Previous Step
            </Button>
            <Button
              onClick={() =>
                setActiveStep(Math.min(steps.length - 1, activeStep + 1))
              }
              disabled={activeStep === steps.length - 1}
            >
              Next Step
            </Button>
          </div>
        </div>

        {/* Mobile Process Steps */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                index === activeStep
                  ? `bg-${step.color}/10 border-${step.color}/30`
                  : "bg-[#263238] border-white/10"
              }`}
              onClick={() => setActiveStep(index)}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index <= activeStep
                      ? `bg-${step.color}/20 border-2 border-${step.color}`
                      : "bg-[#263238] border-2 border-white/10"
                  }`}
                >
                  <div
                    className={
                      index <= activeStep ? "text-white" : "text-white/40"
                    }
                  >
                    {step.icon}
                  </div>
                </div>
                <div>
                  <h3
                    className={`font-medium ${
                      index <= activeStep ? "text-white" : "text-white/40"
                    }`}
                  >
                    {step.title}
                  </h3>
                  {index === activeStep && (
                    <p className="text-white/70 text-sm mt-1">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() =>
                setActiveStep(Math.min(steps.length - 1, activeStep + 1))
              }
              disabled={activeStep === steps.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
