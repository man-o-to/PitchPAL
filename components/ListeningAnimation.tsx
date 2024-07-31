import { FC } from "react";
import Image from "next/image";

interface ListeningAnimationProps {
  isConnecting: boolean;
}

export const ListeningAnimation: FC<ListeningAnimationProps> = ({ isConnecting }) => {
  return (
    <div className={`flex items-center justify-center ${isConnecting ? 'bounce-animation' : ''}`}>
      <Image src="/Listening.svg" alt='listening' width={340} height={340} />
    </div>
  );
};