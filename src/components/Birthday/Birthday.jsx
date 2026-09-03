import { useState } from "react";
import birthdayData from "../../component/js/birthdayData";
import "./Birthday.css";

function Birthday() {
  const [currentMessage, setCurrentMessage] = useState(0);

  const message = birthdayData.messages[currentMessage];

  const nextMessage = () => {
    setCurrentMessage((prev) =>
      Math.min(
        prev + 1,
        birthdayData.messages.length - 1
      )
    );
  };

  const previousMessage = () => {
    setCurrentMessage((prev) =>
      Math.max(prev - 1, 0)
    );
  };

  return (
    <div className="birthday">

      <section className="birthday-screen">

        <p className="birthday-small-text">
          A SPECIAL MESSAGE FOR
        </p>

        <h1>
          {birthdayData.recipient}
        </h1>

        <p className="birthday-from">
          From {birthdayData.sender}
        </p>

      </section>

      <section className="message-screen">

        <div className="message-image-container">

          {message.image && (
            <img
              src={message.image}
              alt={`Memory ${currentMessage + 1}`}
              className="message-image"
            />
          )}

        </div>

        <div className="message-content">

          <span>
            {currentMessage + 1} /{" "}
            {birthdayData.messages.length}
          </span>

          <p>
            {message.text}
          </p>

        </div>

        <div className="message-controls">

          <button
            onClick={previousMessage}
            disabled={currentMessage === 0}
          >
            ← Previous
          </button>

          <button
            onClick={nextMessage}
            disabled={
              currentMessage ===
              birthdayData.messages.length - 1
            }
          >
            Next →
          </button>

        </div>

      </section>

    </div>
  );
}

export default Birthday;