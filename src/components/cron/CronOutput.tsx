import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Copy, Check, Clock, Calendar } from "lucide-react";
import { useState } from "react";

interface CronOutputProps {
  expression: string;
  humanReadable: string;
  nextRuns: string[];
  onCopy: () => void;
}

export const CronOutput = ({ expression, humanReadable, nextRuns, onCopy }: CronOutputProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Cron Expression */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 text-cron-primary" />
            Cron Expression
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </Button>
        </div>
        
        <Card className="p-4 bg-gradient-primary/5 border-cron-primary/20">
          <code className="text-lg font-mono font-bold text-cron-primary break-all">
            {expression}
          </code>
        </Card>
      </div>

      {/* Human Readable */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Calendar className="w-4 h-4 text-cron-secondary" />
          What This Means
        </h3>
        <Card className="p-4 bg-cron-secondary/5 border-cron-secondary/20">
          <p className="text-sm text-foreground font-medium">
            {humanReadable || "Configure your schedule above"}
          </p>
        </Card>
      </div>

      {/* Next Runs */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Clock className="w-4 h-4 text-cron-accent" />
          Next 5 Runs
        </h3>
        <div className="space-y-2">
          {nextRuns.length > 0 ? (
            nextRuns.map((run, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="w-full justify-start py-2 px-3 text-sm font-mono"
              >
                {run}
              </Badge>
            ))
          ) : (
            <Card className="p-4 bg-muted/20 text-center">
              <p className="text-sm text-muted-foreground">
                No upcoming runs calculated
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};