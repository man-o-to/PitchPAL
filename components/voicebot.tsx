import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Phone, PauseCircle, Circle } from "lucide-react";
import Image from "next/image";

interface VoiceBotProps {
  onConnect: () => void;
  onCall: () => void;
  onPause: () => void;
  isCalling: boolean;
}

export const VoiceBot: FC<VoiceBotProps> = ({ onConnect, onCall, onPause, isCalling }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    onConnect();
    // Simulate connection delay for demonstration purposes
    setTimeout(() => {
      setIsConnecting(false);
    }, 3000); // Adjust the delay as needed
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="flex flex-col w-full items-center justify-center flex-1 bg-background">
        <div className={`flex items-center justify-center ${isConnecting ? 'bounce-animation' : ''}`}>
          <Image src="/Listening.svg" alt='listening' width={340} height={340} />
        </div>
        {isConnecting ? (
          <div className="mt-24 text-center text-primary">Connecting...</div>
        ) : (
          <>
            {isCalling ? (
              <div className="flex flex-col items-center mt-4">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '50%' }}></div> {/* Example progress */}
                </div>
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                  <p>Hints for handling objections will appear here...</p>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <Button onClick={onCall} className="bg-green-500 hover:bg-green-600">
                    <Phone className="w-6 h-6 mr-2" />
                  </Button>
                  <Button onClick={onPause} className="bg-gray-500 hover:bg-gray-600">
                    <PauseCircle className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            ) : (
              <Button variant='outline' onClick={handleConnect} className="mt-24">
                <Mic className="w-6 h-6 mr-2" />
                Connect Microphone
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};