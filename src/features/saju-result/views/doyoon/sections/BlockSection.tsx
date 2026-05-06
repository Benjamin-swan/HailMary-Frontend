"use client";

const TEXT_BLACK = "#1E1A16";
const TEXT_RED = "#D73F59";

export default function BlockSection() {
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{
        background: "#FDF5EA",
        height: "500px",
      }}
    >
      <p
        style={{
          color: TEXT_BLACK,
          textAlign: "center",
          fontFamily: '"Nanum Myeongjo", serif',
          fontSize: "20px",
          fontWeight: 800,
          lineHeight: 1.66,
          wordBreak: "keep-all",
          whiteSpace: "nowrap",
          padding: "0 8px",
          transform: "translateY(-30px)",
        }}
      >
        타고난 구성은 확인했어.
        <br />
        그럼 이제 데이터 너머의 이야기를 해보자.
        <br />
        <br />
        <span style={{ color: TEXT_RED }}>네가 가진 가장 강력한 무기</span>는 무엇인지,
        <br />
        그리고 네 연애를 가로막는 걸림돌은 무엇인지
        <br />
        명확하게 정리해 줄게.
        <br />
        자, 집중해 봐.
      </p>
    </div>
  );
}
