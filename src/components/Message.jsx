import birthdayData from "../component/js/birthdayData";
import "../components/Gallery.css";

function Message({ onComplete }) {
  return (
    <section
      id="pageMessages"
      className="experience-page active"
    >
      <div className="scene-wrap">

        <div className="scene-title">
          <h2>
            A message for {birthdayData.recipient} 💌
          </h2>
        </div>

        <div className="messages-container">

          {birthdayData.messages.map((message, index) => (
            <div
              className="message-card"
              key={index}
            >

              <img
                src={message.image}
                alt={`Birthday memory ${index + 1}`}
              />

              <p>
                {message.text}
              </p>

            </div>
          ))}

        </div>

        <button onClick={onComplete}>
          Continue
        </button>

      </div>
    </section>
  );
}

export default Message;