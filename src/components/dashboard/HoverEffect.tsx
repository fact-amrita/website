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

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-0 pb-3", className)}>
      {items.map((item, idx) => (
        <div
          className={cn(
            "relative group block p-1 h-full w-full",
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
              "rounded-2xl h-full w-full p-4 md:p-3 xl:p-5 overflow-hidden bg-gradient-to-tr from-blue-700 via-black to-red-700 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
              className
            )}
            style={{ height: '250px' }} 
          >
            <div className="relative z-50 h-full overflow-y-auto">
              <div className="p-3">
                <h4 className="text-zinc-100 font-bold tracking-wide mt-4">
                  {item.title}
                </h4>
                <div className="mt-8 text-zinc-100 tracking-wide leading-relaxed text-sm">
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
