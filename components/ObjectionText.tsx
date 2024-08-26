// components/ObjectionText.tsx
import React from "react";
import { Skeleton } from "./ui/skeleton";

interface ObjectionTextProps {
  text: string | null; // Accept the objection text as a prop
}

export default function ObjectionText({ text }: ObjectionTextProps) {
  return (
    <div className="relative">
      <div className="text-center mb-15">
        {text === null ? (
          <Skeleton className="h-8 rounded-full w-[500px]" />
        ) : (
          <p className="text-[rgb(0,0,0,80%)] font-medium text-xl/[20px]">
            {text}
          </p>
        )}
      </div>
    </div>
  );
}