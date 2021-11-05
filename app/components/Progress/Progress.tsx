import cx from "classnames";

import styles from "./Progress.module.scss";

type ProgressProps = {
  firstDose: number;
  secondDose: number;
  size?: "xsmall" | "small" | "large";
  goal?: number;
};

export const Progress = ({
  firstDose,
  secondDose,
  size = "small",
  goal = 90,
}: ProgressProps) => {
  return (
    <div
      className={cx(styles["progress-total"], "animate-fade-in", {
        [styles["progress-total-xsmall"]]: size === "xsmall",
        [styles["progress-total-small"]]: size === "small",
        [styles["progress-total-large"]]: size === "large",
      })}
    >
      <div
        className={styles["progress-bar"]}
        style={{ width: `${firstDose}%` }}
      >
        <div className={cx(styles["progress-first"], "animate-grow-width")} />
      </div>
      <div
        className={styles["progress-bar"]}
        style={{ width: `${secondDose}%` }}
      >
        <div className={cx(styles["progress-second"], "animate-grow-width")} />
      </div>
      <div className={styles["goal-line"]} style={{ left: `${goal}%` }}></div>
    </div>
  );
};
