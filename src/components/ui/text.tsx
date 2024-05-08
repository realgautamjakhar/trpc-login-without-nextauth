import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textVariant = cva("text-foreground/75", {
  variants: {
    size: {
      xs: "text-[clamp(.75rem,1.5vw,.75rem)]",
      sm: "text-[clamp(.75rem,1.5vw,.875rem)]",
      md: "text-[clamp(.75rem,1.75vw,1rem)]",
      lg: "text-[clamp(1rem,5vw,1.125rem)]",
      xl: "text-[clamp(1.375rem,5vw,1.875rem)]",
      "2xl": "text-[clamp(1.375rem,5vw,2.875rem)]",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export interface TextProps extends VariantProps<typeof textVariant> {
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}

function Text({ el: Wrapper = "p", className, children, size }: TextProps) {
  return (
    <Wrapper className={cn(textVariant({ size }), className)}>
      {children}
    </Wrapper>
  );
}

export { Text, textVariant };
