"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ModeToggle } from "../theme/mode-tootle";

export const Header = () => {
  const { resolvedTheme, theme } = useTheme();
  const [imageInvert, setImageInvert] = useState(false);

  useEffect(() => {
    setImageInvert(resolvedTheme === "dark");
  }, [resolvedTheme, theme]);

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Image
            src="https://cdn.prod.website-files.com/65c5980887363f38ac09cd7f/65e79ec828bda864be503e70_Tech9.svg"
            alt="Tech9 Logo"
            width={80}
            height={80}
            className={imageInvert ? "invert" : ""}
          />
          <h1 className="text-xl font-semibold">
            Uplearn: AI-Powered Adaptive Learning Platform
          </h1>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
};
