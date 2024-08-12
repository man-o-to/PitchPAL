"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import AIStateIndicator from '@/components/AIStateIndicator';
import { motion } from 'framer-motion';

const Page = () => {
  const router = useRouter();
  const { user } = useUser();
  const [greeting, setGreeting] = useState<string>('');
  const [animationComplete, setAnimationComplete] = useState<boolean>(false);

  useEffect(() => {
    const getGreeting = () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours < 12) {
        return 'morning';
      } else if (hours < 18) {
        return 'afternoon';
      } else {
        return 'evening';
      }
    };

    // Set the greeting based on the time of day
    setGreeting(getGreeting());

    // Redirect to root page after 3 seconds
    const timer = setTimeout(() => {
      if (animationComplete) {
        router.push("/");
      }
    }, 3000);

    // Cleanup on unmount
    return () => clearTimeout(timer);
  }, [router, animationComplete]);

  return (
    <div className="relative">
      <div className='flex flex-col items-center justify-center mr-auto ml-auto'>
        <AIStateIndicator isLarge={true} />
        <div className="mb-[42px] text-center ml-auto mr-auto text-[40px] font-light text-[rgba(255,255,255,0.8)]">
          <motion.p
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
            animate={{ clipPath: 'inset(0 0 0 0)', opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            onAnimationComplete={() => setAnimationComplete(true)}
          >
            {`Good ${greeting}, ${user?.firstName || 'Name'}!`}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Page;