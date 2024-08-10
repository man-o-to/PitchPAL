import { motion } from "framer-motion";
import AIStateIndicator from "@/components/AIStateIndicator";

export default function Ready({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-white">
      <motion.button
        onClick={onStart}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-4 p-2 px-4 bg-orange-500 text-white rounded-lg"
      >
        Start
      </motion.button>
      {/* <AIStateIndicator /> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-black text-xl"
      >
        Ready to start dialing?
      </motion.div>
    </div>
  );
}