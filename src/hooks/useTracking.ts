import { useState, useCallback, useRef, useEffect } from "react";
import { TrackingStatus, Applicant, createEmptyApplicant } from "@/lib/constants";

export function useTracking() {
  const [status, setStatus] = useState<TrackingStatus>("idle");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [visaCategory, setVisaCategory] = useState("");
  const [personCount, setPersonCount] = useState(1);
  const [interval, setIntervalValue] = useState(120);
  const [applicants, setApplicants] = useState<Applicant[]>([
    createEmptyApplicant("1"),
  ]);
  const [keepAlive, setKeepAlive] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [checksCount, setChecksCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const diff = personCount - applicants.length;
    if (diff > 0) {
      const newApplicants = Array.from({ length: diff }, (_, i) =>
        createEmptyApplicant(String(applicants.length + i + 1))
      );
      setApplicants((prev) => [...prev, ...newApplicants]);
    } else if (diff < 0) {
      setApplicants((prev) => prev.slice(0, personCount));
    }
  }, [personCount]);

  const updateApplicant = useCallback(
    (id: string, field: keyof Applicant, value: string) => {
      setApplicants((prev) =>
        prev.map((a) => (a.id === id ? { ...a, [field]: value } : a))
      );
    },
    []
  );

  const startTracking = useCallback(() => {
    if (!country || !city) return;
    setStatus("searching");
    setElapsedSeconds(0);
    setChecksCount(0);

    elapsedRef.current = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);

    // Simulate periodic checks
    const doCheck = () => {
      setChecksCount((c) => c + 1);
    };
    doCheck();
    timerRef.current = setInterval(doCheck, interval * 1000);
  }, [country, city, interval]);

  const stopTracking = useCallback(() => {
    setStatus("idle");
    if (timerRef.current) clearInterval(timerRef.current);
    if (elapsedRef.current) clearInterval(elapsedRef.current);
    timerRef.current = null;
    elapsedRef.current = null;
  }, []);

  const simulateFound = useCallback(() => {
    setStatus("found");
    if (timerRef.current) clearInterval(timerRef.current);
    if (elapsedRef.current) clearInterval(elapsedRef.current);
    // Play sound
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.value = 0.3;
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch {}
  }, []);

  return {
    status,
    country,
    setCountry,
    city,
    setCity,
    visaCategory,
    setVisaCategory,
    personCount,
    setPersonCount,
    interval,
    setIntervalValue,
    applicants,
    updateApplicant,
    keepAlive,
    setKeepAlive,
    startTracking,
    stopTracking,
    simulateFound,
    elapsedSeconds,
    checksCount,
  };
}
