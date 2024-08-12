// components/EndCall.tsx
"use client";

import { Button } from "./ui/button";

export default function EndCallButton({ onEndCall }: { onEndCall: () => void }) {
  return (
    <Button
      onClick={onEndCall} // Trigger the end call action
      className="px-4 py-2 text-white font-normal text-xl bg-orangeUI rounded-3xl w-[150px] h-[50px]"
    >
      End Call
    </Button>
  );
}