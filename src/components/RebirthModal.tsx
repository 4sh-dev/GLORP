import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import type { Species } from "../data/species";
import {
  computeWisdomMultiplier,
  computeWisdomTokens,
} from "../engine/rebirthEngine";
import { formatNumber } from "../utils";

interface RebirthModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalTdEarned: number;
  currentWisdomTokens: number;
  nextSpecies: Species;
}

export function RebirthModal({
  opened,
  onClose,
  onConfirm,
  totalTdEarned,
  currentWisdomTokens,
  nextSpecies,
}: RebirthModalProps) {
  const tokensEarned = computeWisdomTokens(totalTdEarned);
  const newTotal = currentWisdomTokens + tokensEarned;
  const newMultiplier = computeWisdomMultiplier(newTotal);

  return (
    <Modal opened={opened} onClose={onClose} title="Rebirth" centered size="sm">
      <Stack gap="md">
        <Text size="sm" c="dimmed" ta="center">
          You have reached Oracle-level consciousness. Are you ready to begin
          again?
        </Text>

        <Stack gap="xs">
          <Text ta="center" size="sm" c="yellow.4" fw={600}>
            Wisdom Tokens earned this run:{" "}
            <Text span fw={700}>
              +{tokensEarned}
            </Text>
          </Text>
          <Text ta="center" size="sm" c="yellow.3">
            Total after Rebirth:{" "}
            <Text span fw={700}>
              {newTotal}
            </Text>{" "}
            ({((newMultiplier - 1) * 100).toFixed(0)}% TD/s bonus)
          </Text>
          <Text ta="center" size="sm" c="teal.4">
            Next species unlocked:{" "}
            <Text span fw={700} ff="monospace">
              {nextSpecies}
            </Text>
          </Text>
        </Stack>

        <Text ta="center" size="xs" c="red.4">
          ⚠ Training Data ({formatNumber(totalTdEarned)} total TD), all
          upgrades, and evolution stage will reset.
        </Text>

        <Group grow>
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button color="yellow" onClick={onConfirm}>
            Rebirth
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
