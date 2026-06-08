type CtaButtonProps = {
  label: string;
  gradient: string;
  onClick: () => void;
};

export function CtaButton({ label, gradient, onClick }: CtaButtonProps) {
  return (
    <div className="relative z-10 flex w-full flex-col items-center px-8 pb-9">
      <button
        onClick={onClick}
        className={`w-full max-w-[300px] rounded-full ${gradient} py-3 text-center text-[15px] font-semibold text-white shadow-lg transition-opacity hover:opacity-90 active:opacity-80 sm:max-w-[360px] sm:py-4 sm:text-[17px]`}
      >
        {label}
      </button>
    </div>
  );
}
