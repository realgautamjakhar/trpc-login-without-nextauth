import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingVariant = cva("font-semibold gap-1 items-center tracking-tight", {
  variants: {
    size: {
      sm: "text-[clamp(.75rem,5vw,.875rem)] leading-none ",
      md: "text-[clamp(.875rem,5vw,1rem)] leading-none",
      lg: "text-[clamp(1rem,5vw,1.5rem)] leading-none",
      xl: "text-[clamp(1.25rem,5vw,2rem)] leading-none",
      "2xl": "text-[clamp(2rem,5vw,3rem)] leading-none",
      "3xl": "text-[clamp(3rem,5vw,4.5rem)] leading-none",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface HeadingProps extends VariantProps<typeof headingVariant> {
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}

function Heading({
  el: Wrapper = "h2",
  className,
  children,
  size,
}: HeadingProps) {
  return (
    <Wrapper className={cn(headingVariant({ size }), className)}>
      {children}
    </Wrapper>
  );
}

export { Heading, headingVariant };
