import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const cardStyle = "flex-1 p-1 bg-white rounded-[20px] shadow-xl min-h-[140px] min-w-[174px] w-[290px] h-[320px]";

interface HintCardsProps {
  hints: string[];
}

export default function HintCards({ hints }: HintCardsProps) {
return (
        <div className="flex justify-center mb-[70px] max-w-[1440px] mx-auto px-[5%]">
            <div className="flex flex-wrap justify-start gap-[40px]">
            {hints.length === 0 ? (
                // Render skeleton cards initially until hints are available
                Array.from({ length: 3 }).map((_, index) => (
                <Skeleton className="rounded-[20px] shadow-xl min-h-[140px] min-w-[174px] w-[290px] h-[320px]" key={index} />
                ))
            ) : (
                hints.map((hint, index) => (
                <Card className={cardStyle} key={index}>
                    <CardHeader>
                    <CardTitle className="font-medium text-2xl/[24px]">Hint {index + 1}</CardTitle>
                    <CardDescription className="text-xs">{hint}</CardDescription>
                    </CardHeader>
                </Card>
                ))
            )}
            </div>
        </div>
    );
}