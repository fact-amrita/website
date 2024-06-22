import { cn } from "@/lib/utils";

// BentoGrid component
export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid lg:auto-rows-[21rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

// BentoGridItem component
export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-6 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-6",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-7 mt-7">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-md dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
