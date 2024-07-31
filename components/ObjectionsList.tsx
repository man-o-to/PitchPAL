import { FC } from "react";
import { Card } from "@/components/ui/card";

interface Objection {
  title: string;
  description: string;
}

interface ObjectionsListProps {
  objections: Objection[];
}

export const ObjectionsList: FC<ObjectionsListProps> = ({ objections }) => {
  return (
    <Card className="flex flex-col space-y-4 p-4 rounded-lg shadow-md">
      {objections.map((objection, index) => (
        <div key={index} className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-orange-300" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{objection.title}</p>
            <p className="text-sm text-muted-foreground">{objection.description}</p>
          </div>
        </div>
      ))}
    </Card>
  );
};