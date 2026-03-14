import { describe, expect, it } from "vitest";
import { UPGRADES } from "../../data/upgrades";
import { computeGeneratorTooltipData } from "./tooltipHelpers";

const neuralNotepad = UPGRADES.find((u) => u.id === "neural-notepad");
if (!neuralNotepad)
  throw new Error("neural-notepad upgrade not found in UPGRADES");
const hamsterWheel = UPGRADES.find((u) => u.id === "data-hamster-wheel");
if (!hamsterWheel)
  throw new Error("data-hamster-wheel upgrade not found in UPGRADES");

describe("computeGeneratorTooltipData", () => {
  it("returns baseline values with 0 owned", () => {
    const data = computeGeneratorTooltipData(neuralNotepad, 0, {});
    expect(data.owned).toBe(0);
    expect(data.baseTdPerUnit).toBe(0.2);
    expect(data.milestoneMultiplier).toBe(1);
    expect(data.synergyMultiplier).toBe(1);
    expect(data.effectiveTdPerUnit).toBe(0.2);
    expect(data.totalTdForGenerator).toBe(0);
    expect(data.percentOfTotal).toBe(0);
  });

  it("shows next milestone threshold at 10 when owned < 10", () => {
    const data = computeGeneratorTooltipData(neuralNotepad, 5, {
      "neural-notepad": 5,
    });
    expect(data.nextMilestoneOwned).toBe(10);
    expect(data.nextMilestoneMultiplier).toBe(1.5);
    expect(data.nextMilestoneLabel).toBe("+50%");
  });

  it("applies x1.5 milestone multiplier at 10 owned", () => {
    const allOwned = { "neural-notepad": 10 };
    const data = computeGeneratorTooltipData(neuralNotepad, 10, allOwned);
    expect(data.milestoneMultiplier).toBe(1.5);
    expect(data.effectiveTdPerUnit).toBeCloseTo(0.2 * 1.5);
    expect(data.totalTdForGenerator).toBeCloseTo(0.2 * 1.5 * 10);
    expect(data.nextMilestoneOwned).toBe(25);
  });

  it("applies x2 milestone multiplier at 25 owned", () => {
    const allOwned = { "neural-notepad": 25 };
    const data = computeGeneratorTooltipData(neuralNotepad, 25, allOwned);
    expect(data.milestoneMultiplier).toBe(2);
    expect(data.nextMilestoneOwned).toBe(50);
  });

  it("applies x3 milestone multiplier at 50 owned", () => {
    const allOwned = { "neural-notepad": 50 };
    const data = computeGeneratorTooltipData(neuralNotepad, 50, allOwned);
    expect(data.milestoneMultiplier).toBe(3);
    expect(data.nextMilestoneOwned).toBe(100);
  });

  it("returns null next milestone when at max milestone (100 owned)", () => {
    const allOwned = { "neural-notepad": 100 };
    const data = computeGeneratorTooltipData(neuralNotepad, 100, allOwned);
    expect(data.milestoneMultiplier).toBe(6);
    expect(data.nextMilestoneOwned).toBeNull();
    expect(data.nextMilestoneMultiplier).toBeNull();
    expect(data.nextMilestoneLabel).toBeNull();
  });

  it("shows 100% when only one generator type is owned", () => {
    const allOwned = { "neural-notepad": 5 };
    const data = computeGeneratorTooltipData(neuralNotepad, 5, allOwned);
    expect(data.percentOfTotal).toBeCloseTo(100);
  });

  it("computes correct % share with two generators", () => {
    // notepad: 5 x 0.2 = 1 TD/s, hamster: 5 x 2 = 10 TD/s, total = 11
    const allOwned = {
      "neural-notepad": 5,
      "data-hamster-wheel": 5,
    };
    const notepadData = computeGeneratorTooltipData(neuralNotepad, 5, allOwned);
    const hamsterData = computeGeneratorTooltipData(hamsterWheel, 5, allOwned);
    expect(notepadData.percentOfTotal).toBeCloseTo((1 / 11) * 100, 1);
    expect(hamsterData.percentOfTotal).toBeCloseTo((10 / 11) * 100, 1);
    expect(notepadData.percentOfTotal + hamsterData.percentOfTotal).toBeCloseTo(
      100,
      1,
    );
  });

  it("returns correct name and icon", () => {
    const data = computeGeneratorTooltipData(neuralNotepad, 0, {});
    expect(data.name).toBe("Neural Notepad");
    expect(data.icon).toBe("📝");
  });

  it("effectiveTdPerUnit equals baseTdPerUnit when no multipliers apply", () => {
    const data = computeGeneratorTooltipData(neuralNotepad, 3, {
      "neural-notepad": 3,
    });
    expect(data.effectiveTdPerUnit).toBeCloseTo(data.baseTdPerUnit);
  });

  it("totalTdForGenerator is effectiveTdPerUnit x owned", () => {
    const allOwned = { "neural-notepad": 10 };
    const data = computeGeneratorTooltipData(neuralNotepad, 10, allOwned);
    expect(data.totalTdForGenerator).toBeCloseTo(
      data.effectiveTdPerUnit * data.owned,
    );
  });

  // ── Delta TD/s tests ──────────────────────────────────────────────────────

  describe("deltaTdPerSecond", () => {
    it("equals baseTdPerSecond for the first unit (0 → 1)", () => {
      // 0 owned → 1 owned, no milestone yet: delta = 0.2 * 1 * 1 - 0 = 0.2
      const data = computeGeneratorTooltipData(neuralNotepad, 0, {});
      expect(data.deltaTdPerSecond).toBeCloseTo(0.2);
      expect(data.milestoneWillCross).toBe(false);
    });

    it("equals baseTdPerSecond for a mid-range unit with no milestone (5 → 6)", () => {
      // No milestone active (owned < 10): delta = base * 6 * 1 - base * 5 * 1 = base
      const allOwned = { "neural-notepad": 5 };
      const data = computeGeneratorTooltipData(neuralNotepad, 5, allOwned);
      expect(data.deltaTdPerSecond).toBeCloseTo(0.2);
      expect(data.milestoneWillCross).toBe(false);
    });

    it("accounts for milestone crossing when buying the 10th unit (9 → 10)", () => {
      // Buying the 10th unit crosses the x1.5 milestone.
      // Current:   0.2 * 9  * 1   = 1.8
      // Future:    0.2 * 10 * 1.5 = 3.0
      // Delta: 3.0 - 1.8 = 1.2
      const allOwned = { "neural-notepad": 9 };
      const data = computeGeneratorTooltipData(neuralNotepad, 9, allOwned);
      expect(data.deltaTdPerSecond).toBeCloseTo(1.2);
      expect(data.milestoneWillCross).toBe(true);
    });

    it("accounts for milestone crossing when buying the 25th unit (24 → 25)", () => {
      // Buying the 25th unit crosses the x2 milestone.
      // Current:   0.2 * 24 * 1.5 = 7.2
      // Future:    0.2 * 25 * 2   = 10.0
      // Delta: 10.0 - 7.2 = 2.8
      const allOwned = { "neural-notepad": 24 };
      const data = computeGeneratorTooltipData(neuralNotepad, 24, allOwned);
      expect(data.deltaTdPerSecond).toBeCloseTo(2.8);
      expect(data.milestoneWillCross).toBe(true);
    });

    it("accounts for milestone crossing when buying the 50th unit (49 → 50)", () => {
      // Buying the 50th unit crosses the x3 milestone.
      // Current:   0.2 * 49 * 2 = 19.6
      // Future:    0.2 * 50 * 3 = 30.0
      // Delta: 30.0 - 19.6 = 10.4
      const allOwned = { "neural-notepad": 49 };
      const data = computeGeneratorTooltipData(neuralNotepad, 49, allOwned);
      expect(data.deltaTdPerSecond).toBeCloseTo(10.4);
      expect(data.milestoneWillCross).toBe(true);
    });

    it("applies normal delta after milestone (owned=10, 10 → 11)", () => {
      // x1.5 milestone active, no crossing.
      // Current:   0.2 * 10 * 1.5 = 3.0
      // Future:    0.2 * 11 * 1.5 = 3.3
      // Delta: 0.3
      const allOwned = { "neural-notepad": 10 };
      const data = computeGeneratorTooltipData(neuralNotepad, 10, allOwned);
      expect(data.deltaTdPerSecond).toBeCloseTo(0.3);
      expect(data.milestoneWillCross).toBe(false);
    });

    it("applies normal delta at max milestone (owned=100, 100 → 101)", () => {
      // x6 milestone active, no further milestones.
      // Current:   0.2 * 100 * 6 = 120.0
      // Future:    0.2 * 101 * 6 = 121.2
      // Delta: 1.2
      const allOwned = { "neural-notepad": 100 };
      const data = computeGeneratorTooltipData(neuralNotepad, 100, allOwned);
      expect(data.deltaTdPerSecond).toBeCloseTo(1.2);
      expect(data.milestoneWillCross).toBe(false);
    });

    it("milestoneWillCross is false well before a threshold", () => {
      const data = computeGeneratorTooltipData(neuralNotepad, 7, {
        "neural-notepad": 7,
      });
      expect(data.milestoneWillCross).toBe(false);
    });
  });
});
