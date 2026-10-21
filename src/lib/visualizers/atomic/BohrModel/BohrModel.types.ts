export interface BohrModelProps {
  elementSymbol?: string;
  elementName?: string;
  protons?: number;
  neutrons?: number;
  electronShells?: number[];
  showLabels?: boolean;
  showCallouts?: boolean;
  showPhotonTransition?: boolean;
  photonWavelengthNm?: number;
  animated?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
