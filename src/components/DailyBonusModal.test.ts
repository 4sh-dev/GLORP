import { describe, expect, it } from "vitest";
import {
  DAILY_BONUS_DURATION_MS,
  getStreakMultiplier,
} from "../engine/streakEngine";

// The DailyBonusModal is a pure presentational component.
// We test the data that feeds it rather than DOM rendering.

describe("DailyBonusModal data", () => {
  it("multiplier tiers match spec: day 1-2 = 2x", () => {
    expect(getStreakMultiplier(1)).toBe(2);
    expect(getStreakMultiplier(2)).toBe(2);
  });

  it("multiplier tiers match spec: day 3-6 = 3x", () => {
    expect(getStreakMultiplier(3)).toBe(3);
    expect(getStreakMultiplier(4)).toBe(3);
    expect(getStreakMultiplier(5)).toBe(3);
    expect(getStreakMultiplier(6)).toBe(3);
  });

  it("multiplier tiers match spec: day 7+ = 5x", () => {
    expect(getStreakMultiplier(7)).toBe(5);
    expect(getStreakMultiplier(14)).toBe(5);
    expect(getStreakMultiplier(100)).toBe(5);
  });

  it("bonus duration is 60 seconds", () => {
    expect(DAILY_BONUS_DURATION_MS).toBe(60_000);
  });
});
