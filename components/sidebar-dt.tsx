import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { Columns2 } from "lucide-react";

export function SidebarDesktop() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant='ghost' className="p-2 fixed top-6 left-6">
                    <Columns2 size={24}/>
                </Button>
            </SheetTrigger>
            <SheetContent side='left' hideClose>
                <SheetHeader className="flex flex-row justify-between items-center space-y-0">
                    <SheetClose asChild>
                        <Button variant='ghost' className="p-2">
                            <Columns2 size={24}/>
                        </Button>
                    </SheetClose>
                    <h3 className="mx-3 text-lg font-semibold text-foreground">pitch-pal</h3>
                </SheetHeader>
            </SheetContent>
        </Sheet>
       
    //    <aside className="w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r">
    //         <div className="h-full px-3 py-4">
    //             <h3 className="mx-3 text-lg font-semibold text-foreground">pitch-pal</h3>
    //             <div className="mt-5">
    //                 <div className="absolute left-0 bottom-3 w-full px-3">
    //                     <Button className="w-full text-center">Upgrade plan</Button>
    //                 </div>
    //             </div>
    //         </div>
    //     </aside>
    )
}