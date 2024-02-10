import { create } from "zustand";

interface DrawerProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDrawer = create<DrawerProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDrawer;
