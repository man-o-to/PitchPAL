import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

interface MicrophoneButtonProps {
  onConnect: () => void;
  isConnecting: boolean;
  connected: boolean;
}

export const MicrophoneButton: FC<MicrophoneButtonProps> = ({ onConnect, isConnecting, connected }) => {
  return (
    <Button variant='outline' onClick={onConnect} className="mt-24">
      <Mic className="w-6 h-6 mr-2" />
      {isConnecting ? "Connecting..." : connected ? "Connected" : "Connect Microphone"}
    </Button>
  );
};