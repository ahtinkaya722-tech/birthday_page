import { useState } from "react";
import birthdayData from "../component/js/birthdayData";
import "./FinalSuprise.css";

function FinalSurprise({ onComplete }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="pageSurprise" className="experience-page active">
      <div className="fs-letter-shell">
        {!isOpen ? (
          <div className="fs-letter-teaser">
            <div className="fs-letter-title">
              <small>One last thing...</small>
              <h2>I have a special note for you ❤️</h2>
            </div>

            <button
              className="fs-letter-action-btn"
              onClick={() => setIsOpen(true)}
            >
              Read Your Letter 📜
            </button>
          </div>
        ) : (
          /* Parchment Letter Card */
          <div className="fs-letter-card fs-letter-animate-open">
            <div className="fs-letter-card-header">
              <span className="fs-letter-stamp">💌</span>
              <p className="fs-letter-date">Special Day</p>
            </div>

            <div className="fs-letter-card-body">
              <h1 className="fs-letter-recipient">
                Happy Birthday, {birthdayData.recipient}! 🎂
              </h1>

              <div className="fs-letter-divider"></div>

              <p className="fs-letter-burmese-wish">
                မွေးနေ့မှာ ပျော်ရွှင်ပါ‌စေသူငယ်ချင်း ✨
              </p>

              <div className="fs-letter-divider"></div>

              <p className="fs-letter-sender">
                With love, <br />
                <strong>{birthdayData.sender}</strong>
              </p>
            </div>

            {/* Floating Background Particles */}
            <div className="fs-letter-particles">
              <span>💖</span>
              <span>✨</span>
              <span>🌸</span>
              <span>❤️</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default FinalSurprise;