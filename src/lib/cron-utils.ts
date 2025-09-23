import type { CronSettings } from "@/components/CronBuilder";

export const generateCronExpression = (settings: CronSettings): string => {
  const { minute, hour, dayOfMonth, month, dayOfWeek } = settings;
  
  let cronParts = [];
  
  // Minute
  if (minute === 0) {
    cronParts.push("0");
  } else if (minute > 0 && minute <= 59) {
    cronParts.push(`*/${minute}`);
  } else {
    cronParts.push("*");
  }
  
  // Hour
  if (hour >= 0 && hour <= 23) {
    cronParts.push(hour.toString());
  } else {
    cronParts.push("*");
  }
  
  // Day of month
  cronParts.push(dayOfMonth === "*" ? "*" : dayOfMonth);
  
  // Month
  cronParts.push(month === "*" ? "*" : month);
  
  // Day of week
  if (dayOfWeek.length === 0) {
    cronParts.push("*");
  } else {
    cronParts.push(dayOfWeek.sort().join(","));
  }
  
  return cronParts.join(" ");
};

export const generateHumanReadable = (settings: CronSettings): string => {
  const { minute, hour, dayOfMonth, month, dayOfWeek } = settings;
  
  let parts = [];
  
  // Frequency
  if (minute > 1) {
    parts.push(`Runs every ${minute} minutes`);
  } else if (minute === 1) {
    parts.push("Runs every minute");
  } else {
    parts.push("Runs");
    
    // Time
    if (hour >= 0 && hour <= 23) {
      const time12h = hour === 0 ? "12:00 AM" : 
                     hour < 12 ? `${hour}:00 AM` :
                     hour === 12 ? "12:00 PM" :
                     `${hour - 12}:00 PM`;
      parts.push(`at ${time12h}`);
    }
  }
  
  // Day restrictions
  if (dayOfWeek.length > 0 && dayOfWeek.length < 7) {
    const dayNames = {
      "0": "Sunday",
      "1": "Monday", 
      "2": "Tuesday",
      "3": "Wednesday",
      "4": "Thursday",
      "5": "Friday",
      "6": "Saturday"
    };
    
    const selectedDays = dayOfWeek.map(d => dayNames[d as keyof typeof dayNames]);
    
    if (selectedDays.length === 5 && dayOfWeek.every(d => ["1","2","3","4","5"].includes(d))) {
      parts.push("on weekdays");
    } else if (selectedDays.length === 2 && dayOfWeek.every(d => ["0","6"].includes(d))) {
      parts.push("on weekends");
    } else if (selectedDays.length === 1) {
      parts.push(`on ${selectedDays[0]}s`);
    } else {
      parts.push(`on ${selectedDays.slice(0, -1).join(", ")} and ${selectedDays.slice(-1)}`);
    }
  }
  
  // Day of month
  if (dayOfMonth !== "*") {
    const day = parseInt(dayOfMonth);
    const suffix = day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th";
    parts.push(`on the ${day}${suffix} of the month`);
  }
  
  // Month
  if (month !== "*") {
    const months = [
      "", "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    parts.push(`in ${months[parseInt(month)]}`);
  }
  
  return parts.join(" ");
};

export const getNextRuns = (cronExpression: string): string[] => {
  try {
    // Simple implementation - in a real app you'd use a proper cron parser library
    const [minute, hour, dayOfMonth, month, dayOfWeek] = cronExpression.split(" ");
    
    const runs: string[] = [];
    const now = new Date();
    let currentDate = new Date(now);
    
    // Generate next 5 runs (simplified logic)
    for (let i = 0; i < 5; i++) {
      // This is a simplified version - for production, use a proper cron parser
      if (minute.startsWith("*/")) {
        const interval = parseInt(minute.substring(2));
        currentDate = new Date(currentDate.getTime() + interval * 60 * 1000);
      } else if (hour !== "*" && minute !== "*") {
        // Daily at specific time
        currentDate.setDate(currentDate.getDate() + 1);
        currentDate.setHours(parseInt(hour), parseInt(minute), 0, 0);
      } else {
        currentDate = new Date(currentDate.getTime() + 60 * 60 * 1000); // Add 1 hour as fallback
      }
      
      runs.push(currentDate.toLocaleString());
    }
    
    return runs;
  } catch (error) {
    console.error("Error calculating next runs:", error);
    return ["Error calculating next runs"];
  }
};