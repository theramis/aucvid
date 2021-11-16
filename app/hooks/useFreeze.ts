import { useState } from "react";

export const useFreeze = <FrozenType>(
  initializer: FrozenType | (() => FrozenType)
): FrozenType => {
  const [frozenValue] = useState<FrozenType>(initializer);

  return frozenValue;
};

export const useFreezeFunction = <FnType extends (...args: any[]) => any>(
  fn: FnType
) => useFreeze(() => fn);
