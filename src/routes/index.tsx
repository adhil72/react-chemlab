import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Atom,
  Beaker,
  CircleDot,
  Eye,
  FlaskConical,
  Grid2X2,
  Layers3,
  Scale,
  SlidersHorizontal,
  Sparkles,
  Zap
} from 'lucide-react';
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
  GasPiston,
  DCCircuit,
  WheatstoneBridge,
  RLCCircuit,
  MeterBridge,
  LogicCircuit,
  RayOptics,
  SimplePendulum
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
  | 'gasPiston'
  | 'dcCircuit'
  | 'wheatstone'
  | 'rlc'
  | 'meterBridge'
  | 'logicGate'
  | 'rayOptics'
  | 'pendulum';

type CategoryKey =
  | 'All'
  | 'Electrochemistry'
  | 'Analytical'
  | 'Atomic'
  | 'Thermodynamics'
  | 'Gases'
  | 'Circuits'
  | 'Optics'
  | 'Mechanics';

const categoryMeta: Record<Exclude<CategoryKey, 'All'>, { icon: typeof Atom; note: string }> = {
  Electrochemistry: { icon: FlaskConical, note: 'Cells, ions, and electron flow' },
  Analytical: { icon: SlidersHorizontal, note: 'Measure, separate, and quantify' },
  Atomic: { icon: Atom, note: 'Orbitals, shells, and configuration' },
  Thermodynamics: { icon: Layers3, note: 'Energy, phases, and heat' },
  Gases: { icon: CircleDot, note: 'Pressure, volume, and motion' },
  Circuits: { icon: Zap, note: 'DC, AC, bridges, and digital logic' },
  Optics: { icon: Eye, note: 'Lenses, refraction, and image formation' },
  Mechanics: { icon: Scale, note: 'Forces, oscillations, and dynamics' }
};

function IndexPage() {
  const searchTab = typeof window !== 'undefined'
    ? (new URLSearchParams(window.location.search).get('tab') as ComponentKey | null)
    : null;

  const [activeTab, setActiveTab] = useState<ComponentKey>(searchTab || 'galvanic');
  const [showCallouts, setShowCallouts] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('All');

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
    { key: 'gasPiston', label: 'Gas Piston', category: 'Gases' },
    { key: 'dcCircuit', label: 'DC Circuit', category: 'Circuits' },
    { key: 'wheatstone', label: 'Wheatstone Bridge', category: 'Circuits' },
    { key: 'rlc', label: 'RLC Circuit', category: 'Circuits' },
    { key: 'meterBridge', label: 'Meter Bridge', category: 'Circuits' },
    { key: 'logicGate', label: 'Logic Gate', category: 'Circuits' },
    { key: 'rayOptics', label: 'Ray Optics', category: 'Optics' },
    { key: 'pendulum', label: 'Simple Pendulum', category: 'Mechanics' }
  ];

  const activeComponent = tabs.find((tab) => tab.key === activeTab) ?? tabs[0];
  const visibleTabs = activeCategory === 'All'
    ? tabs
    : tabs.filter((tab) => tab.category === activeCategory);
  const activeIndex = tabs.findIndex((tab) => tab.key === activeTab) + 1;

  const selectCategory = (category: CategoryKey) => {
    setActiveCategory(category);
    if (category !== 'All' && activeComponent.category !== category) {
      const firstInCategory = tabs.find((tab) => tab.category === category);
      if (firstInCategory) setActiveTab(firstInCategory.key);
    }
  };

  return (
    <div className="chemlab-app">
      <header className="chemlab-header">
        <div className="chemlab-header-top">
          <span className="chemlab-eyebrow"><Sparkles size={13} /> Interactive science atlas</span>
          <span className="chemlab-header-note">React components · SVG-native · 18 studies</span>
        </div>
        <div className="chemlab-brand-row">
          <div className="chemlab-brand-lockup">
            <div className="chemlab-mark" aria-hidden="true"><Beaker size={22} strokeWidth={1.8} /></div>
            <div>
              <h1>CHEM<span>LAB</span></h1>
              <p>Textbook-grade chemistry & physics visualizers.</p>
            </div>
          </div>
          <div className="chemlab-header-stats" aria-label="Gallery statistics">
            <div><strong>18</strong><span>visualizers</span></div>
            <div><strong>08</strong><span>domains</span></div>
            <div><strong>∞</strong><span>scalable</span></div>
          </div>
        </div>
      </header>

      <main className="chemlab-main">
        <aside className="chemlab-explorer" aria-label="Visualizer explorer">
          <div className="chemlab-panel-heading">
            <div>
              <span className="chemlab-section-kicker">01 / Explore</span>
              <h2>Choose a system</h2>
            </div>
            <Grid2X2 size={18} aria-hidden="true" />
          </div>

          <div className="chemlab-category-list" role="tablist" aria-label="Science domains">
            <button
              className={`chemlab-category-button ${activeCategory === 'All' ? 'is-active' : ''}`}
              onClick={() => selectCategory('All')}
              role="tab"
              aria-selected={activeCategory === 'All'}
            >
              <span className="chemlab-category-icon"><Grid2X2 size={15} /></span>
              <span><strong>All systems</strong><small>Complete gallery index</small></span>
              <em>{tabs.length}</em>
            </button>
            {(Object.keys(categoryMeta) as Exclude<CategoryKey, 'All'>[]).map((category) => {
              const meta = categoryMeta[category];
              const Icon = meta.icon;
              const count = tabs.filter((tab) => tab.category === category).length;
              return (
                <button
                  key={category}
                  className={`chemlab-category-button ${activeCategory === category ? 'is-active' : ''}`}
                  onClick={() => selectCategory(category)}
                  role="tab"
                  aria-selected={activeCategory === category}
                >
                  <span className="chemlab-category-icon"><Icon size={15} /></span>
                  <span><strong>{category}</strong><small>{meta.note}</small></span>
                  <em>{count}</em>
                </button>
              );
            })}
          </div>

          <div className="chemlab-component-list" role="listbox" aria-label="Visualizer studies">
            <div className="chemlab-list-label">Studies in view</div>
            {visibleTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`chemlab-study-button ${activeTab === tab.key ? 'is-active' : ''}`}
                role="option"
                aria-selected={activeTab === tab.key}
              >
                <span className="chemlab-study-number">{String(tabs.indexOf(tab) + 1).padStart(2, '0')}</span>
                <span className="chemlab-study-name">{tab.label}</span>
                {activeTab === tab.key && <span className="chemlab-study-dot" aria-hidden="true" />}
              </button>
            ))}
          </div>
        </aside>

        <section className="chemlab-workbench" aria-label="Science visualizer workbench">
          <div className="chemlab-workbench-heading">
            <div>
              <span className="chemlab-section-kicker">02 / Inspect</span>
              <h2>{activeComponent.label}</h2>
              <p>{activeComponent.category} · study {String(activeIndex).padStart(2, '0')} of {String(tabs.length).padStart(2, '0')}</p>
            </div>
            <label className="chemlab-toggle">
              <input
                type="checkbox"
                checked={showCallouts}
                onChange={(e) => setShowCallouts(e.target.checked)}
              />
              <span className="chemlab-toggle-track" aria-hidden="true"><span /></span>
              <span>Callouts & labels</span>
            </label>
          </div>

          <div className="chemlab-stage">
            <div className="chemlab-stage-grid" aria-hidden="true" />
            <div className="chemlab-stage-meta">
              <span>FIG. {String(activeIndex).padStart(2, '0')}</span>
              <span>LIVE SVG STUDY</span>
            </div>
            <div className="chemlab-visualizer-host">
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

              {activeTab === 'dcCircuit' && (
                <DCCircuit
                  voltage={12}
                  resistance={10}
                  switchClosed={true}
                  showCallouts={showCallouts}
                />
              )}

              {activeTab === 'wheatstone' && (
                <WheatstoneBridge
                  r1={100}
                  r2={100}
                  r3={200}
                  rx={200}
                  voltage={10}
                  showCallouts={showCallouts}
                />
              )}

              {activeTab === 'rlc' && (
                <RLCCircuit
                  resistance={50}
                  inductance={0.1}
                  capacitance={10}
                  frequency={50}
                  voltage={120}
                  showCallouts={showCallouts}
                />
              )}

              {activeTab === 'meterBridge' && (
                <MeterBridge
                  resistanceR={2}
                  balanceLengthL={40}
                  showCallouts={showCallouts}
                />
              )}

              {activeTab === 'logicGate' && (
                <LogicCircuit
                  gateType="AND"
                  inputA={1}
                  inputB={1}
                  showCallouts={showCallouts}
                />
              )}

              {activeTab === 'rayOptics' && (
                <RayOptics
                  lensType="convex"
                  focalLength={50}
                  objectDistance={80}
                  objectHeight={40}
                  showCallouts={showCallouts}
                />
              )}

              {activeTab === 'pendulum' && (
                <SimplePendulum
                  stringLength={1.0}
                  angleDegrees={25}
                  bobMass={0.5}
                  showCallouts={showCallouts}
                />
              )}
            </div>
            <div className="chemlab-stage-caption">
              <span className="chemlab-caption-rule" aria-hidden="true" />
              <p>Interactive apparatus rendered as scalable vector geometry, with textbook callouts and live values preserved.</p>
              <span className="chemlab-caption-status"><CircleDot size={12} /> Ready</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="chemlab-footer">
        <span>react-chemlab / science component gallery</span>
        <span>Built for clear scientific and physical thinking.</span>
      </footer>
    </div>
  );
}
