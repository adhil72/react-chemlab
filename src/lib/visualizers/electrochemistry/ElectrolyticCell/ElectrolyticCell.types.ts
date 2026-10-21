export type ElectrolyticMode = 'water-electrolysis' | 'electroplating';

export interface ElectrolyticCellProps {
  mode?: ElectrolyticMode;
  voltage?: number;
  electrolyte?: string;
  anodeLabel?: string;
  cathodeLabel?: string;
  showLabels?: boolean;
  showCallouts?: boolean;
  showBubbles?: boolean;
  showBattery?: boolean;
  animated?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
