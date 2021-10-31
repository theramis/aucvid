import { MoonIcon } from "@heroicons/react/solid";
import { SunIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import cx from "classnames";

import { useStickyState } from "../../hooks/useStickyState";
import styles from "./DarkModeToggle.module.scss";

type ThemeState = "dark" | "light";
type DarkModeToggleProps = {
  className?: string;
};

export const DarkModeToggle = ({ className }: DarkModeToggleProps) => {
  const defaultMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  const [mode, setMode] = useStickyState<ThemeState>("appTheme", defaultMode);
  const isLight = mode === "light";

  useEffect(() => {
    if (isLight) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [isLight]);

  return (
    <button
      aria-label={isLight ? "Switch theme to dark" : "Switch theme to light"}
      onClick={() => setMode((m) => (m === "light" ? "dark" : "light"))}
      className={cx(styles.toggleButton, className)}
    >
      {isLight ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
