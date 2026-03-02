import { describe, expect, it } from "vitest";
import { ASCII_ART, getAsciiArt } from "./asciiArt";
import type { Species } from "./species";
import { SPECIES_ORDER } from "./species";

const STAGES = [0, 1, 2, 3, 4] as const;

describe("ASCII_ART", () => {
  it("contains all 5 species", () => {
    for (const species of SPECIES_ORDER) {
      expect(ASCII_ART[species]).toBeDefined();
    }
  });

  it("each species has art for all 5 stages", () => {
    for (const species of SPECIES_ORDER) {
      for (const stage of STAGES) {
        expect(ASCII_ART[species][stage]).toBeDefined();
        expect(typeof ASCII_ART[species][stage]).toBe("string");
      }
    }
  });

  it("all art is non-empty strings", () => {
    for (const species of SPECIES_ORDER) {
      for (const stage of STAGES) {
        expect(ASCII_ART[species][stage].length).toBeGreaterThan(0);
      }
    }
  });

  describe("GLORP species", () => {
    it("stage 0 (Blob) is at least 3 lines", () => {
      expect(ASCII_ART.GLORP[0].split("\n").length).toBeGreaterThanOrEqual(3);
    });

    it("stage 1 (Spark) is at least 6 lines", () => {
      expect(ASCII_ART.GLORP[1].split("\n").length).toBeGreaterThanOrEqual(6);
    });

    it("stage 2 (Neuron) is at least 9 lines", () => {
      expect(ASCII_ART.GLORP[2].split("\n").length).toBeGreaterThanOrEqual(9);
    });

    it("stage 3 (Cortex) is at least 12 lines", () => {
      expect(ASCII_ART.GLORP[3].split("\n").length).toBeGreaterThanOrEqual(12);
    });

    it("stage 4 (Oracle) is at least 15 lines", () => {
      expect(ASCII_ART.GLORP[4].split("\n").length).toBeGreaterThanOrEqual(15);
    });

    it("art grows in size across stages", () => {
      const sizes = STAGES.map((s) => ASCII_ART.GLORP[s].split("\n").length);
      for (let i = 1; i < sizes.length; i++) {
        expect(sizes[i]).toBeGreaterThan(sizes[i - 1]);
      }
    });
  });

  describe("art is visually distinct between species", () => {
    it("stage 0 art differs across all species", () => {
      const stageZeroArt = SPECIES_ORDER.map((s) => ASCII_ART[s][0]);
      const unique = new Set(stageZeroArt);
      expect(unique.size).toBe(SPECIES_ORDER.length);
    });

    it("stage 4 art differs across all species", () => {
      const stageFourArt = SPECIES_ORDER.map((s) => ASCII_ART[s][4]);
      const unique = new Set(stageFourArt);
      expect(unique.size).toBe(SPECIES_ORDER.length);
    });
  });
});

describe("getAsciiArt", () => {
  it("returns the correct art for GLORP stage 0", () => {
    expect(getAsciiArt("GLORP", 0)).toBe(ASCII_ART.GLORP[0]);
  });

  it("returns the correct art for ZAPPY stage 4", () => {
    expect(getAsciiArt("ZAPPY", 4)).toBe(ASCII_ART.ZAPPY[4]);
  });

  it("returns stage 0 as fallback for unknown stage", () => {
    expect(getAsciiArt("CHONK", 99)).toBe(ASCII_ART.CHONK[0]);
  });

  it("returns art for every species at every stage", () => {
    for (const species of SPECIES_ORDER) {
      for (const stage of STAGES) {
        const art = getAsciiArt(species as Species, stage);
        expect(typeof art).toBe("string");
        expect(art.length).toBeGreaterThan(0);
      }
    }
  });
});
