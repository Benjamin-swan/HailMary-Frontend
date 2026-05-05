"use client";

interface EmailFieldProps {
  value: string;
  onChange: (v: string) => void;
  error: string | null;
}

export function EmailField({ value, onChange, error }: EmailFieldProps) {
  return (
    <section className="space-y-2">
      <label htmlFor="checkout-email" className="block">
        <span className="text-[15px] font-semibold text-white">이메일</span>
        <span className="ml-2 text-[12px] text-white/55">
          사주 · 운세 결과 확인 및 안내메시지 발송에 이용됩니다
        </span>
      </label>
      <input
        id="checkout-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="you@example.com"
        className="block w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[14px] text-white placeholder:text-white/30 focus:border-white/40 focus:bg-white/10 focus:outline-none"
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? "checkout-email-error" : undefined}
      />
      {error && (
        <p
          id="checkout-email-error"
          className="text-[12px] text-rose-300"
          role="alert"
        >
          {error}
        </p>
      )}
    </section>
  );
}
