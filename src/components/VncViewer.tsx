import { useState, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Monitor, RefreshCw, Maximize2, Minimize2, ExternalLink, Wifi, WifiOff, Settings2 } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface VncViewerProps {
  title: string;
  defaultHost?: string;
  defaultPort?: number;
  className?: string;
}

const VncViewer = ({ title, defaultHost = "187.77.161.201", defaultPort = 6080, className }: VncViewerProps) => {
  const [host, setHost] = useState(defaultHost);
  const [port, setPort] = useState(defaultPort);
  const [isConnected, setIsConnected] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const vncUrl = `http://${host}:${port}/vnc.html?autoconnect=1&resize=scale&path=websockify&reconnect=true&reconnect_delay=3000`;

  const handleConnect = useCallback(() => {
    setIsConnected(true);
    setIframeKey(prev => prev + 1);
  }, []);

  const handleDisconnect = useCallback(() => {
    setIsConnected(false);
  }, []);

  const handleRefresh = useCallback(() => {
    setIframeKey(prev => prev + 1);
  }, []);

  const handleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  const handleOpenExternal = useCallback(() => {
    window.open(vncUrl, "_blank");
  }, [vncUrl]);

  return (
    <Card className={`overflow-hidden ${className || ""}`} ref={containerRef}>
      <CardHeader className="py-2.5 px-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Monitor className="w-4 h-4 text-primary" />
            {title}
            {isConnected ? (
              <span className="flex items-center gap-1 text-xs text-emerald-500">
                <Wifi className="w-3 h-3" />
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <WifiOff className="w-3 h-3" />
              </span>
            )}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setShowSettings(!showSettings)} title="Ayarlar">
              <Settings2 className="w-3.5 h-3.5" />
            </Button>
            {isConnected && (
              <>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleRefresh} title="Yenile">
                  <RefreshCw className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleFullscreen} title="Tam Ekran">
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleOpenExternal} title="Yeni Sekmede Aç">
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>

      <Collapsible open={showSettings} onOpenChange={setShowSettings}>
        <CollapsibleContent>
          <div className="px-3 pb-2 flex items-center gap-2">
            <Input
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="IP Adresi"
              className="h-7 text-xs flex-1"
            />
            <Input
              value={port}
              onChange={(e) => setPort(Number(e.target.value))}
              placeholder="Port"
              className="h-7 text-xs w-20"
              type="number"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <CardContent className="p-0">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3 bg-muted/30">
            <Monitor className="w-10 h-10 text-muted-foreground/40" />
            <p className="text-xs text-muted-foreground">Tarayıcı ekranını izlemek için bağlanın</p>
            <p className="text-[10px] text-muted-foreground/60 font-mono">{host}:{port}</p>
            <Button size="sm" onClick={handleConnect} className="gap-1.5">
              <Wifi className="w-3.5 h-3.5" />
              Bağlan
            </Button>
          </div>
        ) : (
          <div className="relative bg-black">
            <iframe
              key={iframeKey}
              ref={iframeRef}
              src={vncUrl}
              className="w-full border-0"
              style={{ height: isFullscreen ? "100vh" : "400px" }}
              allow="clipboard-read; clipboard-write"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              onError={() => setIsConnected(false)}
            />
            <div className="absolute bottom-2 right-2 flex gap-1">
              <Button
                variant="secondary"
                size="sm"
                className="h-6 text-[10px] opacity-60 hover:opacity-100"
                onClick={handleDisconnect}
              >
                Bağlantıyı Kes
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VncViewer;
