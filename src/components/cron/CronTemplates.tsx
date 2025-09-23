import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Zap, Timer } from "lucide-react";
import type { CronSettings } from "../CronBuilder";

interface Template {
  name: string;
  description: string;
  icon: React.ReactNode;
  settings: CronSettings;
  badge?: string;
}

const TEMPLATES: Template[] = [
  {
    name: "Every 5 Minutes",
    description: "Runs every 5 minutes",
  icon: <Timer className="w-6 h-6" />,
    badge: "High Frequency",
    settings: {
      minute: 5,
      hour: 0,
      dayOfMonth: "*",
      month: "*",
      dayOfWeek: [],
    },
  },
  {
    name: "Daily at Midnight",
    description: "Runs once daily at 12:00 AM",
  icon: <Clock className="w-6 h-6" />,
    badge: "Popular",
    settings: {
      minute: 0,
      hour: 0,
      dayOfMonth: "*",
      month: "*",
      dayOfWeek: [],
    },
  },
  {
    name: "Weekdays at 9 AM",
    description: "Monday through Friday at 9:00 AM",
  icon: <Calendar className="w-6 h-6" />,
    badge: "Business Hours",
    settings: {
      minute: 0,
      hour: 9,
      dayOfMonth: "*",
      month: "*",
      dayOfWeek: ["1", "2", "3", "4", "5"],
    },
  },
  {
    name: "Weekly on Sunday",
    description: "Every Sunday at 6:00 PM",
  icon: <Calendar className="w-6 h-6" />,
    settings: {
      minute: 0,
      hour: 18,
      dayOfMonth: "*",
      month: "*",
      dayOfWeek: ["0"],
    },
  },
  {
    name: "Monthly on 1st",
    description: "First day of every month at midnight",
  icon: <Calendar className="w-6 h-6" />,
    settings: {
      minute: 0,
      hour: 0,
      dayOfMonth: "1",
      month: "*",
      dayOfWeek: [],
    },
  },
  {
    name: "Hourly",
    description: "Every hour on the hour",
  icon: <Zap className="w-6 h-6" />,
    badge: "Common",
    settings: {
      minute: 0,
      hour: 0,
      dayOfMonth: "*",
      month: "*",
      dayOfWeek: [],
    },
  },
];

interface CronTemplatesProps {
  onApply: (settings: CronSettings) => void;
}

export const CronTemplates = ({ onApply }: CronTemplatesProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {TEMPLATES.map((template, index) => (
          <Card
            key={index}
            className="p-4 bg-muted/20 hover:bg-muted/40 transition-colors border-0 cursor-pointer group w-full h-28"
            onClick={() => onApply(template.settings)}
          >
            <div className="flex items-center justify-between h-full">
              {/* Left side: Icon + Name + Description */}
              <div className="flex items-center gap-4 flex-1">
                <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                  {template.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-lg">{template.name}</h4>
                    {template.badge && (
                      <Badge variant="secondary" className="text-sm px-3 py-0">
                        {template.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                </div>
              </div>

              {/* Right side: Apply button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-100 transition-opacity"
                    >
                      Apply
                    </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
