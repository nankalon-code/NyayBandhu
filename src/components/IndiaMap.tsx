import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { StateData } from "@/lib/indianData";

interface IndiaMapProps {
  states: StateData[];
  selectedStateIds: string[];
  onToggleState: (id: string) => void;
  colorMode?: "cleanliness" | "literacy" | "health";
}

function getColor(score: number): string {
  if (score >= 75) return "hsl(172, 50%, 35%)";
  if (score >= 55) return "hsl(42, 80%, 50%)";
  if (score >= 40) return "hsl(25, 80%, 55%)";
  return "hsl(0, 70%, 50%)";
}

export function IndiaMap({ states, selectedStateIds, onToggleState, colorMode = "cleanliness" }: IndiaMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current, {
      center: [22.5, 82],
      zoom: 5,
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 8,
      minZoom: 4,
    }).addTo(mapInstance.current);

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;

    mapInstance.current.eachLayer((layer) => {
      if (layer instanceof L.CircleMarker) {
        mapInstance.current?.removeLayer(layer);
      }
    });

    states.forEach((state) => {
      const score =
        colorMode === "cleanliness" ? state.cleanlinessScore
        : colorMode === "literacy" ? state.literacyRate
        : state.healthIndex;

      const isSelected = selectedStateIds.includes(state.id);
      const radius = Math.max(8, Math.sqrt(state.population) * 0.9);

      const marker = L.circleMarker([state.lat, state.lng], {
        radius,
        fillColor: isSelected ? "hsl(172, 50%, 45%)" : getColor(score),
        color: isSelected ? "hsl(172, 50%, 70%)" : "rgba(255,255,255,0.25)",
        weight: isSelected ? 2.5 : 1,
        opacity: 1,
        fillOpacity: isSelected ? 0.9 : 0.55,
      }).addTo(mapInstance.current!);

      marker.bindTooltip(`
        <div style="font-family: Space Grotesk; font-size: 12px; min-width: 140px;">
          <strong>${state.name}</strong><br/>
          <span style="font-size: 10px; opacity: 0.7;">
            CLN: ${state.cleanlinessScore} | LIT: ${state.literacyRate}% | HLT: ${state.healthIndex}<br/>
            Pop: ${state.population}L
          </span>
          <br/><em style="font-size: 9px;">${isSelected ? "Selected" : "Click to select"}</em>
        </div>
      `, { direction: "top", offset: [0, -radius] });

      marker.on("click", () => onToggleState(state.id));
    });
  }, [states, selectedStateIds, onToggleState, colorMode]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[420px] rounded-xl overflow-hidden border border-border"
      style={{ zIndex: 0 }}
    />
  );
}
