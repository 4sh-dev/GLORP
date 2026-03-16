import { useEffect } from "react";
import { useSettingsStore } from "../store/settingsStore";

const HC_ATTR = "data-high-contrast";

/**
 * Reads the highContrast setting from the settings store and syncs it as a
 * `data-high-contrast` attribute on <html>. CSS in global.css uses this
 * attribute to apply high-contrast overrides.
 *
 * Call this hook once near the root of the component tree (GameLayout).
 */
export function useHighContrast(): boolean {
  const highContrast = useSettingsStore((s) => s.highContrast);

  useEffect(() => {
    document.documentElement.setAttribute(
      HC_ATTR,
      highContrast ? "true" : "false",
    );
  }, [highContrast]);

  return highContrast;
}
