export type TitrationIndicator = 'phenolphthalein' | 'methyl-orange' | 'bromothymol-blue';

export interface TitrationSetupProps {
  titrant?: string;
  analyte?: string;
  titrantVolumeAdded?: number;
  equivalencePointVolume?: number;
  indicator?: TitrationIndicator;
  showLabels?: boolean;
  showCallouts?: boolean;
  showDroplets?: boolean;
  showStirrer?: boolean;
  animated?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
