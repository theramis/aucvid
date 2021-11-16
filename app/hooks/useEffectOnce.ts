import { useEffect } from "react";
import { useFreezeFunction } from "./useFreeze";

export const useEffectOnce = (effect: () => void) => {
  // Freeze effect so it never changes
  const frozenEffect = useFreezeFunction(effect);

  useEffect(frozenEffect, [frozenEffect]);
};
