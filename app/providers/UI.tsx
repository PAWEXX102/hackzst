"use client";

import * as React from "react";

import {HeroUIProvider} from "@heroui/react";
import { ThemeProvider } from "next-themes";
import { useDeviceStore } from "../store/device";
import { useOrientation } from "../store/orientation";
import { useEffect } from "react";

export default function ProviderUI({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const setIsMobile = useDeviceStore((state: any) => state.setIsMobile);
  const setOrientation = useOrientation((state: any) => state.setOrientation);

  useEffect(() => {
    const checkIfMobile = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        const mobileThreshold = 1024;
        setIsMobile(width < mobileThreshold);
        console.log("isMobile", width < mobileThreshold);
      }
    };

    const checkOrientation = () => {
      if (typeof window !== "undefined") {
        const orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
        setOrientation(orientation);
        console.log("orientation", orientation);
      }
    };

    checkIfMobile();
    checkOrientation();

    window.addEventListener("resize", checkIfMobile);
    window.addEventListener("resize", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);

  return (
    <HeroUIProvider>
      <ThemeProvider defaultTheme="light" attribute="class">
        {children}
      </ThemeProvider>
    </HeroUIProvider>
  );
}
