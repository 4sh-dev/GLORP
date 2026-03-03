export interface Synergy {
  sourceId: string;
  threshold: number;
  targetIds: string[];
  bonusPercent: number;
  description: string;
}

export const SYNERGIES: readonly Synergy[] = [
  {
    sourceId: "neural-notepad",
    threshold: 50,
    targetIds: ["neural-notepad", "data-hamster-wheel", "pattern-antenna"],
    bonusPercent: 100,
    description: "Neural Notepad ×50 boosts all Garage Lab generators!",
  },
  {
    sourceId: "data-hamster-wheel",
    threshold: 50,
    targetIds: ["intern-algorithm"],
    bonusPercent: 200,
    description: "Data Hamster Wheel ×50 boosts Intern Algorithm!",
  },
  {
    sourceId: "gpu-toaster",
    threshold: 50,
    targetIds: ["server-farm"],
    bonusPercent: 150,
    description: "GPU Toaster ×50 boosts Server Farm!",
  },
  {
    sourceId: "server-farm",
    threshold: 50,
    targetIds: ["data-center"],
    bonusPercent: 100,
    description: "Server Farm ×50 boosts Data Center!",
  },
  {
    sourceId: "ml-cluster",
    threshold: 50,
    targetIds: ["quantum-processor"],
    bonusPercent: 100,
    description: "ML Cluster ×50 boosts Quantum Processor!",
  },
  {
    sourceId: "quantum-processor",
    threshold: 50,
    targetIds: ["mind-singularity"],
    bonusPercent: 50,
    description: "Quantum Processor ×50 boosts Mind Singularity!",
  },
];
