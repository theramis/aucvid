import { DateTime } from "luxon";

type Cache<DataType> = {
  value?: DataType;
  updatedAt?: string;
  timeToLive: number;
  name?: string;
};

export const createCache = <DataType>(
  defaultCache: Partial<Cache<DataType>> = {}
) => {
  let cache: Cache<DataType> = {
    value: defaultCache.value ?? undefined,
    updatedAt: defaultCache.updatedAt ?? undefined,
    timeToLive: defaultCache.timeToLive ?? 5 * 60,
    name: defaultCache.name,
  };

  const getOrUpdateCache = async (getValue: () => Promise<DataType>) => {
    if (isCacheExpired(cache)) {
      console.log(
        `Cache miss, updating.${cache.name ? ` Cache: ${cache.name}` : ""}`
      );

      try {
        const value = await getValue();

        cache = {
          value,
          updatedAt: DateTime.utc().toISO(),
          timeToLive: cache.timeToLive,
          name: cache.name,
        };

        console.log(
          `Cache updated.${cache.name ? ` Cache: ${cache.name}` : ""}`
        );
        return cache;
      } catch (e: any) {
        console.error(`Cache error, could not update. ${e?.message}`);
        console.error(
          `Returning previous value.${
            cache.name ? ` Cache: ${cache.name}` : ""
          }`
        );
        return cache;
      }
    } else {
      console.log(
        `Cache hit, returning cached value.${
          cache.name ? ` Cache: ${cache.name}` : ""
        }`
      );
      return cache;
    }
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
