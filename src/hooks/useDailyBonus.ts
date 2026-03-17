import { useCallback, useEffect, useRef, useState } from "react";
import {
  computeStreakUpdate,
  DAILY_BONUS_DURATION_MS,
} from "../engine/streakEngine";
import { useGameStore } from "../store";

export interface DailyBonusInfo {
  streakDays: number;
  multiplier: number;
  durationMs: number;
}

/**
 * Hook that checks the login streak on mount, activates the daily bonus
 * multiplier if a new day is detected, and manages the bonus expiry timer.
 *
 * Returns the bonus info for the welcome-back modal (null if no bonus to show).
 */
export function useDailyBonus(): {
  bonusInfo: DailyBonusInfo | null;
  dismissBonus: () => void;
} {
  const [bonusInfo, setBonusInfo] = useState<DailyBonusInfo | null>(null);
  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // On mount: compute streak and activate bonus if it's a new day
  useEffect(() => {
    const state = useGameStore.getState();
    const update = computeStreakUpdate(
      state.lastLoginDate,
      state.streakDays,
      Date.now(),
    );

    if (update.showBonus) {
      state.applyDailyBonus(
        update.newStreakDays,
        update.newLastLoginDate,
        update.multiplier,
        DAILY_BONUS_DURATION_MS,
      );
      setBonusInfo({
        streakDays: update.newStreakDays,
        multiplier: update.multiplier,
        durationMs: DAILY_BONUS_DURATION_MS,
      });

      // Schedule automatic clear after bonus expires
      clearTimerRef.current = setTimeout(() => {
        useGameStore.getState().clearDailyBonus();
        clearTimerRef.current = null;
      }, DAILY_BONUS_DURATION_MS);
    } else {
      // Same day: update streak state without bonus, but check for active bonus
      useGameStore.setState({
        streakDays: update.newStreakDays,
        lastLoginDate: update.newLastLoginDate,
      });

      // Resume in-progress bonus if page was refreshed mid-bonus
      const remaining = state.dailyBonusExpiresAt - Date.now();
      if (remaining > 0 && state.dailyBonusMultiplier > 1) {
        clearTimerRef.current = setTimeout(() => {
          useGameStore.getState().clearDailyBonus();
          clearTimerRef.current = null;
        }, remaining);
      }
    }

    return () => {
      if (clearTimerRef.current !== null) {
        clearTimeout(clearTimerRef.current);
      }
    };
  }, []);

  const dismissBonus = useCallback(() => {
    setBonusInfo(null);
  }, []);

  return { bonusInfo, dismissBonus };
}
