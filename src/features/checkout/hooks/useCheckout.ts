"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { ANONYMOUS, loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { isValidEmail } from "@/shared/utils/validation";
import {
  PRODUCTS,
  type CheckoutCharacter,
  type CheckoutProduct,
} from "../domain/checkoutProducts";

export type ConsentDoc = "data-usage" | "payment";

export interface UseCheckoutReturn {
  product: CheckoutProduct;
  email: string;
  setEmail: (v: string) => void;
  emailError: string | null;
  coupon: string;
  setCoupon: (v: string) => void;
  agreeDataUsage: boolean;
  setAgreeDataUsage: (v: boolean) => void;
  agreePayment: boolean;
  setAgreePayment: (v: boolean) => void;
  openConsent: ConsentDoc | null;
  setOpenConsent: (v: ConsentDoc | null) => void;
  isProcessing: boolean;
  applyCoupon: () => void;
  handleBack: () => void;
  handleSubmit: () => void;
}

function generateOrderId(character: CheckoutCharacter): string {
  const uuid =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `dohwa-${character}-${uuid}`;
}

export function useCheckout(character: CheckoutCharacter): UseCheckoutReturn {
  const router = useRouter();
  const product = PRODUCTS[character];

  const [email, setEmailState] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [coupon, setCoupon] = useState("");
  const [agreeDataUsage, setAgreeDataUsage] = useState(true);
  const [agreePayment, setAgreePayment] = useState(true);
  const [openConsent, setOpenConsent] = useState<ConsentDoc | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const setEmail = useCallback((v: string) => {
    setEmailState(v);
    if (emailError) setEmailError(null);
  }, [emailError]);

  const handleBack = useCallback(() => {
    router.push(`/saju/result?character=${character}`);
  }, [router, character]);

  const applyCoupon = useCallback(() => {
    const code = coupon.trim();
    if (!code) {
      alert("쿠폰 코드를 입력해 주세요.");
      return;
    }
    alert("쿠폰 적용은 정식 오픈 후 안내드릴게요.");
  }, [coupon]);

  const handleSubmit = useCallback(async () => {
    if (!isValidEmail(email)) {
      setEmailError("이메일 형식을 확인해 주세요.");
      return;
    }
    if (!agreeDataUsage || !agreePayment) {
      alert("결제 진행에는 두 가지 동의가 모두 필요합니다.");
      return;
    }
    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
    if (!clientKey) {
      alert("결제 키 설정이 누락되었어요. 관리자에게 문의해 주세요.");
      return;
    }
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      const tossPayments = await loadTossPayments(clientKey);
      const payment = tossPayments.payment({ customerKey: ANONYMOUS });
      const orderId = generateOrderId(character);
      // 검증 단계에서 활용할 수 있도록 클라이언트에 orderId 임시 보관
      try {
        sessionStorage.setItem(
          "checkoutPending",
          JSON.stringify({
            character,
            orderId,
            amount: product.priceKrw,
            email: email.trim(),
          }),
        );
      } catch {}
      await payment.requestPayment({
        method: "CARD",
        amount: { currency: "KRW", value: product.priceKrw },
        orderId,
        orderName: product.productLabel,
        successUrl: `${window.location.origin}/checkout/success`,
        failUrl: `${window.location.origin}/checkout/fail`,
        customerEmail: email.trim(),
        card: {
          useEscrow: false,
          flowMode: "DEFAULT",
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });
      // requestPayment 성공 시 토스 결제창으로 페이지 전환되므로 아래 코드는 도달 안 함
    } catch (err) {
      // 사용자가 결제창을 닫는 등 의도적 취소도 여기로 떨어짐 — 가벼운 안내만
      const message = err instanceof Error ? err.message : "결제를 시작하지 못했어요.";
      if (!message.includes("USER_CANCEL") && !message.includes("취소")) {
        alert(`결제를 시작하지 못했어요: ${message}`);
      }
      setIsProcessing(false);
    }
  }, [email, agreeDataUsage, agreePayment, character, product, isProcessing]);

  return {
    product,
    email,
    setEmail,
    emailError,
    coupon,
    setCoupon,
    agreeDataUsage,
    setAgreeDataUsage,
    agreePayment,
    setAgreePayment,
    openConsent,
    setOpenConsent,
    isProcessing,
    applyCoupon,
    handleBack,
    handleSubmit,
  };
}
