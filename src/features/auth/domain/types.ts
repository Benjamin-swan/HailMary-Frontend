// 소셜 로그인 도메인 타입 — BE 응답 계약(account_profile_response.py)과 일치.

export type AuthProvider = "kakao" | "google";

// 설문 prefill용 마지막 사용값 (BE LastUsedProfileResponse).
export interface LastUsedProfile {
  name: string;
  birth: string; // "YYYY-MM-DD"
  calendar: string; // "solar" | "lunar"
  time: string | null; // "HH:MM" 또는 null(모름)
  gender: string; // "male" | "female"
}

export interface AccountProfile {
  provider: string;
  email: string | null;
  nickname: string | null;
  profileImageUrl: string | null;
  lastUsed: LastUsedProfile | null;
}

// BE SocialLoginResponse (snake_case 원본 → 훅에서 camel로 정규화)
export interface SocialLoginRawResponse {
  access_token: string;
  is_new_account: boolean;
  profile: {
    provider: string;
    email: string | null;
    nickname: string | null;
    profile_image_url: string | null;
    last_used: {
      name: string;
      birth: string;
      calendar: string;
      time: string | null;
      gender: string;
    } | null;
  };
}

export function normalizeProfile(
  raw: SocialLoginRawResponse["profile"],
): AccountProfile {
  return {
    provider: raw.provider,
    email: raw.email,
    nickname: raw.nickname,
    profileImageUrl: raw.profile_image_url,
    lastUsed: raw.last_used
      ? {
          name: raw.last_used.name,
          birth: raw.last_used.birth,
          calendar: raw.last_used.calendar,
          time: raw.last_used.time,
          gender: raw.last_used.gender,
        }
      : null,
  };
}
