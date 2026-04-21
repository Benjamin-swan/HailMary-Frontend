"use client";

import { MOCK_SAJU, type MockSaju } from "../data/mockSaju";

type Props = {
  intro: string;
  onNext: () => void;
  mockSaju?: MockSaju;
};

export default function SajuChartCards({
  intro,
  onNext,
  mockSaju = MOCK_SAJU,
}: Props) {
  return (
    <div
      className="absolute inset-0 z-20 flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Scrim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,19,17,0.94) 0%, rgba(20,19,17,0.82) 50%, rgba(20,19,17,0.94) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative flex flex-1 flex-col overflow-y-auto px-6 pb-8 pt-14">
        {/* Header */}
        <div className="text-center">
          <p
            className="text-[10px] tracking-[0.4em]"
            style={{ color: "#E6C58E" }}
          >
            ANALYSIS COMPLETE
          </p>
          <p
            className="mt-3 text-[14px] leading-relaxed"
            style={{ color: "#F5EDE0" }}
          >
            &ldquo;{intro}&rdquo;
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="mt-7 grid grid-cols-2 gap-3">
          {mockSaju.pillars.map((p) => (
            <div
              key={p.label}
              className="relative overflow-hidden rounded-2xl px-4 py-5"
              style={{
                background: "rgba(40,38,34,0.6)",
                backdropFilter: "blur(16px)",
                borderTop: "1px solid rgba(245,237,224,0.1)",
              }}
            >
              <p
                className="text-[10px] tracking-[0.3em]"
                style={{ color: p.hue, opacity: 0.85 }}
              >
                {p.label}
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <span
                  className="text-4xl font-black leading-none"
                  style={{
                    color: p.hue,
                    textShadow: `0 0 18px ${p.hue}55`,
                  }}
                >
                  {p.heaven}
                </span>
                <span
                  className="text-2xl font-bold leading-none"
                  style={{ color: "#D0C5B6" }}
                >
                  {p.earth}
                </span>
              </div>
              <p
                className="mt-3 text-[10px] tracking-[0.2em]"
                style={{ color: "#998f82" }}
              >
                {p.element}
              </p>
            </div>
          ))}
        </div>

        {/* Highlight */}
        <div
          className="relative mt-5 overflow-hidden rounded-2xl px-5 py-4"
          style={{
            background: "rgba(40,38,34,0.55)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(245,237,224,0.12)",
          }}
        >
          <p
            className="text-[10px] tracking-[0.3em]"
            style={{ color: "#E6C58E" }}
          >
            핵심 변수
          </p>
          <p
            className="mt-2 text-[13px] font-bold leading-relaxed"
            style={{ color: "#FFE2B3" }}
          >
            {mockSaju.highlight}
          </p>
          <p
            className="mt-2 text-[12px] leading-relaxed"
            style={{ color: "#D0C5B6" }}
          >
            {mockSaju.insight}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="mt-8 w-full rounded-2xl py-3.5 text-[13px] font-bold tracking-[0.3em] transition-transform active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #FFE2B3, #E6C58E)",
            color: "#412d04",
            boxShadow: "0 0 28px rgba(230,197,142,0.2)",
          }}
        >
          다음 단계로 →
        </button>
      </div>
    </div>
  );
}
