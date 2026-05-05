"use client";

interface ConsentRowProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  onDetail: () => void;
}

export function ConsentRow({
  id,
  label,
  checked,
  onChange,
  onDetail,
}: ConsentRowProps) {
  return (
    <div className="flex items-center justify-between text-[13px]">
      <label htmlFor={id} className="flex cursor-pointer items-center gap-2 text-white/85">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 cursor-pointer accent-white"
        />
        <span>{label}</span>
      </label>
      <button
        type="button"
        onClick={onDetail}
        className="text-[12px] text-white/60 underline underline-offset-2 hover:text-white"
      >
        자세히 보기
      </button>
    </div>
  );
}
