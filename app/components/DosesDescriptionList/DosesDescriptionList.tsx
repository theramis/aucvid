import cx from "classnames";
import { CheckIcon } from "@heroicons/react/solid";

import { DhbPopulationDoseData } from "../../types/VaccineDataTypes";

import numberFormatter from "../../utilities/numberFormatter";

import styles from "./DosesDescriptionList.module.scss";

type DosesDescriptionProps = {
  term: string;
  hasMetTarget: boolean;
  dosesPercent: number;
  children?: React.ReactNode;
};

type DosesDescriptionListProps = { dhbData: DhbPopulationDoseData };

export const DosesDescription = ({
  term,
  hasMetTarget,
  dosesPercent,
  children = null,
}: DosesDescriptionProps) => (
  <div className={styles["description-definition"]}>
    <dt className={cx(styles["term"], "space-x-xs")}>
      <div
        className={cx("data-text", { ["data-text-complete"]: hasMetTarget })}
      >
        {term}
      </div>
    </dt>
    <dd
      className={cx(styles["definition-primary"], "data-text", {
        ["data-text-complete"]: hasMetTarget,
      })}
    >
      {dosesPercent * 100}%
    </dd>
    {children}
  </div>
);

export const DosesDescriptionList = ({
  dhbData,
}: DosesDescriptionListProps) => (
  <dl>
    <DosesDescription
      term="First doses"
      hasMetTarget={dhbData.hasMetFirstDoseTarget}
      dosesPercent={dhbData.firstDosesPercentage}
    >
      <dd className="flex-1 flex flex-row justify-content-end">
        {dhbData.hasMetFirstDoseTarget ? (
          <div className={styles["check"]}>
            <CheckIcon aria-label="First doses target met" />
          </div>
        ) : (
          <div className="data-text">
            <strong>
              {numberFormatter.format(dhbData.numOfFirstDosesTo90Percent)}
            </strong>{" "}
            left
          </div>
        )}
      </dd>
    </DosesDescription>
    <DosesDescription
      term="Second doses"
      hasMetTarget={dhbData.hasMetSecondDoseTarget}
      dosesPercent={dhbData.secondDosesPercentage}
    >
      <dd className="flex-1 flex flex-row justify-content-end">
        {dhbData.hasMetSecondDoseTarget ? (
          <div className={styles["check"]}>
            <CheckIcon aria-label="Second doses target met" />
          </div>
        ) : (
          <div className="data-text">
            <strong>
              {numberFormatter.format(dhbData.numOfSecondDosesTo90Percent)}
            </strong>{" "}
            left
          </div>
        )}
      </dd>
    </DosesDescription>
  </dl>
);
