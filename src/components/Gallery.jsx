import { useState } from "react";
import birthdayData from "../component/js/birthdayData";
import "./Gallery.css";

function Gallery({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentMessage = birthdayData.messages[currentIndex];

  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goNext = () => {
    if (currentIndex < birthdayData.messages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <section id="pageGallery" className="experience-page active">

      <div className="gallery-shell">

        {/* Title */}
        <div className="gallery-title">
          <small>Letters from the heart</small>

          <h2>Your Birthday Pages</h2>
        </div>

        {/* Paper */}
        <div className="paper-stack">

          <article
            id="messagePaper"
            className="message-paper paper-in"
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
            disabled={currentIndex === 0}
          >
            Previous
          </button>

          <span className="message-dots">
            {currentIndex + 1} / {birthdayData.messages.length}
          </span>

          <button
            className="nav-btn"
            onClick={goNext}
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