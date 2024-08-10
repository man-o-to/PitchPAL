import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

const cardStyle = "flex-1 p-1 bg-white rounded-[20px] shadow-xl min-h-[140px] min-w-[174px] w-[290px] h-[320px]"

export default function HintCards() {
    return (
      <div className="flex justify-center mb-[70px] max-w-[1440px] mx-auto px-[5%]">
        <div className="flex flex-wrap justify-start gap-[40px]">
          <Card className={cardStyle}>
              <CardHeader>
                  <CardTitle className="font-medium text-2xl/[24px]">Hint 1</CardTitle>
                  <CardDescription className="text-xs">Deploy your new project in one-click.</CardDescription>
              </CardHeader>
          </Card>
          <Card className={cardStyle}>
              <CardHeader>
                  <CardTitle className="font-medium text-2xl/[24px]">Hint 2</CardTitle>
                  <CardDescription className="text-xs">Deploy your new project in one-click.</CardDescription>
              </CardHeader>
          </Card>
          <Card className={cardStyle}>
              <CardHeader>
                  <CardTitle className="font-medium text-2xl/[24px]">Hint 3</CardTitle>
                  <CardDescription className="text-xs">Deploy your new project in one-click.</CardDescription>
              </CardHeader>
          </Card>
        </div>
      </div>
    );
}