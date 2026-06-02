"use client";

import { useEffect, useState } from "react";
import { InsightHistory } from "./insight-history";
import { InsightCreate } from "./insight-create";
import { InsightDetail } from "./insight-detail";
import { Insight } from "../types/insight";
import ActionCreateInsight from "../actions/createInsight.action";
import actionGetInsight from "../actions/getInsight.action";

export function AIInsightUI() {
  const [history, setHistory] = useState<Insight[]>([]);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const data = await actionGetInsight();
    setHistory(data);
    if (data.length > 0 && !selectedInsight) setSelectedInsight(data[0]);
  };

  useEffect(() => { fetchData(); }, []);

  const handleGenerate = async () => {
    setLoading(true);
    await ActionCreateInsight();
    await fetchData();
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-4">
        <InsightHistory history={history} selectedId={selectedInsight?.id || ""} onSelect={setSelectedInsight} />
        <InsightCreate loading={loading} onGenerate={handleGenerate} />
      </div>

      <div className="lg:col-span-2 h-full">
        {selectedInsight && <InsightDetail insight={selectedInsight} />}
      </div>
    </div>
  );
}
