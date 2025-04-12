import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router-dom";

import { Menu, CuboidIcon as Cube, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export default function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md shadow-md py-3"
          : "bg-black/20 py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-1.5">
              <Cube className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-white font-bold text-xl hidden sm:inline-block drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              3D-ZNation
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                to={link.href}
                key={link.name}
                className={`text-sm font-medium transition-colors hover:text-primary drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${
                  pathname === link.href
                    ? "text-primary font-semibold"
                    : "text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild size="sm" className="gap-2">
              <Link to="/upload">
                <Upload className="h-4 w-4" />
                Get a Quote
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-black/95 border-primary/20"
            >
              <SheetHeader>
                <SheetTitle className="text-white flex items-center gap-2">
                  <div className="bg-primary rounded-lg p-1.5">
                    <Cube className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span>3D-ZNation</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.name}>
                    <Link
                      to={link.href}
                      className={`text-lg font-medium transition-colors hover:text-primary py-2 ${
                        pathname === link.href
                          ? "text-primary border-l-4 border-primary pl-4"
                          : "text-white pl-5"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <SheetClose asChild>
                    <Button asChild className="w-full gap-2">
                      <Link to="/upload">
                        <Upload className="h-4 w-4" />
                        Get a Quote
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
