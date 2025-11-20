import { create } from "zustand";
import { type Metric } from "./api.ts";

type ServiceState = {
  services: string[]; // list of service names
  lastMetrics: Record<string, Metric[]>; // keep history per service (sliding window)
  setServices: (names: string[]) => void;
  pushSnapshot: (metrics: Metric[]) => void;
  clear: () => void;
};

const MAX_HISTORY = 30; // 30 seconds

export const useStore = create<ServiceState>((set: any) => ({
  services: [],
  lastMetrics: {},
  setServices: (names: string[]) => set(() => ({ services: names, lastMetrics: {} })),
  pushSnapshot: (metrics: Metric[]) => {
    set((state: any) => {
      const copy = { ...state.lastMetrics };
      metrics.forEach((m: Metric) => {
        if (!copy[m.serviceName]) copy[m.serviceName] = [];
        const arr = copy[m.serviceName].slice();
        arr.push(m);
        if (arr.length > MAX_HISTORY) arr.splice(0, arr.length - MAX_HISTORY);
        copy[m.serviceName] = arr;
      });
      const services = Array.from(new Set([...state.services, ...metrics.map((m: Metric) => m.serviceName)]));
      return { lastMetrics: copy, services };
    });
  },
  clear: () => set({ services: [], lastMetrics: {} })
}));
