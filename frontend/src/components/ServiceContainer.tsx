// import { useMemo } from "react";
import { useMemo } from "react";
import { useStore } from "../store.ts";
import Card from "./Card.tsx";

export default function ServiceContainer({ onSelect, servicesCount }: { onSelect: (name: string) => void; servicesCount: number }) {
  const services = useStore((s: any) => s.services);
  const graphs = useStore((s: any) => s.lastMetrics);

  const list = useMemo(()=>services, [services]);

  return (
    <div className="grid grid-cols-2 gap-5" role="list">
      {list.map((name: string, index:number) => (
        index+1 <= servicesCount ?
        <Card key={name} name={name} latest={graphs[name]?.[graphs[name].length-1]} onClick={() => onSelect(name)} />
      :null))}
    </div>
  );
}
