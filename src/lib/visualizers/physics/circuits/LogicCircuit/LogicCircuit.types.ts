export type GateType = 'AND' | 'OR' | 'NAND' | 'NOR' | 'XOR' | 'NOT'

export interface LogicCircuitProps {
  gateType?: GateType
  inputA?: 0 | 1
  inputB?: 0 | 1
  showTruthTable?: boolean
  showCallouts?: boolean
  width?: number | string
  height?: number | string
  className?: string
}
