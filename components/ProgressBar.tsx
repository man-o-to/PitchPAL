import { FC } from "react";
import { Progress } from "./ui/progress"; // Adjust import path as necessary

interface ProgressBarProps {
  value: number;
  max: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({ value, max }) => {
  return (
    <div className="w-full">
      <Progress value={value} max={max} />
    </div>
  );
};