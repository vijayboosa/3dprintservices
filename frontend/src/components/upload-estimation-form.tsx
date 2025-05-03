import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Upload,
  FileUp,
  X,
  Info,
  Check,
  Download,
  ShoppingCart,
  AlertCircle,
  Zap,
  Clock,
  Layers,
  Palette,
  Maximize,
  Package,
} from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Center } from "@react-three/drei";
import type * as THREE from "three";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// Material options with pricing factors
const materials = [
  {
    id: "pla",
    name: "PLA",
    factor: 1.0,
    description: "Standard PLA plastic, good for basic prototypes and models.",
    color: "#E53935",
  },
  {
    id: "abs",
    name: "ABS",
    factor: 1.2,
    description: "Durable ABS plastic, suitable for functional parts.",
    color: "#FF9800",
  },
  {
    id: "petg",
    name: "PETG",
    factor: 1.3,
    description: "Strong and flexible, good for mechanical parts.",
    color: "#00BCD4",
  },
  {
    id: "resin",
    name: "Resin",
    factor: 1.8,
    description: "High-detail resin for precise models and smooth surfaces.",
    color: "#78909C",
  },
  {
    id: "nylon",
    name: "Nylon",
    factor: 2.0,
    description: "Strong and flexible material for functional parts.",
    color: "#B0BEC5",
  },
  {
    id: "metal",
    name: "Metal",
    factor: 5.0,
    description: "Metal printing for high-strength functional parts.",
    color: "#607D8B",
  },
];

// Finish options
const finishes = [
  {
    id: "standard",
    name: "Standard",
    factor: 1.0,
    description: "Basic finish with visible layer lines.",
  },
  {
    id: "smooth",
    name: "Smooth",
    factor: 1.3,
    description: "Smoothed surface with minimal layer lines.",
  },
  {
    id: "polished",
    name: "Polished",
    factor: 1.5,
    description: "Fully polished surface with no visible layer lines.",
  },
  {
    id: "painted",
    name: "Painted",
    factor: 1.8,
    description: "Basic single-color paint applied to the model.",
  },
];

// Resolution options
const resolutions = [
  {
    id: "low",
    name: "Low (200 micron)",
    factor: 0.8,
    description: "Faster printing, visible layers, lower cost.",
  },
  {
    id: "medium",
    name: "Medium (100 micron)",
    factor: 1.0,
    description: "Standard quality for most applications.",
  },
  {
    id: "high",
    name: "High (50 micron)",
    factor: 1.4,
    description: "Fine details, smoother surface, higher cost.",
  },
];

// Replace this SampleModel function with the new ModelViewer component
function SampleModel({ materialColor = "#E53935" }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1, 0.4, 128, 32]} />
      <meshStandardMaterial
        color={materialColor}
        roughness={0.3}
        metalness={0.5}
        emissive={materialColor}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// Add this new component that handles loading the actual model file
function ModelViewer({
  url,
  materialColor = "#E53935",
}: {
  url: string | null;
  materialColor: string;
}) {
  const [modelLoaded, setModelLoaded] = useState(false);
  const fileType = url ? url.split(".").pop()?.toLowerCase() : null;

  if (!url) {
    // Fallback to sample model if no file is provided
    return (
      <mesh
        position={[0, 0, 0]}
        rotation={[0, Math.PI * Date.now() * 0.0005, 0]}
      >
        <torusKnotGeometry args={[1, 0.4, 128, 32]} />
        <meshStandardMaterial
          color={materialColor}
          roughness={0.3}
          metalness={0.5}
          emissive={materialColor}
          emissiveIntensity={0.2}
        />
      </mesh>
    );
  }

  // Handle STL format
  if (fileType === "stl") {
    return <STLModelViewer url={url} materialColor={materialColor} />;
  }

  // Handle OBJ format
  if (fileType === "obj") {
    return <OBJModelViewer url={url} materialColor={materialColor} />;
  }

  // Handle GLB/GLTF format (3MF and AMF may need special handling)
  return <GLTFModelViewer url={url} materialColor={materialColor} />;
}

// STL model loader
function STLModelViewer({
  url,
  materialColor,
}: {
  url: string;
  materialColor: string;
}) {
  const { nodes } = useLoader(STLLoader, url);

  return (
    <Center>
      <mesh geometry={nodes.geometry} scale={0.01}>
        <meshStandardMaterial
          color={materialColor}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
    </Center>
  );
}

// OBJ model loader
function OBJModelViewer({
  url,
  materialColor,
}: {
  url: string;
  materialColor: string;
}) {
  const obj = useLoader(OBJLoader, url);

  return (
    <Center>
      <primitive object={obj} scale={0.01}>
        <meshStandardMaterial
          color={materialColor}
          roughness={0.3}
          metalness={0.5}
        />
      </primitive>
    </Center>
  );
}

// GLTF model loader
function GLTFModelViewer({
  url,
  materialColor,
}: {
  url: string;
  materialColor: string;
}) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    // Apply the material color to all meshes in the scene
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: materialColor,
          roughness: 0.3,
          metalness: 0.5,
        });
      }
    });
  }, [scene, materialColor]);

  return (
    <Center>
      <primitive object={scene} scale={0.01} />
    </Center>
  );
}

// 3D Preview component
function ModelPreview({
  materialColor,
  modelUrl = null,
  size = "default",
}: {
  materialColor: string;
  modelUrl?: string | null;
  size?: "default" | "large";
}) {
  return (
    <div
      className={`w-full ${
        size === "large" ? "h-[500px]" : "h-64 md:h-80"
      } rounded-lg overflow-hidden`}
    >
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ModelViewer url={modelUrl} materialColor={materialColor} />
        <OrbitControls
          enableZoom={size === "large"}
          autoRotate
          autoRotateSpeed={size === "large" ? 1 : 2}
        />
        <Environment preset="warehouse" />
      </Canvas>
    </div>
  );
}

export default function UploadEstimationForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [showEstimate, setShowEstimate] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");

  // Form state
  const [material, setMaterial] = useState("pla");
  const [finish, setFinish] = useState("standard");
  const [resolution, setResolution] = useState("medium");
  const [quantity, setQuantity] = useState(1);
  const [infill, setInfill] = useState(20);
  const [dimensions, setDimensions] = useState({ x: 100, y: 100, z: 100 });
  const [priority, setPriority] = useState("standard");

  console.log(setDimensions);

  // Pricing calculation
  const [price, setPrice] = useState({
    basePrice: 0,
    materialCost: 0,
    finishCost: 0,
    quantityDiscount: 0,
    priorityFee: 0,
    total: 0,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get current material color
  const materialColor =
    materials.find((m) => m.id === material)?.color || "#E53935";

  // Add this state for the file URL
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Process the selected file
  const handleFile = (selectedFile: File) => {
    // Check if file is a valid 3D model format
    const validExtensions = [".stl", ".obj", ".3mf", ".amf", ".gltf", ".glb"];
    const fileExtension = selectedFile.name
      .substring(selectedFile.name.lastIndexOf("."))
      .toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      setUploadError(
        "Please upload a valid 3D model file (STL, OBJ, 3MF, AMF, GLTF, or GLB)"
      );
      return;
    }

    setFile(selectedFile);
    setUploadError("");

    // Create URL for the file and store it
    const url = URL.createObjectURL(selectedFile);
    setFileUrl(url);

    simulateUpload(selectedFile);
  };

  // Simulate file upload with progress
  const simulateUpload = (selectedFile: File) => {
    console.log(selectedFile);
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          calculatePrice();
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  // Calculate price based on selections
  const calculatePrice = () => {
    // Get factors based on selections
    const materialFactor =
      materials.find((m) => m.id === material)?.factor || 1;
    const finishFactor = finishes.find((f) => f.id === finish)?.factor || 1;
    const resolutionFactor =
      resolutions.find((r) => r.id === resolution)?.factor || 1;

    // Calculate volume in cm³
    const volume = (dimensions.x * dimensions.y * dimensions.z) / 1000; // Convert from mm³ to cm³

    // Base price calculation
    const basePrice = volume * 0.5; // $0.50 per cm³ as base price

    // Material cost
    const materialCost = basePrice * materialFactor;

    // Finish cost
    const finishCost = basePrice * (finishFactor - 1);

    // Quantity discount (5% per additional item, max 25%)
    const quantityDiscount =
      Math.min(0.25, (quantity - 1) * 0.05) * (materialCost + finishCost);

    // Priority fee
    let priorityFee = 0;
    if (priority === "express") {
      priorityFee = (materialCost + finishCost) * 0.3; // 30% extra for express
    } else if (priority === "rush") {
      priorityFee = (materialCost + finishCost) * 0.5; // 50% extra for rush
    }

    // Apply infill factor (20% is standard)
    const infillFactor = 0.5 + (infill / 100) * 0.5; // Ranges from 0.5 to 1.0

    // Calculate total
    const subtotal =
      (materialCost + finishCost) * infillFactor * resolutionFactor;
    const total = (subtotal - quantityDiscount + priorityFee) * quantity;

    setPrice({
      basePrice: Number.parseFloat(basePrice.toFixed(2)),
      materialCost: Number.parseFloat(materialCost.toFixed(2)),
      finishCost: Number.parseFloat(finishCost.toFixed(2)),
      quantityDiscount: Number.parseFloat(quantityDiscount.toFixed(2)),
      priorityFee: Number.parseFloat(priorityFee.toFixed(2)),
      total: Number.parseFloat(total.toFixed(2)),
    });
  };

  // Update price when options change
  const updatePrice = () => {
    if (file) {
      calculatePrice();
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      calculatePrice();
      setShowEstimate(true);
      setActiveTab("estimate");
    }
  };

  // Effect to handle tab changes
  useEffect(() => {
    if (file && uploadProgress === 100 && activeTab === "upload") {
      // Auto-advance to options tab when upload is complete
      setTimeout(() => {
        setActiveTab("options");
      }, 500);
    }
  }, [file, uploadProgress, activeTab]);

  // Add a cleanup function for the URL
  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  return (
    <div className="backdrop-blur-md bg-[#263238]/90 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(229,57,53,0.2)] overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full rounded-none border-b border-white/10 bg-[#1A2327] p-0">
          <TabsTrigger
            value="upload"
            className="rounded-none flex-1 py-4 text-white data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            <Upload className="h-4 w-4 mr-2" />
            1. Upload Model
          </TabsTrigger>
          <TabsTrigger
            value="options"
            className="rounded-none flex-1 py-4 text-white data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
            disabled={!file}
          >
            <Layers className="h-4 w-4 mr-2" />
            2. Select Options
          </TabsTrigger>
          <TabsTrigger
            value="estimate"
            className="rounded-none flex-1 py-4 text-white data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
            disabled={!showEstimate}
          >
            <Zap className="h-4 w-4 mr-2" />
            3. Get Estimate
          </TabsTrigger>
        </TabsList>

        {/* Upload Tab */}
        <TabsContent value="upload" className="p-0">
          <div className="p-8">
            <div
              className={`border-2 border-dashed rounded-xl p-10 text-center transition-all ${
                isDragging
                  ? "border-primary bg-primary/10"
                  : "border-white/20 hover:border-primary/50 hover:bg-white/5"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              {!file ? (
                <>
                  <div className="mx-auto w-20 h-20 mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <Upload className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-white">
                    Drag & Drop Your 3D Model Here
                  </h3>
                  <p className="text-white/60 mb-6">
                    Supported formats: STL, OBJ, 3MF, AMF (max 50MB)
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                    size="lg"
                  >
                    <FileUp className="h-4 w-4" />
                    Browse Files
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".stl,.obj,.3mf,.amf"
                    onChange={handleFileChange}
                  />
                </>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                        <FileUp className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium truncate max-w-xs text-white">
                          {file.name}
                        </p>
                        <p className="text-sm text-white/60">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white/60 hover:text-white hover:bg-white/10"
                      onClick={() => {
                        setFile(null);
                        setUploadProgress(0);
                        setShowEstimate(false);
                        setFileUrl(null);
                      }}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {isUploading ? (
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/60">Uploading...</span>
                        <span className="text-primary">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center text-primary mb-6">
                      <Check className="h-5 w-5 mr-2" />
                      <span>Upload complete</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <Button
                      variant="secondary"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choose Different File
                    </Button>
                    <Button
                      onClick={() => setActiveTab("options")}
                      disabled={isUploading}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Continue to Options
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {uploadError && (
              <Alert
                variant="destructive"
                className="mt-6 bg-red-500/10 border-red-500/20"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{uploadError}</AlertDescription>
              </Alert>
            )}

            <div className="mt-8 bg-[#1A2327] backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="font-medium mb-4 flex items-center text-white">
                <Info className="h-5 w-5 mr-2 text-accent" />
                Tips for Best Results
              </h3>
              <ul className="text-white/70 space-y-3 ml-7 list-disc">
                <li>Ensure your model is watertight (no holes or gaps)</li>
                <li>Check that all normals are pointing outward</li>
                <li>Remove any internal structures that aren't necessary</li>
                <li>For multi-part models, upload each part separately</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        {/* Options Tab */}
        <TabsContent value="options" className="p-0">
          <form onSubmit={handleSubmit}>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Options */}
                <div className="space-y-8">
                  <div className="bg-[#1A2327] backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-medium mb-4 text-white flex items-center">
                      <Palette className="h-5 w-5 mr-2 text-secondary" />
                      Material & Finish
                    </h3>

                    {/* Material Selection */}
                    <div className="mb-6">
                      <Label
                        htmlFor="material"
                        className="mb-2 block text-white"
                      >
                        Material
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 ml-2 inline text-white/60" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#1A2327] border-white/20">
                              <p className="max-w-xs">
                                Different materials have different properties
                                and costs.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {materials.map((mat) => (
                          <div
                            key={mat.id}
                            className={`rounded-lg p-2 cursor-pointer transition-all border ${
                              material === mat.id
                                ? "border-primary bg-primary/10"
                                : "border-white/10 hover:border-white/30"
                            }`}
                            onClick={() => {
                              setMaterial(mat.id);
                              updatePrice();
                            }}
                            style={{
                              boxShadow:
                                material === mat.id
                                  ? `0 0 10px ${mat.color}40`
                                  : "none",
                            }}
                          >
                            <div className="flex justify-center mb-2">
                              <div
                                className="w-8 h-8 rounded-full"
                                style={{ backgroundColor: mat.color }}
                              ></div>
                            </div>
                            <p className="text-center text-sm font-medium text-white">
                              {mat.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Finish Selection */}
                    <div>
                      <Label htmlFor="finish" className="mb-2 block text-white">
                        Surface Finish
                      </Label>
                      <Select
                        value={finish}
                        onValueChange={(value) => {
                          setFinish(value);
                          updatePrice();
                        }}
                      >
                        <SelectTrigger
                          id="finish"
                          className="bg-[#263238] border-white/20 text-white"
                        >
                          <SelectValue placeholder="Select finish" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#263238] border-white/20">
                          {finishes.map((fin) => (
                            <SelectItem
                              key={fin.id}
                              value={fin.id}
                              className="text-white"
                            >
                              <div>
                                <span>{fin.name}</span>
                                <p className="text-xs text-white/60">
                                  {fin.description}
                                </p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-[#1A2327] backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-medium mb-4 text-white flex items-center">
                      <Layers className="h-5 w-5 mr-2 text-accent" />
                      Print Settings
                    </h3>

                    {/* Resolution Selection */}
                    <div className="mb-6">
                      <Label
                        htmlFor="resolution"
                        className="mb-2 block text-white"
                      >
                        Print Resolution
                      </Label>
                      <div className="grid grid-cols-3 gap-3">
                        {resolutions.map((res) => (
                          <div
                            key={res.id}
                            className={`border rounded-lg p-3 cursor-pointer transition-all ${
                              resolution === res.id
                                ? "border-accent bg-accent/10"
                                : "border-white/10 hover:border-white/30"
                            }`}
                            onClick={() => {
                              setResolution(res.id);
                              updatePrice();
                            }}
                          >
                            <p className="text-center text-sm font-medium text-white mb-1">
                              {res.name.split(" ")[0]}
                            </p>
                            <p className="text-center text-xs text-white/60">
                              {res.name.split(" ")[1]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Infill Percentage */}
                    <div>
                      <Label
                        htmlFor="infill"
                        className="mb-2 block text-white flex justify-between"
                      >
                        <span>Infill Percentage</span>
                        <Badge
                          variant="outline"
                          className="bg-accent/10 text-accent border-accent/30"
                        >
                          {infill}%
                        </Badge>
                      </Label>
                      <Slider
                        id="infill"
                        min={10}
                        max={100}
                        step={5}
                        value={[infill]}
                        onValueChange={(value) => {
                          setInfill(value[0]);
                          updatePrice();
                        }}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-white/60">
                        <span>10% (Hollow)</span>
                        <span>50% (Standard)</span>
                        <span>100% (Solid)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1A2327] backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-medium mb-4 text-white flex items-center">
                      <Package className="h-5 w-5 mr-2 text-secondary" />
                      Order Details
                    </h3>

                    {/* Quantity Selection */}
                    <div className="mb-6">
                      <Label
                        htmlFor="quantity"
                        className="mb-2 block text-white"
                      >
                        Quantity
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 ml-2 inline text-white/60" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#263238] border-white/20">
                              <p>Order multiple copies for a discount.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <div className="flex items-center">
                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          className="rounded-r-none"
                          onClick={() => {
                            if (quantity > 1) {
                              setQuantity(quantity - 1);
                              updatePrice();
                            }
                          }}
                        >
                          -
                        </Button>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          max="100"
                          value={quantity}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value);
                            if (value >= 1 && value <= 100) {
                              setQuantity(value);
                              updatePrice();
                            }
                          }}
                          className="rounded-none text-center w-20 bg-[#263238] border-white/20 text-white"
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          className="rounded-l-none"
                          onClick={() => {
                            if (quantity < 100) {
                              setQuantity(quantity + 1);
                              updatePrice();
                            }
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Priority Selection */}
                    <div>
                      <Label className="mb-2 block text-white">
                        Turnaround Time
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            priority === "standard"
                              ? "border-primary bg-primary/10"
                              : "border-white/10 hover:border-white/30"
                          }`}
                          onClick={() => {
                            setPriority("standard");
                            updatePrice();
                          }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-white">Standard</h4>
                            {priority === "standard" && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <p className="text-sm text-white/60 mb-2">
                            5-7 business days
                          </p>
                          <p className="text-xs text-primary font-medium">
                            No additional fee
                          </p>
                        </div>

                        <div
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            priority === "express"
                              ? "border-primary bg-primary/10"
                              : "border-white/10 hover:border-white/30"
                          }`}
                          onClick={() => {
                            setPriority("express");
                            updatePrice();
                          }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-white">Express</h4>
                            {priority === "express" && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <p className="text-sm text-white/60 mb-2">
                            2-4 business days
                          </p>
                          <p className="text-xs text-secondary font-medium">
                            +30% additional fee
                          </p>
                        </div>

                        <div
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            priority === "rush"
                              ? "border-primary bg-primary/10"
                              : "border-white/10 hover:border-white/30"
                          }`}
                          onClick={() => {
                            setPriority("rush");
                            updatePrice();
                          }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-white">Rush</h4>
                            {priority === "rush" && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <p className="text-sm text-white/60 mb-2">
                            24-48 hours
                          </p>
                          <p className="text-xs text-secondary font-medium">
                            +50% additional fee
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Preview */}
                <div>
                  <div className="bg-[#1A2327] backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-white flex items-center">
                        <Maximize className="h-5 w-5 mr-2 text-accent" />
                        Model Preview
                      </h3>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
                          >
                            <Maximize className="h-4 w-4" />
                            <span className="sr-only">Maximize preview</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[800px] bg-[#1A2327] border-white/10">
                          <DialogHeader>
                            <DialogTitle className="text-white">
                              3D Model Preview
                            </DialogTitle>
                          </DialogHeader>
                          <ModelPreview
                            materialColor={materialColor}
                            modelUrl={fileUrl}
                            size="large"
                          />
                          <div className="text-white/60 text-sm mt-2">
                            <p>
                              Tip: Use mouse to rotate, scroll to zoom, and
                              right-click to pan.
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <ModelPreview
                      materialColor={materialColor}
                      modelUrl={fileUrl}
                    />

                    <div className="mt-4 text-center">
                      <p className="text-white/60 text-sm">
                        This is a sample preview. Your actual model will appear
                        here after processing.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-white">
                        Estimated Price
                      </h3>
                      <Badge className="bg-primary/20 text-primary border-primary/30 text-lg py-1 px-3">
                        ${((price.total || 10) * quantity).toFixed(2)}
                      </Badge>
                    </div>

                    <p className="text-white/70 mb-4">
                      This is a preliminary estimate based on your current
                      selections. Continue to get a detailed breakdown.
                    </p>

                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      size="lg"
                    >
                      Calculate Detailed Estimate
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setActiveTab("upload")}
                >
                  Back to Upload
                </Button>
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Calculate Estimate
                </Button>
              </div>
            </div>
          </form>
        </TabsContent>

        {/* Estimate Tab */}
        <TabsContent value="estimate" className="p-0">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Card className="bg-[#1A2327] backdrop-blur-sm border-white/10 text-white overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-white/10">
                    <CardTitle className="text-white flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-primary" />
                      Your 3D Printing Estimate
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Based on your model and selected options
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-white/10">
                        <span className="text-white/60">File</span>
                        <span className="font-medium text-white">
                          {file?.name}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Material</span>
                        <span className="text-white">
                          {materials.find((m) => m.id === material)?.name}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Surface Finish</span>
                        <span className="text-white">
                          {finishes.find((f) => f.id === finish)?.name}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Resolution</span>
                        <span className="text-white">
                          {resolutions.find((r) => r.id === resolution)?.name}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Infill</span>
                        <span className="text-white">{infill}%</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Quantity</span>
                        <span className="text-white">
                          {quantity} {quantity === 1 ? "piece" : "pieces"}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Turnaround Time</span>
                        <span className="capitalize text-white">
                          {priority}
                        </span>
                      </div>

                      <div className="pt-4 mt-4 border-t border-white/10">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white/60">Base Price</span>
                          <span className="text-white">
                            ${price.basePrice.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white/60">Material Cost</span>
                          <span className="text-white">
                            ${price.materialCost.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white/60">Finish Cost</span>
                          <span className="text-white">
                            ${price.finishCost.toFixed(2)}
                          </span>
                        </div>

                        {price.quantityDiscount > 0 && (
                          <div className="flex justify-between items-center mb-2 text-green-400">
                            <span>Quantity Discount</span>
                            <span>-${price.quantityDiscount.toFixed(2)}</span>
                          </div>
                        )}

                        {price.priorityFee > 0 && (
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white/60">Priority Fee</span>
                            <span className="text-white">
                              ${price.priorityFee.toFixed(2)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 mt-4 border-t border-white/10">
                        <div className="flex justify-between items-center text-lg font-bold">
                          <span className="text-white">Total Estimate</span>
                          <span className="text-primary">
                            ${price.total.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-white/60 mt-2">
                          This is an estimate. Final price may vary based on
                          exact model specifications.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col space-y-3 p-6 bg-[#121A1E] border-t border-white/10">
                    <Button className="w-full gap-2 bg-white/10 text-white hover:bg-white/20 border border-white/20">
                      <Download className="h-4 w-4" />
                      Download Estimate PDF
                    </Button>
                    <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                      <ShoppingCart className="h-4 w-4" />
                      Proceed to Checkout
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div>
                <div className="bg-[#1A2327] backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-white flex items-center">
                      <Maximize className="h-5 w-5 mr-2 text-accent" />
                      Model Preview
                    </h3>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
                        >
                          <Maximize className="h-4 w-4" />
                          <span className="sr-only">Maximize preview</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[800px] bg-[#1A2327] border-white/10">
                        <DialogHeader>
                          <DialogTitle className="text-white">
                            3D Model Preview
                          </DialogTitle>
                        </DialogHeader>
                        <ModelPreview
                          materialColor={materialColor}
                          modelUrl={fileUrl}
                          size="large"
                        />
                        <div className="text-white/60 text-sm mt-2">
                          <p>
                            Tip: Use mouse to rotate, scroll to zoom, and
                            right-click to pan.
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <ModelPreview
                    materialColor={materialColor}
                    modelUrl={fileUrl}
                  />

                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Material:</span>
                      <span className="text-white">
                        {materials.find((m) => m.id === material)?.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-white/60">Dimensions:</span>
                      <span className="text-white">
                        {dimensions.x} x {dimensions.y} x {dimensions.z} mm
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1A2327] backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-medium mb-4 text-white flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-secondary" />
                    Estimated Delivery
                  </h3>

                  <div className="mb-6">
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center z-10">
                          <span className="text-white text-xs">2</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center z-10">
                          <span className="text-white text-xs">3</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center z-10">
                          <span className="text-white text-xs">4</span>
                        </div>
                        <div className="absolute top-4 left-8 right-8 h-0.5 bg-white/10 -z-0"></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-white/60">
                        <span>
                          Order
                          <br />
                          Placed
                        </span>
                        <span>
                          Order
                          <br />
                          Processing
                        </span>
                        <span>
                          Printing
                          <br />
                          In Progress
                        </span>
                        <span>
                          Order
                          <br />
                          Delivered
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#121A1E] rounded-lg p-4 border border-white/10">
                    <h4 className="font-medium text-white mb-2">
                      Estimated Delivery Date:
                    </h4>
                    <p className="text-secondary font-bold mb-2">
                      {priority === "rush"
                        ? "Within 48 hours"
                        : priority === "express"
                        ? "2-4 business days"
                        : "5-7 business days"}
                    </p>
                    <p className="text-white/60 text-sm">
                      Delivery times are estimated based on your selected
                      turnaround time and current production capacity.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <Card className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm border-primary/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white">
                        Need Assistance?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/70 mb-4">
                        Our team of experts is ready to help with your 3D
                        printing project.
                      </p>
                      <div className="flex flex-col space-y-2">
                        <Button variant="secondary" className="justify-start">
                          Request Custom Quote
                        </Button>
                        <Button variant="secondary" className="justify-start">
                          Chat with an Expert
                        </Button>
                        <Button variant="secondary" className="justify-start">
                          Call Us: (123) 456-7890
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                variant="secondary"
                onClick={() => setActiveTab("options")}
              >
                Modify Options
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setFile(null);
                  setUploadProgress(0);
                  setShowEstimate(false);
                  setActiveTab("upload");
                  setFileUrl(null);
                }}
              >
                Start New Estimate
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
