// lib/audioRecorder.ts

export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private audioBlob: Blob | null = null;
  private isRecording: boolean = false;

  async startRecording(): Promise<void> {
    if (this.isRecording) {
      throw new Error("Recording is already in progress");
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = []; // Clear previous audio data
      this.isRecording = true;

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.start();
    } catch (error) {
      throw new Error("Failed to initialize MediaRecorder: ");
    }
  }

  stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || !this.isRecording) {
        reject(new Error("MediaRecorder is not initialized or recording hasn't started"));
        return;
      }

      this.mediaRecorder.onstop = () => {
        this.audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
        this.isRecording = false;
        resolve(this.audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }

  getAudioBlob(): Blob | null {
    return this.audioBlob;
  }

  clearAudio(): void {
    this.audioChunks = [];
    this.audioBlob = null;
    this.isRecording = false;
  }
}