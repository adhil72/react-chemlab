export interface HalfCellConfig {
  metal: string;
  electrolyteFormula?: string;
  ionCharge?: number;
  concentration: number;
  color?: string;
  solutionColor?: string;
  standardPotential?: number;
}

export interface GalvanicCellDetails {
  anode: HalfCellConfig;
  cathode: HalfCellConfig;
  temperatureKelvin?: number;
  saltBridgeElectrolyte?: string;
}

export interface GalvanicCellProps {
  details?: Partial<GalvanicCellDetails>;
  anodeMetal?: string;
  cathodeMetal?: string;
  anodeConcentration?: number;
  cathodeConcentration?: number;
  temperatureKelvin?: number;
  showVoltmeter?: boolean;
  showVoltmeterLabel?: boolean;
  showCallouts?: boolean;
  showElectronFlow?: boolean;
  showWireFlow?: boolean;
  showSaltBridgeLabel?: boolean;
  showSaltBridgeIons?: boolean;
  showReactionArrows?: boolean;
  showIons?: boolean;
  showLabels?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  onVoltageChange?: (voltage: number) => void;
}
