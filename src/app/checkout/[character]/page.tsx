import { notFound } from "next/navigation";
import { CheckoutView } from "@/features/checkout";
import { isCheckoutCharacter } from "@/features/checkout/domain/checkoutProducts";

export function generateStaticParams() {
  return [{ character: "yeonwoo" }, { character: "doyoon" }];
}

interface CheckoutPageProps {
  params: Promise<{ character: string }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { character } = await params;
  if (!isCheckoutCharacter(character)) {
    notFound();
  }
  return <CheckoutView character={character} />;
}
