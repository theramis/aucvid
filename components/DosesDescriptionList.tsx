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
  <div className="data-description">
    <dt className="term">
      {hasMetTarget && (
        <div className="check">
          <CheckIcon />
        </div>
      )}
      <div
        className={cx("data-text", { ["data-text-complete"]: hasMetTarget })}
      >
        {term}
      </div>
    </dt>
    <dd
      className={cx("definition-primary data-text", {
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
      <dd className="definition-secondary data-text">
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
      <dd className="definition-secondary data-text">
        <strong>
          {numberFormatter.format(dhbData.numOfSecondDosesTo90Percent)}
        </strong>{" "}
        left
      </dd>
    </DosesDescription>
  </dl>
);

export default DosesDescriptionList;
