"use client";

const TEXT_BLACK = "#1E1A16";
const TEXT_RED = "#D73F59";

export default function BlockSection() {
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{
        background: "#FDF5EA",
        // 위 CharmCards 루트 paddingBottom(68px, 투명→씬 베이지)을 상쇄해
        // 텍스트가 합쳐진 베이지 영역 중앙에 오도록 상단을 그만큼 줄임.
        padding: "24px 0 92px",
        containerType: "inline-size",
      }}
    >
      <p
        style={{
          color: TEXT_BLACK,
          textAlign: "center",
          fontFamily: '"Nanum Myeongjo", serif',
          fontSize: "min(20px, 5cqw)",
          fontWeight: 800,
          lineHeight: 1.66,
          wordBreak: "keep-all",
          whiteSpace: "nowrap",
          padding: "0 8px",
        }}
      >
        <span style={{ display: "block" }}>
          기본 사주 데이터는 다 확인했습니다.
        </span>
        <span style={{ display: "block", marginTop: "0.9em" }}>
          이제 그 너머에 어떤 패턴이
          <br />
          움직이고 있는지 같이 들여다볼 차례예요.
        </span>
        <span style={{ display: "block", marginTop: "1.1em" }}>
          <span style={{ color: TEXT_RED }}>연애에서 가장 큰 강점으로 작동하는</span>
          <br />
          변수가 뭔지, 그리고
          <br />
          자주 발목을 잡는 리스크 변수는 뭔지,
          <br />
          두 가지를 또렷하게 정리해 드릴게요.
        </span>
      </p>
    </div>
  );
}
