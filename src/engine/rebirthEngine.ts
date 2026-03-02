import type { Species } from "../data/species";
import { SPECIES_ORDER } from "../data/species";

/** Minimum evolution stage required to trigger a Rebirth. */
export const REBIRTH_MIN_STAGE = 4;

/** Divisor used in the Wisdom Token formula: floor(sqrt(totalTdEarned / divisor)). */
export const WISDOM_TOKENS_DIVISOR = 1_000_000;

/** Passive TD/s bonus per Wisdom Token: 5% per token. */
export const WISDOM_MULTIPLIER_PER_TOKEN = 0.05;

/**
 * Number of Wisdom Tokens earned for a Rebirth given the total TD earned
 * at the moment of rebirth.
 *
 * Formula: floor(sqrt(totalTdEarned / WISDOM_TOKENS_DIVISOR))
 */
export function computeWisdomTokens(totalTdEarned: number): number {
  return Math.floor(Math.sqrt(totalTdEarned / WISDOM_TOKENS_DIVISOR));
}

/**
 * Permanent passive TD/s multiplier conferred by accumulated Wisdom Tokens.
 *
 * Formula: 1 + wisdomTokens * WISDOM_MULTIPLIER_PER_TOKEN
 */
export function computeWisdomMultiplier(wisdomTokens: number): number {
  return 1 + wisdomTokens * WISDOM_MULTIPLIER_PER_TOKEN;
}

/** Returns true when the player is eligible to Rebirth. */
export function canRebirth(evolutionStage: number): boolean {
  return evolutionStage >= REBIRTH_MIN_STAGE;
}

/**
 * Returns the next species in the unlock order.
 * If already at the last species, stays there (no further unlocks).
 */
export function getNextSpecies(currentSpecies: Species): Species {
  const idx = SPECIES_ORDER.indexOf(currentSpecies);
  if (idx === -1 || idx >= SPECIES_ORDER.length - 1) {
    return SPECIES_ORDER[SPECIES_ORDER.length - 1];
  }
  return SPECIES_ORDER[idx + 1];
}
