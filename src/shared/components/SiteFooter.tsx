import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="select-text bg-neutral-800 px-6 py-10 text-center text-[11px] leading-relaxed text-neutral-300">
      <div className="space-y-1.5">
        <p>
          <span className="font-medium text-neutral-100">상호</span> 슈퍼빌더즈
          <span className="mx-2 text-neutral-500">|</span>
          <span className="font-medium text-neutral-100">대표이사</span> 배성현
        </p>
        <p>경기도 용인시 기흥구 구갈로60번길 9-1, 6층 602-A61호 (구갈동, 라파빌딩)</p>
        <p>
          <span className="font-medium text-neutral-100">사업자등록번호</span>{" "}
          376-35-01679
        </p>
        <p>
          <span className="font-medium text-neutral-100">고객센터</span>{" "}
          <a
            href="http://pf.kakao.com/_axcGxbX/chat"
            target="_blank"
            rel="noreferrer noopener"
            className="underline"
          >
            카카오톡 도화선 채널
          </a>
          <span className="mx-2 text-neutral-500">|</span>
          <span className="font-medium text-neutral-100">MAIL</span>{" "}
          <a href="mailto:skwogusdld@gmail.com" className="underline">
            skwogusdld@gmail.com
          </a>
        </p>
        <p>
          <span className="font-medium text-neutral-100">대표번호</span>{" "}
          <a href="tel:070-8064-6831" className="underline">
            070-8064-6831
          </a>
        </p>
        <p className="text-neutral-400">
          (전화 상담은 운영하지 않으며, 채팅으로 문의해 주세요.)
        </p>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <Link href="/terms" className="underline">
          이용약관
        </Link>
        <span aria-hidden className="text-neutral-500">
          |
        </span>
        <Link href="/privacy" className="underline">
          개인정보처리방침
        </Link>
      </div>

      <p className="mt-3 text-neutral-400">
        Copyright © 2026 슈퍼빌더즈. All rights reserved.
      </p>

      <div className="mt-5 flex items-center justify-center gap-3">
        <a
          href="http://pf.kakao.com/_axcGxbX"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="카카오톡 도화선 채널"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-700 text-neutral-200 transition-colors hover:bg-neutral-600"
        >
          <KakaoIcon />
        </a>
        <a
          href="https://www.instagram.com/dohwaseon_saju/"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="인스타그램 @dohwaseon_saju"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-700 text-neutral-200 transition-colors hover:bg-neutral-600"
        >
          <InstagramIcon />
        </a>
      </div>
    </footer>
  );
}

function KakaoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 4C6.48 4 2 7.59 2 12.02c0 2.86 1.86 5.36 4.65 6.78l-1.18 4.32c-.1.36.3.65.62.45l5.18-3.42c.24.02.48.04.73.04 5.52 0 10-3.59 10-8.17S17.52 4 12 4z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
