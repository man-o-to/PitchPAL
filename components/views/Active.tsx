import { motion } from "framer-motion";
import AIStateIndicator from "@/components/AIStateIndicator";
import HintCards from "@/components/HintCards";
import ObjectionText from "@/components/ObjectionText";
import ProgressBar from "@/components/ProgressBar";
import EndCallButton from "../EndCallButton";

export default function Active({ onEndCall }: { onEndCall: () => void }) {
  return (
    <div className="relative h-screen">
      {/* <AIStateIndicator
        size={100}
        animate={{ x: "50%", y: "10%", scale: 0.5 }}
      /> */}
      <ObjectionText />
      <HintCards />
      <ProgressBar />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <EndCallButton onClick={onEndCall} />
      </motion.div>
    </div>
  );
}