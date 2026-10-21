import React from 'react';
import { STANDARD_REDUCTION_POTENTIALS } from '@/lib/core/constants/standardPotentials';

export interface ControlsPanelProps {
  anodeMetal: string;
  cathodeMetal: string;
  anodeConcentration: number;
  cathodeConcentration: number;
  temperatureKelvin: number;
  animated: boolean;
  onAnodeMetalChange: (metal: string) => void;
  onCathodeMetalChange: (metal: string) => void;
  onAnodeConcentrationChange: (conc: number) => void;
  onCathodeConcentrationChange: (conc: number) => void;
  onTemperatureChange: (temp: number) => void;
  onAnimatedChange: (anim: boolean) => void;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  anodeMetal,
  cathodeMetal,
  anodeConcentration,
  cathodeConcentration,
  temperatureKelvin,
  animated,
  onAnodeMetalChange,
  onCathodeMetalChange,
  onAnodeConcentrationChange,
  onCathodeConcentrationChange,
  onTemperatureChange,
  onAnimatedChange
}) => {
  const metalOptions = Object.keys(STANDARD_REDUCTION_POTENTIALS);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col gap-4 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
          Cell Configuration
        </span>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={animated}
            onChange={(e) => onAnimatedChange(e.target.checked)}
            className="rounded border-slate-700 text-sky-500 focus:ring-0 cursor-pointer"
          />
          <span className="text-slate-300">Animation</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-amber-400 font-semibold">Anode Half-Cell</span>
            <span>E° = {STANDARD_REDUCTION_POTENTIALS[anodeMetal]?.standardPotential.toFixed(2)} V</span>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-slate-400">Metal Electrode</label>
            <select
              value={anodeMetal}
              onChange={(e) => onAnodeMetalChange(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200 outline-none focus:border-amber-500"
            >
              {metalOptions.map((metal) => (
                <option key={metal} value={metal}>
                  {metal} ({STANDARD_REDUCTION_POTENTIALS[metal].name})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-slate-400">
              <label>[{STANDARD_REDUCTION_POTENTIALS[anodeMetal]?.ion}]</label>
              <span className="font-mono text-amber-300">{anodeConcentration.toFixed(2)} M</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="3.0"
              step="0.05"
              value={anodeConcentration}
              onChange={(e) => onAnodeConcentrationChange(parseFloat(e.target.value))}
              className="accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-2 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-sky-400 font-semibold">Cathode Half-Cell</span>
            <span>E° = {STANDARD_REDUCTION_POTENTIALS[cathodeMetal]?.standardPotential.toFixed(2)} V</span>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-slate-400">Metal Electrode</label>
            <select
              value={cathodeMetal}
              onChange={(e) => onCathodeMetalChange(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200 outline-none focus:border-sky-500"
            >
              {metalOptions.map((metal) => (
                <option key={metal} value={metal}>
                  {metal} ({STANDARD_REDUCTION_POTENTIALS[metal].name})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-slate-400">
              <label>[{STANDARD_REDUCTION_POTENTIALS[cathodeMetal]?.ion}]</label>
              <span className="font-mono text-sky-300">{cathodeConcentration.toFixed(2)} M</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="3.0"
              step="0.05"
              value={cathodeConcentration}
              onChange={(e) => onCathodeConcentrationChange(parseFloat(e.target.value))}
              className="accent-sky-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
        <div className="flex justify-between text-slate-400">
          <label>Temperature</label>
          <span className="font-mono text-emerald-400">
            {temperatureKelvin} K ({(temperatureKelvin - 273.15).toFixed(1)} °C)
          </span>
        </div>
        <input
          type="range"
          min="273.15"
          max="373.15"
          step="1"
          value={temperatureKelvin}
          onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
          className="accent-emerald-500 cursor-pointer"
        />
      </div>
    </div>
  );
};
