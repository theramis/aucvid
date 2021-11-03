import cx from "classnames";
import { CheckIcon } from "@heroicons/react/solid";
import numberFormatter from "../../utilities/numberFormatter";
import { DhbVaccineDoseDataForIndexPage } from "../../types/IndexPageProps";

import styles from "./DosesDescriptionList.module.scss";

type DosesDescriptionProps = {
  term: string;
  hasMetTarget: boolean;
  dosesPercent: number;
  dosesChange: number;
  children?: React.ReactNode;
};

type DosesDescriptionListProps = { dhbData: DhbVaccineDoseDataForIndexPage };

const DosesDescription = ({
  term,
  hasMetTarget,
  dosesPercent,
  children = null,
}: DosesDescriptionProps) => (
  <div className="width-half">
    <dt className={cx(styles["dose-label"], "margin-bottom-2xs")}>{term}</dt>
    <dd className="flex flex-row justify-content-start align-items-center space-x-xs">
      <div
        className={cx(styles["percentage-value"], {
          [styles["percentage-value-complete"]]: hasMetTarget,
        })}
      >
        {dosesPercent * 100}%
      </div>
      {hasMetTarget && (
        <div className={cx(styles["check"], "flex-0")}>
          <CheckIcon aria-label={`${term} target met`} />
        </div>
      )}
    </dd>
    {children}
  </div>
);

export const DosesDescriptionList = ({
  dhbData,
}: DosesDescriptionListProps) => (
  <dl className="flex flex-row">
    <DosesDescription
      term="First doses"
      hasMetTarget={dhbData.hasMetFirstDoseTarget}
      dosesPercent={dhbData.firstDosesPercentage}
      dosesChange={dhbData.firstDosesChange}
    >
      <dd className={styles["vaccine-count"]}>
        {numberFormatter.format(dhbData.firstDosesTo90Percent)} left{" "}
        {!dhbData.hasMetFirstDoseTarget && `(${dhbData.firstDosesChange})`}
      </dd>
    </DosesDescription>
    <DosesDescription
      term="Second doses"
      hasMetTarget={dhbData.hasMetSecondDoseTarget}
      dosesPercent={dhbData.secondDosesPercentage}
      dosesChange={dhbData.secondDosesChange}
    >
      <dd className={styles["vaccine-count"]}>
        {numberFormatter.format(dhbData.secondDosesTo90Percent)} left{" "}
        {!dhbData.hasMetSecondDoseTarget && `(${dhbData.secondDosesChange})`}
      </dd>
    </DosesDescription>
  </dl>
);
