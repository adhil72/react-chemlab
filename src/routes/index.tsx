import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  GalvanicCell,
  ElectrolyticCell,
  TitrationSetup,
  Spectrophotometer,
  PaperChromatography,
  BohrModel,
  OrbitalDiagram,
  Calorimeter,
  ReactionEnergyProfile,
  PhaseDiagram,
  GasPiston
} from '@/lib';

export const Route = createFileRoute('/')({
  component: IndexPage
});

type ComponentKey =
  | 'galvanic'
  | 'electrolytic'
  | 'titration'
  | 'spectro'
  | 'chromatography'
  | 'bohr'
  | 'orbital'
  | 'calorimeter'
  | 'energyProfile'
  | 'phaseDiagram'
  | 'gasPiston';

function IndexPage() {
  const searchTab = typeof window !== 'undefined'
    ? (new URLSearchParams(window.location.search).get('tab') as ComponentKey | null)
    : null;

  const [activeTab, setActiveTab] = useState<ComponentKey>(searchTab || 'galvanic');
  const [showCallouts, setShowCallouts] = useState(true);

  const tabs: { key: ComponentKey; label: string; category: string }[] = [
    { key: 'galvanic', label: 'Galvanic Cell', category: 'Electrochemistry' },
    { key: 'electrolytic', label: 'Electrolytic Cell', category: 'Electrochemistry' },
    { key: 'titration', label: 'Titration Setup', category: 'Analytical' },
    { key: 'spectro', label: 'Spectrophotometer', category: 'Analytical' },
    { key: 'chromatography', label: 'Chromatography', category: 'Analytical' },
    { key: 'bohr', label: 'Bohr Model', category: 'Atomic' },
    { key: 'orbital', label: 'Orbital Diagram', category: 'Atomic' },
    { key: 'calorimeter', label: 'Calorimeter', category: 'Thermodynamics' },
    { key: 'energyProfile', label: 'Energy Profile', category: 'Thermodynamics' },
    { key: 'phaseDiagram', label: 'Phase Diagram', category: 'Thermodynamics' },
    { key: 'gasPiston', label: 'Gas Piston', category: 'Gases' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start p-6 gap-6">
      <header className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            react-chemlab
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
              Component Gallery
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Modular, interactive, textbook-grade chemistry visualizations</p>
        </div>

        <label className="flex items-center gap-2 cursor-pointer select-none bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-200">
          <input
            type="checkbox"
            checked={showCallouts}
            onChange={(e) => setShowCallouts(e.target.checked)}
            className="rounded accent-sky-500 cursor-pointer"
          />
          Show Leader Callouts & Labels
        </label>
      </header>

      <nav className="max-w-5xl w-full flex flex-wrap gap-2 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              activeTab === tab.key
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-4xl w-full border border-slate-200 flex flex-col items-center min-h-[460px] justify-center">
        {activeTab === 'galvanic' && (
          <GalvanicCell
            details={{
              anode: { metal: 'Cu', concentration: 1.0 },
              cathode: { metal: 'Ag', concentration: 1.0 },
              saltBridgeElectrolyte: 'KNO₃(aq)'
            }}
            showCallouts={showCallouts}
          />
        )}

        {activeTab === 'electrolytic' && (
          <ElectrolyticCell
            mode="water-electrolysis"
            showCallouts={showCallouts}
          />
        )}

        {activeTab === 'titration' && (
          <TitrationSetup
            titrant="0.100 M NaOH"
            analyte="25.0 mL HCl"
            titrantVolumeAdded={24.8}
            equivalencePointVolume={25.0}
            showCallouts={showCallouts}
          />
        )}

        {activeTab === 'spectro' && (
          <Spectrophotometer
            wavelengthNm={520}
            absorbance={0.435}
            transmittancePercent={36.7}
            showCallouts={showCallouts}
          />
        )}

        {activeTab === 'chromatography' && (
          <PaperChromatography
            showCallouts={showCallouts}
          />
        )}

        {activeTab === 'bohr' && (
          <BohrModel
            elementSymbol="C"
            elementName="Carbon"
            protons={6}
            neutrons={6}
            electronShells={[2, 4]}
            showCallouts={showCallouts}
          />
        )}

        {activeTab === 'orbital' && (
          <OrbitalDiagram
            elementSymbol="Fe"
            elementName="Iron"
            atomicNumber={26}
            subshells={[
              { label: '3d', boxes: 5, electrons: [2, 1, 1, 1, 1] },
              { label: '4s', boxes: 1, electrons: [2] }
            ]}
          />
        )}

        {activeTab === 'calorimeter' && (
          <Calorimeter
            initialTemperatureC={21.0}
            finalTemperatureC={28.5}
            waterMassGrams={100.0}
            soluteName="5.0 g NaOH(s)"
            showCallouts={showCallouts}
          />
        )}

        {activeTab === 'energyProfile' && (
          <ReactionEnergyProfile
            reactionType="exothermic"
            reactantsLabel="2NO + O₂"
            productsLabel="2NO₂"
            activationEnergyKj={68}
            deltaHKj={-57}
            showCallouts={showCallouts}
          />
        )}

        {activeTab === 'phaseDiagram' && (
          <PhaseDiagram
            substance="water"
            substanceName="Water (H₂O)"
            showCallouts={showCallouts}
          />
        )}

        {activeTab === 'gasPiston' && (
          <GasPiston
            pressureAtm={2.0}
            volumeLiters={4.0}
            temperatureKelvin={350.0}
            showCallouts={showCallouts}
          />
        )}
      </div>
    </div>
  );
}
