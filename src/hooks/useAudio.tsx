import { useRef } from "react";

const useAudio = (src: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error("Audio playback failed: ", err);
      });
    }
  };
  return { audioRef, play };
};

export default useAudio;
