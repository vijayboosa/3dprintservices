import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// FAQ item type
type FaqItem = {
  question: string;
  answer: string;
};

// FAQ data
const faqItems: FaqItem[] = [
  {
    question: "What 3D printing technologies do you offer?",
    answer:
      "We offer a comprehensive range of 3D printing technologies including FDM (Fused Deposition Modeling), SLS (Selective Laser Sintering), SLA (Stereolithography), DMLS (Direct Metal Laser Sintering), and PolyJet. Each technology has its own strengths and is suitable for different applications.",
  },
  {
    question: "How do I get a quote for my 3D printing project?",
    answer:
      "You can get an instant quote by uploading your 3D model file on our website. Our system will analyze your model and provide pricing based on size, material, and complexity. For more complex projects, you can contact us directly through our contact form or by phone for a custom quote.",
  },
  {
    question: "What file formats do you accept?",
    answer:
      "We accept all standard 3D model formats including STL, OBJ, 3MF, and AMF. For the best results, we recommend using STL or 3MF formats. If you have a different file format, please contact us to discuss conversion options.",
  },
  {
    question: "How long does it take to complete a 3D printing order?",
    answer:
      "Standard production time is 5-7 business days, depending on the complexity of your model and our current production volume. We also offer express (2-4 business days) and rush (24-48 hours) services for an additional fee. Large or complex orders may require additional time.",
  },
  {
    question: "What materials can you print with?",
    answer:
      "We offer a wide range of materials including various plastics (PLA, ABS, PETG, Nylon), resins, metals (aluminum, titanium, stainless steel), and flexible materials (TPU). Each material has different properties suitable for various applications. Our team can help you select the best material for your specific needs.",
  },
  {
    question: "Do you offer design services?",
    answer:
      "Yes, we have a team of experienced designers who can help create or optimize your 3D models. Whether you need a concept brought to life or modifications to an existing design, our design team can assist. Design services are quoted separately based on the complexity and requirements of your project.",
  },
  {
    question: "What is your quality control process?",
    answer:
      "Every print undergoes a rigorous quality control process. We inspect each item for dimensional accuracy, surface finish, and structural integrity. For critical applications, we can provide detailed inspection reports and material certifications upon request.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination. Please note that customers are responsible for any import duties or taxes that may apply in their country.",
  },
];

export default function ContactFaq() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleAll = () => {
    if (expandedItems.length === faqItems.length) {
      setExpandedItems([]);
    } else {
      setExpandedItems(faqItems.map((_, index) => `item-${index}`));
    }
  };

  return (
    <div className="bg-[#1A2327] rounded-xl border border-white/10 p-6 md:p-8 mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <HelpCircle className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <Button
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10 gap-2"
          onClick={toggleAll}
        >
          <ChevronDown className="h-4 w-4" />
          {expandedItems.length === faqItems.length
            ? "Collapse All"
            : "Expand All"}
        </Button>
      </div>

      <Accordion
        type="multiple"
        value={expandedItems}
        onValueChange={setExpandedItems}
        className="space-y-4"
      >
        {faqItems.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-white/10 rounded-lg overflow-hidden bg-[#263238]"
          >
            <AccordionTrigger className="px-6 py-4 text-white hover:bg-white/5 hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-0 text-white/70">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 text-center">
        <p className="text-white/70 mb-4">
          Don't see your question here? Contact us directly and we'll be happy
          to help.
        </p>
        <Button className="bg-primary text-white hover:bg-primary/90 gap-2">
          Ask a Question
        </Button>
      </div>
    </div>
  );
}
