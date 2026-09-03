import { useState, useRef, useEffect } from "react";
import "./Cake.css";

function Cake({ onComplete }) {
  // =========================
  // STATE
  // =========================
  const [isLit, setIsLit] = useState(false);
  const [cakeEffect, setCakeEffect] = useState(false);

  const [lighterPos, setLighterPos] = useState({
    x: 21.9298,
    y: 22.8069,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [countdown, setCountdown] = useState(null);

  // =========================
  // REFS
  // =========================
  const dragStart = useRef({
    x: 0,
    y: 0,
  });

  const candleRef = useRef(null);

  const countdownStarted = useRef(false);

  const timersRef = useRef([]);

  // =========================
  // START DRAGGING
  // =========================
  const handleStart = (clientX, clientY) => {
    // Don't allow dragging after candle is lit
    if (isLit || countdownStarted.current) {
      return;
    }

    setIsDragging(true);

    dragStart.current = {
      x: clientX - lighterPos.x,
      y: clientY - lighterPos.y,
    };
  };

  // =========================
  // START COUNTDOWN
  // =========================
  const startCountdown = () => {
    // Safety: prevent duplicate timers
    timersRef.current.forEach((timer) => {
      clearTimeout(timer);
    });

    timersRef.current = [];

    // =========================
    // 3
    // =========================
    setCountdown(3);

    const timer1 = setTimeout(() => {
      setCountdown(2);
    }, 1000);

    // =========================
    // 2
    // =========================
    const timer2 = setTimeout(() => {
      setCountdown(1);
    }, 2000);

    // =========================
    // 1 → SHAKE
    // =========================
    const timer3 = setTimeout(() => {
      // Remove countdown
      setCountdown(null);

      // Start cake shake
      setCakeEffect(true);

      // Wait until CSS shake animation finishes
      const shakeTimer = setTimeout(() => {
        setCakeEffect(false);

        // Move to Gallery
        if (onComplete) {
          onComplete();
        }
      }, 900);

      timersRef.current.push(shakeTimer);
    }, 3000);

    timersRef.current.push(
      timer1,
      timer2,
      timer3
    );
  };

  // =========================
  // HANDLE DRAGGING
  // =========================
  const handleMove = (clientX, clientY) => {
    if (
      !isDragging ||
      isLit ||
      countdownStarted.current
    ) {
      return;
    }

    const newX =
      clientX - dragStart.current.x;

    const newY =
      clientY - dragStart.current.y;

    setLighterPos({
      x: newX,
      y: newY,
    });

    // =========================
    // CHECK CANDLE
    // =========================
    if (!candleRef.current) {
      return;
    }

    const candleRect =
      candleRef.current.getBoundingClientRect();

    const candleCenterX =
      candleRect.left +
      candleRect.width / 2;

    const candleCenterY =
      candleRect.top +
      candleRect.height / 2;

    const distance = Math.hypot(
      clientX - candleCenterX,
      clientY - candleCenterY
    );

    // =========================
    // LIGHT CANDLE
    // =========================
    if (distance < 50) {
      countdownStarted.current = true;

      setIsLit(true);
      setIsDragging(false);

      // Start 3 → 2 → 1
      startCountdown();
    }
  };

  // =========================
  // END DRAGGING
  // =========================
  const handleEnd = () => {
    setIsDragging(false);
  };

  // =========================
  // CLEANUP
  // =========================
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => {
        clearTimeout(timer);
      });

      timersRef.current = [];
    };
  }, []);

  // =========================
  // CAKE DOTS
  // =========================
  const renderDots = (count) => {
    return Array.from({ length: count }).map(
      (_, index) => (
        <i
          key={index}
          className={`cake-dot ${
            index % 2 === 0
              ? "cake-dot-rose"
              : "cake-dot-white"
          }`}
        />
      )
    );
  };

  // =========================
  // JSX
  // =========================
  return (
    <section
      id="pageCake"
      className="experience-page active"

      onMouseMove={(e) =>
        handleMove(
          e.clientX,
          e.clientY
        )
      }

      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}

      onTouchMove={(e) => {
        if (e.touches[0]) {
          handleMove(
            e.touches[0].clientX,
            e.touches[0].clientY
          );
        }
      }}

      onTouchEnd={handleEnd}
    >
      <div className="scene-wrap">

        {/* =========================
            TITLE
        ========================= */}
        <div className="scene-title">
          <h2>
            A tiny wish is waiting
          </h2>

          <p
            id="cakeHint"
            className={
              isLit
                ? "lit-hint"
                : ""
            }
          >
            {isLit
              ? "Happy Birthday! 🎉"
              : "မီးခြစ်လေးကို ဖယောင်းတိုင်ဆီ ဆွဲယူပါ"}
          </p>
        </div>

        {/* =========================
            CAKE SCENE
        ========================= */}
        <div
          id="cakeScene"
          className="cake-scene visible"
        >
          <div className="cake-wrap">

            {/* =========================
                PLATE
            ========================= */}
            <div className="cake-plate"></div>

            {/* =========================
                CAKE SHAKE WRAPPER
            ========================= */}
            <div
              className={`cake-shake-wrapper ${
                cakeEffect ? "shaking" : ""
              }`}
            >
              {/* =========================
                  CAKE
              ========================= */}
              <div
                id="cake"
                className="cake"
              >

                {/* =========================
                    CANDLE
                ========================= */}
                <div
                  className="candle"
                  ref={candleRef}
                >
                  <i className="wick"></i>

                  <i
                    id="candleFlame"
                    className={`flame ${
                      isLit ? "lit" : ""
                    }`}
                  ></i>

                  {cakeEffect && (
                    <i className="candle-flare"></i>
                  )}
                </div>

                {/* =========================
                    TOP TIER
                ========================= */}
                <div className="cake-tier tier-top">
                  <i className="frosting"></i>

                  <div className="dots-container dots-top">
                    {renderDots(10)}
                  </div>
                </div>

                {/* =========================
                    MIDDLE TIER
                ========================= */}
                <div className="cake-tier tier-mid">
                  <i className="frosting"></i>

                  <div className="dots-container dots-mid">
                    {renderDots(15)}
                  </div>
                </div>

                {/* =========================
                    BOTTOM TIER
                ========================= */}
                <div className="cake-tier tier-bottom">
                  <i className="frosting"></i>

                  <div className="dots-container dots-bottom">
                    {renderDots(25)}
                  </div>
                </div>

              </div>
            </div>

            {/* =========================
                LIGHTER
            ========================= */}
            <div
              id="lighter"
              className={`lighter ${
                isDragging
                  ? "dragging"
                  : ""
              }`}

              aria-label="Drag the lighter to the candle"

              style={{
                transform: `translate3d(
                  ${lighterPos.x}px,
                  ${lighterPos.y}px,
                  0
                )`,
              }}

              onMouseDown={(e) =>
                handleStart(
                  e.clientX,
                  e.clientY
                )
              }

              onTouchStart={(e) => {
                if (e.touches[0]) {
                  handleStart(
                    e.touches[0].clientX,
                    e.touches[0].clientY
                  );
                }
              }}
            >
              <i className="lighter-spark"></i>

              <i className="lighter-top"></i>

              <i className="lighter-body">
                <span className="drag-label">
                  {isLit
                    ? "LIT"
                    : "DRAG"}
                </span>
              </i>
            </div>
          </div>

          {/* =========================
              COUNTDOWN
          ========================= */}
          {countdown !== null && (
            <div
              id="sceneCountdown"
              className="scene-countdown active"
            >
              {countdown}
            </div>
          )}

          {/* =========================
              CONFETTI
          ========================= */}
          <div
            id="confetti"
            className="confetti"
          ></div>
        </div>
      </div>
    </section>
  );
}

export default Cake;