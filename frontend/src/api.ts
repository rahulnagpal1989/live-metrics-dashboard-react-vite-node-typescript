export type Metric = {
    serviceName: string;
    cpu: number;
    memory: number;
    errorRate: number;
    timestamp: number;
};

export async function fetchConfig(count: number = 5) {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL || "http://localhost:4000"}/config?count=${count}`, { method: "GET" });
    return res.json();
}
  