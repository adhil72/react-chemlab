export interface RedoxCouple {
  symbol: string;
  name: string;
  ion: string;
  charge: number;
  standardPotential: number;
  color: string;
  solutionColor: string;
}

export const STANDARD_REDUCTION_POTENTIALS: Record<string, RedoxCouple> = {
  Li: {
    symbol: 'Li',
    name: 'Lithium',
    ion: 'Li⁺',
    charge: 1,
    standardPotential: -3.04,
    color: '#cbd5e1',
    solutionColor: 'rgba(224, 231, 255, 0.35)'
  },
  Mg: {
    symbol: 'Mg',
    name: 'Magnesium',
    ion: 'Mg²⁺',
    charge: 2,
    standardPotential: -2.37,
    color: '#94a3b8',
    solutionColor: 'rgba(241, 245, 249, 0.4)'
  },
  Al: {
    symbol: 'Al',
    name: 'Aluminium',
    ion: 'Al³⁺',
    charge: 3,
    standardPotential: -1.66,
    color: '#cbd5e1',
    solutionColor: 'rgba(226, 232, 240, 0.4)'
  },
  Zn: {
    symbol: 'Zn',
    name: 'Zinc',
    ion: 'Zn²⁺',
    charge: 2,
    standardPotential: -0.76,
    color: '#94a3b8',
    solutionColor: 'rgba(226, 232, 240, 0.35)'
  },
  Fe: {
    symbol: 'Fe',
    name: 'Iron',
    ion: 'Fe²⁺',
    charge: 2,
    standardPotential: -0.44,
    color: '#64748b',
    solutionColor: 'rgba(187, 247, 208, 0.4)'
  },
  Ni: {
    symbol: 'Ni',
    name: 'Nickel',
    ion: 'Ni²⁺',
    charge: 2,
    standardPotential: -0.26,
    color: '#a1a1aa',
    solutionColor: 'rgba(134, 239, 172, 0.45)'
  },
  Pb: {
    symbol: 'Pb',
    name: 'Lead',
    ion: 'Pb²⁺',
    charge: 2,
    standardPotential: -0.13,
    color: '#475569',
    solutionColor: 'rgba(226, 232, 240, 0.35)'
  },
  Cu: {
    symbol: 'Cu',
    name: 'Copper',
    ion: 'Cu²⁺',
    charge: 2,
    standardPotential: 0.34,
    color: '#b45309',
    solutionColor: 'rgba(56, 189, 248, 0.45)'
  },
  Ag: {
    symbol: 'Ag',
    name: 'Silver',
    ion: 'Ag⁺',
    charge: 1,
    standardPotential: 0.80,
    color: '#e2e8f0',
    solutionColor: 'rgba(248, 250, 252, 0.35)'
  },
  Au: {
    symbol: 'Au',
    name: 'Gold',
    ion: 'Au³⁺',
    charge: 3,
    standardPotential: 1.50,
    color: '#eab308',
    solutionColor: 'rgba(254, 240, 138, 0.45)'
  }
}
