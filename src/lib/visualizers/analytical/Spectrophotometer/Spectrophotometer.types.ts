export interface SpectrophotometerProps {
  wavelengthNm?: number;
  absorbance?: number;
  transmittancePercent?: number;
  sampleColor?: string;
  solutionLabel?: string;
  pathLengthCm?: number;
  showLabels?: boolean;
  showCallouts?: boolean;
  showRays?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
