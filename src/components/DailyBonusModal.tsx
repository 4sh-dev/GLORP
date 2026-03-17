import { Button, Modal, Stack, Text } from "@mantine/core";
import type { DailyBonusInfo } from "../hooks/useDailyBonus";

interface DailyBonusModalProps {
  bonusInfo: DailyBonusInfo | null;
  onClose: () => void;
}

function getStreakMessage(streakDays: number): string {
  if (streakDays >= 14)
    return "Unstoppable! GLORP has never been more inspired!";
  if (streakDays >= 7) return "A full week! GLORP is in peak form!";
  if (streakDays >= 3) return "Nice streak! GLORP is impressed!";
  if (streakDays === 2) return "Two days in a row! Keep it up!";
  return "Welcome back! Your daily bonus is active!";
}

export function DailyBonusModal({ bonusInfo, onClose }: DailyBonusModalProps) {
  return (
    <Modal
      opened={bonusInfo !== null}
      onClose={onClose}
      title="Daily Return Bonus"
      centered
      size="sm"
    >
      {bonusInfo && (
        <Stack gap="md">
          <Text size="xl" ta="center" fw={700} c="orange">
            {"\uD83D\uDD25"} {bonusInfo.streakDays} Day Streak!
          </Text>

          <Text size="md" ff="monospace" c="green.3" ta="center">
            &ldquo;{getStreakMessage(bonusInfo.streakDays)}&rdquo;
          </Text>

          <Stack gap="xs">
            <Text ta="center" size="lg" fw={700}>
              <Text span c="yellow">
                {bonusInfo.multiplier}&#215;
              </Text>{" "}
              TD Multiplier
            </Text>
            <Text ta="center" c="dimmed" size="sm">
              Active for {Math.round(bonusInfo.durationMs / 1000)} seconds on
              all TD generation
            </Text>
          </Stack>

          <Button onClick={onClose} variant="light" color="orange" fullWidth>
            Let&apos;s Go!
          </Button>
        </Stack>
      )}
    </Modal>
  );
}
