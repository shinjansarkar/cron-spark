import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Clock, Calendar, Hash } from "lucide-react";
import type { CronSettings } from "../CronBuilder";

interface CronInputsProps {
  settings: CronSettings;
  onChange: (settings: CronSettings) => void;
}

const DAYS_OF_WEEK = [
  { label: "Monday", value: "1" },
  { label: "Tuesday", value: "2" },
  { label: "Wednesday", value: "3" },
  { label: "Thursday", value: "4" },
  { label: "Friday", value: "5" },
  { label: "Saturday", value: "6" },
  { label: "Sunday", value: "0" },
];

const MONTHS = [
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

export const CronInputs = ({ settings, onChange }: CronInputsProps) => {
  const updateSetting = (key: keyof CronSettings, value: any) => {
    onChange({ ...settings, [key]: value });
  };

  const handleDayOfWeekChange = (day: string, checked: boolean) => {
    const newDays = checked
      ? [...settings.dayOfWeek, day]
      : settings.dayOfWeek.filter(d => d !== day);
    updateSetting("dayOfWeek", newDays);
  };

  return (
    <div className="space-y-6">
      {/* Minute */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cron-primary" />
          <Label className="text-sm font-medium">Minute (0-59)</Label>
          <span className="text-xs text-muted-foreground ml-auto">{settings.minute}</span>
        </div>
        <div className="px-2">
          <Slider
            value={[settings.minute]}
            onValueChange={([value]) => updateSetting("minute", value)}
            max={59}
            step={1}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground px-2">
          <span>Every minute</span>
          <span>Once per hour</span>
        </div>
      </div>

      {/* Hour */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cron-secondary" />
          <Label className="text-sm font-medium">Hour (0-23)</Label>
          <span className="text-xs text-muted-foreground ml-auto">
            {settings.hour}:00 ({settings.hour === 0 ? "12" : settings.hour > 12 ? settings.hour - 12 : settings.hour}{settings.hour < 12 ? " AM" : " PM"})
          </span>
        </div>
        <div className="px-2">
          <Slider
            value={[settings.hour]}
            onValueChange={([value]) => updateSetting("hour", value)}
            max={23}
            step={1}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground px-2">
          <span>Midnight</span>
          <span>11 PM</span>
        </div>
      </div>

      {/* Day of Month */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-cron-accent" />
          <Label className="text-sm font-medium">Day of Month</Label>
        </div>
        <Select value={settings.dayOfMonth} onValueChange={(value) => updateSetting("dayOfMonth", value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="*">Every day</SelectItem>
            {Array.from({ length: 31 }, (_, i) => (
              <SelectItem key={i + 1} value={String(i + 1)}>
                Day {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Month */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-cron-success" />
          <Label className="text-sm font-medium">Month</Label>
        </div>
        <Select value={settings.month} onValueChange={(value) => updateSetting("month", value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="*">Every month</SelectItem>
            {MONTHS.map(month => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Day of Week */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-cron-warning" />
          <Label className="text-sm font-medium">Day of Week</Label>
        </div>
        <Card className="p-4 bg-muted/20">
          <div className="grid grid-cols-2 gap-3">
            {DAYS_OF_WEEK.map(day => (
              <div key={day.value} className="flex items-center space-x-2">
                <Checkbox
                  id={day.value}
                  checked={settings.dayOfWeek.includes(day.value)}
                  onCheckedChange={(checked) => 
                    handleDayOfWeekChange(day.value, checked as boolean)
                  }
                />
                <Label
                  htmlFor={day.value}
                  className="text-sm font-normal cursor-pointer"
                >
                  {day.label}
                </Label>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};