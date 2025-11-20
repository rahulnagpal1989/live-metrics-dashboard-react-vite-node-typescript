import { useEffect, useState, useCallback } from "react";
import { type Metric, fetchConfig } from "./api.ts";
import { useStore } from "./store.ts";
import ServiceContainer from "./components/ServiceContainer.tsx";
import Modal from "./components/Modal.tsx";
import "./App.css";

export default function App() {
  const [servicesCount, setServicesCount] = useState(5);
  const [connected, setConnected] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const pushSnapshot = useStore((s: any) => s.pushSnapshot);
  const setServices = useStore((s: any) => s.setServices);

  const changeCount = useCallback(async (n: number) => {
    if (n < 1) return;
    await fetchConfig(n).then(
    //   data => {
    //   if (data && data.services) setServices(data.services);
    // }
  ).catch(console.warn);
  }, [setServices]);

  useEffect(() => {
    changeCount(servicesCount);
  }, [servicesCount]);

  useEffect(() => {
    let es: EventSource | null = new EventSource(`${import.meta.env.VITE_BASE_URL}/metrics/stream`);
    es.onopen = () => setConnected(true);
    es.onmessage = (e) => {
      try {
        const parsed = JSON.parse(e.data) as Metric[];
        pushSnapshot(parsed);
      } catch (err) {}
    };

    es.addEventListener("metrics", (ev: MessageEvent) => {
      try {
        const data = JSON.parse(ev.data) as Metric[];
        pushSnapshot(data);
      } catch (err) {}
    });

    es.onerror = () => {
      setConnected(false);
    };

    return () => { es?.close(); es = null; setConnected(false); };
  }, [pushSnapshot]);


  return (
    <div className="app">
      <div className="header">
        <div className="title">
          <svg width="20" height="20" viewBox="0 0 24 24" style={{opacity:0.9}}>
            <path fill="currentColor" d="M3 13h2V3H3v10zm4 8h2V3H7v18zm4-6h2V3h-2v12zm4 6h2V3h-2v18zm4-10h2V3h-2v8z"/>
          </svg>
          Live Metrics Dashboard
        </div>
        <div className="controls">
          <div style={{fontSize:13, color:connected ? "var(--green)" : "var(--muted)"}}>
            {connected ? "Connected" : "Disconnected"}
          </div>
          <input name="services_count" type="number" min={1} max={100} value={servicesCount} onChange={(e:any)=>setServicesCount(e.target.value)} />
        </div>
      </div>

      <ServiceContainer onSelect={setSelected} servicesCount={servicesCount} />

      {selected && <Modal serviceName={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
