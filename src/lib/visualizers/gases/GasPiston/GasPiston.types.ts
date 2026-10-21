export interface GasPistonProps {
  pressureAtm?: number;
  volumeLiters?: number;
  temperatureKelvin?: number;
  moles?: number;
  showHeatSource?: boolean;
  showPressureGauge?: boolean;
  showParticles?: boolean;
  showLabels?: boolean;
  showCallouts?: boolean;
  animated?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
