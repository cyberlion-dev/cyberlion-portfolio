// Dynamic CyberLion Logo Components

import Image from "next/image";

interface LogoProps {
  variant?: "full" | "icon";
  className?: string;
}

export function Logo({ variant = "full", className = "" }: LogoProps) {
  if (variant === "icon") {
    return (
      <div className={`relative ${className}`}>
        <Image
          src="/cyberlion_icon.svg"
          alt="CyberLion"
          width={40}
          height={40}
          className="dark:invert transition-all"
        />
      </div>
    );
  }

  return (
    <Image
      src="/cyberlion_logo_clean.svg"
      alt="CyberLion Web Solutions"
      width={180}
      height={40}
      className={`dark:invert transition-all ${className}`}
    />
  );
}
