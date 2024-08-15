import { Id } from "@/convex/_generated/dataModel";
import { Dispatch, SetStateAction } from "react";

export interface GenerateAudioProps {
    setAudio: Dispatch<SetStateAction<string>>;
    audio: string;
    setAudioStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
    transcription: string | null;
}