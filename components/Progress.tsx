import cx from "classnames";

type ProgressProps = {
  firstDose: number;
  secondDose: number;
  size?: "small" | "large";
};

export const Progress = ({
  firstDose,
  secondDose,
  size = "small",
}: ProgressProps) => {
  return (
    <div className="progress-bar-container w-full flex">
      <div
        className={cx("w-full relative animate-fade-in progress-total", {
          ["h-6 radius"]: size === "small",
          ["h-10 radius-large"]: size === "large",
        })}
      >
        <div
          className="absolute inset-0 h-full"
          style={{ width: `${firstDose}%` }}
        >
          <div
            className={cx(
              "h-full overflow-hidden animate-grow-width progress-first",
              {
                ["progress-bar"]: size === "small",
                ["progress-bar-large"]: size === "large",
              }
            )}
          />
        </div>
        <div
          className="absolute inset-0 h-full"
          style={{ width: `${secondDose}%` }}
        >
          <div
            className={cx(
              "h-full overflow-hidden animate-grow-width progress-second",
              {
                ["progress-bar"]: size === "small",
                ["progress-bar-large"]: size === "large",
              }
            )}
            style={{ animationDelay: "1s" }}
          />
        </div>
        <div
          className="
          goal-line
        "
          style={{ left: "90%" }}
        ></div>
      </div>
    </div>
  );
};
