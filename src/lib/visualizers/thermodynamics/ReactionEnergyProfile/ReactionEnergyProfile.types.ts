export interface ReactionEnergyProfileProps {
  reactionType?: 'exothermic' | 'endothermic';
  reactantsLabel?: string;
  productsLabel?: string;
  activationEnergyKj?: number;
  deltaHKj?: number;
  showCatalyzedPath?: boolean;
  catalyzedActivationEnergyKj?: number;
  showLabels?: boolean;
  showCallouts?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}
