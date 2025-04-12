import {
  Layers,
  CuboidIcon as Cube,
  Droplet,
  Hammer,
  Printer,
  Cpu,
  Cog,
  Zap,
} from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  color,
}: ServiceCardProps) {
  const getIcon = (): JSX.Element => {
    const iconProps = { className: "h-8 w-8 text-white" };

    switch (icon) {
      case "layers":
        return <Layers {...iconProps} />;
      case "cube":
        return <Cube {...iconProps} />;
      case "droplet":
        return <Droplet {...iconProps} />;
      case "hammer":
        return <Hammer {...iconProps} />;
      case "printer":
        return <Printer {...iconProps} />;
      case "cpu":
        return <Cpu {...iconProps} />;
      case "cog":
        return <Cog {...iconProps} />;
      case "zap":
        return <Zap {...iconProps} />;
      default:
        return <Cube {...iconProps} />;
    }
  };

  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div
          className={`${color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}
        >
          {getIcon()}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
