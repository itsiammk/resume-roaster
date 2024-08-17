import React, { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "../components/ui/aurora-background";
import { FileUpload } from "./ui/file-upload";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { MultiStepLoader as Loader } from "./ui/multi-step-loader";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { IconSquareRoundedX } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface ResumeUploaderProps {
  onRoastComplete: (result: string) => void;
}

const loadingStates = [
  {
    text: "Initializing upload process",
  },
  {
    text: "Preparing your resume for upload",
  },
  {
    text: "Scanning for formatting errors",
  },
  {
    text: "Verifying file integrity",
  },
  {
    text: "Uploading to the server",
  },
  {
    text: "Processing your resume",
  },
  {
    text: "Analyzing for keywords",
  },
  {
    text: "Almost there, finalizing",
  },
  {
    text: "Upload complete! Reviewing...",
  },
];

const words = [
  {
    text: "Upload",
  },
  {
    text: "your",
  },
  {
    text: "Resume.",
    className: "text-blue-700 dark:text-blue-700",
  },
];

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onRoastComplete }) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [roastResult, setRoastResult] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // ... (keep the existing loadingStates and words arrays)

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setResumeFile(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    if (resumeFile) {
      formData.append("resumeFile", resumeFile);
    }

    try {
      const response = await fetch("/api/resume-roast", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to roast resume");
      }

      const data = await response.json();

      setRoastResult(data.result);
      onRoastComplete(data.result);
      setIsDialogOpen(true); // Open the dialog when the result is received
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to roast resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleViewResult = () => {
    setIsDialogOpen(true);
    console.log("ppfirst");
  };

  return (
    <AuroraBackground className="z-40">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <TypewriterEffectSmooth words={words} />

        <form
          onSubmit={handleSubmit}
          className="w-full flex align-center justify-center gap-8 mt-8"
        >
          <div>
            <FileUpload onChange={handleFileChange} />
            <Button
              disabled={isLoading || !resumeFile}
              type="submit"
              className="w-full mt-4"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Roast My Resume
            </Button>
          </div>
        </form>
      </motion.div>
      <Loader
        loadingStates={loadingStates}
        loading={isLoading}
        duration={1500}
      />
      {isLoading && (
        <button
          className="fixed top-4 right-4 text-black dark:text-white z-[120]"
          onClick={() => setIsLoading(false)}
        >
          <IconSquareRoundedX className="h-10 w-10" />
        </button>
      )}
      {roastResult && (
        <Button onClick={handleViewResult} className="mt-4 z-50 ">
          View Result
        </Button>
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-full w-5/6 sm:w-3/5">
          <DialogHeader>
            <DialogTitle>Resume Roast Result</DialogTitle>
            <DialogDescription>
              Here's the roasted version of your resume:
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 max-h-[60vh] overflow-y-auto">
            <p>{roastResult}</p>
          </div>
          </DialogContent>
      </Dialog>
    </AuroraBackground>
  );
};

export default ResumeUploader;
