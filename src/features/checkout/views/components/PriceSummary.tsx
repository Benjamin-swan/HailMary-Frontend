import { formatKrw, type CheckoutProduct } from "../../domain/checkoutProducts";

interface PriceSummaryProps {
  product: CheckoutProduct;
}

export function PriceSummary({ product }: PriceSummaryProps) {
  const price = formatKrw(product.priceKrw);
  return (
    <section className="space-y-3">
      <h2 className="text-[15px] font-semibold text-white">결제 금액</h2>
      <div className="space-y-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-5">
        <div className="flex items-center justify-between text-[13px] text-white/85">
          <span>{product.productLabel}</span>
          <span>{price}</span>
        </div>
        <div className="border-t border-white/[0.08]" />
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold text-white">
            최종 결제금액
          </span>
          <span className="text-[16px] font-bold text-white">{price}</span>
        </div>
      </div>
    </section>
  );
}
