import Card from "./shared/Card";
import PageContainer from "./shared/PageContainer";
import KkebiSlot from "./kkebi/KkebiSlot";

// 깨비 로딩 화면의 순수 UI (라우팅 로직 없음).
// KkebiLoadingView(로딩 페이지)와 KkebiResultView(fortune 응답 대기) 양쪽이 공유.
// [HM-FE-107] 결과 페이지에서 isReady 전 검은 화면 대신 이 UI를 노출.
export default function KkebiLoadingContent() {
  return (
    <PageContainer>
      <Card innerOverflow="visible">
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              animation: "kkebi-pulse 2s ease-in-out infinite",
              transform: "scale(1.5)",
              transformOrigin: "center center",
            }}
          >
            <KkebiSlot mood="M1" pose="loading" size="xl" customWidth="72%" />
          </div>
          <p
            style={{
              color: "var(--v2-text-muted)",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              letterSpacing: "var(--ls-wide)",
              margin: 0,
            }}
          >
            깨비가 오늘 운세를 살피고 있어...
          </p>
        </div>
      </Card>
    </PageContainer>
  );
}
