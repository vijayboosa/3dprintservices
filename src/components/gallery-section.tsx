import { useState } from "react";
import Image from "./image";
import { Link } from "react-router";
import {
  Filter,
  X,
  ChevronDown,
  Maximize2,
  Info,
  ArrowRight,
  Upload,
  Layers,
  Droplet,
  Hammer,
  Cpu,
  Zap,
  Printer,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Gallery item type
type GalleryItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  material: string;
  category: string;
  industry: string;
  details?: string;
  specs?: {
    dimensions: string;
    weight: string;
    printTime: string;
    resolution: string;
  };
};

// Sample gallery data
const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Automotive Engine Block Prototype",
    description: "Functional prototype for testing before final production",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=600",
    material: "ABS",
    category: "Prototype",
    industry: "Automotive",
    details:
      "This engine block prototype was printed using our industrial ABS material to test fit and function before committing to expensive tooling. The client was able to identify several design improvements, saving thousands in potential rework costs.",
    specs: {
      dimensions: "250 x 180 x 200 mm",
      weight: "1.2 kg",
      printTime: "48 hours",
      resolution: "100 micron",
    },
  },
  {
    id: "2",
    title: "Medical Device Housing",
    description: "High-detail resin print for medical device enclosure",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=600",
    material: "Resin",
    category: "End-use Part",
    industry: "Medical",
    details:
      "This medical device housing required exceptional detail and smooth surface finish. Our high-resolution resin printing process delivered the precision needed for this critical application.",
    specs: {
      dimensions: "120 x 80 x 40 mm",
      weight: "0.3 kg",
      printTime: "12 hours",
      resolution: "25 micron",
    },
  },
  {
    id: "3",
    title: "Architectural Model - Modern Skyscraper",
    description: "Detailed architectural model for client presentation",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=600",
    material: "PLA",
    category: "Model",
    industry: "Architecture",
    details:
      "This architectural model was created for a client presentation, showcasing the intricate details of a proposed skyscraper design. The model helped the architects communicate their vision effectively to stakeholders.",
    specs: {
      dimensions: "400 x 400 x 800 mm",
      weight: "1.8 kg",
      printTime: "72 hours",
      resolution: "100 micron",
    },
  },
  {
    id: "4",
    title: "Custom Drone Parts",
    description: "Lightweight yet durable components for custom drone",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=600",
    material: "Nylon",
    category: "End-use Part",
    industry: "Aerospace",
    details:
      "These custom drone parts were printed using our reinforced nylon material, providing the perfect balance of strength and weight. The parts were used in a competition-grade drone that required maximum performance.",
    specs: {
      dimensions: "Various sizes",
      weight: "0.4 kg total",
      printTime: "24 hours",
      resolution: "100 micron",
    },
  },
  {
    id: "5",
    title: "Jewelry Casting Patterns",
    description: "High-detail patterns for lost wax casting",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=600",
    material: "Castable Resin",
    category: "Pattern",
    industry: "Jewelry",
    details:
      "These intricate jewelry patterns were printed using our castable resin, which burns out cleanly for perfect metal casting. The designer was able to create complex geometries that would be impossible with traditional methods.",
    specs: {
      dimensions: "Various sizes",
      weight: "0.05 kg total",
      printTime: "8 hours",
      resolution: "25 micron",
    },
  },
  {
    id: "6",
    title: "Custom Ergonomic Tool Handle",
    description: "Personalized tool grip for improved ergonomics",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=600",
    material: "TPU",
    category: "End-use Part",
    industry: "Manufacturing",
    details:
      "This custom tool handle was designed based on 3D scans of the user's hand, providing perfect ergonomics and reducing fatigue during long periods of use. The flexible TPU material offers excellent grip and comfort.",
    specs: {
      dimensions: "120 x 30 x 30 mm",
      weight: "0.15 kg",
      printTime: "6 hours",
      resolution: "150 micron",
    },
  },
  {
    id: "7",
    title: "Functional Mechanical Gears",
    description: "Interlocking gear system for mechanical prototype",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=600",
    material: "PETG",
    category: "Prototype",
    industry: "Engineering",
    details:
      "This set of functional gears was printed as part of a larger mechanical prototype. The PETG material provides excellent durability and low friction, allowing the gears to operate smoothly in the final assembly.",
    specs: {
      dimensions: "200 x 200 x 50 mm assembled",
      weight: "0.6 kg",
      printTime: "18 hours",
      resolution: "100 micron",
    },
  },
  {
    id: "8",
    title: "Custom Gaming Miniatures",
    description: "Highly detailed character models for tabletop gaming",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=600",
    material: "Resin",
    category: "Model",
    industry: "Entertainment",
    details:
      "These custom gaming miniatures were printed with our high-detail resin process, capturing intricate features down to the smallest details. The models were then painted by hand for a truly unique gaming experience.",
    specs: {
      dimensions: "30 x 30 x 50 mm each",
      weight: "0.02 kg each",
      printTime: "3 hours per set",
      resolution: "25 micron",
    },
  },
  {
    id: "9",
    title: "Functional Metal Prototype",
    description: "Metal-printed functional part for industrial application",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=600",
    material: "Metal",
    category: "Prototype",
    industry: "Industrial",
    details:
      "This metal prototype was printed using our direct metal laser sintering process, creating a fully functional part with excellent mechanical properties. The complex internal channels would be impossible to manufacture with traditional methods.",
    specs: {
      dimensions: "150 x 100 x 75 mm",
      weight: "2.1 kg",
      printTime: "36 hours",
      resolution: "50 micron",
    },
  },
  {
    id: "10",
    title: "Custom Electronics Enclosure",
    description: "Protective housing for custom electronics project",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=600",
    material: "ABS",
    category: "End-use Part",
    industry: "Electronics",
    details:
      "This custom electronics enclosure was designed to house a specialized circuit board for an IoT application. The ABS material provides good heat resistance and durability, while the design includes integrated mounting points and cable management.",
    specs: {
      dimensions: "160 x 120 x 40 mm",
      weight: "0.25 kg",
      printTime: "10 hours",
      resolution: "150 micron",
    },
  },
  {
    id: "11",
    title: "Prosthetic Hand Prototype",
    description: "Low-cost prosthetic hand with articulating fingers",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=600",
    material: "PLA",
    category: "Prototype",
    industry: "Medical",
    details:
      "This prosthetic hand prototype was developed as part of a research project to create affordable prosthetics. The design features articulating fingers and can be customized to fit individual users.",
    specs: {
      dimensions: "200 x 80 x 30 mm",
      weight: "0.3 kg",
      printTime: "15 hours",
      resolution: "100 micron",
    },
  },
  {
    id: "12",
    title: "Concept Car Model",
    description: "Detailed scale model of concept vehicle design",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=600",
    material: "Resin",
    category: "Model",
    industry: "Automotive",
    details:
      "This concept car model was printed for a design review presentation. The high-detail resin print captured all the subtle curves and features of the design, allowing stakeholders to evaluate the aesthetics before proceeding to the next development phase.",
    specs: {
      dimensions: "300 x 120 x 80 mm",
      weight: "0.5 kg",
      printTime: "20 hours",
      resolution: "25 micron",
    },
  },
];

// Material icons mapping
const getMaterialIcon = (material: string) => {
  switch (material.toLowerCase()) {
    case "pla":
      return <Layers className="h-4 w-4" />;
    case "abs":
      return <Hammer className="h-4 w-4" />;
    case "petg":
      return <Zap className="h-4 w-4" />;
    case "resin":
      return <Droplet className="h-4 w-4" />;
    case "nylon":
      return <Printer className="h-4 w-4" />;
    case "metal":
      return <Hammer className="h-4 w-4" />;
    case "tpu":
      return <Layers className="h-4 w-4" />;
    case "castable resin":
      return <Droplet className="h-4 w-4" />;
    default:
      return <Cpu className="h-4 w-4" />;
  }
};

// Material color mapping
const getMaterialColor = (material: string) => {
  switch (material.toLowerCase()) {
    case "pla":
      return "bg-primary";
    case "abs":
      return "bg-secondary";
    case "petg":
      return "bg-accent";
    case "resin":
      return "bg-[#78909C]";
    case "nylon":
      return "bg-[#B0BEC5]";
    case "metal":
      return "bg-[#607D8B]";
    case "tpu":
      return "bg-secondary";
    case "castable resin":
      return "bg-accent";
    default:
      return "bg-primary";
  }
};

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Get unique categories, industries, and materials
  const categories = [
    "All",
    ...Array.from(new Set(galleryItems.map((item) => item.category))),
  ];
  const industries = [
    "All",
    ...Array.from(new Set(galleryItems.map((item) => item.industry))),
  ];
  const materials = [
    "All",
    ...Array.from(new Set(galleryItems.map((item) => item.material))),
  ];

  // Filter gallery items
  const filteredItems = galleryItems.filter((item) => {
    const categoryMatch =
      selectedCategory === "All" || item.category === selectedCategory;
    const industryMatch =
      selectedIndustry === "All" || item.industry === selectedIndustry;
    const materialMatch =
      selectedMaterial === "All" || item.material === selectedMaterial;

    return categoryMatch && industryMatch && materialMatch;
  });

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedIndustry("All");
    setSelectedMaterial("All");
  };

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-wrap gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-[#1A2327] border-white/20 text-white hover:bg-white/10 gap-2"
              >
                <Filter className="h-4 w-4" />
                Category: {selectedCategory}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#1A2327] border-white/20">
              <DropdownMenuLabel className="text-white/70">
                Select Category
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuGroup>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    className={`text-white hover:bg-white/10 cursor-pointer ${
                      selectedCategory === category
                        ? "bg-primary/20 text-primary"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-[#1A2327] border-white/20 text-white hover:bg-white/10 gap-2"
              >
                <Filter className="h-4 w-4" />
                Industry: {selectedIndustry}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#1A2327] border-white/20">
              <DropdownMenuLabel className="text-white/70">
                Select Industry
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuGroup>
                {industries.map((industry) => (
                  <DropdownMenuItem
                    key={industry}
                    className={`text-white hover:bg-white/10 cursor-pointer ${
                      selectedIndustry === industry
                        ? "bg-primary/20 text-primary"
                        : ""
                    }`}
                    onClick={() => setSelectedIndustry(industry)}
                  >
                    {industry}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-[#1A2327] border-white/20 text-white hover:bg-white/10 gap-2"
              >
                <Filter className="h-4 w-4" />
                Material: {selectedMaterial}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#1A2327] border-white/20">
              <DropdownMenuLabel className="text-white/70">
                Select Material
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuGroup>
                {materials.map((material) => (
                  <DropdownMenuItem
                    key={material}
                    className={`text-white hover:bg-white/10 cursor-pointer ${
                      selectedMaterial === material
                        ? "bg-primary/20 text-primary"
                        : ""
                    }`}
                    onClick={() => setSelectedMaterial(material)}
                  >
                    {material}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {(selectedCategory !== "All" ||
          selectedIndustry !== "All" ||
          selectedMaterial !== "All") && (
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10 gap-2"
            onClick={resetFilters}
          >
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <Card className="bg-[#1A2327] border-white/10 overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all cursor-pointer group">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A2327] to-transparent opacity-60"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge
                        className={`${getMaterialColor(
                          item.material
                        )} text-white mb-2`}
                      >
                        {getMaterialIcon(item.material)}
                        <span className="ml-1">{item.material}</span>
                      </Badge>
                      <h3 className="text-white font-bold text-lg line-clamp-1">
                        {item.title}
                      </h3>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 bg-black/30 text-white hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setSelectedItem(item)}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-white/70 line-clamp-2 text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Badge
                      variant="outline"
                      className="border-white/20 text-white/70"
                    >
                      {item.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-white/20 text-white/70"
                    >
                      {item.industry}
                    </Badge>
                  </CardFooter>
                </Card>
              </DialogTrigger>

              <DialogContent className="bg-[#263238] border-white/10 text-white max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
                    {item.title}
                    <Badge
                      className={`${getMaterialColor(
                        item.material
                      )} text-white ml-2`}
                    >
                      {getMaterialIcon(item.material)}
                      <span className="ml-1">{item.material}</span>
                    </Badge>
                  </DialogTitle>
                  <DialogDescription className="text-white/70">
                    {item.category} • {item.industry}
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative h-64 md:h-full rounded-lg overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <Tabs defaultValue="details">
                      <TabsList className="bg-[#1A2327] border-white/10">
                        <TabsTrigger
                          value="details"
                          className="text-white data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                        >
                          Details
                        </TabsTrigger>
                        <TabsTrigger
                          value="specs"
                          className="text-white data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                        >
                          Specifications
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="details" className="pt-4">
                        <p className="text-white/80 mb-4">
                          {item.details || item.description}
                        </p>

                        <div className="flex flex-col gap-2 mt-6">
                          <div className="flex items-center gap-2">
                            <Badge
                              className={`${getMaterialColor(
                                item.material
                              )} text-white`}
                            >
                              {getMaterialIcon(item.material)}
                              <span className="ml-1">{item.material}</span>
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-white/20 text-white/70"
                            >
                              {item.category}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-white/20 text-white/70"
                            >
                              {item.industry}
                            </Badge>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="specs" className="pt-4">
                        {item.specs ? (
                          <div className="space-y-3">
                            <div className="flex justify-between border-b border-white/10 pb-2">
                              <span className="text-white/70">Dimensions</span>
                              <span className="text-white font-medium">
                                {item.specs.dimensions}
                              </span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-2">
                              <span className="text-white/70">Weight</span>
                              <span className="text-white font-medium">
                                {item.specs.weight}
                              </span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-2">
                              <span className="text-white/70">Print Time</span>
                              <span className="text-white font-medium">
                                {item.specs.printTime}
                              </span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-2">
                              <span className="text-white/70">Resolution</span>
                              <span className="text-white font-medium">
                                {item.specs.resolution}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-white/70">
                            Detailed specifications not available for this item.
                          </p>
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Close
                    </Button>
                  </DialogClose>

                  <Button className="bg-primary text-white hover:bg-primary/90 gap-2">
                    <Info className="h-4 w-4" />
                    Request Similar Project
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <div className="bg-[#1A2327] rounded-lg p-8 border border-white/10 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Filter className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                No matching projects found
              </h3>
              <p className="text-white/70 mb-6">
                Try adjusting your filters to see more projects, or reset all
                filters.
              </p>
              <Button
                onClick={resetFilters}
                className="bg-primary text-white hover:bg-primary/90"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-8 border border-primary/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to bring your ideas to life?
            </h2>
            <p className="text-white/70 mb-6">
              Upload your 3D model and get an instant quote for your project.
              Our team of experts is ready to help you turn your designs into
              reality.
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
                className="border-white/20 text-white hover:bg-white/10 gap-2"
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
  );
}
