import Image from "next/image";

// 에필로그 모서리 실 장식 방향 QA 페이지 (2026-06-05).
// 상단: 수정 적용 결과 (좌상 180° / 우하 90°) — EpiloguePage와 동일 transform.
// 하단: 회전 비교 그리드 — 방향이 어긋나 보이면 맞는 각도 번호로 알려주면 됨.

const THREAD = "/yeonwoo/thread/thread_corner.png";
const ROTATIONS = [0, 90, 180, 270] as const;

function CornerSpan({
  pos,
  deg,
}: {
  pos: "tl" | "br";
  deg: number;
}) {
  const posClass =
    pos === "tl" ? "-top-3 -left-3" : "-bottom-3 -right-3";
  return (
    <span
      aria-hidden
      className={`absolute ${posClass} w-[60px] h-[60px] bg-no-repeat bg-contain pointer-events-none opacity-65 z-10`}
      style={{ backgroundImage: `url(${THREAD})`, transform: `rotate(${deg}deg)` }}
    />
  );
}

function Frame({ tlDeg, brDeg, label }: { tlDeg: number; brDeg: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex justify-center">
        <CornerSpan pos="tl" deg={tlDeg} />
        <CornerSpan pos="br" deg={brDeg} />
        <div className="relative w-[240px] h-[240px]">
          <Image
            src="/yeonwoo/sd_yw/yw_cg_c.png"
            alt="강연우 — 클로징"
            fill
            sizes="240px"
            style={{
              objectFit: "contain",
              filter: "drop-shadow(0 0 18px rgba(232,201,160,0.40))",
            }}
          />
        </div>
      </div>
      <p className="text-[12px] text-neutral-400">{label}</p>
    </div>
  );
}

export default function DevEpilogueCorners() {
  return (
    <main className="bg-[#0a0a09] min-h-[100dvh] mx-auto max-w-[430px] px-3 pt-6 pb-[100px] text-neutral-200">
      <h1 className="text-[15px] font-bold mb-1">에필로그 모서리 장식 방향 QA</h1>
      <p className="text-[12px] text-neutral-400 mb-6">
        ① 수정 적용본 확인 → 이상하면 ② 그리드에서 맞는 각도 번호로 답해주세요.
      </p>

      <h2 className="text-[13px] font-semibold mb-3">① 수정 적용본 (좌상 270° / 우하 90°)</h2>
      <div className="mb-10 py-6 rounded-xl border border-neutral-800">
        <Frame tlDeg={270} brDeg={90} label="현재 EpiloguePage 적용 상태 (QA 2차)" />
      </div>

      <h2 className="text-[13px] font-semibold mb-1">② 회전 비교 그리드 (장식 단품)</h2>
      <p className="text-[11px] text-neutral-500 mb-3">
        참고 — 기존 라이브: 좌상 0° / 우하 180°
      </p>
      <div className="grid grid-cols-4 gap-3">
        {ROTATIONS.map((deg) => (
          <div key={deg} className="flex flex-col items-center gap-1">
            <div className="w-[70px] h-[70px] rounded-lg border border-neutral-800 flex items-center justify-center">
              <span
                aria-hidden
                className="block w-[56px] h-[56px] bg-no-repeat bg-contain"
                style={{
                  backgroundImage: `url(${THREAD})`,
                  transform: `rotate(${deg}deg)`,
                }}
              />
            </div>
            <span className="text-[11px] text-neutral-400">{deg}°</span>
          </div>
        ))}
      </div>
    </main>
  );
}
