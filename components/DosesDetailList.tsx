import cx from "classnames";
import { CheckIcon } from "@heroicons/react/solid";

import { DhbData } from "../types/DhbData";
import numberFormatter from "../utilities/numberFormatter";

type DosesDescriptionProps = {
  term: string;
  hasMetTarget: boolean;
  dosesPercent: number;
  children?: React.ReactNode;
};

type DosesDescriptionListProps = { dhbData: DhbData };

export const DosesDescription = ({
  term,
  hasMetTarget,
  dosesPercent,
  children = null,
}: DosesDescriptionProps) => (
  <div className="flex flex-row justify-start items-center">
    <dt className="w-32 flex items-center">
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
        {term}
      </div>
    </dt>
    <dd
      className={cx("data-text text-right w-8", {
        ["data-text-complete"]: hasMetTarget,
      })}
    >
      {dosesPercent * 100}%
    </dd>
    {children}
  </div>
);

const DosesDescriptionList = ({ dhbData }: DosesDescriptionListProps) => (
  <dl>
    <DosesDescription
      term="First doses"
      hasMetTarget={dhbData.hasMetFirstDoseTarget}
      dosesPercent={dhbData.firstDosesPercentage}
    >
      <dd className="flex-1 data-text text-right">
        <strong>
          {numberFormatter.format(dhbData.numOfFirstDosesTo90Percent)}
        </strong>{" "}
        left
      </dd>
    </DosesDescription>
    <DosesDescription
      term="Second doses"
      hasMetTarget={dhbData.hasMetSecondDoseTarget}
      dosesPercent={dhbData.secondDosesPercentage}
    >
      <dd className="flex-1 data-text text-right">
        <strong>
          {numberFormatter.format(dhbData.numOfSecondDosesTo90Percent)}
        </strong>{" "}
        left
      </dd>
    </DosesDescription>
  </dl>
);

export default DosesDescriptionList;
