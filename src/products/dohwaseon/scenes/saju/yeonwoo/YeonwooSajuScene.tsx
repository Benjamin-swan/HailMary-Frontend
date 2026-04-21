"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { YEONWOO_CUTS, type Cut } from "./data/cuts";
import DialogueOverlay from "../doyoon/components/DialogueOverlay";
import AsideComment from "../doyoon/components/AsideComment";
import InfoForm, { type SajuInfo } from "../doyoon/components/InfoForm";
import SajuChartCards from "../doyoon/components/SajuChartCards";
import SurveyMultiSelect from "../doyoon/components/SurveyMultiSelect";
import SurveyFreeText from "../doyoon/components/SurveyFreeText";
import { SURVEY_STEPS, type SurveyAnswers } from "./data/surveyOptions";
import { MOCK_SAJU } from "./data/mockSaju";

const CHAR_DELAY = 32;
const IS_DEV = process.env.NODE_ENV !== "production";
const SURFACE = "#141311";

// 같은 bg를 이어서 쓰거나 클로즈업 전환인 컷은 dark fade 대신 crossfade
// 5: cut-6 (dialogue-closeup), 12: analysis-result (cut-13), 13: dialogue-after-result (cut-13 재사용)
const CROSSFADE_ENTER = new Set<number>([5, 12, 13]);

function hasLines(c: Cut): c is Extract<Cut, { lines: string[] }> {
  return "lines" in c;
}

function getBg(c: Cut): string | null {
  return "bg" in c ? c.bg : null;
}

function isUiCut(c: Cut): boolean {
  return (
    c.type === "info-form" ||
    c.type === "analysis-loading" ||
    c.type === "analysis-result" ||
    c.type === "survey" ||
    c.type === "tablet-handoff"
  );
}

export default function YeonwooSajuScene() {
  const router = useRouter();
  const [cutIndex, setCutIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedCount, setDisplayedCount] = useState(0);
  const [fading, setFading] = useState(false);
  const [crossFading, setCrossFading] = useState(false);
  const [leanInZoomed, setLeanInZoomed] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswers>({
    step1: [],
    step2: [],
    step3: "",
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cut = YEONWOO_CUTS[cutIndex];

  const fullText = hasLines(cut) ? cut.lines[lineIndex] ?? "" : "";
  const isComplete =
    hasLines(cut) && fullText.length > 0 && displayedCount >= fullText.length;

  const clearTyping = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!hasLines(cut)) return;
    if (displayedCount >= fullText.length) return;
    timerRef.current = setTimeout(() => {
      setDisplayedCount((c) => c + 1);
    }, CHAR_DELAY);
    return clearTyping;
  }, [displayedCount, fullText, clearTyping, cut]);

  const resetLineState = useCallback(() => {
    setLineIndex(0);
    setDisplayedCount(0);
  }, []);

  const goToCut = useCallback(
    (next: number) => {
      const nextCut = YEONWOO_CUTS[next];
      if (!nextCut) return;

      const useCrossfade = CROSSFADE_ENTER.has(next);

      if (useCrossfade) {
        setCrossFading(true);
        setTimeout(() => {
          setCutIndex(next);
          resetLineState();
          setLeanInZoomed(false);
          setCtaVisible(false);
          setCrossFading(false);
        }, 400);
        return;
      }

      const needsDarkFade = isUiCut(cut) || isUiCut(nextCut);
      const duration = needsDarkFade ? 380 : 280;

      setFading(true);
      setTimeout(() => {
        setCutIndex(next);
        resetLineState();
        setLeanInZoomed(false);
        setCtaVisible(false);
        setFading(false);
      }, duration);
    },
    [cut, resetLineState],
  );

  // tablet-handoff 자동 진행 (1.4초) — 연우에서는 무대사 전환 컷(cut-4, cut-5)에도 재사용
  useEffect(() => {
    if (cut.type !== "tablet-handoff") return;
    const t = setTimeout(() => goToCut(cutIndex + 1), 1400);
    return () => clearTimeout(t);
  }, [cutIndex, cut.type, goToCut]);

  useEffect(() => {
    if (cut.type !== "analysis-loading") return;
    const t = setTimeout(() => goToCut(cutIndex + 1), 2000);
    return () => clearTimeout(t);
  }, [cutIndex, cut.type, goToCut]);

  useEffect(() => {
    if (cut.type !== "final-leanin") return;
    const t = setTimeout(() => setLeanInZoomed(true), 250);
    return () => clearTimeout(t);
  }, [cutIndex, cut.type]);

  useEffect(() => {
    if (cut.type !== "final-leanin") return;
    if (!isComplete || !hasLines(cut) || lineIndex !== cut.lines.length - 1)
      return;
    const t = setTimeout(() => setCtaVisible(true), 600);
    return () => clearTimeout(t);
  }, [cut, isComplete, lineIndex]);

  const handleTap = () => {
    if (crossFading || fading) return;
    if (!hasLines(cut)) return;

    if (!isComplete) {
      clearTyping();
      setDisplayedCount(fullText.length);
      return;
    }

    if (lineIndex < cut.lines.length - 1) {
      setLineIndex(lineIndex + 1);
      setDisplayedCount(0);
      return;
    }

    if (cut.type === "final-leanin") return;

    goToCut(cutIndex + 1);
  };

  const handleCta = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("[TODO] 결제 라우트로 이동");
    alert("결제 페이지는 준비 중입니다.");
  };

  const jumpTo = (delta: -1 | 1) => (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = Math.max(
      0,
      Math.min(YEONWOO_CUTS.length - 1, cutIndex + delta),
    );
    if (next === cutIndex) return;
    clearTyping();
    setCutIndex(next);
    resetLineState();
    setFading(false);
    setCrossFading(false);
    setLeanInZoomed(false);
    setCtaVisible(false);
  };

  const bgImage = getBg(cut);
  const nextCutForCrossfade = YEONWOO_CUTS[cutIndex + 1];
  const nextBg = nextCutForCrossfade ? getBg(nextCutForCrossfade) : null;

  const isAside = cut.type === "aside";
  const isLeanIn = cut.type === "final-leanin";
  const leanInBgSrc =
    isLeanIn && leanInZoomed
      ? (cut as Extract<Cut, { type: "final-leanin" }>).bgZoomed
      : bgImage;

  return (
    <div
      className="relative flex flex-1 flex-col overflow-hidden"
      style={{ background: SURFACE }}
      onClick={handleTap}
    >
      {bgImage && (
        <Image
          src={isLeanIn && leanInBgSrc ? leanInBgSrc : bgImage}
          alt=""
          fill
          priority
          sizes="(max-width: 448px) 100vw, 448px"
          className="object-cover object-center"
          style={{
            opacity: fading ? 0 : 1,
            transition:
              "opacity 0.4s ease, transform 1.6s cubic-bezier(0.22,1,0.36,1)",
            transform: isLeanIn && leanInZoomed ? "scale(1.06)" : "scale(1)",
            filter: isAside ? "saturate(0.35) brightness(0.65)" : "none",
          }}
        />
      )}

      {crossFading && nextBg && (
        <Image
          src={nextBg}
          alt=""
          fill
          priority
          sizes="(max-width: 448px) 100vw, 448px"
          className="absolute inset-0 object-cover object-center animate-[fadeIn_0.4s_ease-out]"
        />
      )}

      {isAside && (
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: "rgba(20,19,17,0.55)" }}
        />
      )}

      {!fading &&
        !crossFading &&
        (cut.type === "dialogue" ||
          cut.type === "dialogue-closeup" ||
          cut.type === "dialogue-after-result" ||
          cut.type === "final-leanin") && (
          <DialogueOverlay
            speaker={cut.speaker}
            text={fullText.slice(0, displayedCount)}
            isComplete={isComplete && !(isLeanIn && lineIndex === cut.lines.length - 1)}
          />
        )}

      {!fading && !crossFading && cut.type === "aside" && (
        <AsideComment
          speaker={cut.speaker}
          text={fullText.slice(0, displayedCount)}
          isComplete={isComplete}
        />
      )}

      {!fading && cut.type === "analysis-loading" && (
        <div className="relative z-10 my-auto px-6 text-center">
          <p
            className="text-[11px] tracking-[0.4em]"
            style={{ color: "rgba(230,197,142,0.85)" }}
          >
            데이터 분석 중
          </p>
          <div className="mx-auto mt-3 flex justify-center gap-1.5">
            {[0, 150, 300].map((d) => (
              <span
                key={d}
                className="h-1 w-1 animate-pulse rounded-full"
                style={{ background: "#E6C58E", animationDelay: `${d}ms` }}
              />
            ))}
          </div>
        </div>
      )}

      {!fading && cut.type === "info-form" && (
        <InfoForm
          buttonLabel="연우에게 알려주기 →"
          onSubmit={(info: SajuInfo) => {
            try {
              localStorage.setItem("yeonwooSaju", JSON.stringify(info));
            } catch {}
            goToCut(cutIndex + 1);
          }}
        />
      )}

      {!fading && !crossFading && cut.type === "analysis-result" && (
        <SajuChartCards
          intro={cut.intro}
          mockSaju={MOCK_SAJU}
          onNext={() => goToCut(cutIndex + 1)}
        />
      )}

      {!fading && cut.type === "survey" && cut.step === 1 && (
        <SurveyMultiSelect
          step={SURVEY_STEPS[1]}
          onNext={(answers) => {
            setSurveyAnswers((prev) => ({ ...prev, step1: answers }));
            goToCut(cutIndex + 1);
          }}
        />
      )}
      {!fading && cut.type === "survey" && cut.step === 2 && (
        <SurveyMultiSelect
          step={SURVEY_STEPS[2]}
          onNext={(answers) => {
            setSurveyAnswers((prev) => ({ ...prev, step2: answers }));
            goToCut(cutIndex + 1);
          }}
        />
      )}
      {!fading && cut.type === "survey" && cut.step === 3 && (
        <SurveyFreeText
          step={SURVEY_STEPS[3]}
          buttonLabel="연우에게 알려주기 →"
          onNext={(text) => {
            const finalAnswers = { ...surveyAnswers, step3: text };
            setSurveyAnswers(finalAnswers);
            try {
              localStorage.setItem(
                "yeonwooSurvey",
                JSON.stringify(finalAnswers),
              );
            } catch {}
            goToCut(cutIndex + 1);
          }}
        />
      )}

      {isLeanIn && ctaVisible && !fading && (
        <div
          className="absolute bottom-10 left-0 right-0 z-20 px-6 animate-[fadeIn_0.6s_ease-out]"
        >
          <button
            onClick={handleCta}
            className="w-full rounded-2xl py-4 text-sm font-bold tracking-[0.3em] transition-transform active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #FFE2B3, #E6C58E)",
              color: "#412d04",
              boxShadow: "0 0 32px rgba(230,197,142,0.25)",
            }}
          >
            결제하고 풀스토리 보기 →
          </button>
        </div>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          router.push("/select");
        }}
        className="absolute right-3 top-3 z-50 rounded-md px-2.5 py-1 text-[10px] tracking-[0.25em] backdrop-blur transition-opacity active:opacity-80"
        style={{
          background: "rgba(40,38,34,0.65)",
          color: "rgba(208,197,182,0.85)",
          borderTop: "1px solid rgba(245,237,224,0.1)",
        }}
      >
        ← 상담사 변경
      </button>

      {IS_DEV && (
        <div className="absolute left-3 top-3 z-50 flex items-center gap-1.5">
          <button
            onClick={jumpTo(-1)}
            disabled={cutIndex === 0}
            className="rounded-md px-2.5 py-1 text-[11px] backdrop-blur transition-opacity active:opacity-80 disabled:opacity-25"
            style={{ background: "rgba(0,0,0,0.6)", color: "white" }}
          >
            이전
          </button>
          <span
            className="rounded-md px-2 py-1 text-[11px] tabular-nums backdrop-blur"
            style={{ background: "rgba(0,0,0,0.6)", color: "white" }}
          >
            {cutIndex + 1} / {YEONWOO_CUTS.length}
          </span>
          <button
            onClick={jumpTo(1)}
            disabled={cutIndex === YEONWOO_CUTS.length - 1}
            className="rounded-md px-2.5 py-1 text-[11px] backdrop-blur transition-opacity active:opacity-80 disabled:opacity-25"
            style={{ background: "rgba(0,0,0,0.6)", color: "white" }}
          >
            다음
          </button>
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-0 z-40"
        style={{
          background: SURFACE,
          opacity: fading ? 1 : 0,
          transition: "opacity 0.32s ease",
        }}
      />
    </div>
  );
}
