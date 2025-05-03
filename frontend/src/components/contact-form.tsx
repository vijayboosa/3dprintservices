import type React from "react";

import { useState } from "react";
import { Send, Upload, CheckCircle, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    file: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [fileName, setFileName] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, subject: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormState((prev) => ({ ...prev, file: e.target.files?.[0] || null }));
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const formData = new FormData();
      formData.append("name", formState.name);
      formData.append("email", formState.email);
      formData.append("phone", formState.phone);
      formData.append("subject", formState.subject);
      formData.append("message", formState.message);
      if (formState.file) {
        formData.append("file", formState.file);
      }

      const response = await fetch("https://api.3dznation.com/api/contact", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitStatus("success");

        // Reset form after 5 seconds
        setTimeout(() => {
          setFormState({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
            file: null,
          });
          setFileName("");
          setSubmitStatus("idle");
        }, 5000);
      } else {
        const data = await response.json();
        setSubmitStatus("error");
        console.error("Form submission error:", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Network or server error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1A2327] rounded-xl border border-white/10 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

      {submitStatus === "success" && (
        <Alert className="mb-6 bg-green-500/10 border-green-500/30 text-green-400">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your message has been sent. We'll get back to you as soon as
            possible.
          </AlertDescription>
        </Alert>
      )}

      {submitStatus === "error" && (
        <Alert className="mb-6 bg-red-500/10 border-red-500/30 text-red-400">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was a problem sending your message. Please try again.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Your Name <span className="text-primary">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formState.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
              className="bg-[#263238] border-white/20 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email Address <span className="text-primary">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              required
              className="bg-[#263238] border-white/20 text-white placeholder:text-white/40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formState.phone}
              onChange={handleInputChange}
              placeholder="(123) 456-7890"
              className="bg-[#263238] border-white/20 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-white">
              Subject <span className="text-primary">*</span>
            </Label>
            <Select
              value={formState.subject}
              onValueChange={handleSelectChange}
              required
            >
              <SelectTrigger
                id="subject"
                className="bg-[#263238] border-white/20 text-white"
              >
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent className="bg-[#263238] border-white/20">
                <SelectItem value="general" className="text-white">
                  General Inquiry
                </SelectItem>
                <SelectItem value="quote" className="text-white">
                  Request a Quote
                </SelectItem>
                <SelectItem value="support" className="text-white">
                  Technical Support
                </SelectItem>
                <SelectItem value="partnership" className="text-white">
                  Partnership Opportunity
                </SelectItem>
                <SelectItem value="other" className="text-white">
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-white">
            Your Message <span className="text-primary">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleInputChange}
            placeholder="Tell us about your project or question..."
            required
            className="min-h-[150px] bg-[#263238] border-white/20 text-white placeholder:text-white/40"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="file" className="text-white">
            Attach a File (Optional)
          </Label>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              className="border-white/20 text-white gap-2 bg-transparent hover:bg-white"
              onClick={() => document.getElementById("file")?.click()}
            >
              <Upload className="h-4 w-4" />
              Choose File
            </Button>
            <span className="text-white/60 text-sm">
              {fileName ? fileName : "No file chosen (Max 25MB)"}
            </span>
            <input
              id="file"
              name="file"
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".stl,.obj,.3mf,.amf,.pdf,.jpg,.png"
            />
          </div>
          <p className="text-white/40 text-xs">
            Supported formats: STL, OBJ, 3MF, AMF, PDF, JPG, PNG
          </p>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-white hover:bg-primary/90 gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
