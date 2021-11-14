import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { useRouter } from "next/router";

type MaybeNextQueryParamType = string | string[] | undefined;

const useEventCallback = <T extends (...args: any[]) => any>(fn: T): T => {
  const fnRef = useRef(fn);

  useLayoutEffect(() => {
    fnRef.current = fn;
  });

  return useCallback((...args: any[]) => fnRef.current(...args), []) as T;
};

const useFreeze = <FrozenType>(
  initializer: FrozenType | (() => FrozenType)
): FrozenType => {
  const [frozenValue] = useState<FrozenType>(initializer);

  return frozenValue;
};

export const useQueryParam = <ParamType extends string>(
  key: string,
  getDefaultValue: (s: MaybeNextQueryParamType) => ParamType
): [ParamType, React.Dispatch<React.SetStateAction<ParamType>>] => {
  const router = useRouter();
  const push = useEventCallback(router.push);

  const defaultValue = useFreeze<ParamType>(() => {
    const initialQueryValue = router.query[key];
    return getDefaultValue(initialQueryValue);
  });

  const [value, setValue] = useState<ParamType>(defaultValue);

  useEffect(() => {
    // If value is undefined or the default value, clear the query param
    if (value && value !== defaultValue) {
      push({ query: { [key]: value } });
    } else {
      push({ query: undefined });
    }
  }, [push, key, value, defaultValue]);

  return [value, setValue];
};
