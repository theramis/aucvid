import { MoonIcon } from "@heroicons/react/solid";
import { SunIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { useStickyState } from "../hooks/useStickyState";

type ThemeState = "dark" | "light";

export const DarkModeToggle = () => {
  const defaultMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  const [mode, setMode] = useStickyState<ThemeState>("appTheme", defaultMode);

  useEffect(() => {
    if (mode === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [mode]);

  // todo proper component as per design
  return (
    <button
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
      style={{
        width: "50px",
        height: "50px",
      }}
    >
      {mode === "light" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
