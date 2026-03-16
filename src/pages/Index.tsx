import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Clock, PanelLeftClose, PanelLeft, Settings, BookOpen, Globe } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import IdataControlPanel from "@/components/IdataControlPanel";
import IdataAccounts from "@/components/IdataAccounts";
import IdataTrackingLogs from "@/components/IdataTrackingLogs";
import BotSettingsPanel from "@/components/BotSettingsPanel";
import VncViewer from "@/components/VncViewer";
import { ScrollArea } from "@/components/ui/scroll-area";

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className="font-mono text-sm tabular-nums text-muted-foreground flex items-center gap-1.5">
      <Clock className="w-3.5 h-3.5" />
      {time.toLocaleTimeString("tr-TR")}
    </span>
  );
}

function SidebarSection({ icon, title, defaultOpen = false, children }: { icon: React.ReactNode; title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center gap-2 w-full px-2 py-2 rounded-md hover:bg-secondary/60 transition-colors text-left">
        <span className="text-muted-foreground">{icon}</span>
        <span className="text-xs font-semibold text-foreground flex-1">{title}</span>
        <svg className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

const Index = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
          </Button>
          <h1 className="text-base font-bold tracking-tight">🇮🇹 iDATA Randevu Takip</h1>
          <LiveClock />
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => navigate("/guide")} className="gap-1.5 text-muted-foreground text-xs">
            <BookOpen className="w-3.5 h-3.5" />
            Kılavuz
          </Button>
          <Button variant="ghost" size="sm" onClick={signOut} className="gap-1.5 text-muted-foreground text-xs">
            <LogOut className="w-3.5 h-3.5" />
            Çıkış
          </Button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* LEFT SIDEBAR */}
        {sidebarOpen && (
          <aside className="w-[320px] shrink-0 border-r border-border bg-card/50">
            <ScrollArea className="h-[calc(100vh-53px)]">
              <div className="p-3 space-y-1">
                <SidebarSection icon={<Settings className="w-3.5 h-3.5" />} title="iDATA Kontrol Paneli" defaultOpen>
                  <IdataControlPanel />
                </SidebarSection>
                <SidebarSection icon={<Globe className="w-3.5 h-3.5" />} title="Bot Ayarları">
                  <BotSettingsPanel />
                </SidebarSection>
              </div>
            </ScrollArea>
          </aside>
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0">
          <ScrollArea className="h-[calc(100vh-53px)]">
            <div className="p-4 md:p-6 space-y-5 max-w-[1400px]">
              <VncViewer title="🇮🇹 iDATA Bot Ekranı" pathPrefix="/idata" />
              <IdataAccounts />
              <IdataTrackingLogs />
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default Index;
