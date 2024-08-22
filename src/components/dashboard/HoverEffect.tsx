import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

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

  // Adjust height based on screen size
  const getHeight = () => {
    if (window.innerWidth >= 1280) return '200px'; // Extra large screens
    if (window.innerWidth >= 1024) return '180px'; // Large screens
    if (window.innerWidth >= 768) return '160px'; // Medium screens
    return '140px'; // Small screens
  };

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
                className="absolute inset-1 h-full w-full bg-neutral-200 bg-opacity-45 dark:bg-slate-100/[0.8] rounded-xl"
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
              "timeline-container rounded-2xl h-full w-full p-2 md:p-1 xl:p-3 overflow-auto bg-zinc-700 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
              className
            )}
            style={{ height: getHeight() }}
          >
            <div className="relative z-50 h-full overflow-y-auto scrollbar-thumb-sky-700 scrollbar-track-sky-300">
              <div className="p-5 sm:p-3 md:p-5">
                <h4 className="text-aqua font-bold tracking-wide mt-1 text-lg md:text-lg xl:text-lg">
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
