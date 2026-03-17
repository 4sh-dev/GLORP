/**
 * Streak Engine — Pure logic for the Daily Return Bonus & Login Streak system.
 *
 * Uses UTC date comparisons (not raw timestamps) to avoid timezone bugs.
 * Streak resets if player is absent for 48+ hours (2 calendar days gap).
 */

/** Duration of the daily bonus multiplier in milliseconds (60 seconds). */
export const DAILY_BONUS_DURATION_MS = 60_000;

/** Maximum gap in calendar days before the streak resets. */
export const STREAK_RESET_GAP_DAYS = 2;

export interface StreakTier {
  minDays: number;
  maxDays: number;
  multiplier: number;
}

/**
 * Streak tier definitions.
 * Days 1-2: 2x, Days 3-6: 3x, Days 7+: 5x.
 */
export const STREAK_TIERS: readonly StreakTier[] = [
  { minDays: 1, maxDays: 2, multiplier: 2 },
  { minDays: 3, maxDays: 6, multiplier: 3 },
  { minDays: 7, maxDays: Number.POSITIVE_INFINITY, multiplier: 5 },
];

/**
 * Returns "YYYY-MM-DD" for a given timestamp in UTC.
 */
export function toUTCDateString(timestamp: number): string {
  const d = new Date(timestamp);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Computes the number of calendar days between two UTC date strings.
 * Returns the absolute difference in days.
 */
export function daysBetween(dateA: string, dateB: string): number {
  const msA = Date.parse(`${dateA}T00:00:00Z`);
  const msB = Date.parse(`${dateB}T00:00:00Z`);
  return Math.abs(Math.round((msB - msA) / (24 * 60 * 60 * 1000)));
}

/**
 * Returns the multiplier for the given streak day count.
 */
export function getStreakMultiplier(streakDays: number): number {
  if (streakDays <= 0) return 1;
  for (const tier of STREAK_TIERS) {
    if (streakDays >= tier.minDays && streakDays <= tier.maxDays) {
      return tier.multiplier;
    }
  }
  return 1;
}

export interface StreakUpdate {
  /** The new streak day count. */
  newStreakDays: number;
  /** The new last-login date (UTC "YYYY-MM-DD"). */
  newLastLoginDate: string;
  /** Whether to show the bonus (true only for a new daily login). */
  showBonus: boolean;
  /** The multiplier to apply (1 if no bonus). */
  multiplier: number;
}

/**
 * Computes the updated streak state when the player loads the game.
 *
 * @param lastLoginDate - Previous login date as "YYYY-MM-DD" (empty string if first login)
 * @param currentStreakDays - Current streak count
 * @param nowMs - Current timestamp in ms
 */
export function computeStreakUpdate(
  lastLoginDate: string,
  currentStreakDays: number,
  nowMs: number,
): StreakUpdate {
  const todayUTC = toUTCDateString(nowMs);

  // First ever login
  if (!lastLoginDate) {
    return {
      newStreakDays: 1,
      newLastLoginDate: todayUTC,
      showBonus: true,
      multiplier: getStreakMultiplier(1),
    };
  }

  // Same day — no new bonus (prevent stacking)
  if (lastLoginDate === todayUTC) {
    return {
      newStreakDays: currentStreakDays,
      newLastLoginDate: todayUTC,
      showBonus: false,
      multiplier: 1,
    };
  }

  const gap = daysBetween(lastLoginDate, todayUTC);

  // Gap of 1 day — streak continues
  if (gap === 1) {
    const newStreak = currentStreakDays + 1;
    return {
      newStreakDays: newStreak,
      newLastLoginDate: todayUTC,
      showBonus: true,
      multiplier: getStreakMultiplier(newStreak),
    };
  }

  // Gap of 2+ days — streak resets
  if (gap >= STREAK_RESET_GAP_DAYS) {
    return {
      newStreakDays: 1,
      newLastLoginDate: todayUTC,
      showBonus: true,
      multiplier: getStreakMultiplier(1),
    };
  }

  // Should not reach here, but just in case (gap === 0 but different string shouldn't happen)
  return {
    newStreakDays: currentStreakDays,
    newLastLoginDate: todayUTC,
    showBonus: false,
    multiplier: 1,
  };
}
