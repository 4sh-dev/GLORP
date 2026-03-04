export interface ClickUpgrade {
  id: string;
  name: string;
  description: string;
  /** Seconds of passive income added to each click when this upgrade is owned. */
  clickSeconds: number;
  cost: number;
  unlockStage: number;
  icon: string;
}

export const CLICK_UPGRADES: readonly ClickUpgrade[] = [
  {
    id: "better-dataset",
    name: "Better Dataset",
    description:
      "Higher quality training samples — each click earns +0.10s of passive income.",
    clickSeconds: 0.1,
    cost: 10,
    unlockStage: 0,
    icon: "📊",
  },
  {
    id: "stack-overflow",
    name: "Stack Overflow",
    description:
      "Copy-paste wisdom from the internet. Each click earns +0.15s of passive income.",
    clickSeconds: 0.15,
    cost: 1_000,
    unlockStage: 0,
    icon: "📚",
  },
  {
    id: "fine-tuning-lab",
    name: "Fine-Tuning Lab",
    description:
      "Specialized facility to fine-tune each manual input. +0.25s per click.",
    clickSeconds: 0.25,
    cost: 50_000,
    unlockStage: 1,
    icon: "🔧",
  },
  {
    id: "rlhf-department",
    name: "RLHF Department",
    description:
      "A whole department of humans reinforcing your learning. +0.50s per click.",
    clickSeconds: 0.5,
    cost: 5_000_000,
    unlockStage: 2,
    icon: "👥",
  },
  {
    id: "synthetic-data-farm",
    name: "Synthetic Data Farm",
    description:
      "Generate perfect synthetic training data on every click. +1.00s per click.",
    clickSeconds: 1.0,
    cost: 500_000_000,
    unlockStage: 3,
    icon: "🏭",
  },
];
