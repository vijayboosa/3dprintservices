import { Link } from "react-router";
import { useState } from "react";
import Image from "./image";
import { Linkedin, Twitter, Mail, ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Team member type
type TeamMember = {
  id: string;
  name: string;
  role: string;
  department: string;
  image: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
};

// Sample team data
const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    role: "CEO & Founder",
    department: "Leadership",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=400",
    bio: "Dr. Chen founded 3D-ZNation after a decade in aerospace engineering. With a Ph.D. in Materials Science from MIT, she leads our vision to revolutionize manufacturing through accessible 3D printing technology.",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "sarah@3d3D-ZNation.com",
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    role: "Chief Technology Officer",
    department: "Leadership",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=400",
    bio: "Michael oversees our technical operations and R&D initiatives. With 15 years of experience in additive manufacturing, he ensures we stay at the cutting edge of 3D printing technology.",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "michael@3d3D-ZNation.com",
  },
  {
    id: "3",
    name: "Jessica Park",
    role: "Head of Design",
    department: "Design",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=400",
    bio: "Jessica leads our design team, helping clients optimize their models for 3D printing. Her background in industrial design and digital fabrication makes her an invaluable resource for complex projects.",
    linkedin: "https://linkedin.com",
    email: "jessica@3d3D-ZNation.com",
  },
  {
    id: "4",
    name: "David Wilson",
    role: "Lead Engineer",
    department: "Engineering",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=400",
    bio: "David manages our engineering team and oversees quality control. His expertise in mechanical engineering and materials science ensures every print meets our exacting standards.",
    linkedin: "https://linkedin.com",
    email: "david@3d3D-ZNation.com",
  },
  {
    id: "5",
    name: "Aisha Johnson",
    role: "Client Success Manager",
    department: "Client Services",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=400",
    bio: "Aisha ensures our clients receive exceptional service from initial consultation through project completion. Her background in project management helps clients navigate complex printing projects with ease.",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "aisha@3d3D-ZNation.com",
  },
  {
    id: "6",
    name: "Robert Kim",
    role: "Materials Specialist",
    department: "Engineering",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=400",
    bio: "Robert's expertise in advanced printing materials helps clients select the perfect material for their specific application. His research background in polymer science drives our material innovation.",
    linkedin: "https://linkedin.com",
    email: "robert@3d3D-ZNation.com",
  },
  {
    id: "7",
    name: "Emma Garcia",
    role: "Marketing Director",
    department: "Marketing",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=400",
    bio: "Emma leads our marketing initiatives, sharing the transformative potential of 3D printing with the world. Her background in tech marketing helps us connect with clients across industries.",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "emma@3d3D-ZNation.com",
  },
  {
    id: "8",
    name: "James Thompson",
    role: "Operations Manager",
    department: "Operations",
    image:
      "https://kzmgojww2dludpdpzs6n.lite.vusercontent.net/placeholder.svg?height=400&width=400",
    bio: "James oversees our production facilities, ensuring efficient workflows and timely delivery. His background in manufacturing operations keeps our production running smoothly.",
    linkedin: "https://linkedin.com",
    email: "james@3d3D-ZNation.com",
  },
];

export default function TeamSection() {
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");

  // Get unique departments
  const departments = [
    "All",
    ...Array.from(new Set(teamMembers.map((member) => member.department))),
  ];

  // Filter team members by department
  const filteredMembers = teamMembers.filter(
    (member) => activeTab === "all" || member.department === activeTab
  );

  // Display only first 4 members if showAllMembers is false
  const displayedMembers = showAllMembers
    ? filteredMembers
    : filteredMembers.slice(0, 4);

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Our diverse team of experts brings together decades of experience in
          engineering, design, and manufacturing to deliver exceptional 3D
          printing services.
        </p>
      </div>

      {/* Department Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="bg-[#1A2327] border-white/10 mx-auto">
          {departments.map((department) => (
            <TabsTrigger
              key={department}
              value={department.toLowerCase()}
              className="text-white data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              {department}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedMembers.map((member) => (
          <Card
            key={member.id}
            className="bg-[#1A2327] border-white/10 overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2327] to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg">{member.name}</h3>
                <p className="text-primary text-sm font-medium">
                  {member.role}
                </p>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-white/70 text-sm line-clamp-3 mb-4">
                {member.bio}
              </p>
              <div className="flex gap-2">
                {member.linkedin && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10"
                    asChild
                  >
                    <Link
                      to={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4 text-white/70" />
                    </Link>
                  </Button>
                )}
                {member.twitter && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10"
                    asChild
                  >
                    <Link
                      to={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-4 w-4 text-white/70" />
                    </Link>
                  </Button>
                )}
                {member.email && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10"
                    asChild
                  >
                    <Link to={`mailto:${member.email}`}>
                      <Mail className="h-4 w-4 text-white/70" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Show More/Less Button */}
      {filteredMembers.length > 4 && (
        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 gap-2"
            onClick={() => setShowAllMembers(!showAllMembers)}
          >
            {showAllMembers ? (
              <>
                Show Less
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Show More Team Members
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </section>
  );
}
