import { Button } from "./ui/button";

export default function EndCallButton() {
    return (
      <div className="flex items-center justify-center">
        <Button className="px-4 py-2 text-white font-medium text-xl bg-orangeUI rounded-3xl w-[150px]">End Call</Button>
      </div>
    );
  }