import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import "./hoverEffect.css";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    content: JSX.Element;
    span: number;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // height Calculator
  
  function getHeight() {
    const width = window.innerWidth;
    if (width >= 1024) return '350px'; 
    if (width >= 768) return '300px';  
    if (width >= 640) return '250px';  
    return '250px'; 
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-0 pb-3", className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className={cn(
            "relative group block p-2 max-h-full w-full",
            `col-span-${item.span}`
          )}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 bg-opacity-45 dark:bg-slate-100/[0.8] block rounded-xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <div
            className={cn(
              "timeline-container rounded-2xl h-full w-full p-4 md:p-3 xl:p-5 overflow-hidden bg-zinc-700 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
              className
            )}
            style={{ height: getHeight() }}
          >
            <div className="relative z-50 h-full overflow-y-hidden overflow-x-clip scrollbar-thumb-sky-700 scrollbar-track-sky-300">
              <div className="p-11 sm:p-3 md:p-5">
                <h4 className="text-aqua font-bold tracking-wide mt-1 text-3xl">
                  {item.title}
                </h4>
                <div className="mt-3 tracking-wide leading-relaxed text-sm break-words text-white">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
