"use client";
import React from 'react'
import { Button } from "@/components/ui/button"
import { SettingsIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";


export default function Home() {
  // const tasks = useQuery(api.tasks.get);
  return (
    <div className="flex flex-col h-screen">
      
      {/* <div className="flex min-h-screen flex-col items-center justify-between p-24">
        {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
      </div> */}

      {/* # voice circle */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-full w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] shadow-lg" />
      </div>
      
      {/* # middle text/button section */}
      <div className="bg-background px-4 py-6 flex flex-col items-center gap-4">
        <p className="text-muted-foreground">Start pitching...</p>
        <Button className="rounded-md py-3 px-4 bg-red-600 hover:bg-red-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      </div>
      
      {/* # avatar icon */}
      <div className="absolute top-6 right-6">
        <Avatar className="w-8 h-8 border">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
      </div>
    
    </div>
  )
}
