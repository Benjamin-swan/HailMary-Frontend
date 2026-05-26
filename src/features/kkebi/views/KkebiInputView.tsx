"use client";

import { ZODIAC_HOURS } from "../domain/constants";
import {
  GENDER_OPTIONS,
  useKkebiInputForm,
} from "../hooks/useKkebiInputForm";
import Card from "./components/shared/Card";
import PageContainer from "./components/shared/PageContainer";
import KkebiSlot from "./components/kkebi/KkebiSlot";

export function KkebiInputView() {
  const f = useKkebiInputForm();

  if (!f.isReady) return null;

  function fieldStyle(fieldName: string): React.CSSProperties {
    return {
      appearance: "none",
      background: "var(--v2-bg-card)",
      border: `1px solid ${
        f.focusedField === fieldName ? "var(--v2-gold)" : "var(--v2-gold-border)"
      }`,
      borderRadius: "8px",
      boxSizing: "border-box",
      color: "var(--v2-text-primary)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-base)",
      outline: "none",
      padding: "12px 14px",
      width: "100%",
    };
  }

  const labelStyle: React.CSSProperties = {
    color: "var(--v2-text-secondary)",
    display: "block",
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-sm)",
    letterSpacing: "var(--ls-wide)",
    marginBottom: "8px",
  };

  return (
    <PageContainer>
      <Card>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          {/* 깨비 top-center */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "-27px" }}>
            <KkebiSlot
              mood={f.mood}
              pose="corner"
              size="lg"
              bubbleText={f.bubbleText}
              bubblePosition="bottom"
            />
          </div>

          <form
            onSubmit={f.handleSubmit}
            noValidate
            style={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: "16px",
            }}
          >
            {/* 이름 */}
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="input-name" style={labelStyle}>이름</label>
              <input
                id="input-name"
                type="text"
                value={f.name}
                onChange={(e) => f.setName(e.target.value)}
                onFocus={() => f.setFocusedField("name")}
                onBlur={() => f.setFocusedField(null)}
                maxLength={10}
                autoComplete="off"
                placeholder="이름을 입력해주세요"
                style={fieldStyle("name")}
              />
            </div>

            {/* 생년월일 */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ ...labelStyle, marginBottom: 0 }}>생년월일</span>
                <button
                  type="button"
                  onClick={() => f.setIsLunar((v) => !v)}
                  style={{
                    background: "none",
                    border: "1px solid var(--v2-gold-border)",
                    borderRadius: "20px",
                    color: f.isLunar ? "var(--v2-gold)" : "var(--v2-text-muted)",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    padding: "4px 10px",
                  }}
                >
                  {f.isLunar ? "음력" : "양력"} ⇄
                </button>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <select
                  aria-label="년"
                  value={f.year}
                  onChange={(e) => f.setYear(e.target.value)}
                  onFocus={() => f.setFocusedField("year")}
                  onBlur={() => f.setFocusedField(null)}
                  style={{ ...fieldStyle("year"), flex: 2 }}
                >
                  <option value="">년</option>
                  {f.yearOptions.map((y) => (
                    <option key={y} value={y}>{y}년</option>
                  ))}
                </select>
                <select
                  aria-label="월"
                  value={f.month}
                  onChange={(e) => f.setMonth(e.target.value)}
                  onFocus={() => f.setFocusedField("month")}
                  onBlur={() => f.setFocusedField(null)}
                  style={{ ...fieldStyle("month"), flex: 1 }}
                >
                  <option value="">월</option>
                  {f.monthOptions.map((m) => (
                    <option key={m} value={m}>{m}월</option>
                  ))}
                </select>
                <select
                  aria-label="일"
                  value={f.day}
                  onChange={(e) => f.setDay(e.target.value)}
                  onFocus={() => f.setFocusedField("day")}
                  onBlur={() => f.setFocusedField(null)}
                  style={{ ...fieldStyle("day"), flex: 1 }}
                >
                  <option value="">일</option>
                  {f.dayOptions.map((d) => (
                    <option key={d} value={d}>{d}일</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 시(時) */}
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="input-hour" style={labelStyle}>시(時)</label>
              <select
                id="input-hour"
                value={f.hour}
                onChange={(e) => f.setHour(e.target.value)}
                onFocus={() => f.setFocusedField("hour")}
                onBlur={() => f.setFocusedField(null)}
                style={fieldStyle("hour")}
              >
                <option value="unknown">모름</option>
                {ZODIAC_HOURS.map((z) => (
                  <option key={z.index} value={String(z.index)}>{z.label}</option>
                ))}
              </select>
            </div>

            {/* 성별 */}
            <div style={{ marginBottom: "28px" }}>
              <span style={labelStyle}>성별</span>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {GENDER_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    style={{
                      alignItems: "center",
                      color: f.gender === opt.value
                        ? "var(--v2-gold)"
                        : "var(--v2-text-primary)",
                      cursor: "pointer",
                      display: "flex",
                      fontSize: "0.9375rem",
                      gap: "6px",
                    }}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={opt.value}
                      checked={f.gender === opt.value}
                      onChange={() => f.setGender(opt.value)}
                      style={{
                        accentColor: "var(--v2-gold)",
                        height: "16px",
                        width: "16px",
                      }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              type="submit"
              className="v2-btn-active"
              style={{
                background:
                  "linear-gradient(135deg, var(--v2-coral), var(--v2-coral-soft))",
                border: "none",
                borderRadius: "12px",
                color: "#ffffff",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-base)",
                fontWeight: 700,
                letterSpacing: "var(--ls-wide)",
                padding: "16px",
                width: "100%",
              }}
            >
              내 운세 보러 가기 →
            </button>
          </form>
        </div>
      </Card>
    </PageContainer>
  );
}
