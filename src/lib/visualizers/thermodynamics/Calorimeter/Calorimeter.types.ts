export interface CalorimeterProps {
  initialTemperatureC?: number;
  finalTemperatureC?: number;
  waterMassGrams?: number;
  soluteName?: string;
  showLabels?: boolean;
  showCallouts?: boolean;
  showHeatExchange?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
