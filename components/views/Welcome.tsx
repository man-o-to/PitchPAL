import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import AIStateIndicator from "@/components/AIStateIndicator";

export default function Welcome({ onTransition }: { onTransition: () => void }) {
  const controls = useAnimation();

  useEffect(() => {
    async function sequence() {
      await controls.start({ opacity: 0, transition: { duration: 1 } });
      await controls.start({
        backgroundColor: "#ffffff",
        transition: { duration: 1 },
      });
      await controls.start({ opacity: 1, transition: { duration: 1 } });
      onTransition();
    }
    sequence();
  }, [controls, onTransition]);

  return (
    <motion.div
      className="relative h-screen flex items-center justify-center bg-orange-500"
      animate={controls}
      initial={{ opacity: 1 }}
    >
      <AIStateIndicator />
      <motion.div
        className="absolute bottom-[20%] text-white text-xl"
      >
        Good morning, Name!
      </motion.div>
    </motion.div>
  );
}