import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import { useRouter } from "next/router";

const useEventCallback = (fn: (...a: any[]) => any) => {
  const fnRef = useRef(fn);

  useLayoutEffect(() => {
    fnRef.current = fn;
  });

  return useCallback((...args) => fnRef.current(...args), []);
};

export const useQueryParam = <ParamType extends string>(
  key: string,
  defaultValue: ParamType,
  checkType: (s: unknown) => s is ParamType
): [ParamType, React.Dispatch<React.SetStateAction<ParamType | undefined>>] => {
  const router = useRouter();
  const push = useEventCallback(router.push);

  const [value, setValue] = useState<ParamType | undefined>(() => {
    const initialQueryValue = router.query[key];
    if (checkType(initialQueryValue)) {
      return initialQueryValue as ParamType;
    }
    return undefined;
  });

  useEffect(() => {
    // If value is undefined or the default value, clear the query param
    if (value && value !== defaultValue) {
      push({ query: { [key]: value } });
    } else {
      push({ query: undefined });
    }
  }, [push, key, value, defaultValue]);

  return [value ?? defaultValue, setValue];
};
