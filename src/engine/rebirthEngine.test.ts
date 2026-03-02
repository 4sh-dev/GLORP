import { describe, expect, it } from "vitest";
import {
  canRebirth,
  computeWisdomMultiplier,
  computeWisdomTokens,
  getNextSpecies,
  REBIRTH_MIN_STAGE,
  WISDOM_MULTIPLIER_PER_TOKEN,
  WISDOM_TOKENS_DIVISOR,
} from "./rebirthEngine";

describe("computeWisdomTokens", () => {
  it("returns 0 for 0 TD earned", () => {
    expect(computeWisdomTokens(0)).toBe(0);
  });

  it("returns 0 below 1M TD (sqrt < 1)", () => {
    expect(computeWisdomTokens(999_999)).toBe(0);
  });

  it("returns 1 at exactly 1M TD", () => {
    // floor(sqrt(1_000_000 / 1_000_000)) = floor(sqrt(1)) = 1
    expect(computeWisdomTokens(WISDOM_TOKENS_DIVISOR)).toBe(1);
  });

  it("returns correct tokens for 4M TD", () => {
    // floor(sqrt(4_000_000 / 1_000_000)) = floor(sqrt(4)) = floor(2) = 2
    expect(computeWisdomTokens(4_000_000)).toBe(2);
  });

  it("returns correct tokens for 9M TD", () => {
    // floor(sqrt(9)) = 3
    expect(computeWisdomTokens(9_000_000)).toBe(3);
  });

  it("returns correct tokens for 10M TD (stage 4 unlock threshold)", () => {
    // floor(sqrt(10)) ≈ floor(3.162) = 3
    expect(computeWisdomTokens(10_000_000)).toBe(3);
  });

  it("floors fractional results", () => {
    // floor(sqrt(2_000_000 / 1_000_000)) = floor(sqrt(2)) = floor(1.414) = 1
    expect(computeWisdomTokens(2_000_000)).toBe(1);
  });

  it("scales correctly at 100M TD", () => {
    // floor(sqrt(100)) = 10
    expect(computeWisdomTokens(100_000_000)).toBe(10);
  });
});

describe("computeWisdomMultiplier", () => {
  it("returns 1.0 with 0 tokens (no bonus)", () => {
    expect(computeWisdomMultiplier(0)).toBeCloseTo(1.0);
  });

  it("returns 1.05 with 1 token (5% bonus)", () => {
    expect(computeWisdomMultiplier(1)).toBeCloseTo(
      1 + WISDOM_MULTIPLIER_PER_TOKEN,
    );
  });

  it("returns 1.1 with 2 tokens (10% bonus)", () => {
    expect(computeWisdomMultiplier(2)).toBeCloseTo(1.1);
  });

  it("returns 1.5 with 10 tokens (50% bonus)", () => {
    expect(computeWisdomMultiplier(10)).toBeCloseTo(1.5);
  });

  it("scales linearly with token count", () => {
    expect(computeWisdomMultiplier(20)).toBeCloseTo(2.0);
  });
});

describe("canRebirth", () => {
  it("returns false at stage 0", () => {
    expect(canRebirth(0)).toBe(false);
  });

  it("returns false at stage 3", () => {
    expect(canRebirth(3)).toBe(false);
  });

  it("returns true at exactly stage 4 (min stage)", () => {
    expect(canRebirth(REBIRTH_MIN_STAGE)).toBe(true);
  });

  it("returns true above stage 4", () => {
    expect(canRebirth(5)).toBe(true);
  });
});

describe("getNextSpecies", () => {
  it("advances from GLORP to ZAPPY", () => {
    expect(getNextSpecies("GLORP")).toBe("ZAPPY");
  });

  it("advances from ZAPPY to CHONK", () => {
    expect(getNextSpecies("ZAPPY")).toBe("CHONK");
  });

  it("advances from CHONK to WISP", () => {
    expect(getNextSpecies("CHONK")).toBe("WISP");
  });

  it("advances from WISP to MEGA-GLORP", () => {
    expect(getNextSpecies("WISP")).toBe("MEGA-GLORP");
  });

  it("stays at MEGA-GLORP when already at last species", () => {
    expect(getNextSpecies("MEGA-GLORP")).toBe("MEGA-GLORP");
  });
});
