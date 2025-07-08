import { cn } from "@/lib/utils";

interface GlitchTextProps {
  children: string;
  className?: string;
  dataText?: string;
}

export function GlitchText({ children, className, dataText }: GlitchTextProps) {
  return (
    <span 
      className={cn("glitch-text", className)}
      data-text={dataText || children}
    >
      {children}
    </span>
  );
}
