"use client";

interface CouponFieldProps {
  value: string;
  onChange: (v: string) => void;
  onApply: () => void;
}

export function CouponField({ value, onChange, onApply }: CouponFieldProps) {
  return (
    <section className="space-y-2">
      <label htmlFor="checkout-coupon" className="block text-[14px] font-medium text-white">
        쿠폰 입력
      </label>
      <div className="flex gap-2">
        <input
          id="checkout-coupon"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="쿠폰 코드를 입력하세요"
          className="flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[14px] text-white placeholder:text-white/30 focus:border-white/40 focus:bg-white/10 focus:outline-none"
        />
        <button
          type="button"
          onClick={onApply}
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[13px] font-medium text-white transition-colors hover:bg-white/10"
        >
          적용
        </button>
      </div>
    </section>
  );
}
