import { useState } from "react";
import birthdayData from "../component/js/birthdayData";
import "./Gallery.css";

function Gallery({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [isAnimating, setIsAnimating] = useState(false);

  const currentMessage = birthdayData.messages[currentIndex];

  const changePage = (newIndex, animationDirection) => {
    if (isAnimating) return;

    setDirection(animationDirection);
    setIsAnimating(true);

    // Wait for old paper to leave
    setTimeout(() => {
      setCurrentIndex(newIndex);

      // Small delay so the new paper animation starts
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 350);
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      changePage(currentIndex - 1, "previous");
    }
  };

  const goNext = () => {
    if (currentIndex < birthdayData.messages.length - 1) {
      changePage(currentIndex + 1, "next");
    } else {
      onComplete();
    }
  };

  return (
    <section id="pageGallery" className="experience-page active">

      <div className="gallery-shell">

        {/* Title */}
        <div className="gallery-title">
          <small>A little something from me</small>
          <h2>Memories Made for You ❤️</h2>
        </div>

        {/* Paper */}
        <div className="paper-stack">

          <article
            id="messagePaper"
            className={`message-paper ${
              isAnimating
                ? `paper-out-${direction}`
                : `paper-in-${direction}`
            }`}
          >

            <i className="paper-heart"></i>

            <div id="paperContent">

              <img
                className="gallery-image"
                src={currentMessage.image}
                alt={`Birthday memory ${currentIndex + 1}`}
              />

              <p className="gallery-message">
                {currentMessage.text}
              </p>

            </div>

          </article>

        </div>

        {/* Navigation */}
        <nav className="gallery-nav">

          <button
            className="nav-btn"
            onClick={goPrevious}
            disabled={currentIndex === 0 || isAnimating}
          >
            Previous
          </button>

          <span className="message-dots">
            {currentIndex + 1} / {birthdayData.messages.length}
          </span>

          <button
            className="nav-btn"
            onClick={goNext}
            disabled={isAnimating}
          >
            {currentIndex === birthdayData.messages.length - 1
              ? "Finish"
              : "Next"}
          </button>

        </nav>

      </div>

    </section>
  );
}

export default Gallery;