import { useState } from "react";
import { Link } from "react-router-dom";
import ControlPanel from "@/components/ControlPanel";
import StatusPanel from "@/components/StatusPanel";
import ApplicantList from "@/components/ApplicantList";
import TrackingLogs from "@/components/TrackingLogs";
import VfsAccounts from "@/components/VfsAccounts";
import { useTracking } from "@/hooks/useTracking";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Index = () => {
  const t = useTracking();

  return (
    <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] min-h-screen">
      <ControlPanel
        country={t.country}
        setCountry={t.setCountry}
        city={t.city}
        setCity={t.setCity}
        visaCategory={t.visaCategory}
        setVisaCategory={t.setVisaCategory}
        personCount={t.personCount}
        setPersonCount={t.setPersonCount}
        interval={t.interval}
        setIntervalValue={t.setIntervalValue}
        keepAlive={t.keepAlive}
        setKeepAlive={t.setKeepAlive}
        status={t.status}
        onStart={t.startTracking}
        onStop={t.stopTracking}
      />

      <main className="p-4 md:p-6 lg:p-8 space-y-6 overflow-y-auto max-h-screen">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">🌍 VFS Global</h1>
          <Button variant="outline" size="sm" asChild>
            <Link to="/idata" className="gap-1.5">
              🇮🇹 iDATA İtalya
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        <StatusPanel
          status={t.status}
          country={t.country}
          city={t.city}
          elapsedSeconds={t.elapsedSeconds}
          checksCount={t.checksCount}
          onSimulateFound={t.simulateFound}
          configId={t.configId}
        />

        <ApplicantList
          applicants={t.applicants}
          onUpdate={t.updateApplicant}
          personCount={t.personCount}
          setPersonCount={t.setPersonCount}
        />

        <VfsAccounts />

        <TrackingLogs configId={t.configId} />
      </main>
    </div>
  );
};

export default Index;
