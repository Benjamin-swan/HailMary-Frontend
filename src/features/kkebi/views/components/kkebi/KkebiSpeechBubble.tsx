export type KkebiSpeechBubbleProps = {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  style?: React.CSSProperties;
};

export default function KkebiSpeechBubble({
  text,
  position = "right",
  style,
}: KkebiSpeechBubbleProps) {
  void position; // 말풍선 꼬리 방향 — 추후 적용

  return (
    <div
      style={{
        background: "var(--v2-bg-overlay)",
        border: "1px solid var(--v2-gold-border)",
        borderRadius: "12px",
        padding: "8px 14px",
        color: "var(--v2-text-primary)",
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-sm)",
        lineHeight: "var(--lh-normal)",
        maxWidth: "220px",
        wordBreak: "keep-all",
        ...style,
      }}
    >
      {text}
    </div>
  );
}
