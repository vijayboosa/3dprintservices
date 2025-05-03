import { CheckCircle, X, HelpCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ServiceComparisonTable() {
  return (
    <div className="bg-[#1A2327] rounded-xl border border-white/10 p-4 overflow-x-auto">
      <Table>
        <TableCaption className="text-white/60">
          Comparison of our 3D printing technologies and their capabilities
        </TableCaption>
        <TableHeader>
          <TableRow className="border-white/10">
            <TableHead className="text-white">Feature</TableHead>
            <TableHead className="text-white text-center">FDM</TableHead>
            <TableHead className="text-white text-center">SLS</TableHead>
            <TableHead className="text-white text-center">Resin</TableHead>
            <TableHead className="text-white text-center">Metal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-white/10">
            <TableCell className="font-medium text-white">Cost</TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs">
                  Low
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full text-xs">
                  Medium
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full text-xs">
                  Medium
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full text-xs">
                  High
                </span>
              </div>
            </TableCell>
          </TableRow>

          <TableRow className="border-white/10">
            <TableCell className="font-medium text-white">
              Detail Level
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full text-xs">
                  Medium
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full text-xs">
                  Medium
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs">
                  High
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs">
                  High
                </span>
              </div>
            </TableCell>
          </TableRow>

          <TableRow className="border-white/10">
            <TableCell className="font-medium text-white">Strength</TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full text-xs">
                  Medium
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs">
                  High
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full text-xs">
                  Low
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs">
                  Very High
                </span>
              </div>
            </TableCell>
          </TableRow>

          <TableRow className="border-white/10">
            <TableCell className="font-medium text-white">
              Surface Finish
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full text-xs">
                  Layer Lines
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full text-xs">
                  Grainy
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs">
                  Smooth
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full text-xs">
                  Rough
                </span>
              </div>
            </TableCell>
          </TableRow>

          <TableRow className="border-white/10">
            <TableCell className="font-medium text-white">
              <div className="flex items-center">
                Support Structures
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 ml-1 text-white/40" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1A2327] border-white/20">
                      <p className="max-w-xs">
                        Support structures may be required to print overhangs
                        and complex geometries
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <X className="h-5 w-5 text-green-400" />
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
              </div>
            </TableCell>
          </TableRow>

          <TableRow className="border-white/10">
            <TableCell className="font-medium text-white">
              Material Options
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs">
                  Many
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full text-xs">
                  Limited
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs">
                  Many
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full text-xs">
                  Limited
                </span>
              </div>
            </TableCell>
          </TableRow>

          <TableRow className="border-white/10">
            <TableCell className="font-medium text-white">
              Color Options
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs">
                  Many
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full text-xs">
                  Limited
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full text-xs">
                  Some
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full text-xs">
                  None
                </span>
              </div>
            </TableCell>
          </TableRow>

          <TableRow className="border-white/10">
            <TableCell className="font-medium text-white">
              Heat Resistance
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full text-xs">
                  Medium
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full text-xs">
                  Medium
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full text-xs">
                  Low
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center text-white/70">
              <div className="flex justify-center">
                <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs">
                  High
                </span>
              </div>
            </TableCell>
          </TableRow>

          <TableRow className="border-white/10">
            <TableCell className="font-medium text-white">
              Typical Applications
            </TableCell>
            <TableCell className="text-white/70">
              Prototypes, Fixtures, Low-stress parts
            </TableCell>
            <TableCell className="text-white/70">
              Functional prototypes, End-use parts
            </TableCell>
            <TableCell className="text-white/70">
              Detailed models, Jewelry patterns
            </TableCell>
            <TableCell className="text-white/70">
              Functional parts, Heat-resistant components
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
