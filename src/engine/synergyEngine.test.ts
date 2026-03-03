import { describe, expect, it } from "vitest";
import { getActiveSynergies, getSynergyMultiplier } from "./synergyEngine";

describe("getActiveSynergies", () => {
  it("returns empty when no generator is at threshold", () => {
    expect(getActiveSynergies({})).toHaveLength(0);
  });

  it("returns empty when source is below threshold (49)", () => {
    expect(getActiveSynergies({ "neural-notepad": 49 })).toHaveLength(0);
  });

  it("activates synergy at exactly the threshold (50)", () => {
    const active = getActiveSynergies({ "neural-notepad": 50 });
    expect(active).toHaveLength(1);
    expect(active[0].sourceId).toBe("neural-notepad");
  });

  it("activates synergy beyond the threshold", () => {
    const active = getActiveSynergies({ "neural-notepad": 100 });
    expect(active).toHaveLength(1);
    expect(active[0].sourceId).toBe("neural-notepad");
  });

  it("activates multiple synergies when multiple sources are at threshold", () => {
    const active = getActiveSynergies({
      "neural-notepad": 50,
      "gpu-toaster": 50,
    });
    expect(active).toHaveLength(2);
    const sourceIds = active.map((s) => s.sourceId);
    expect(sourceIds).toContain("neural-notepad");
    expect(sourceIds).toContain("gpu-toaster");
  });

  it("only activates synergies whose source meets the threshold", () => {
    const active = getActiveSynergies({
      "neural-notepad": 50,
      "gpu-toaster": 49,
    });
    expect(active).toHaveLength(1);
    expect(active[0].sourceId).toBe("neural-notepad");
  });
});

describe("getSynergyMultiplier", () => {
  it("returns 1 with no owned generators", () => {
    expect(getSynergyMultiplier("neural-notepad", {})).toBe(1);
  });

  it("returns 1 when source is below threshold", () => {
    expect(
      getSynergyMultiplier("data-hamster-wheel", { "neural-notepad": 49 }),
    ).toBe(1);
  });

  it("returns 2 (+100%) for garage-lab targets when neural-notepad reaches 50", () => {
    const owned = { "neural-notepad": 50 };
    expect(getSynergyMultiplier("neural-notepad", owned)).toBe(2);
    expect(getSynergyMultiplier("data-hamster-wheel", owned)).toBe(2);
    expect(getSynergyMultiplier("pattern-antenna", owned)).toBe(2);
  });

  it("returns 1 for non-target generators when neural-notepad reaches 50", () => {
    const owned = { "neural-notepad": 50 };
    expect(getSynergyMultiplier("intern-algorithm", owned)).toBe(1);
    expect(getSynergyMultiplier("server-farm", owned)).toBe(1);
  });

  it("returns 3 (+200%) for intern-algorithm when data-hamster-wheel reaches 50", () => {
    const owned = { "data-hamster-wheel": 50 };
    expect(getSynergyMultiplier("intern-algorithm", owned)).toBe(3);
  });

  it("returns 2.5 (+150%) for server-farm when gpu-toaster reaches 50", () => {
    const owned = { "gpu-toaster": 50 };
    expect(getSynergyMultiplier("server-farm", owned)).toBe(2.5);
  });

  it("returns 2 (+100%) for data-center when server-farm reaches 50", () => {
    const owned = { "server-farm": 50 };
    expect(getSynergyMultiplier("data-center", owned)).toBe(2);
  });

  it("returns 2 (+100%) for quantum-processor when ml-cluster reaches 50", () => {
    const owned = { "ml-cluster": 50 };
    expect(getSynergyMultiplier("quantum-processor", owned)).toBe(2);
  });

  it("returns 1.5 (+50%) for mind-singularity when quantum-processor reaches 50", () => {
    const owned = { "quantum-processor": 50 };
    expect(getSynergyMultiplier("mind-singularity", owned)).toBe(1.5);
  });

  it("stacks multiplicatively when multiple synergies target the same generator", () => {
    // neural-notepad at 50 → data-hamster-wheel +100% (×2)
    // data-hamster-wheel at 50 → intern-algorithm +200% (×3)
    // data-hamster-wheel receives from neural-notepad synergy only
    const owned = { "neural-notepad": 50, "data-hamster-wheel": 50 };
    // data-hamster-wheel: targeted by neural-notepad (+100%) → ×2
    expect(getSynergyMultiplier("data-hamster-wheel", owned)).toBe(2);
    // intern-algorithm: targeted by data-hamster-wheel (+200%) → ×3
    expect(getSynergyMultiplier("intern-algorithm", owned)).toBe(3);
  });
});
