import { BackButton } from "@/shared/components/BackButton";

interface CheckoutHeaderProps {
  onBack: () => void;
}

export function CheckoutHeader({ onBack }: CheckoutHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center border-b border-white/[0.06] bg-neutral-900/95 px-5 py-3 backdrop-blur-xl">
      <BackButton onClick={onBack} />
      <h1 className="absolute left-1/2 -translate-x-1/2 text-[15px] font-medium text-white">
        결제하기
      </h1>
      <span className="ml-auto h-9 w-9" aria-hidden />
    </header>
  );
}
