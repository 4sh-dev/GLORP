export interface Challenge {
  id: string;
  name: string;
  description: string;
  handicap: string;
  completionStage: number;
  timeLimitMs: number | null;
  bonusMultiplier: number;
}

export const CHALLENGES: readonly Challenge[] = [
  {
    id: "click-only",
    name: "Click-Only",
    description:
      "Auto-generators produce no TD. Only manual clicking earns TD.",
    handicap: "no-auto-gen",
    completionStage: 3,
    timeLimitMs: null,
    bonusMultiplier: 2,
  },
  {
    id: "no-prestige",
    name: "Purist",
    description: "All prestige bonuses are disabled for this run.",
    handicap: "no-prestige",
    completionStage: 5,
    timeLimitMs: null,
    bonusMultiplier: 2,
  },
  {
    id: "speed-run",
    name: "Speed Run",
    description: "No handicap, but you must rebirth within 30 minutes.",
    handicap: "none",
    completionStage: 4,
    timeLimitMs: 30 * 60 * 1000,
    bonusMultiplier: 2,
  },
];

export function getChallengeById(id: string): Challenge | undefined {
  return CHALLENGES.find((c) => c.id === id);
}

export function isChallengeComplete(
  challenge: Challenge,
  evolutionStage: number,
  runStart: number,
  now: number,
): boolean {
  if (evolutionStage < challenge.completionStage) return false;
  if (challenge.timeLimitMs !== null) {
    const elapsed = now - runStart;
    if (elapsed > challenge.timeLimitMs) return false;
  }
  return true;
}
