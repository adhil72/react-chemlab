export const GAS_CONSTANT = 8.314462618;
export const FARADAY_CONSTANT = 96485.33212;

export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

export interface NernstParams {
  eCathodeStandard: number;
  eAnodeStandard: number;
  anodeConcentration: number;
  cathodeConcentration: number;
  anodeCharge: number;
  cathodeCharge: number;
  temperatureKelvin?: number;
}

export interface NernstResult {
  standardCellPotential: number;
  cellPotential: number;
  electronsTransferred: number;
  reactionQuotient: number;
  isSpontaneous: boolean;
}

export function calculateNernstPotential({
  eCathodeStandard,
  eAnodeStandard,
  anodeConcentration,
  cathodeConcentration,
  anodeCharge,
  cathodeCharge,
  temperatureKelvin = 298.15
}: NernstParams): NernstResult {
  const standardCellPotential = eCathodeStandard - eAnodeStandard;
  const n = lcm(anodeCharge, cathodeCharge);

  const safeAnodeConc = Math.max(anodeConcentration, 0.00001);
  const safeCathodeConc = Math.max(cathodeConcentration, 0.00001);

  const anodeExponent = n / anodeCharge;
  const cathodeExponent = n / cathodeCharge;

  const reactionQuotient = Math.pow(safeAnodeConc, anodeExponent) / Math.pow(safeCathodeConc, cathodeExponent);

  const factor = (GAS_CONSTANT * temperatureKelvin) / (n * FARADAY_CONSTANT);
  const cellPotential = standardCellPotential - factor * Math.log(reactionQuotient);

  return {
    standardCellPotential: Number(standardCellPotential.toFixed(3)),
    cellPotential: Number(cellPotential.toFixed(3)),
    electronsTransferred: n,
    reactionQuotient: Number(reactionQuotient.toFixed(4)),
    isSpontaneous: cellPotential > 0
  };
}
