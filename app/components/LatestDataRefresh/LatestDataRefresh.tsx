import cx from "classnames";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { LatestMetadataResponse } from "../../../shared/types/api";
import { Button } from "../Button";
import clientFetcher from "../../utilities/clientFetcher";
import trackEvent from "../../utilities/trackEvent";
import styles from "./LatestDataRefresh.module.scss";

type LatestDataRefreshProps = {
  dataUpdatedAtTimeUtc: string;
  className?: string;
};

const getLatestMetadata = async (): Promise<LatestMetadataResponse> =>
  clientFetcher("/api/data/latest-metadata");

export const LatestDataRefresh = ({
  className,
  dataUpdatedAtTimeUtc,
}: LatestDataRefreshProps) => {
  const { data, error } = useQuery("latest-metadata", getLatestMetadata, {
    staleTime: 5 * 60 * 1000,
  });
  const router = useRouter();

  if (!data || error) {
    return null;
  }

  if (dataUpdatedAtTimeUtc === data.updatedAtUtcTimeIso) {
    return null;
  }

  return (
    <div
      className={cx(
        styles["sticky-container"],
        "flex align-items-center",
        className
      )}
    >
      <Button
        className={cx(styles["refresh-button"], "animate-fade-in")}
        onClick={() => {
          trackEvent({ action: "refresh-latest-data" });
          router.reload();
        }}
      >
        Update data
      </Button>
    </div>
  );
};
