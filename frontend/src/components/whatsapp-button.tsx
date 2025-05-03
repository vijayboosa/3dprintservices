import { useState } from "react";
import { Link } from "react-router";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

function WhatsAppSvg() {
  return (
    <svg
      className=" text-white scale-200"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
      <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Remove the scroll event listener since we want the button to be always visible

  // Format phone number (remove any non-digit characters)
  const formattedPhone = "9090909090";

  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${formattedPhone}`;

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
          {isOpen && (
            <div className="bg-white rounded-lg shadow-lg p-4 mb-2 animate-fade-in max-w-xs">
              <p className="text-gray-800 text-sm">
                Have questions about our 3D printing services? Chat with us on
                WhatsApp!
              </p>
              <Button
                className="w-full mt-2 bg-[#25D366] hover:bg-[#20BA5C] text-white"
                size="sm"
                asChild
              >
                <Link
                  to={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Chat
                </Link>
              </Button>
            </div>
          )}

          <Button
            className={`w-14 h-14 rounded-full shadow-lg text-4xl ${
              isOpen
                ? "bg-red-500 hover:bg-red-600"
                : "bg-[#25D366] hover:bg-[#20BA5C]"
            } transition-all duration-300`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6 text-white" /> : <WhatsAppSvg />}
          </Button>
        </div>
      )}
    </>
  );
}
