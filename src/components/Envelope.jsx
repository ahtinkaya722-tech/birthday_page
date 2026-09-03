import { useState } from "react";
import "./Envelope.css";

function Envelope({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Sequence timing matching card slide up + scale + 3s hold + fade out
    setTimeout(() => {
      if (onOpen) onOpen();
    }, 4800);
  };

  return (
    <div className="experience-page active">
      <div className="envelope-container">
        {/* Header Text Section */}
        <div className={`envelope-header ${isOpen ? "fade-out" : ""}`}>
          <p className="wish-subtitle">A tiny wish is waiting</p>
          <h3 className="wish-title">စာအိတ်လေးကို ထိကြည့်ပါ</h3>
        </div>

        {/* Custom Envelope Stage */}
        <section className={`envelope-stage ${isOpen ? "open" : ""}`}>
          <div className="envelope">
            {/* New Envelope Body Base */}
            <div className="envelope-body"></div>

            <div className="letter">
              <div className="letter-content">
                <span>🎂</span>
                <h2>Happy Birthday!</h2>
                <p>You've got a special message...</p>
              </div>
            </div>

            <div className="envelope-front"></div>
            <div className="envelope-flap"></div>

            <button 
              className="wax-seal" 
              onClick={handleOpen} 
              disabled={isOpen}
              aria-label="Open envelope"
            >
              🎁
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Envelope;