import { Link } from "react-router";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";

// Office location type
type OfficeLocation = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
};

// Office locations data
const officeLocations: OfficeLocation[] = [
  {
    id: "hq",
    name: "Office Address",
    address: "8-5-43, Khammam, Telanagana",
    phone: "+91 9063105023",
    email: "varun@3d-Znation.com",
    mapUrl: "https://maps.google.com",
  },
  {
    id: "east",
    name: "Plant Adress",
    address: "32/31, tiruvallr street near nagar, Tamil Nadu",
    phone: "+91 9063105023",
    email: "info@3d-Znation.com",
    mapUrl: "https://maps.google.com",
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Business Hours */}
      <div className="bg-[#1A2327] rounded-xl border border-white/10 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Business Hours
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white">Monday - Friday</span>
            <span className="text-white/70">8:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white">Saturday</span>
            <span className="text-white/70">9:00 AM - 3:00 PM</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white">Sunday</span>
            <span className="text-white/70">Closed</span>
          </div>
        </div>

        <div className="mt-4 text-white/60 text-sm">
          <p>* All times are in Pacific Time (PT)</p>
          <p>* Online quotes and uploads are available 24/7</p>
        </div>
      </div>

      {/* Office Locations */}
      <div className="bg-[#1A2327] rounded-xl border border-white/10 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Our Locations
        </h2>

        <div className="space-y-6">
          {officeLocations.map((office) => (
            <div
              key={office.id}
              className="border-b border-white/10 pb-6 last:border-0 last:pb-0"
            >
              <h3 className="text-lg font-bold text-white mb-2">
                {office.name}
              </h3>

              <div className="space-y-3 text-white/70">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span>{office.address}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                  <Link
                    to={`tel:${office.phone.replace(/[^0-9]/g, "")}`}
                    className="hover:text-primary transition-colors"
                  >
                    {office.phone}
                  </Link>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                  <Link
                    to={`mailto:${office.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {office.email}
                  </Link>
                </div>
              </div>

              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 hover:bg-white/10 hover:text-white text-black gap-2"
                  asChild
                >
                  <Link
                    to={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Map
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media */}
      {/* <div className="bg-[#1A2327] rounded-xl border border-white/10 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Connect With Us</h2>

        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:bg-white/10 gap-3"
            asChild
          >
            <Link
              to="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-5 w-5 text-[#1877F2]" />
              Facebook
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:bg-white/10 gap-3"
            asChild
          >
            <Link
              to="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5 text-[#1DA1F2]" />
              Twitter
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:bg-white/10 gap-3"
            asChild
          >
            <Link
              to="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-5 w-5 text-[#E4405F]" />
              Instagram
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:bg-white/10 gap-3"
            asChild
          >
            <Link
              to="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5 text-[#0A66C2]" />
              LinkedIn
            </Link>
          </Button>
        </div>
      </div> */}
    </div>
  );
}
