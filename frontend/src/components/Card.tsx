import { memo } from "react";
import { type Metric } from "../api.ts";

function getAlertColor(m?: Metric | null) {
  if (!m) return { color: 'var(--muted)', label: 'unknown' };
  if (m.cpu > 80 || m.errorRate > 5) return { color: 'var(--red)', label: 'critical' };
  if (m.cpu >= 60) return { color: 'var(--yellow)', label: 'warning' };
  return { color: 'var(--green)', label: 'ok' };
}

const Card = memo(({ name, latest, onClick }: { name: string; latest?: Metric; onClick?: ()=>void }) => {
  const stat = getAlertColor(latest);
  return (
    <div 
      className="bg-[#0b1220] p-3 rounded-xl shadow-[0_4px_18px_rgba(2,6,23,0.6)] cursor-pointer"
      onClick={onClick} 
      role="button" 
      aria-pressed="false"
    >
      <div className="flex items-center justify-between">
        <div className="font-semibold mb-1.5">{name}</div>
        <div className="flex items-center">
          <span 
            className="w-2.5 h-2.5 rounded-full inline-block mr-2" 
            style={{background: stat.color}} 
            title={stat.label}
          ></span>
          <div className="text-xs text-[#94a3b8]">{stat.label}</div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-[#94a3b8] mb-1">
        <div>CPU</div>
        <div>{latest ? `${latest.cpu}%` : "—"}</div>
      </div>
      <div className="flex justify-between text-xs text-[#94a3b8] mb-1">
        <div>Memory</div>
        <div>{latest ? `${latest.memory}%` : "—"}</div>
      </div>
      <div className="flex justify-between text-xs text-[#94a3b8] mb-1">
        <div>Error Rate</div>
        <div>{latest ? `${latest.errorRate}%` : "—"}</div>
      </div>
    </div>
  );
});
export default Card;
