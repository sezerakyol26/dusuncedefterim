import React from "react";

interface AppBrandIconProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  withShadow?: boolean;
}

export default function AppBrandIcon({ size = "md", className = "", withShadow = true }: AppBrandIconProps) {
  const sizeMap = {
    sm: "w-7 h-7 rounded-lg",
    md: "w-10 h-10 rounded-2xl",
    lg: "w-16 h-16 rounded-[22px]",
    xl: "w-24 h-24 rounded-[30px]",
  };

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden select-none transition-transform duration-200 active:scale-95 ${sizeMap[size]} ${
        withShadow ? "shadow-md shadow-stone-900/15 dark:shadow-black/40" : ""
      } ${className}`}
    >
      <img 
        src="/icon.svg" 
        alt="Düşünce Defteri İkonu" 
        className="w-full h-full object-cover rounded-inherit pointer-events-none"
        loading="eager"
      />
    </div>
  );
}
