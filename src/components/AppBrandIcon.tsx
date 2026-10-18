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
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 512 512" 
        className="w-full h-full rounded-inherit pointer-events-none"
        aria-label="Düşünce Defteri İkonu"
      >
        <defs>
          {/* Background luxury dark mocha / espresso gradient */}
          <linearGradient id="brandBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#28221D" />
            <stop offset="45%" stopColor="#1B1714" />
            <stop offset="100%" stopColor="#100D0B" />
          </linearGradient>

          {/* Warm ambient light bloom from top-center */}
          <radialGradient id="brandAmbientGlow" cx="50%" cy="28%" r="60%">
            <stop offset="0%" stopColor="#E8C99B" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#C5A059" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
          </radialGradient>

          {/* Subtle rim bevel light */}
          <linearGradient id="brandRimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
            <stop offset="25%" stopColor="#EADEC9" stopOpacity="0.16" />
            <stop offset="80%" stopColor="#A2845E" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.02" />
          </linearGradient>

          {/* Champagne Gold gradient for spark & accents */}
          <linearGradient id="brandGoldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF5E4" />
            <stop offset="25%" stopColor="#F5DCB3" />
            <stop offset="60%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#A27D44" />
          </linearGradient>

          {/* Silk Ivory page gradient (Left page) */}
          <linearGradient id="brandPageLeft" x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#ECE2D0" />
            <stop offset="40%" stopColor="#FAF6EE" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Silk Ivory page gradient (Right page) */}
          <linearGradient id="brandPageRight" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ECE2D0" />
            <stop offset="40%" stopColor="#FAF6EE" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Leather / Notebook Cover Outer gradient */}
          <linearGradient id="brandCoverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8E6E45" />
            <stop offset="50%" stopColor="#6F5331" />
            <stop offset="100%" stopColor="#4E3920" />
          </linearGradient>
        </defs>

        {/* Squircle Base for Mobile Homescreen & Desktop */}
        <rect x="24" y="24" width="464" height="464" rx="108" fill="url(#brandBgGrad)" />

        {/* Ambient Light Reflection inside squircle */}
        <rect x="24" y="24" width="464" height="464" rx="108" fill="url(#brandAmbientGlow)" />

        {/* Premium Inner Rim Bevel Stroke */}
        <rect x="25.5" y="25.5" width="461" height="461" rx="106.5" fill="none" stroke="url(#brandRimGrad)" strokeWidth="3" />

        {/* Central Notebook & Mind Symbol Group */}
        <g>
          {/* Under-cover base (Notebook back cover) */}
          {/* Left Cover Flap */}
          <path d="M 256,368 C 220,378 160,370 120,344 C 114,340 110,334 110,326 L 110,224 C 110,216 116,210 124,213 C 166,228 220,230 256,218 Z" 
                fill="url(#brandCoverGrad)" opacity="0.9" />
          
          {/* Right Cover Flap */}
          <path d="M 256,368 C 292,378 352,370 392,344 C 398,340 402,334 402,326 L 402,224 C 402,216 396,210 388,213 C 346,228 292,230 256,218 Z" 
                fill="url(#brandCoverGrad)" opacity="0.9" />

          {/* Gold spine edge rim */}
          <path d="M 256,217 L 256,369" stroke="url(#brandGoldSheen)" strokeWidth="4" strokeLinecap="round" />

          {/* Stacked Pages Layer 1 */}
          <path d="M 256,358 C 222,366 166,358 126,336 L 126,230 C 166,242 222,238 256,226 Z" 
                fill="#D6C7B2" opacity="0.75" />
          <path d="M 256,358 C 290,366 346,358 386,336 L 386,230 C 346,242 290,238 256,226 Z" 
                fill="#D6C7B2" opacity="0.75" />

          {/* Main Open Pages: Left Page */}
          <path d="M 256,352 C 224,360 170,352 132,328 C 127,325 124,320 124,314 L 124,220 C 124,213 130,208 136,211 C 174,224 224,222 256,212 Z" 
                fill="url(#brandPageLeft)" />

          {/* Main Open Pages: Right Page */}
          <path d="M 256,352 C 288,360 342,352 380,328 C 385,325 388,320 388,314 L 388,220 C 388,213 382,208 376,211 C 338,224 288,222 256,212 Z" 
                fill="url(#brandPageRight)" />

          {/* Minimalist Notebook Lines on Left Page */}
          <path d="M 152,242 C 180,248 214,244 238,238" stroke="#D1C4B0" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
          <path d="M 148,266 C 180,272 216,268 240,262" stroke="#D1C4B0" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
          <path d="M 146,290 C 178,296 216,292 240,286" stroke="#D1C4B0" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
          <path d="M 148,314 C 176,319 210,316 236,310" stroke="#D1C4B0" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />

          {/* Minimalist Notebook Lines on Right Page */}
          <path d="M 274,238 C 298,244 332,248 360,242" stroke="#D1C4B0" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
          <path d="M 272,262 C 296,268 332,272 364,266" stroke="#D1C4B0" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
          <path d="M 272,286 C 296,292 334,296 366,290" stroke="#D1C4B0" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
          <path d="M 276,310 C 302,316 336,319 364,314" stroke="#D1C4B0" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />

          {/* Silk Ribbon Bookmark flowing downwards */}
          <path d="M 252,213 L 260,213 L 260,378 L 256,373 L 252,378 Z" fill="url(#brandGoldSheen)" />

          {/* Spine Valley Shadow */}
          <path d="M 256,212 L 256,352" stroke="#B09F87" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
        </g>

        {/* Golden Radiance Glow behind Star of Thought */}
        <circle cx="256" cy="148" r="42" fill="#E8C99B" opacity="0.22" />

        {/* The Central Mind Spark / Star of Wisdom (✦) */}
        <g>
          {/* Main 4-pointed Star */}
          <path d="M 256,96 
                   C 256,134 266,144 308,148 
                   C 266,152 256,162 256,200 
                   C 256,162 246,152 204,148 
                   C 246,144 256,134 256,96 Z" 
                fill="url(#brandGoldSheen)" />

          {/* Center Core Glimmer */}
          <circle cx="256" cy="148" r="4" fill="#FFFFFF" />

          {/* Left Satellite Spark */}
          <path d="M 188,124 
                   C 188,133 191,135 200,136 
                   C 191,137 188,139 188,148 
                   C 188,139 185,137 176,136 
                   C 185,135 188,133 188,124 Z" 
                fill="url(#brandGoldSheen)" opacity="0.85" />

          {/* Right Satellite Spark */}
          <path d="M 324,124 
                   C 324,133 327,135 336,136 
                   C 327,137 324,139 324,148 
                   C 324,139 321,137 312,136 
                   C 321,135 324,133 324,124 Z" 
                fill="url(#brandGoldSheen)" opacity="0.85" />
        </g>
      </svg>
    </div>
  );
}
