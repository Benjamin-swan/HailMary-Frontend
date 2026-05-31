export type CardProps = {
  children: React.ReactNode;
  className?: string;
  innerOverflow?: "hidden" | "visible";
};

export default function Card({ children, className = "", innerOverflow = "hidden" }: CardProps) {
  return (
    <div
      className={`kkebi-card${className ? " " + className : ""}`}
      style={{
        animation: "card-fade-in 0.4s ease-out",
        // 폭 380 기준 9:16 높이(~676px)에 위아래 45px씩(총 90px) 더해 세로를 키움.
        // 모바일은 100vw-72(양옆 36px)로 줄여 캐러셀 옆 카드 peek 간격 확보.
        aspectRatio: "9/16",
        minHeight: "calc(min(380px, calc(100vw - 72px)) * 16 / 9 + 90px)",
        backgroundColor: "var(--v2-bg-card)",
        backgroundImage: "url(/kkebi/cards/front.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        borderRadius: "20px",
        boxShadow: `
          0 4px 6px rgba(0, 0, 0, 0.3),
          0 16px 48px rgba(0, 0, 0, 0.5),
          0 0 24px rgba(232, 200, 125, 0.04)
        `,
        flexShrink: 0,
        margin: "0 auto",
        maxWidth: "380px",
        overflow: "hidden",
        position: "relative",
        width: "min(380px, calc(100vw - 72px))",
      }}
    >
      <div
        style={{
          bottom: "40px",
          left: "28px",
          overflow: innerOverflow,
          position: "absolute",
          right: "28px",
          top: "40px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
