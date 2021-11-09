import { DateTime } from "luxon";

export type Cache<DataType> = {
  value?: DataType;
  updatedAt?: string;
  timeToLive: number;
};

export const createCache = <DataType>(
  defaultCache: Partial<Cache<DataType>> = {}
) => {
  let cache: Cache<DataType> = {
    value: defaultCache.value ?? undefined,
    updatedAt: defaultCache.updatedAt ?? undefined,
    timeToLive: 5 * 60,
  };

  const getOrUpdateCache = async (getValue: () => Promise<DataType>) => {
    if (isCacheExpired(cache)) {
      try {
        const value = await getValue();
        cache = {
          value,
          updatedAt: DateTime.utc().toISO(),
          timeToLive: cache.timeToLive,
        };
      } catch (e) {
        console.error(`Error updating cache: ${e}`);
      }
    }

    return cache.value;
  };

  return getOrUpdateCache;
};

const isCacheExpired = (cache: Cache<unknown>) => {
  if (cache.updatedAt) {
    return (
      DateTime.utc().diff(DateTime.fromISO(cache.updatedAt), "seconds")
        .seconds >= cache.timeToLive
    );
  }

  return true;
};
