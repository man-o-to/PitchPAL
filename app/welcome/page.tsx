"use client";

import AIStateIndicator from '@/components/AIStateIndicator';
import { Button } from '@/components/ui/button';
import React from 'react';

const Page = () => {
  return (
    <div className="relative">
      <div className='flex flex-col items-center justify-center mr-auto ml-auto'>
      <AIStateIndicator isLarge={true} />
      <div className="mb-[42px] text-center ml-auto mr-auto text-[40px] font-light text-[rgba(255,255,255,0.8)]">
            <p>Good morning, Name!</p>
        </div>
      </div>
    </div>
  );
};

export default Page;