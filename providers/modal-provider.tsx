"use client";

import Checkout from "@/components/checkout";
import { PreviewModal } from "@/components/preview-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PreviewModal />
      <Checkout />
    </>
  );
};
