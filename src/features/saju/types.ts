export type SajuCalendar = "solar" | "lunar";
export type SajuGender = "male" | "female";

export interface SajuFreeRequest {
  birth: string; // YYYY-MM-DD
  time: string; // HH:MM | "unknown"
  calendar: SajuCalendar;
  gender: SajuGender;
}

export interface Pillar {
  label: "년주" | "월주" | "일주" | "시주";
  heaven: string;
  earth: string;
  element: string;
  hue: string;
  unknown?: boolean;
}

export interface SajuFreeResponse {
  pillars: Pillar[];
  highlight: string;
  sajuRequestId: string;
}

export interface SajuSurveyRequest {
  sajuRequestId: string;
  surveyVersion: "v1";
  step1: string[];
  step2: string[];
  step3: string | null;
}

export type SajuErrorCode =
  | "BAD_REQUEST"
  | "CALCULATION_FAILED"
  | "TIMEOUT"
  | "NETWORK"
  | "UNKNOWN";

export interface SajuError {
  code: SajuErrorCode;
  message: string;
  fieldHints?: { field: string; message: string }[];
}
