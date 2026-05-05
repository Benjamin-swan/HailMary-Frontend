import { BackButton } from "@/shared/components/BackButton";

interface KkebiTopNavProps {
  onBack: () => void;
}

export function KkebiTopNav({ onBack }: KkebiTopNavProps) {
  return (
    <nav className="absolute inset-x-0 top-0 z-30 flex items-center px-5 py-4">
      <BackButton onClick={onBack} />
    </nav>
  );
}
