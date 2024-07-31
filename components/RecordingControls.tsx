import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Phone, PauseCircle } from "lucide-react";

interface RecordingControlsProps {
  onCall: () => void;
  onPause: () => void;
}

export const RecordingControls: FC<RecordingControlsProps> = ({ onCall, onPause }) => {
  return (
    <div className="mt-4 flex items-center space-x-2">
      <Button onClick={onCall}>
        <Phone className="w-6 h-6" />
      </Button>
      <Button onClick={onPause} variant={"secondary"}>
        <PauseCircle className="w-6 h-6" />
      </Button>
    </div>
  );
};