export type SubstanceType = 'water' | 'carbon-dioxide';

export interface PhaseDiagramProps {
  substance?: SubstanceType;
  substanceName?: string;
  showLabels?: boolean;
  showCallouts?: boolean;
  showCriticalPoints?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
