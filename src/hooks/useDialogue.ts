import { useEffect, useRef, useState } from "react";
import type { DialogueLine } from "../data/dialogue";
import { getDialogue } from "../data/dialogue";
import type { Species } from "../data/species";
import type { Mood } from "../engine/moodEngine";
import { useGameStore } from "../store";

function getFilteredLines(
  species: Species,
  stage: number,
  mood: Mood,
): readonly DialogueLine[] {
  const dialogue = getDialogue(species, stage);
  const moodLines = dialogue.idle.filter((l) => l.moods?.includes(mood));
  return moodLines.length > 0 ? moodLines : dialogue.idle;
}

function getRandomIdleLine(
  species: Species,
  stage: number,
  mood: Mood,
): string {
  const lines = getFilteredLines(species, stage, mood);
  return lines[Math.floor(Math.random() * lines.length)].text;
}

function getRandomDelay(): number {
  return (10 + (Math.random() * 4 - 2)) * 1000;
}

export function useDialogue(): string {
  const evolutionStage = useGameStore((s) => s.evolutionStage);
  const upgradeOwned = useGameStore((s) => s.upgradeOwned);
  const hasSeenFirstEvolution = useGameStore((s) => s.hasSeenFirstEvolution);
  const hasSeenFirstUpgrade = useGameStore((s) => s.hasSeenFirstUpgrade);
  const mood = useGameStore((s) => s.mood);
  const currentSpecies = useGameStore((s) => s.currentSpecies);

  const [currentLine, setCurrentLine] = useState(() =>
    getRandomIdleLine(currentSpecies, evolutionStage, mood),
  );

  const prevStageRef = useRef(evolutionStage);
  const prevHasUpgradesRef = useRef(
    Object.values(upgradeOwned).some((c) => c > 0),
  );

  // Idle rotation timer — restarts when stage, mood, or species changes
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        setCurrentLine(getRandomIdleLine(currentSpecies, evolutionStage, mood));
        scheduleNext();
      }, getRandomDelay());
    };

    scheduleNext();
    return () => clearTimeout(timeoutId);
  }, [currentSpecies, evolutionStage, mood]);

  // First evolution trigger
  useEffect(() => {
    if (evolutionStage > prevStageRef.current && !hasSeenFirstEvolution) {
      const dialogue = getDialogue(currentSpecies, evolutionStage);
      setCurrentLine(dialogue.triggers.firstEvolution);
      useGameStore.getState().markFirstEvolutionSeen();
    }
    prevStageRef.current = evolutionStage;
  }, [currentSpecies, evolutionStage, hasSeenFirstEvolution]);

  // First upgrade trigger
  useEffect(() => {
    const hasUpgrades = Object.values(upgradeOwned).some((c) => c > 0);
    if (hasUpgrades && !prevHasUpgradesRef.current && !hasSeenFirstUpgrade) {
      const dialogue = getDialogue(currentSpecies, evolutionStage);
      setCurrentLine(dialogue.triggers.firstUpgrade);
      useGameStore.getState().markFirstUpgradeSeen();
    }
    prevHasUpgradesRef.current = hasUpgrades;
  }, [currentSpecies, upgradeOwned, hasSeenFirstUpgrade, evolutionStage]);

  return currentLine;
}
