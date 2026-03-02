import { UPGRADES } from "../data/upgrades";
import type { Mood } from "./moodEngine";
import { getDecayedMood } from "./moodEngine";
import { computeWisdomMultiplier } from "./rebirthEngine";
import { getTotalTdPerSecond } from "./upgradeEngine";

interface TickState {
  upgradeOwned: Record<string, number>;
  mood: Mood;
  moodChangedAt: number;
  wisdomTokens?: number;
}

interface TickResult {
  trainingDataDelta: number;
  newMood: Mood | null;
}

export function computeTick(
  state: TickState,
  deltaSeconds: number,
  now: number,
): TickResult {
  const wisdomMultiplier = computeWisdomMultiplier(state.wisdomTokens ?? 0);
  const tdPerSecond = getTotalTdPerSecond(
    UPGRADES,
    state.upgradeOwned,
    wisdomMultiplier,
  );

  const decayed = getDecayedMood(state.mood, state.moodChangedAt, now);
  const newMood = decayed !== state.mood ? decayed : null;

  return {
    trainingDataDelta: tdPerSecond * deltaSeconds,
    newMood,
  };
}
