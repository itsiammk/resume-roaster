"use client";

import React, { useState } from "react";
import ResumeUploader from "@/components/ResumeUploader";
import RoastResult from "@/components/RoastResult";
import { SidebarDemo } from "@/components/Sidebar";
import { ThemeProvider } from "@/components/themeProvider";
import { ModeToggle } from "@/components/modeToggle";

export default function Home() {
  const [roastResult, setRoastResult] = useState<string | null>(null);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="absolute z-[9999] right-4 top-4" >
        <ModeToggle />
      </div>
      <main>
        <ResumeUploader onRoastComplete={setRoastResult} />
        {/* {roastResult && <RoastResult result={roastResult} />} */}
      </main>
    </ThemeProvider>
  );
}
