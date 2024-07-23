"use client";
import React from 'react';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="flex flex-col items-center justify-center flex-1 bg-background">
        <div className="w-64 h-64 bg-foreground rounded-full mb-24" />
        <Button>
          <svg
            className="w-6 h-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
          Connect Microphone
        </Button>
      </div>
    </div>
  );
}