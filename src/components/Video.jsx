import { useRef, useState } from "react";
import "./Video.css";

function Video({ onComplete }) {
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleContinue = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <section className="experience-page active video-page">
      <div className="video-container">

        <div className="video-title">
          <small>A little something for you</small>
          <h2>One More Surprise ❤️</h2>
        </div>

        <div className="video-wrapper">
          <video
            ref={videoRef}
            className="birthday-video"
            controls
            playsInline
            onEnded={handleVideoEnd}
          >
            <source
              src="/song/友達の誕生日.mp4"
              type="video/mp4"
            />

            Your browser does not support the video tag.
          </video>
        </div>

        <div className="video-actions">
          {!videoEnded && (
            <p className="video-hint">
              Watch until the end ❤️
            </p>
          )}

          {videoEnded && (
            <button
              className="video-next-btn"
              onClick={handleContinue}
            >
              Continue to your wish 💌
            </button>
          )}
        </div>

      </div>
    </section>
  );
}

export default Video;