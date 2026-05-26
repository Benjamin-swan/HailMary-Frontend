type CardIndicatorProps = {
  total: number;
  current: number;
};

export default function CardIndicator({ total, current }: CardIndicatorProps) {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: i === current ? "var(--v2-gold)" : "var(--v2-gold-border)",
            transition: "background 0.2s",
          }}
        />
      ))}
    </div>
  );
}
