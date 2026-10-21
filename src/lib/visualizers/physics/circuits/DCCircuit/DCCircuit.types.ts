export interface DCCircuitProps {
  voltage?: number
  resistance?: number
  switchClosed?: boolean
  showVoltmeter?: boolean
  showAmmeter?: boolean
  showBulb?: boolean
  showCallouts?: boolean
  showCurrentFlow?: boolean
  animated?: boolean
  width?: number | string
  height?: number | string
  className?: string
}
