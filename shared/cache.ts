import { DateTime } from "luxon";

type Cache<DataType> = {
  value?: DataType;
  updatedAt?: string;
  timeToLive: number;
  name?: string;
};

const defaultTimeToLive = 5 * 60;

export const createCache = <DataType>(
  getValue: () => Promise<DataType>,
  defaultCache: Partial<Cache<DataType>> = {}
) => {
  let cache: Cache<DataType> = {
    value: defaultCache.value ?? undefined,
    updatedAt: defaultCache.updatedAt ?? undefined,
    timeToLive: defaultCache.timeToLive ?? defaultTimeToLive,
    name: defaultCache.name,
  };

  const getOrUpdateCache = async () => {
    if (isCacheExpired(cache)) {
      console.log(
        `${cache.name ? `${cache.name} - ` : ""}Cache miss, updating.`
      );

      try {
        const value = await getValue();

        cache.value = value;
        cache.updatedAt = DateTime.utc().toISO();

        console.log(`${cache.name ? `${cache.name} - ` : ""}Cache updated.`);
        return cache;
      } catch (e: any) {
        console.error(
          `${
            cache.name ? `${cache.name} - ` : ""
          }Cache error, could not update. ${e?.message}`
        );
        console.error(
          `${cache.name ? `${cache.name} - ` : ""}Returning previous value.`
        );
        return cache;
      }
    } else {
      console.log(
        `${
          cache.name ? `${cache.name} - ` : ""
        }Cache hit, returning cached value.`
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
