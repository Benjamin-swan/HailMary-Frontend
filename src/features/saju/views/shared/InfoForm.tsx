"use client";

import { useState, useEffect, useMemo } from "react";
import { trackEvent } from "@/shared/utils/analytics";

export type SajuInfo = {
  name: string;
  birth: string;
  calendar: "solar" | "lunar";
  time: string;
  gender: "female" | "male";
};

type Props = {
  onSubmit: (info: SajuInfo) => void;
  buttonLabel?: string;
  characterId?: string;
};

// 십이지시 — 자(子) 시는 조자(早子)/야자(夜子)로 분리
const TIME_SLOTS: ReadonlyArray<{ value: string; label: string }> = [
  { value: "unknown", label: "시간 모름" },
  { value: "00:00", label: "조자/朝子 (00:00~01:29)" },
  { value: "01:30", label: "축/丑 (01:30~03:29)" },
  { value: "03:30", label: "인/寅 (03:30~05:29)" },
  { value: "05:30", label: "묘/卯 (05:30~07:29)" },
  { value: "07:30", label: "진/辰 (07:30~09:29)" },
  { value: "09:30", label: "사/巳 (09:30~11:29)" },
  { value: "11:30", label: "오/午 (11:30~13:29)" },
  { value: "13:30", label: "미/未 (13:30~15:29)" },
  { value: "15:30", label: "신/申 (15:30~17:29)" },
  { value: "17:30", label: "유/酉 (17:30~19:29)" },
  { value: "19:30", label: "술/戌 (19:30~21:29)" },
  { value: "21:30", label: "해/亥 (21:30~23:29)" },
  { value: "23:30", label: "야자/夜子 (23:30~23:59)" },
];

export default function InfoForm({ onSubmit, buttonLabel = "도윤에게 알려주기 →", characterId }: Props) {
  useEffect(() => {
    trackEvent("info_form_view", { character_id: characterId });
  }, []);

  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [calendar, setCalendar] = useState<"solar" | "lunar">("solar");
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [gender, setGender] = useState<"female" | "male" | null>(null);

  const birthError = useMemo(() => validateBirth(birth), [birth]);
  const isValid =
    name.trim().length > 0 &&
    /^\d{4}\.\d{2}\.\d{2}$/.test(birth) &&
    birthError === null &&
    timeSlot !== "" &&
    gender !== null;

  const handleSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isValid || !gender) return;
    trackEvent("info_form_submit", {
      character_id: characterId,
      gender,
      birth_year: birth.slice(0, 4),
      birth_month: birth.slice(5, 7),
      calendar,
      has_birth_time: timeSlot !== "unknown",
    });
    onSubmit({ name: name.trim(), birth, calendar, time: timeSlot, gender });
  };

  return (
    <div className="absolute inset-0 z-20 flex flex-col" onClick={(e) => e.stopPropagation()}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(20,19,17,0.92) 0%, rgba(20,19,17,0.78) 50%, rgba(20,19,17,0.92) 100%)" }}
      />
      <div className="relative flex flex-1 flex-col overflow-y-auto px-6 pb-8 pt-14">
        <div className="text-center">
          <p className="mt-3 text-[16px] leading-relaxed font-medium" style={{ color: "#F5EDE0" }}>
            정확한 분석을 위해<br />사주 정보를 입력해 주세요.
          </p>
        </div>

        <div className="mt-9 flex-1 space-y-6">
          <Field label="이름">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full bg-transparent py-2 text-[16px] font-medium outline-none placeholder:text-[#998f82]"
              style={{ color: "#F5EDE0", borderBottom: "1px solid rgba(245,237,224,0.15)" }} />
          </Field>

          <Field label="생년월일">
            <div className="space-y-2.5">
              <input type="text" value={birth} onChange={(e) => setBirth(formatBirth(e.target.value))}
                placeholder="YYYY.MM.DD" maxLength={10} inputMode="numeric"
                className="w-full bg-transparent py-2 text-[16px] font-medium outline-none placeholder:text-[#998f82]"
                style={{ color: "#F5EDE0", borderBottom: "1px solid rgba(245,237,224,0.15)" }} />
              <div className="flex gap-2">
                <Chip selected={calendar === "solar"} onClick={() => setCalendar("solar")} wide>양력</Chip>
                <Chip selected={calendar === "lunar"} onClick={() => setCalendar("lunar")} wide>음력</Chip>
              </div>
              {birthError && (
                <p className="text-[12px]" style={{ color: "#E89A8A" }}>{birthError}</p>
              )}
            </div>
          </Field>

          <Field label="태어난 시간">
            <div className="relative">
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full cursor-pointer appearance-none bg-transparent py-2 pr-8 text-[16px] font-medium outline-none"
                style={{
                  color: timeSlot ? "#F5EDE0" : "#998f82",
                  borderBottom: "1px solid rgba(245,237,224,0.15)",
                }}
              >
                <option value="" disabled>시간을 선택하세요</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot.value} value={slot.value} style={{ color: "#141311", background: "#F5EDE0" }}>
                    {slot.label}
                  </option>
                ))}
              </select>
              <span
                aria-hidden
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px]"
                style={{ color: "#998f82" }}
              >
                ▼
              </span>
            </div>
          </Field>

          <Field label="성별">
            <div className="flex gap-3">
              <Chip selected={gender === "female"} onClick={() => setGender("female")} wide>여성</Chip>
              <Chip selected={gender === "male"} onClick={() => setGender("male")} wide>남성</Chip>
            </div>
          </Field>
        </div>

        <button onClick={handleSubmit} disabled={!isValid}
          className="mt-8 w-full rounded-lg py-3.5 text-[16px] font-bold tracking-[0.1em] transition-all"
          style={{
            background: isValid ? "linear-gradient(135deg, #FFE2B3, #E6C58E)" : "rgba(230,197,142,0.18)",
            color: isValid ? "#412d04" : "rgba(208,197,182,0.5)",
            boxShadow: isValid ? "0 0 28px rgba(230,197,142,0.2)" : "none",
            cursor: isValid ? "pointer" : "not-allowed",
          }}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-[16px] font-medium tracking-[0.1em]" style={{ color: "#D0C5B6" }}>{label}</label>
      {children}
    </div>
  );
}

function Chip({ selected, onClick, children, wide = false }: {
  selected: boolean; onClick: () => void; children: React.ReactNode; wide?: boolean;
}) {
  return (
    <button type="button" onClick={onClick}
      className={`cursor-pointer whitespace-nowrap rounded-lg tracking-[0.1em] transition-all ${wide ? "flex-1 py-2.5 text-[16px]" : "px-4 py-1.5 text-[14px]"}`}
      style={{
        background: selected ? "#E6C58E" : "rgba(40,38,34,0.6)",
        color: selected ? "#412d04" : "#D0C5B6",
        backdropFilter: "blur(10px)",
        fontWeight: selected ? 800 : 600,
      }}>
      {children}
    </button>
  );
}

function formatBirth(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}.${digits.slice(4)}`;
  return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6)}`;
}

function validateBirth(birth: string): string | null {
  if (!/^\d{4}\.\d{2}\.\d{2}$/.test(birth)) return null; // 입력 미완료는 에러로 표시하지 않음
  const [yStr, moStr, dStr] = birth.split(".");
  const y = Number(yStr);
  const mo = Number(moStr);
  const d = Number(dStr);
  const thisYear = new Date().getFullYear();
  if (y < 1900 || y > thisYear) return `연도는 1900~${thisYear} 사이여야 해요`;
  if (mo < 1 || mo > 12) return "월은 01~12 사이여야 해요";
  const date = new Date(y, mo - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== mo - 1 || date.getDate() !== d) {
    return "존재하지 않는 날짜에요";
  }
  return null;
}
