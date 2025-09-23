import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Heart, ExternalLink, Coffee, Shield, Zap } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "About Cron", href: "https://en.wikipedia.org/wiki/Cron", external: true },
    { label: "Cron Syntax", href: "https://crontab.guru/", external: true },
    { label: "Unix Cron", href: "https://man7.org/linux/man-pages/man5/crontab.5.html", external: true },
  ];

  const features = [
    { icon: <Zap className="w-4 h-4" />, text: "Real-time Generation" },
    { icon: <Shield className="w-4 h-4" />, text: "No Data Collection" },
    { icon: <Coffee className="w-4 h-4" />, text: "Always Free" },
  ];

  return (
    <footer className="bg-muted/30 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Cron Job Helper</h3>
                <p className="text-sm text-muted-foreground">
                  Visual cron expression builder
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Build and understand cron expressions with visual controls. 
              Generate schedules, see human-readable explanations, and preview upcoming runs.
            </p>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                  {feature.icon}
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Learn More</h4>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-auto p-2 justify-start text-sm text-muted-foreground hover:text-foreground"
                  asChild
                >
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Support This Tool</h4>
            <p className="text-sm text-muted-foreground">
              This tool is completely free and open source. Help us keep it running and improve it.
            </p>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 text-red-500" />
                  Star on GitHub
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <a
                  href="https://docs.lovable.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Coffee className="w-4 h-4 text-amber-600" />
                  Built with Lovable
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />
        
        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>© {currentYear} Cron Job Helper. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for developers.</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>No cookies, No tracking, No signup required</span>
          </div>
        </div>
      </div>
    </footer>
  );
};