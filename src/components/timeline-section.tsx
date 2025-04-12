import { CheckCircle2 } from "lucide-react";

// Timeline event type
type TimelineEvent = {
  year: string;
  title: string;
  description: string;
};

// Timeline data
const timelineEvents: TimelineEvent[] = [
  {
    year: "2015",
    title: "Company Founded",
    description:
      "3D-ZNation was founded by Dr. Sarah Chen with a vision to make professional 3D printing accessible to everyone.",
  },
  {
    year: "2016",
    title: "First Facility",
    description:
      "Opened our first production facility with 10 industrial 3D printers and began serving local businesses.",
  },
  {
    year: "2017",
    title: "Online Platform Launch",
    description:
      "Launched our online platform, allowing customers to upload models and receive instant quotes.",
  },
  {
    year: "2018",
    title: "Metal Printing Expansion",
    description:
      "Added metal 3D printing capabilities to our service offerings, expanding into aerospace and medical industries.",
  },
  {
    year: "2020",
    title: "National Expansion",
    description:
      "Opened three additional production facilities across the country to better serve our growing customer base.",
  },
  {
    year: "2022",
    title: "Advanced Materials Research",
    description:
      "Established our R&D department focused on developing custom materials for specialized applications.",
  },
  {
    year: "2023",
    title: "Global Partnerships",
    description:
      "Formed strategic partnerships with international manufacturers to offer global production capabilities.",
  },
  {
    year: "Today",
    title: "Industry Leader",
    description:
      "Now serving thousands of customers worldwide with a comprehensive range of 3D printing services and materials.",
  },
];

export default function TimelineSection() {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Our Journey</h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          From a small startup to an industry leader, our growth has been driven
          by innovation and a commitment to excellence.
        </p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>

        <div className="space-y-12">
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#1A2327] border-2 border-primary flex items-center justify-center z-10">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>

              {/* Content */}
              <div className="md:w-1/2 pl-16 md:pl-0 md:pr-12 md:text-right">
                <div
                  className={`bg-[#1A2327] rounded-lg p-6 border border-white/10 ${
                    index % 2 === 0 ? "md:ml-12" : "md:mr-12"
                  }`}
                >
                  <div className="inline-block bg-primary/10 px-3 py-1 rounded-full mb-3">
                    <span className="text-primary font-medium">
                      {event.year}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">
                    {event.title}
                  </h3>
                  <p className="text-white/70">{event.description}</p>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
