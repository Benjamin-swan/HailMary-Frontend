import { formatKrw, type CheckoutProduct } from "../../domain/checkoutProducts";

interface PriceSummaryProps {
  product: CheckoutProduct;
  /** 쿠폰 적용 시 최종 0원 표시. */
  freeWithCoupon?: boolean;
}

export function PriceSummary({ product, freeWithCoupon = false }: PriceSummaryProps) {
  const price = formatKrw(product.priceKrw);
  return (
    <section className="space-y-3">
      <h2 className="text-[15px] font-semibold text-neutral-900">결제 금액</h2>
      <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-5">
        <div className="flex items-center justify-between text-[13px] text-neutral-700">
          <span>{product.productLabel}</span>
          <span>{price}</span>
        </div>
        {freeWithCoupon && (
          <div className="flex items-center justify-between text-[13px] text-emerald-600">
            <span>쿠폰 할인</span>
            <span>-{price}</span>
          </div>
        )}
        <div className="border-t border-neutral-200" />
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold text-neutral-900">
            최종 결제금액
          </span>
          <span className="text-[16px] font-bold text-neutral-900">
            {freeWithCoupon ? formatKrw(0) : price}
          </span>
        </div>
      </div>
    </section>
  );
}
