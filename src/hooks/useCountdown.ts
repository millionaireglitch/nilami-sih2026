import { useState, useEffect } from "react";

export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  formatted: string;
  urgency: "normal" | "soon" | "critical";
}

function calc(target: string): CountdownResult {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, formatted: "Ended", urgency: "critical" };

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1_000);

  let formatted: string;
  if (days > 0) formatted = `${days}d ${hours}h ${minutes}m`;
  else if (hours > 0) formatted = `${hours}h ${minutes}m ${seconds}s`;
  else formatted = `${minutes}m ${seconds}s`;

  const urgency: CountdownResult["urgency"] =
    diff < 3_600_000 ? "critical" : diff < 86_400_000 ? "soon" : "normal";

  return { days, hours, minutes, seconds, isExpired: false, formatted, urgency };
}

export function useCountdown(targetDate: string): CountdownResult {
  const [result, setResult] = useState<CountdownResult>(() => calc(targetDate));

  useEffect(() => {
    setResult(calc(targetDate));
    const id = setInterval(() => setResult(calc(targetDate)), 1_000);
    return () => clearInterval(id);
  }, [targetDate]);

  return result;
}
