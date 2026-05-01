"use client";

import { useEffect, useState } from "react";

const DOUBLE_SURNAMES = [
  "남궁",
  "황보",
  "제갈",
  "선우",
  "사공",
  "서문",
  "동방",
  "독고",
  "사마",
  "어금",
];

function extractFirstName(name: string): string {
  const trimmed = name.trim();
  if (trimmed.length <= 2) return trimmed;

  for (const surname of DOUBLE_SURNAMES) {
    if (trimmed.startsWith(surname)) {
      return trimmed.slice(surname.length);
    }
  }

  return trimmed.slice(1);
}

export function useFirstName(storageKey: "doyoon" | "yeonwoo"): string | null {
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    try {
      const dataKey = `${storageKey}SajuData`;
      const infoKey = `${storageKey}Saju`;
      const dataRaw = localStorage.getItem(dataKey);
      if (dataRaw) {
        const parsed = JSON.parse(dataRaw) as { userName?: string | null };
        if (parsed.userName) {
          setFirstName(extractFirstName(parsed.userName));
          return;
        }
      }

      const infoRaw = localStorage.getItem(infoKey);
      if (infoRaw) {
        const parsed = JSON.parse(infoRaw) as { name?: string };
        if (parsed.name) {
          setFirstName(extractFirstName(parsed.name));
        }
      }
    } catch {
      // ignore
    }
  }, [storageKey]);

  return firstName;
}
