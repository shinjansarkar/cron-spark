import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Copy, Play, Calendar, Timer } from "lucide-react";
import { CronInputs } from "./cron/CronInputs";
import { CronOutput } from "./cron/CronOutput";
import { CronTemplates } from "./cron/CronTemplates";
import { generateCronExpression, generateHumanReadable, getNextRuns } from "@/lib/cron-utils";
import { useToast } from "@/hooks/use-toast";

export interface CronSettings {
  minute: number;
  hour: number;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string[];
}

const CronBuilder = () => {
  const { toast } = useToast();
  const [cronSettings, setCronSettings] = useState<CronSettings>({
    minute: 0,
    hour: 0,
    dayOfMonth: "*",
    month: "*",
    dayOfWeek: [],
  });

  const [cronExpression, setCronExpression] = useState("0 0 * * *");
  const [humanReadable, setHumanReadable] = useState("");
  const [nextRuns, setNextRuns] = useState<string[]>([]);

  useEffect(() => {
    const expression = generateCronExpression(cronSettings);
    setCronExpression(expression);
    setHumanReadable(generateHumanReadable(cronSettings));
    setNextRuns(getNextRuns(expression));
  }, [cronSettings]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cronExpression);
      toast({
        title: "Copied!",
        description: "Cron expression copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const applyTemplate = (template: CronSettings) => {
    setCronSettings(template);
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-2xl shadow-cron">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Cron Job Helper
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Build and understand cron expressions with visual controls. Generate schedules, 
            see human-readable explanations, and preview upcoming runs.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Timer className="w-3 h-3" />
              Real-time Generation
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Next Runs Preview
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Play className="w-3 h-3" />
              Quick Templates
            </Badge>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Timer className="w-5 h-5 text-cron-primary" />
                  Schedule Builder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CronInputs 
                  settings={cronSettings} 
                  onChange={setCronSettings} 
                />
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Play className="w-5 h-5 text-cron-accent" />
                  Quick Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CronTemplates onApply={applyTemplate} />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Output */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Copy className="w-5 h-5 text-cron-secondary" />
                  Generated Expression
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CronOutput
                  expression={cronExpression}
                  humanReadable={humanReadable}
                  nextRuns={nextRuns}
                  onCopy={handleCopy}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CronBuilder;