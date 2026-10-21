export interface ChromatographySpot {
  name: string;
  rf: number;
  color: string;
  radius?: number;
}

export interface PaperChromatographyProps {
  spots?: ChromatographySpot[];
  solventName?: string;
  showLabels?: boolean;
  showCallouts?: boolean;
  showRfValues?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
