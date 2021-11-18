import { ComponentProps, useMemo } from "react";
import { useRouter } from "next/router";
import { QueryParamProvider } from "use-query-params";

type NextQueryParamProviderProps = Omit<
  ComponentProps<typeof QueryParamProvider>,
  "ReactRouterRoute" | "reachHistory" | "history" | "location"
>;

export const NextQueryParamProvider = ({
  children,
  ...rest
}: NextQueryParamProviderProps) => {
  const router = useRouter();

  const [pathname, queryString = ""] = router.asPath.split("?");

  const location = useMemo<Location>(() => {
    if (typeof window === "undefined") {
      // On the server side we only need a subset of the available
      // properties of `Location`. The other ones are only necessary
      // for interactive features on the client.
      return { search: `?${queryString}` } as Location;
    }

    // For SSG, no query parameters are available on the server side,
    // since they can't be known at build time. Therefore to avoid
    // markup mismatches, we need a two-part render in this case that
    // patches the client with the updated query parameters lazily.

    // Note that for SSR `router.isReady` will be `true` immediately
    // and therefore there's no two-part render in this case.
    if (router.isReady) {
      return window.location;
    }

    return { search: "" } as Location;
  }, [queryString, router.isReady]);

  const history = useMemo(
    () => ({
      location,
      push: ({ search }: Location) =>
        router.push(
          { pathname: router.pathname, search },
          { pathname, search },
          { shallow: true, scroll: false }
        ),
      replace: ({ search }: Location) => {
        router.replace(
          { pathname: router.pathname, search },
          { pathname, search },
          { shallow: true, scroll: false }
        );
      },
    }),
    [location, pathname, router]
  );

  return (
    <QueryParamProvider {...rest} history={history} location={location}>
      {children}
    </QueryParamProvider>
  );
};
