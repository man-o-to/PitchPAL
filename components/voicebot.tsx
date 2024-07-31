import { FC, useState } from "react";
import { MicrophoneButton } from "./MicrophoneButton";
import { RecordingControls } from "./RecordingControls";
import { ObjectionsList } from "./ObjectionsList";
import { ListeningAnimation } from "./ListeningAnimation";
import { ProgressBar } from "./ProgressBar"; // Import the new ProgressBar component

interface VoiceBotProps {
  onConnect: () => void;
  onCall: () => void;
  onPause: () => void;
  isCalling: boolean;
}

const objections = [
  { title: "Hint 1", description: "Make sure to actively listen to the customer's concerns." },
  { title: "Hint 2", description: "Provide clear and concise answers to objections." },
  { title: "Hint 3", description: "Acknowledge the customer's feelings and show empathy." },
];

export const VoiceBot: FC<VoiceBotProps> = ({ onConnect, onCall, onPause, isCalling }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    onConnect();
    // Simulate connection delay for demonstration purposes
    setTimeout(() => {
      setIsConnecting(false);
      setConnected(true);
    }, 3000); // Adjust the delay as needed
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="flex flex-col w-full items-center justify-center flex-1 bg-background">
        <ListeningAnimation isConnecting={isConnecting} />
        {isConnecting ? (
          <div className="mt-24 text-center text-primary">Connecting...</div>
        ) : (
          <>
            {connected ? (
              <div className="flex flex-col items-center mt-4 w-1/2 px-4">
                <ProgressBar value={50} max={100} />
                <ObjectionsList objections={objections} />
                <RecordingControls onCall={onCall} onPause={onPause} />
              </div>
            ) : (
              <MicrophoneButton onConnect={handleConnect} isConnecting={isConnecting} connected={connected} />
            )}
          </>
        )}
      </div>
    </div>
  );
};