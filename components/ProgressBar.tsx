// ProgressBar.tsx

import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

interface ProgressBarProps {
  numberOfObjections: number;
  maxScore: number;
  passingScore: number;
  score: number;  // This represents the current score to add to totalScore
  usedObjectionsCount: number;  // Track how many objections have been used
}

export default function ProgressBar({ numberOfObjections, maxScore, passingScore, score, usedObjectionsCount }: ProgressBarProps) {
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    // Update the total score whenever the score prop changes
    setTotalScore(prevTotal => {
      const newTotal = prevTotal + score;

      // If total score meets or exceeds the passing score
      if (newTotal >= passingScore) {
        console.log("Total score meets or exceeds the passing score.");
        // Define the action to take when the total score meets or exceeds the passing score
      }
      
      // If total score is less than 0
      if (newTotal < 0) {
        console.log("Total score is less than 0.");
        // Define the action to take when the total score is less than 0
      }

      if (usedObjectionsCount >= numberOfObjections) {
        console.log("Used objections meets or exeeds the total number of objections");
      }

      return newTotal;
    });
  }, [score, passingScore]);

  console.log("Rendering ProgressBar");

  // Example logic for using the props
  console.log(`Number of Objections: ${numberOfObjections}`);
  console.log(`Max Score: ${maxScore}`);
  console.log(`Passing Score: ${passingScore}`);
  console.log(`Total Score: ${totalScore}`);
  console.log(`Used Objections Count: ${usedObjectionsCount}`);

  return (
    <div className="max-w-[1440px] pl-[5%] pr-[5%] mr-auto ml-auto">
      <div className="ml-auto mr-auto mb-15 w-[500px] h-[16px]">
        <Progress className='[&>*]:bg-orangeUI bg-[#D9D9D9]' value={totalScore} max={passingScore} />
      </div>
    </div>
  );
}