import { create } from "zustand";

export const useUIStore = create((set) => ({
  bootCompleted: false,
  introShown: false,
  activeApp: "none",
  modalProject: null,

  setBootCompleted: () => set({ bootCompleted: true }),
  setIntroShown: () => set({ introShown: true }),
  setActiveApp: (app) => set({ activeApp: app }),
  openModal: (project) => set({ modalProject: project }),
  closeModal: () => set({ modalProject: null }),
}));
