import { useState, useEffect, useRef } from "react";
import Image from "./image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Designer, TechInnovate",
    quote:
      "The quality of the 3D printed prototypes exceeded our expectations. The team was responsive and delivered ahead of schedule.",
    stars: 5,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "CTO, MediSolutions",
    quote:
      "We needed complex parts with tight tolerances for our medical device. Their SLS printing service delivered perfect results every time.",
    stars: 5,
  },
  {
    id: 3,
    name: "Alex Rodriguez",
    role: "Founder, CreativeDesigns",
    quote:
      "As a small business owner, I appreciate their instant quote system. It makes budgeting for prototypes so much easier. Great service!",
    stars: 5,
  },
  {
    id: 4,
    name: "Emily Parker",
    role: "Lead Engineer, AeroSpace Inc.",
    quote:
      "The metal printing capabilities are outstanding. We've been able to create lightweight parts that would be impossible with traditional manufacturing.",
    stars: 5,
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Architect, Modern Structures",
    quote:
      "Their resin printing service allowed us to create incredibly detailed architectural models with smooth finishes. Clients love the results!",
    stars: 5,
  },
];

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Calculate visible testimonials based on screen size
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex, visibleCount]);

  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= testimonials.length - visibleCount + 1
        ? 0
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? testimonials.length - visibleCount : prevIndex - 1
    );
  };

  return (
    <div
      className="relative"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      <div ref={sliderRef} className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={cn(
                "flex-shrink-0 px-3",
                visibleCount === 1
                  ? "w-full"
                  : visibleCount === 2
                  ? "w-1/2"
                  : "w-1/3"
              )}
            >
              <Card className="border-0 shadow-md h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-[#ff9100] text-[#ff9100]"
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src="https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=48&width=48"
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white shadow-md z-10 hidden md:flex"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Previous</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow-md z-10 hidden md:flex"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Next</span>
      </Button>

      {/* Dots indicator */}
      <div className="flex justify-center mt-6 gap-2">
        {[...Array(testimonials.length - visibleCount + 1)].map((_, i) => (
          <button
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === currentIndex ? "w-6 bg-primary" : "w-2 bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
