export interface RLCCircuitProps {
  resistance?: number
  inductance?: number
  capacitance?: number
  frequency?: number
  voltage?: number
  showPhasorSummary?: boolean
  showCallouts?: boolean
  animated?: boolean
  width?: number | string
  height?: number | string
  className?: string
}
