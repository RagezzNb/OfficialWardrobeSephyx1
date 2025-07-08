import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function TerminalWindow({ children, className, title }: TerminalWindowProps) {
  return (
    <div className={cn("terminal-window p-6 font-space", className)}>
      {title && (
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-cyber-cyan/30">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-cyber-red"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-cyber-green"></div>
          </div>
          <span className="text-xs text-cyber-cyan">{title}</span>
        </div>
      )}
      {children}
    </div>
  );
}
