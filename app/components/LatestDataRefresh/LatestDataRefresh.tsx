import cx from "classnames";
import { Button } from "../Button";
import styles from "./LatestDataRefresh.module.scss";

type LatestDataRefreshProps = {
  dataUpdatedAtTimeUtc: string;
  className?: string;
};

export const LatestDataRefresh = ({ className }: LatestDataRefreshProps) => {
  return (
    <div
      className={cx(styles["container"], "flex align-items-center", className)}
    >
      <div className={styles["sticky-button"]}>
        <Button>Update data</Button>
      </div>
    </div>
  );
};
