import { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Speaker, Mic2, Volume2, Check } from "lucide-react";
import { mockDevices, type Device } from "@/lib/mock-data";

const iconMap = {
  desktop: Monitor,
  phone: Smartphone,
  speaker: Speaker,
  echo: Mic2,
};

export default function DevicesContent() {
  const [devices, setDevices] = useState<Device[]>(mockDevices);

  const setActive = (id: string) => {
    setDevices((prev) =>
      prev.map((d) => ({ ...d, isActive: d.id === id }))
    );
  };

  const activeDevice = devices.find((d) => d.isActive);

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-foreground mb-2"
      >
        Dispositivi
      </motion.h1>
      <p className="text-muted-foreground mb-8">Controlla la riproduzione su tutti i tuoi dispositivi</p>

      {/* Active device */}
      {activeDevice && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-surface rounded-2xl p-6 mb-8 glow-primary"
        >
          <div className="flex items-center gap-2 mb-3">
            <Volume2 className="w-4 h-4 text-primary animate-pulse-glow" />
            <span className="text-sm font-medium text-primary">In riproduzione su</span>
          </div>
          <div className="flex items-center gap-4">
            {(() => {
              const Icon = iconMap[activeDevice.type];
              return <Icon className="w-10 h-10 text-foreground" />;
            })()}
            <div>
              <h3 className="text-xl font-bold text-foreground">{activeDevice.name}</h3>
              <p className="text-sm text-muted-foreground capitalize">{activeDevice.type === "echo" ? "Amazon Echo" : activeDevice.type}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* All devices */}
      <h2 className="text-lg font-bold text-foreground mb-4">Tutti i dispositivi</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {devices.map((device, i) => {
          const Icon = iconMap[device.type];
          return (
            <motion.button
              key={device.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActive(device.id)}
              className={`flex items-center gap-4 p-5 rounded-xl transition-colors ${
                device.isActive
                  ? "bg-primary/10 border border-primary/30"
                  : "glass-surface hover:bg-secondary/80"
              }`}
            >
              <Icon className={`w-8 h-8 ${device.isActive ? "text-primary" : "text-muted-foreground"}`} />
              <div className="flex-1 text-left">
                <p className={`font-medium ${device.isActive ? "text-foreground" : "text-foreground/80"}`}>
                  {device.name}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {device.type === "echo" ? "Amazon Echo · Alexa" : device.type}
                </p>
              </div>
              {device.isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-primary-foreground" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Spotify Connect info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-5 rounded-xl bg-secondary/50 border border-border/50"
      >
        <h3 className="text-sm font-semibold text-foreground mb-1">Spotify Connect</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Trasferisci la riproduzione istantaneamente tra dispositivi. I tuoi dispositivi Amazon Echo con Alexa
          sono automaticamente disponibili tramite Spotify Connect.
        </p>
      </motion.div>
    </div>
  );
}
