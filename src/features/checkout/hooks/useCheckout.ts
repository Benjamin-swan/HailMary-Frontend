"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
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
  applyCoupon: () => void;
  handleBack: () => void;
  handleSubmit: () => void;
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

  const handleSubmit = useCallback(() => {
    if (!isValidEmail(email)) {
      setEmailError("이메일 형식을 확인해 주세요.");
      return;
    }
    if (!agreeDataUsage || !agreePayment) {
      alert("결제 진행에는 두 가지 동의가 모두 필요합니다.");
      return;
    }
    alert("결제 모듈 연동을 준비하고 있어요. 곧 정식 오픈해요.");
  }, [email, agreeDataUsage, agreePayment]);

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
    applyCoupon,
    handleBack,
    handleSubmit,
  };
}
