import { useRef, useState } from "react";

import Envelope from "../Envelope";
import Cake from "../Cake";
import Gallery from "../Gallery";
import FinalSuprise from "../FinalSuprise";
import Video from "../Video";
import BIRTHDAY_SONG_URL from "../../song/universfield-happy-birthday-cheer-242244.mp3";

  
function BirthdayExperience() {
  const [stage, setStage] = useState("envelope");

  const audioRef = useRef(null);

  const startMusic = () => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = 0;

    audioRef.current
      .play()
      .then(() => {
        console.log("🎵 Birthday music started");
      })
      .catch((error) => {
        console.error("❌ Music failed:", error);
      });
  };

  return (
    <div className="birthday-experience">

      {/* BACKGROUND MUSIC */}
      <audio
        ref={audioRef}
        src={BIRTHDAY_SONG_URL}
        preload="auto"
      />

      {/* 1. ENVELOPE */}
      {stage === "envelope" && (
        <Envelope
          onOpen={() => setStage("cake")}
        />
      )}

      {/* 2. CAKE */}
      {stage === "cake" && (
        <Cake
          onComplete={() => {
            startMusic();
            setStage("gallery");
          }}
        />
      )}

      {/* 3. GALLERY + MESSAGES */}
      {stage === "gallery" && (
        <Gallery
          onComplete={() => {
            setStage("video");
          }}
        />
      )}

      
      {stage === "surprise" && (
        <FinalSuprise
          onComplete={() => {
            setStage("video");
          }}
        />
      )}

      {/* 5. VIDEO */}
      {stage === "video" && (
        <Video
          onComplete={() => {
            setStage("surprise");
          }}
        />
      )}

     

    </div>
  );
}

export default BirthdayExperience;