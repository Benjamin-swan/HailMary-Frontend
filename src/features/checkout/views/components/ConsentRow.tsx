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
      <label htmlFor={id} className="flex cursor-pointer items-center gap-2 text-neutral-700">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 cursor-pointer accent-neutral-900"
        />
        <span>{label}</span>
      </label>
      <button
        type="button"
        onClick={onDetail}
        className="text-[12px] text-neutral-500 underline underline-offset-2 hover:text-neutral-900"
      >
        자세히 보기
      </button>
    </div>
  );
}
