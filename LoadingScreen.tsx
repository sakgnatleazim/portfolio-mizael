"use client";

import { useEffect, useState, useRef } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [counter, setCounter] = useState(0);
  const [lettersReady, setLettersReady] = useState(false);
  const counterRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const NAME = "Mizael";
  const BLUE_IDX = [0, 3]; // M and a

  useEffect(() => {
    // Small delay so CSS animations start clean
    const t = setTimeout(() => setLettersReady(true), 50);

    // Count up to 100
    counterRef.current = setInterval(() => {
      setCounter((prev) => {
        const next = Math.min(100, prev + Math.floor(Math.random() * 12) + 5);
        if (next >= 100 && counterRef.current) clearInterval(counterRef.current);
        return next;
      });
    }, 45);

    // Hide loader after animation completes (~1.4s total)
    const hide = setTimeout(() => {
      setVisible(false);
    }, 1500);

    return () => {
      clearTimeout(t);
      clearTimeout(hide);
      if (counterRef.current) clearInterval(counterRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes gridIn   { to { opacity: 1; } }
        @keyframes cIn      { to { opacity: 1; } }
        @keyframes scanDown {
          0%   { top: 8%;  opacity: 0; }
          5%   { opacity: 0.7; }
          95%  { opacity: 0.7; }
          100% { top: 92%; opacity: 0; }
        }
        @keyframes fadeInTag { to { opacity: 1; } }
        @keyframes dropIn   { to { opacity: 1; transform: translateY(0); } }
        @keyframes lineExpand { to { width: 100%; } }
        @keyframes fadeInSub  { to { opacity: 1; } }
        @keyframes barGrow    { to { width: 100%; } }
        @keyframes dotP {
          0%,100% { background: #e2e8f0; transform: scale(1); }
          50%     { background: #2563eb; transform: scale(1.5); }
        }
        @keyframes loaderFadeOut {
          to { opacity: 0; pointer-events: none; }
        }

        .mkt-loader {
          position: fixed; inset: 0; z-index: 9999;
          background: #ffffff;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          animation: loaderFadeOut 0.35s ease 1.15s forwards;
        }
        .mkt-dot-grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, #d1d5db 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0; animation: gridIn 0.25s ease forwards;
        }
        .mkt-corner {
          position: absolute; width: 20px; height: 20px;
          opacity: 0; animation: cIn 0.15s ease 0.05s forwards;
        }
        .mkt-corner.tl { top:20px;  left:20px;  border-top:2px solid #2563eb; border-left:2px solid #2563eb; }
        .mkt-corner.tr { top:20px;  right:20px; border-top:2px solid #2563eb; border-right:2px solid #2563eb; }
        .mkt-corner.bl { bottom:20px; left:20px;  border-bottom:2px solid #2563eb; border-left:2px solid #2563eb; }
        .mkt-corner.br { bottom:20px; right:20px; border-bottom:2px solid #2563eb; border-right:2px solid #2563eb; }
        .mkt-scan {
          position: absolute; left:0; right:0; height:2px;
          background: linear-gradient(90deg, transparent 0%, #2563eb 40%, #93c5fd 60%, transparent 100%);
          opacity:0; animation: scanDown 0.9s ease-in-out 0.15s infinite;
        }
        .mkt-content { z-index:2; text-align:center; position:relative; }
        .mkt-tag {
          font-size:10px; letter-spacing:0.3em; color:#2563eb;
          font-family:'Courier New',monospace; text-transform:uppercase;
          display:flex; align-items:center; justify-content:center; gap:8px;
          margin-bottom:18px;
          opacity:0; animation: fadeInTag 0.2s ease 0.1s forwards;
        }
        .mkt-tag-line { width:28px; height:1.5px; background:#2563eb; }
        .mkt-name-row { display:flex; justify-content:center; }
        .mkt-ch {
          font-size: clamp(40px, 8vw, 60px); font-weight:800;
          font-family:'Georgia',serif; color:#0f172a;
          display:inline-block; opacity:0; transform:translateY(40px);
          animation: dropIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards;
          line-height:1;
        }
        .mkt-ch.blue { color:#2563eb; }
        .mkt-underline-wrap { position:relative; height:3px; margin-top:6px; overflow:hidden; }
        .mkt-underline-fill {
          position:absolute; left:50%; transform:translateX(-50%);
          height:3px; width:0; background:#2563eb; border-radius:2px;
          animation: lineExpand 0.35s cubic-bezier(0.4,0,0.2,1) 0.75s forwards;
        }
        .mkt-sub {
          margin-top:14px; font-size:12px; letter-spacing:0.18em;
          color:#64748b; font-family:'Courier New',monospace; text-transform:uppercase;
          opacity:0; animation: fadeInSub 0.3s ease 0.9s forwards;
        }
        .mkt-dots { display:flex; gap:7px; justify-content:center; margin-top:22px; }
        .mkt-dot {
          width:5px; height:5px; border-radius:50%; background:#e2e8f0;
          animation: dotP 0.7s ease-in-out infinite;
        }
        .mkt-dot:nth-child(2) { animation-delay:0.15s; }
        .mkt-dot:nth-child(3) { animation-delay:0.3s; }
        .mkt-bar-wrap { position:absolute; bottom:0; left:0; right:0; height:3px; background:#f1f5f9; }
        .mkt-bar-fill {
          height:100%; width:0; background:#2563eb;
          animation: barGrow 1.2s cubic-bezier(0.4,0,0.2,1) 0.1s forwards;
        }
        .mkt-counter {
          position:absolute; bottom:12px; right:18px;
          font-size:10px; font-family:'Courier New',monospace;
          color:#94a3b8; letter-spacing:0.1em;
        }
      `}</style>

      <div className="mkt-loader" aria-label="Loading" role="status">
        <div className="mkt-dot-grid" />
        <div className="mkt-corner tl" />
        <div className="mkt-corner tr" />
        <div className="mkt-corner bl" />
        <div className="mkt-corner br" />
        <div className="mkt-scan" />

        <div className="mkt-content">
          <div className="mkt-tag">
            <span className="mkt-tag-line" />
            Data &amp; Informatics
            <span className="mkt-tag-line" />
          </div>

          <div className="mkt-name-row">
            {NAME.split("").map((ch, i) => (
              <span
                key={i}
                className={`mkt-ch${BLUE_IDX.includes(i) ? " blue" : ""}`}
                style={{ animationDelay: `${0.15 + i * 0.06}s` }}
              >
                {ch}
              </span>
            ))}
          </div>

          <div className="mkt-underline-wrap">
            <div className="mkt-underline-fill" />
          </div>

          <div className="mkt-sub">Informatics Engineering Student</div>

          <div className="mkt-dots">
            <div className="mkt-dot" />
            <div className="mkt-dot" />
            <div className="mkt-dot" />
          </div>
        </div>

        <div className="mkt-bar-wrap">
          <div className="mkt-bar-fill" />
        </div>
        <div className="mkt-counter">
          {String(counter).padStart(3, "0")}%
        </div>
      </div>
    </>
  );
}
