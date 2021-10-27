import cx from "classnames";
import { CheckIcon } from "@heroicons/react/solid";

import { DhbData } from "../types/DhbData";
import numberFormatter from "../utilities/numberFormatter";

type DosesDescriptionProps = {
  title: string;
  hasMetTarget: boolean;
  dosesPercent: number;
  children?: React.ReactNode;
};

type DosesDescriptionListProps = { dhbData: DhbData };

export const DosesDescription = ({
  title,
  hasMetTarget,
  dosesPercent,
  children = null,
}: DosesDescriptionProps) => (
  <div className={"flex flex-row justify-start items-center"}>
    <dd className="w-32 flex items-center">
      {hasMetTarget && (
        <div className="w-4 h-4 mr-2 flex items-center justify-center rounded-full check">
          <CheckIcon className="h-4 w-4" />
        </div>
      )}
      <div
        className={cx("data-text", {
          ["data-text-complete"]: hasMetTarget,
        })}
      >
        {title}
      </div>
    </dd>
    <dt
      className={cx("data-text text-right w-8", {
        ["data-text-complete"]: hasMetTarget,
      })}
    >
      {dosesPercent * 100}%
    </dt>
    {children}
  </div>
);

const DosesDescriptionList = ({ dhbData }: DosesDescriptionListProps) => (
  <dl>
    <DosesDescription
      title="First doses"
      hasMetTarget={dhbData.hasMetFirstDoseTarget}
      dosesPercent={dhbData.firstDosesPercentage}
    >
      <dt className="flex-1 data-text text-right">
        <strong>
          {numberFormatter.format(dhbData.numOfFirstDosesTo90Percent)}
        </strong>{" "}
        left
      </dt>
    </DosesDescription>
    <DosesDescription
      title="Second doses"
      hasMetTarget={dhbData.hasMetSecondDoseTarget}
      dosesPercent={dhbData.secondDosesPercentage}
    >
      <dt className="flex-1 data-text text-right">
        <strong>
          {numberFormatter.format(dhbData.numOfSecondDosesTo90Percent)}
        </strong>{" "}
        left
      </dt>
    </DosesDescription>
  </dl>
);

export default DosesDescriptionList;
