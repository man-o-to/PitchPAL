// ProgressBar.tsx
import { Progress } from "./ui/progress";

export default function ProgressBar() {
    console.log("Rendering ProgressBar");

    return (
        <div className="max-w-[1440px] pl-[5%] pr-[5%] mr-auto ml-auto">
            <div className="ml-auto mr-auto mb-15 w-[500px] h-[16px">
                <Progress className='[&>*]:bg-orangeUI bg-[#D9D9D9]' value={0} />
            </div>
        </div>
    );
}