import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Github, BookOpen, Heart } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-xl shadow-sm">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Cron Job Helper
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Visual cron expression builder
              </p>
            </div>
            <Badge variant="outline" className="hidden md:flex text-xs">
              Free Tool
            </Badge>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center gap-2"
              asChild
            >
              <a
                href="https://docs.lovable.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BookOpen className="w-4 h-4" />
                Docs
              </a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
              asChild
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};