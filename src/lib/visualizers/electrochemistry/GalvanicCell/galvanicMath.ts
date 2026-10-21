import { STANDARD_REDUCTION_POTENTIALS, RedoxCouple } from '../../../core/constants/standardPotentials';
import { calculateNernstPotential, NernstResult } from '../../../core/math/nernst';
import { GalvanicCellDetails, HalfCellConfig } from './GalvanicCell.types';

export function resolveHalfCell(
  metalKey: string,
  override?: Partial<HalfCellConfig>
): HalfCellConfig & { couple: RedoxCouple } {
  const couple = STANDARD_REDUCTION_POTENTIALS[metalKey] || STANDARD_REDUCTION_POTENTIALS.Zn;

  return {
    metal: couple.symbol,
    electrolyteFormula: override?.electrolyteFormula ?? `${couple.symbol}SO₄`,
    ionCharge: override?.ionCharge ?? couple.charge,
    concentration: override?.concentration ?? 1.0,
    color: override?.color ?? couple.color,
    solutionColor: override?.solutionColor ?? couple.solutionColor,
    standardPotential: override?.standardPotential ?? couple.standardPotential,
    couple
  };
}

export function computeGalvanicCellState(
  details: GalvanicCellDetails
): {
  anode: HalfCellConfig & { couple: RedoxCouple };
  cathode: HalfCellConfig & { couple: RedoxCouple };
  nernst: NernstResult;
  halfReactions: {
    anodeReaction: string;
    cathodeReaction: string;
    overallReaction: string;
  };
} {
  const anode = resolveHalfCell(details.anode.metal, details.anode);
  const cathode = resolveHalfCell(details.cathode.metal, details.cathode);

  const nernst = calculateNernstPotential({
    eCathodeStandard: cathode.standardPotential ?? cathode.couple.standardPotential,
    eAnodeStandard: anode.standardPotential ?? anode.couple.standardPotential,
    anodeConcentration: anode.concentration,
    cathodeConcentration: cathode.concentration,
    anodeCharge: anode.ionCharge ?? anode.couple.charge,
    cathodeCharge: cathode.ionCharge ?? cathode.couple.charge,
    temperatureKelvin: details.temperatureKelvin ?? 298.15
  });

  const anodeElectrons = `${anode.ionCharge ?? 2}e⁻`;
  const cathodeElectrons = `${cathode.ionCharge ?? 2}e⁻`;

  const anodeReaction = `${anode.metal}(s) → ${anode.couple.ion}(aq) + ${anodeElectrons}`;
  const cathodeReaction = `${cathode.couple.ion}(aq) + ${cathodeElectrons} → ${cathode.metal}(s)`;
  const overallReaction = `${anode.metal}(s) + ${cathode.couple.ion}(aq) → ${anode.couple.ion}(aq) + ${cathode.metal}(s)`;

  return {
    anode,
    cathode,
    nernst,
    halfReactions: {
      anodeReaction,
      cathodeReaction,
      overallReaction
    }
  };
}
