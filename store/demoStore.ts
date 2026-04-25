"use client";
import { create } from "zustand";

type State = {
  selectedIncident: string | null;
  setIncident: (id: string) => void;
};

export const useDemoStore = create<State>((set) => ({
  selectedIncident: null,
  setIncident: (id) => set({ selectedIncident: id }),
}));
