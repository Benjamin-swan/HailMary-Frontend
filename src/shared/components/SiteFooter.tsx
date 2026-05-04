import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="select-text bg-black/80 px-6 py-8 text-[11px] leading-relaxed text-neutral-300">
      <div className="space-y-1">
        <p>대표 : 배성현 | 사업자등록번호 : 376-35-01679</p>
        <p>상호 : 슈퍼빌더즈 (SuperBuilders)</p>
        <p>주소 : 경기도 용인시 기흥구 구갈로60번길 9-1, 6층 602-A61호 (구갈동, 라파빌딩)</p>
        <p>
          고객센터 :{" "}
          <a href="mailto:skwogusdld@gmail.com" className="underline">
            skwogusdld@gmail.com
          </a>
        </p>
        <p>
          TEL :{" "}
          <a href="tel:070-8064-6831" className="underline">
            070-8064-6831
          </a>
        </p>
      </div>
      <div className="mt-4 flex items-center gap-3">
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
      <p className="mt-4 text-neutral-500">
        © 2026 슈퍼빌더즈. All rights reserved.
      </p>
    </footer>
  );
}
