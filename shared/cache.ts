import { DateTime } from "luxon";

type Cache<DataType> = {
  value?: DataType;
  populatedAtUtc?: string;
  ttlInSeconds: number;
  key?: string;
};

const defaultTtl = 5 * 60;

export const createCache = <DataType>(
  getValue: () => Promise<DataType>,
  defaultCache: Partial<Cache<DataType>> = {}
) => {
  let cache: Cache<DataType> = {
    value: defaultCache.value ?? undefined,
    populatedAtUtc: defaultCache.populatedAtUtc ?? undefined,
    ttlInSeconds: defaultCache.ttlInSeconds ?? defaultTtl,
    key: defaultCache.key,
  };

  const getOrUpdateCache = async () => {
    const logPrefix = cache.key ? `${cache.key} - ` : "";
    if (isCacheExpired(cache)) {
      console.log(`${logPrefix}Cache miss, updating.`);

      try {
        const value = await getValue();

        cache.value = value;
        cache.populatedAtUtc = DateTime.utc().toISO();

        console.log(`${logPrefix}Cache updated.`);
        return cache;
      } catch (e: any) {
        console.error(
          `${logPrefix}Cache error, could not update. ${e?.message}`
        );
        console.error(`${logPrefix}Returning previous value.`);
        return cache;
      }
    } else {
      console.log(`${logPrefix}Cache hit, returning cached value.`);
      return cache;
    }
  };

  return getOrUpdateCache;
};

const isCacheExpired = (cache: Cache<unknown>) => {
  if (cache.populatedAtUtc) {
    return (
      DateTime.utc().diff(DateTime.fromISO(cache.populatedAtUtc), "seconds")
        .seconds >= cache.ttlInSeconds
    );
  }

  return true;
};
