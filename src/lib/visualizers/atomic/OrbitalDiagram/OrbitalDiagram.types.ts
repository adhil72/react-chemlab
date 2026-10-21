export interface SubshellConfig {
  label: string;
  boxes: number;
  electrons: number[];
}

export interface OrbitalDiagramProps {
  elementSymbol?: string;
  elementName?: string;
  atomicNumber?: number;
  subshells?: SubshellConfig[];
  showEnergyAxis?: boolean;
  showLabels?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
