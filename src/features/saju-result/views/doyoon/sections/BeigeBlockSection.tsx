"use client";

const BG = "#F8EFE6";
const LABEL_COLOR = "#AD7D38";
const HEADING_COLOR = "#2a1f15";
const ACCENT_COLOR = "#C5703E";
const SUBTITLE_COLOR = "#998f82";

export default function BeigeBlockSection() {
  return (
    <div
      className="w-full flex flex-col items-center"
      style={{
        background: BG,
        minHeight: "230px",
        padding: "15px 20px 32px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: "13px",
          color: LABEL_COLOR,
          fontFamily: "Pretendard, sans-serif",
          fontWeight: 500,
          letterSpacing: "0.2em",
          marginBottom: "16px",
        }}
      >
        도화선{" "}
        <span
          style={{
            fontFamily: '"NotoSerifTC", "ChosunNm", serif',
            fontWeight: 600,
          }}
        >
          (桃花線)
        </span>
      </p>

      <p
        style={{
          fontSize: "22px",
          fontFamily: "Pretendard, sans-serif",
          fontWeight: 500,
          color: HEADING_COLOR,
          lineHeight: 1.55,
          marginBottom: "12px",
          textWrap: "auto",
        }}
      >
        겉으로 드러나는 매력과
        <br />
        <span style={{ color: ACCENT_COLOR }}>실제 연애 패턴이</span>
        <br />
        꽤 다른 사람이에요.
      </p>

      <p
        style={{
          fontSize: "13px",
          fontFamily: "Pretendard, sans-serif",
          fontWeight: 400,
          color: SUBTITLE_COLOR,
        }}
      >
        본인도 모르는 이야기일 거예요.
      </p>
    </div>
  );
}
