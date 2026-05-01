"use client";

function StarRow({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          style={{
            color: i < filled ? "#E05C6A" : "#3a2a2a",
            fontSize: "13px",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({
  ilju,
  name,
  stars,
  body,
}: {
  ilju: string;
  name: string;
  stars: number;
  body: string;
}) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "#1a0e10",
        border: "1px solid #3a2024",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className="inline-block text-[11px] tracking-wider px-2.5 py-0.5 rounded-md"
            style={{ border: "1px solid #5a2a30", color: "#E6A88E" }}
          >
            {ilju}
          </span>
          <span className="text-[12px]" style={{ color: "#c9b89e" }}>
            {name}
          </span>
        </div>
        <StarRow filled={stars} />
      </div>
      <p className="text-[13px] leading-relaxed mb-3" style={{ color: "#D0C5B6" }}>
        {body}
      </p>
      <span
        className="inline-block text-[10px] tracking-wider px-2 py-0.5 rounded"
        style={{ border: "1px solid #4a3a30", color: "#856C51" }}
      >
        강연우 버전
      </span>
    </div>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-2">
      <p className="text-[24px] font-bold" style={{ color: "#E6C58E" }}>
        {value}
      </p>
      <p className="text-[11px]" style={{ color: "#998f82" }}>
        {label}
      </p>
    </div>
  );
}

export function RealReviewsSection() {
  return (
    <div className="w-full px-5 py-12" style={{ background: "#000" }}>
      <h2
        className="text-center text-[22px] font-bold tracking-[0.05em] mb-2"
        style={{ color: "#E8DDC8" }}
      >
        실제 후기
      </h2>
      <p
        className="text-center text-[12px] tracking-[0.08em] mb-3"
        style={{ color: "#998f82" }}
      >
        도화선을 경험한 사람들
      </p>
      <div className="flex justify-center mb-7">
        <div className="w-12 h-[1px]" style={{ background: "#c9a96e", opacity: 0.7 }} />
      </div>

      <div className="flex items-center justify-center gap-8 mb-8">
        <StatBlock value="★ 4.9" label="평균 별점" />
        <div className="w-px h-10" style={{ background: "#3a3530" }} />
        <StatBlock value="94%" label="재방문율" />
      </div>

      <div className="flex flex-col gap-3">
        <ReviewCard
          ilju="壬戌"
          name="언*님"
          stars={5}
          body="연우한테 팩폭 맞은 줄 알았는데 다 맞아서 소름이었어요. 제 사주에 진짜 이런 게 걸려있는 줄 몰랐어요."
        />
        <ReviewCard
          ilju="甲午"
          name="달*님"
          stars={5}
          body="피해야 할 인연 설명 읽다가 전 남친 생각나서 진짜 등골 서늘했어요. 왜 그 사람이 위험했는지 이제 알겠음."
        />
        <ReviewCard
          ilju="庚子"
          name="하*님"
          stars={4}
          body="처음엔 반신반의했는데 인연 시기 보고 나서 결제했어요. 피크월이 생각보다 빨리 와서 놀랐습니다."
        />
      </div>
    </div>
  );
}
