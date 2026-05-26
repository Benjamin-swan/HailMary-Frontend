type PageContainerProps = {
  children: React.ReactNode;
  fullWidth?: boolean;
};

export default function PageContainer({ children, fullWidth = false }: PageContainerProps) {
  return (
    <div
      data-kkebi-scene
      style={{
        backgroundColor: "var(--v2-bg-deep)",
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          height: "100%",
          inset: 0,
          objectFit: "cover",
          position: "fixed",
          width: "100%",
          zIndex: 0,
        }}
      >
        <source
          src="/kkebi/backgrounds/bg-cinemagraphy-wide.mp4"
          type="video/mp4"
          media="(min-width: 768px)"
        />
        <source
          src="/kkebi/backgrounds/bg-cinemagraphy.mp4"
          type="video/mp4"
        />
      </video>

      <div
        style={{
          backgroundColor: "rgba(26, 15, 46, 0.60)",
          inset: 0,
          position: "fixed",
          zIndex: 1,
        }}
      />

      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
          padding: fullWidth ? 0 : "16px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {fullWidth ? (
          children
        ) : (
          <div style={{ maxWidth: "420px", width: "100%" }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
