import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Laptop, Smartphone } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const DeviceToggle = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if there's a saved preference
    const savedPreference = localStorage.getItem('devicePreference');
    if (savedPreference) {
      setIsMobileView(savedPreference === 'mobile');
      applyViewportMeta(savedPreference === 'mobile');
    }
  }, []);

  const toggleDeviceView = () => {
    const newView = !isMobileView;
    setIsMobileView(newView);
    
    // Save preference to localStorage
    localStorage.setItem('devicePreference', newView ? 'mobile' : 'desktop');
    
    // Apply viewport changes
    applyViewportMeta(newView);

    // Show toast notification
    toast({
      title: newView ? "Mobile View Enabled" : "Desktop View Enabled",
      description: newView ? "Optimized for smartphone experience" : "Full desktop experience activated",
    });
  };

  const applyViewportMeta = (isMobile: boolean) => {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      if (isMobile) {
        viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        document.documentElement.style.maxWidth = '480px';
        document.documentElement.style.margin = '0 auto';
        document.documentElement.style.border = '1px solid var(--border)';
        document.documentElement.style.borderRadius = '20px';
        document.documentElement.style.height = '85vh'; // Slightly shorter to fit better
        document.documentElement.style.overflow = 'auto';
        document.documentElement.style.marginTop = '2rem';
        document.documentElement.style.marginBottom = '2rem';
        
        // Improve text readability in mobile view
        document.body.classList.add('mobile-view');
        
        // Add custom mobile styles
        const mobileStyles = document.getElementById('mobile-view-styles') || document.createElement('style');
        mobileStyles.id = 'mobile-view-styles';
        mobileStyles.textContent = `
          .mobile-view {
            font-size: 16px !important;
            line-height: 1.5 !important;
          }
          .mobile-view h1 {
            font-size: 24px !important;
            line-height: 1.2 !important;
          }
          .mobile-view h2 {
            font-size: 20px !important;
            line-height: 1.2 !important;
          }
          .mobile-view p {
            font-size: 16px !important;
            line-height: 1.5 !important;
          }
          .mobile-view button {
            min-height: 44px !important;
          }
          .mobile-view input {
            font-size: 16px !important;
          }
          /* Make navigation more mobile-friendly */
          .mobile-view nav {
            padding: 0.5rem !important;
          }
          .mobile-view nav a {
            padding: 0.75rem !important;
          }
          /* Adjust cards for better mobile layout */
          .mobile-view .card {
            margin-bottom: 1rem !important;
            padding: 1rem !important;
          }
          /* Ensure elements don't overflow in mobile view */
          .mobile-view * {
            max-width: 100% !important;
          }
          /* Better spacing for forms in mobile */
          .mobile-view form input,
          .mobile-view form select,
          .mobile-view form textarea {
            margin-bottom: 1rem !important;
            padding: 0.75rem !important;
          }
          /* Add a top bar for mobile view */
          .mobile-view:after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 24px;
            background-color: var(--background);
            border-bottom: 1px solid var(--border);
            z-index: 1000;
          }
        `;
        if (!document.getElementById('mobile-view-styles')) {
          document.head.appendChild(mobileStyles);
        }
      } else {
        viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
        document.documentElement.style.maxWidth = '';
        document.documentElement.style.margin = '';
        document.documentElement.style.border = '';
        document.documentElement.style.borderRadius = '';
        document.documentElement.style.height = '';
        document.documentElement.style.overflow = '';
        document.documentElement.style.marginTop = '';
        document.documentElement.style.marginBottom = '';
        
        // Remove mobile view class
        document.body.classList.remove('mobile-view');
        
        // Remove custom styles
        const mobileStyles = document.getElementById('mobile-view-styles');
        if (mobileStyles) {
          mobileStyles.remove();
        }
      }
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full h-10 w-10 border border-primary/20 bg-background/80 backdrop-blur-sm"
      onClick={toggleDeviceView}
      aria-label="Toggle device view"
    >
      {isMobileView ? <Laptop className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
    </Button>
  );
};

export default DeviceToggle;
