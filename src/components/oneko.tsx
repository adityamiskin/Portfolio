"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function Oneko() {
  const pathname = usePathname();

  useEffect(() => {
    // Load the oneko script once when component mounts
    // Keep it loaded so position persists across navigations
    if (!document.getElementById("oneko-script")) {
      const script = document.createElement("script");
      script.id = "oneko-script";
      script.src = "/oneko.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Check if we're on a photos slug page, but not on the main /photos page.
    const isPhotoSlugPage =
      pathname?.startsWith("/photos/") && pathname !== "/photos";

    // Function to hide/show oneko based on current pathname
    const updateOnekoVisibility = () => {
      const onekoElement = document.getElementById("oneko");
      if (onekoElement) {
        if (isPhotoSlugPage) {
          onekoElement.style.display = "none";
        } else {
          onekoElement.style.display = "";
        }
      }
    };

    // Update visibility immediately
    updateOnekoVisibility();

    // Also watch for when the oneko element is created by the script
    const observer = new MutationObserver(() => {
      updateOnekoVisibility();
    });

    // Start observing the body for added nodes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
