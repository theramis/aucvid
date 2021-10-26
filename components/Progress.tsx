import cx from "classnames";

type ProgressProps = {
  firstDose: number;
  secondDose: number;
  color?: "purple" | "orange";
  size?: "small" | "large";
};

export const Progress = ({
  firstDose,
  secondDose,
  color = "orange",
  size = "small",
}: ProgressProps) => {
  return (
    <div className="w-full flex">
      <div
        className={cx("w-full relative animate-fade-in progress-total", {
          ["h-6 radius"]: size === "small",
          ["h-12 radius-large"]: size === "large",
        })}
      >
        <div
          className="absolute inset-0 h-full"
          style={{ width: `${firstDose}%` }}
        >
          <div
            className={cx(
              "h-full rounded-lg overflow-hidden animate-grow-width",
              {
                ["progress-primary-first"]: color === "purple",
                ["progress-secondary-first"]: color === "orange",
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
              "h-full rounded-lg overflow-hidden animate-grow-width",
              {
                ["progress-primary-second"]: color === "purple",
                ["progress-secondary-second"]: color === "orange",
                ["progress-bar"]: size === "small",
                ["progress-bar-large"]: size === "large",
              }
            )}
            style={{ animationDelay: "1s" }}
          />
        </div>
        <div
          className="
          absolute
          top-0
          left-[90%]
          bottom-0
          border-dashed border-black border-r-2
        "
        ></div>
      </div>
    </div>
  );
};
