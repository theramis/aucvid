import cx from "classnames";

type ProgressProps = {
  firstDose: number;
  secondDose: number;
  color?: "purple" | "yellow";
  size?: "small" | "large";
};

export const Progress = ({
  firstDose,
  secondDose,
  color = "yellow",
  size = "small",
}: ProgressProps) => {
  return (
    <div className="w-full flex">
      <div
        className={cx("w-full relative rounded-lg animate-fade-in", {
          ["bg-purple-300"]: color === "purple",
          ["bg-yellow-200"]: color === "yellow",
          ["h-6"]: size === "small",
          ["h-12"]: size === "large",
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
                ["bg-purple-400 "]: color === "purple",
                ["bg-yellow-500"]: color === "yellow",
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
                ["bg-purple-500 "]: color === "purple",
                ["bg-yellow-600"]: color === "yellow",
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
