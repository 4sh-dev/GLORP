import { describe, expect, it } from "vitest";
import {
  CHALLENGES,
  getChallengeById,
  isChallengeComplete,
} from "./challenges";

const clickOnly = CHALLENGES[0];
const noPrestige = CHALLENGES[1];
const speedRun = CHALLENGES[2];

describe("CHALLENGES", () => {
  it("defines at least 3 challenge types", () => {
    expect(CHALLENGES.length).toBeGreaterThanOrEqual(3);
  });

  it("every challenge has unique id", () => {
    const ids = CHALLENGES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every challenge has non-empty name and description", () => {
    for (const c of CHALLENGES) {
      expect(c.name.length).toBeGreaterThan(0);
      expect(c.description.length).toBeGreaterThan(0);
    }
  });

  it("every challenge has bonusMultiplier >= 1", () => {
    for (const c of CHALLENGES) {
      expect(c.bonusMultiplier).toBeGreaterThanOrEqual(1);
    }
  });

  it("click-only requires stage 3", () => {
    expect(clickOnly.completionStage).toBe(3);
    expect(clickOnly.handicap).toBe("no-auto-gen");
  });

  it("no-prestige requires stage 5", () => {
    expect(noPrestige.completionStage).toBe(5);
    expect(noPrestige.handicap).toBe("no-prestige");
  });

  it("speed-run has a 30 minute time limit", () => {
    expect(speedRun.timeLimitMs).toBe(30 * 60 * 1000);
    expect(speedRun.handicap).toBe("none");
  });
});

describe("getChallengeById", () => {
  it("returns challenge for valid id", () => {
    expect(getChallengeById("click-only")?.name).toBe("Click-Only");
  });

  it("returns undefined for invalid id", () => {
    expect(getChallengeById("nonexistent")).toBeUndefined();
  });
});

describe("isChallengeComplete", () => {
  it("returns true when stage meets requirement and no time limit", () => {
    expect(isChallengeComplete(clickOnly, 3, 0, 1000)).toBe(true);
  });

  it("returns false when stage is below requirement", () => {
    expect(isChallengeComplete(clickOnly, 2, 0, 1000)).toBe(false);
  });

  it("returns true for speed-run within time limit", () => {
    const start = 1000;
    const now = start + 20 * 60 * 1000; // 20 minutes
    expect(isChallengeComplete(speedRun, 4, start, now)).toBe(true);
  });

  it("returns false for speed-run exceeding time limit", () => {
    const start = 1000;
    const now = start + 31 * 60 * 1000; // 31 minutes
    expect(isChallengeComplete(speedRun, 4, start, now)).toBe(false);
  });

  it("returns false for speed-run at exact time limit boundary", () => {
    const start = 1000;
    const now = start + 30 * 60 * 1000 + 1; // 30 min + 1ms
    expect(isChallengeComplete(speedRun, 4, start, now)).toBe(false);
  });

  it("returns true for no-prestige at stage 5", () => {
    expect(isChallengeComplete(noPrestige, 5, 0, 1000)).toBe(true);
  });

  it("returns false for no-prestige at stage 4", () => {
    expect(isChallengeComplete(noPrestige, 4, 0, 1000)).toBe(false);
  });
});
