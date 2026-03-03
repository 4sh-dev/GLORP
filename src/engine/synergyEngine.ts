import { SYNERGIES } from "../data/synergies";

/**
 * Returns the synergies that are currently active given owned generator counts.
 */
export function getActiveSynergies(
  owned: Record<string, number>,
): typeof SYNERGIES {
  return SYNERGIES.filter((s) => (owned[s.sourceId] ?? 0) >= s.threshold);
}

/**
 * Returns the total synergy multiplier for a generator.
 * All active synergies whose targetIds include upgradeId stack multiplicatively.
 * Returns 1 (no bonus) when no synergies apply.
 */
export function getSynergyMultiplier(
  upgradeId: string,
  owned: Record<string, number>,
): number {
  return getActiveSynergies(owned)
    .filter((s) => s.targetIds.includes(upgradeId))
    .reduce((acc, s) => acc * (1 + s.bonusPercent / 100), 1);
}
