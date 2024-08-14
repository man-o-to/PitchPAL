// lib/whisperService.ts
export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OpenAI API key is missing.");
  }

  const formData = new FormData();
  formData.append("file", audioBlob, "recording.wav");
  formData.append("model", "whisper-1");

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Transcription request failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.text; // Assuming the API returns the transcription in a "text" field
}