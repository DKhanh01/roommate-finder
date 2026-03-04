"use client";

import api from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    api.get("/room").then((res) => console.log(res.data));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --cream: #F5F0E8;
          --sand: #E8DFD0;
          --terracotta: #C4714A;
          --rust: #A85432;
          --deep: #1C1A18;
          --muted: #6B6560;
          --accent: #D4A853;
        }

        * { box-sizing: border-box; }
        .hero-section, .hero-section * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background-color: var(--cream);
          font-family: 'DM Sans', sans-serif;
          color: var(--deep);
          overflow-x: hidden;
        }

        .hero-section {
          height: calc(100vh - 64px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
          overflow: hidden;
        }

        /* Left panel */
        .hero-left {
          background: var(--deep);
          padding: 40px 64px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          z-index: 2;
          overflow: hidden;
        }


        .hero-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 32px 0;
        }

        .eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--terracotta);
          margin-bottom: 28px;
          opacity: 0;
          animation: fadeUp 0.6s ease forwards 0.2s;
        }

        .headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(48px, 5.5vw, 80px);
          font-weight: 900;
          line-height: 1.05;
          color: var(--cream);
          margin-bottom: 32px;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 0.4s;
        }

        .headline em {
          font-style: italic;
          color: var(--accent);
        }

        .subtext {
          font-size: 16px;
          font-weight: 300;
          color: rgba(245, 240, 232, 0.6);
          line-height: 1.7;
          max-width: 340px;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 0.6s;
        }

        .cta-group {
          display: flex;
          flex-direction: column;
          gap: 14px;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 0.8s;
        }

        .cta-primary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 28px;
          background: var(--terracotta);
          color: white;
          text-decoration: none;
          border-radius: 4px;
          font-weight: 500;
          font-size: 15px;
          letter-spacing: 0.02em;
          transition: background 0.25s ease, transform 0.2s ease;
        }

        .cta-primary:hover {
          background: var(--rust);
          transform: translateX(4px);
        }

        .cta-secondary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 28px;
          background: transparent;
          color: var(--cream);
          text-decoration: none;
          border-radius: 4px;
          font-weight: 500;
          font-size: 15px;
          letter-spacing: 0.02em;
          border: 1px solid rgba(245, 240, 232, 0.2);
          transition: border-color 0.25s, transform 0.2s ease, background 0.25s;
        }

        .cta-secondary:hover {
          border-color: var(--accent);
          color: var(--accent);
          transform: translateX(4px);
          background: rgba(212, 168, 83, 0.06);
        }

        .arrow {
          font-size: 18px;
          transition: transform 0.2s;
        }

        .cta-primary:hover .arrow,
        .cta-secondary:hover .arrow {
          transform: translateX(4px);
        }


        /* Right panel */
        .hero-right {
          background: var(--sand);
          position: relative;
          overflow: hidden;
        }

        .hero-right::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse 60% 50% at 70% 30%, rgba(196,113,74,0.15) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 30% 80%, rgba(212,168,83,0.12) 0%, transparent 60%);
        }

        .city-visual {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 32px;
          overflow: hidden;
        }

        .building-grid {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          margin-bottom: 40px;
          opacity: 0;
          animation: fadeIn 1s ease forwards 0.5s;
        }

        .building {
          background: var(--deep);
          border-radius: 3px 3px 0 0;
          position: relative;
          flex-shrink: 0;
        }

        .building::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: repeating-linear-gradient(
            transparent,
            transparent 14px,
            rgba(212,168,83,0.08) 14px,
            rgba(212,168,83,0.08) 16px
          );
          border-radius: inherit;
        }

        .building-windows {
          position: absolute;
          inset: 8px 6px;
          display: grid;
          grid-template-columns: repeat(var(--cols, 2), 1fr);
          gap: 5px;
          align-content: start;
        }

        .window {
          background: var(--accent);
          border-radius: 1px;
          height: 8px;
          opacity: 0;
          animation: windowLight 0.4s ease forwards;
          animation-delay: var(--delay, 0s);
        }

        .window.dark { background: transparent; border: 1px solid rgba(255,255,255,0.06); }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 1.1s;
        }

        .stat-card {
          background: rgba(28, 26, 24, 0.06);
          border: 1px solid rgba(28,26,24,0.1);
          border-radius: 8px;
          padding: 20px;
          backdrop-filter: blur(4px);
        }

        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 700;
          color: var(--deep);
          line-height: 1;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 12px;
          color: var(--muted);
          font-weight: 400;
          letter-spacing: 0.03em;
        }

        .floating-tag {
          position: absolute;
          background: white;
          border-radius: 50px;
          padding: 10px 18px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 32px rgba(28,26,24,0.12);
          font-size: 13px;
          font-weight: 500;
          color: var(--deep);
          opacity: 0;
          animation: floatIn 0.6s ease forwards;
        }

        .tag-1 {
          top: 15%;
          right: 10%;
          animation-delay: 1.2s;
        }

        .tag-2 {
          top: 40%;
          right: 5%;
          animation-delay: 1.4s;
        }

        .tag-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4CAF50;
          flex-shrink: 0;
        }

        .tag-dot.orange { background: var(--terracotta); }

        /* Diagonal split line */
        .split-line {
          position: absolute;
          top: 0;
          bottom: 0;
          left: -1px;
          width: 2px;
          background: linear-gradient(to bottom, transparent, var(--terracotta) 30%, var(--accent) 70%, transparent);
          z-index: 3;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes floatIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes windowLight {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr auto;
          }
          .hero-left {
            padding: 40px 32px;
          }
          .hero-right {
            min-height: 300px;
          }
          .split-line { display: none; }
        }
      `}</style>

      <section className="hero-section">
        {/* Left — dark content panel */}
        <div className="hero-left">
          <div />

          <div className="hero-text">
            <p className="eyebrow">Thuê phòng & Tìm bạn trọ</p>
            <h1 className="headline">
              Nơi bạn<br />
              <em>gọi là nhà</em><br />
              đang chờ.
            </h1>
            <p className="subtext">
              Tìm phòng trọ ưng ý hoặc kết nối với người ở ghép phù hợp —
              nhanh chóng, tin cậy, dễ dàng.
            </p>
          </div>

          <div className="cta-group">
            <Link href="/room" className="cta-primary">
              <span>🏠&nbsp;&nbsp;Tìm Phòng Trọ</span>
              <span className="arrow">→</span>
            </Link>
            <Link href="/roommates" className="cta-secondary">
              <span>🤝&nbsp;&nbsp;Tìm Bạn Ở Ghép</span>
              <span className="arrow">→</span>
            </Link>
          </div>

        </div>

        {/* Right — visual panel */}
        <div className="hero-right">
          <div className="split-line" />

          {/* Floating live tags */}
          <div className="floating-tag tag-1">
            <span className="tag-dot" />
            <span>328 phòng mới hôm nay</span>
          </div>
          <div className="floating-tag tag-2">
            <span className="tag-dot orange" />
            <span>47 người đang tìm ghép</span>
          </div>

          <div className="city-visual">
            {/* Decorative building skyline */}
            <div className="building-grid">
              {[
                { h: 180, w: 40, cols: 2, lights: [1,1,0,1,1,0,1,1,1,0] },
                { h: 240, w: 55, cols: 3, lights: [1,0,1,1,1,0,1,1,0,1,1,1] },
                { h: 140, w: 35, cols: 2, lights: [1,1,1,0,1,1] },
                { h: 300, w: 60, cols: 3, lights: [1,1,0,1,0,1,1,1,0,1,1,1,0,1,1] },
                { h: 200, w: 45, cols: 2, lights: [0,1,1,1,0,1,1,0,1,1] },
                { h: 160, w: 38, cols: 2, lights: [1,0,1,1,1,0,1,1] },
                { h: 280, w: 52, cols: 3, lights: [0,1,1,1,1,0,1,0,1,1,1,1] },
                { h: 120, w: 32, cols: 2, lights: [1,1,0,1,1,0] },
              ].map((b, i) => (
                <div
                  key={i}
                  className="building"
                  style={{ height: b.h, width: b.w, '--cols': b.cols } as React.CSSProperties}
                >
                  <div className="building-windows">
                    {b.lights.map((lit, j) => (
                      <div
                        key={j}
                        className={`window${lit ? '' : ' dark'}`}
                        style={{ '--delay': `${0.8 + j * 0.07}s` } as React.CSSProperties}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-number">12K+</div>
                <div className="stat-label">Phòng đăng ký</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">8K+</div>
                <div className="stat-label">Người tìm ghép</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">30+</div>
                <div className="stat-label">Tỉnh thành</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}