"use client";

import SurveyMultiSelect from "./SurveyMultiSelect";
import SurveyFreeText from "./SurveyFreeText";
import type { SurveyMultiStep, SurveyTextStep } from "@/features/saju/domain/types";

type SurveyCutProps =
  | { step: 1 | 2; config: SurveyMultiStep; onAnswer: (answers: string[]) => void; onBack?: () => void; initialSelected?: string[]; characterId?: string }
  | { step: 3; config: SurveyTextStep; onAnswer: (text: string) => void; onBack?: () => void; initialText?: string; buttonLabel?: string; characterId?: string };

export default function SurveyCut(props: SurveyCutProps) {
  if (props.step === 3) {
    return (
      <SurveyFreeText
        step={props.config}
        onNext={props.onAnswer}
        onBack={props.onBack}
        initialText={props.initialText}
        buttonLabel={props.buttonLabel}
        characterId={props.characterId}
      />
    );
  }
  return (
    <SurveyMultiSelect
      step={props.config}
      onNext={props.onAnswer}
      onBack={props.onBack}
      initialSelected={props.initialSelected}
      characterId={props.characterId}
    />
  );
}
