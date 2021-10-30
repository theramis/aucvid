import cx from "classnames";

import styles from "./Progress.module.scss";

type ProgressProps = {
  firstDose: number;
  secondDose: number;
  size?: "small" | "large";
  goal?: number;
};

export const Progress = ({
  firstDose,
  secondDose,
  size = "small",
  goal = 0.9,
}: ProgressProps) => {
  return (
    <div
      className={cx(styles["progress-total"], "animate-fade-in", {
        [styles["progress-total-small"]]: size === "small",
        [styles["progress-total-large"]]: size === "large",
      })}
    >
      <div
        className={styles["progress-bar"]}
        style={{ width: `${firstDose * 100}%` }}
      >
        <div
          className={cx(styles["progress-first"], "animate-grow-width", {
            [styles["progress-bar-small"]]: size === "small",
            [styles["progress-bar-large"]]: size === "large",
          })}
        />
      </div>
      <div
        className={styles["progress-bar"]}
        style={{ width: `${secondDose * 100}%` }}
      >
        <div
          className={cx(styles["progress-second"], "animate-grow-width", {
            [styles["progress-bar-small"]]: size === "small",
            [styles["progress-bar-large"]]: size === "large",
          })}
        />
      </div>
      <div
        className={styles["goal-line"]}
        style={{ left: `${goal * 100}%` }}
      ></div>
    </div>
  );
};
