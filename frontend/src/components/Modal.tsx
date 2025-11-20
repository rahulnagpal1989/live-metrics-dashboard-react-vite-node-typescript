import { useMemo } from "react";
import { useStore } from "../store.ts";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, TimeScale, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, TimeScale, Tooltip, Legend);

export default function Modal({ serviceName, onClose }: { serviceName: string; onClose: ()=>void }) {
  const metrics = useStore((s: any) => s.lastMetrics[serviceName] || []);

  const labels = useMemo(() => metrics.map((m: any) => new Date(m.timestamp).toLocaleTimeString()), [metrics]);
  const cpuData = metrics.map((m: any) => m.cpu);
  const memData = metrics.map((m: any) => m.memory);

  const data = {
    labels,
    datasets: [
      {
        label: "CPU %",
        data: cpuData,
        tension: 0.3,
        fill: false,
        pointRadius: 1,
        borderColor: "red",
        backgroundColor: "red",
        borderWidth: 2,
        pointBackgroundColor: "red",
      },
      {
        label: "Memory %",
        data: memData,
        tension: 0.3,
        fill: false,
        pointRadius: 1,
        borderColor: "green",
        backgroundColor: "green",
        borderWidth: 2,
        pointBackgroundColor: "green",
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${serviceName} Metrics`,
      },
    },
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <div className="header" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div>
            <div style={{fontSize:18, fontWeight:700}}>{serviceName}</div>
            <div style={{fontSize:13, color:"var(--muted)"}}>Last {metrics.length} seconds</div>
          </div>
          <div>
            <button onClick={onClose}>Close</button>
          </div>
        </div>

        <div>
          <Line data={data} options={options as any} />
        </div>
      </div>
    </div>
  );
}
