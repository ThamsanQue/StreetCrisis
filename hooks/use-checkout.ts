import { create } from "zustand";

interface CheckoutModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCheckoutModal = create<CheckoutModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCheckoutModal;
