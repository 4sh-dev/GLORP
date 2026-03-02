import type { Upgrade } from "../data/upgrades";

const COST_MULTIPLIER = 1.15;

export function getUpgradeCost(upgrade: Upgrade, owned: number): number {
  return Math.floor(upgrade.baseCost * COST_MULTIPLIER ** owned);
}

/**
 * Returns the total TD/s from owned upgrades, multiplied by the permanent
 * wisdom multiplier (1 + wisdomTokens * 0.05). Defaults to no bonus (×1).
 */
export function getTotalTdPerSecond(
  upgrades: readonly Upgrade[],
  owned: Record<string, number>,
  wisdomMultiplier = 1,
): number {
  let total = 0;
  for (const upgrade of upgrades) {
    const count = owned[upgrade.id] ?? 0;
    total += upgrade.baseTdPerSecond * count;
  }
  return total * wisdomMultiplier;
}
