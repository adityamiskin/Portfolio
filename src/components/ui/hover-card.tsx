import * as React from "react";
import { HoverCard as HoverCardPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;
const HoverCardPortal = HoverCardPrimitive.Portal;

const HoverCardContent = React.forwardRef<
  React.ComponentRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 8, side = "top", ...props }, ref) => (
  <HoverCardPortal>
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      side={side}
      sideOffset={sideOffset}
      collisionPadding={16}
      className={cn(
        "z-50 outline-hidden",
        "origin-[var(--radix-hover-card-content-transform-origin)]",
        "data-[state=open]:animate-hover-in data-[state=closed]:animate-hover-out",
        className,
      )}
      {...props}
    />
  </HoverCardPortal>
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardPortal };
