import cx from "classnames";
import { CheckIcon } from "@heroicons/react/solid";
import numberFormatter from "../../utilities/numberFormatter";
import truncateNumber from "../../utilities/truncateNumber";
import { DhbVaccineDoseDataForIndexPage } from "../../types/IndexPageProps";

import styles from "./DosesDescriptionList.module.scss";

type DisplayPercentageProps = { percentage: number };

type DosesDescriptionProps = {
  term: string;
  hasMetTarget: boolean;
  dosesPercent: number;
  dosesChange: number;
  children?: React.ReactNode;
};

type DosesDescriptionListProps = { dhbData: DhbVaccineDoseDataForIndexPage };

const DisplayPercentage = ({ percentage }: DisplayPercentageProps) => {
  if (percentage > 99) {
    return <>&gt; 99%</>;
  }

  return <>{truncateNumber(percentage, 1)}%</>;
};

const DosesDescription = ({
  term,
  hasMetTarget,
  dosesPercent,
  children = null,
}: Omit<DosesDescriptionProps, "dosesChange">) => (
  <div className="width-half">
    <dt className={cx(styles["dose-label"], "margin-bottom-2xs")}>{term}</dt>
    <dd className="flex flex-row justify-content-start align-items-center space-x-xs">
      <div
        className={cx(styles["percentage-value"], {
          [styles["percentage-value-complete"]]: hasMetTarget,
        })}
      >
        <DisplayPercentage percentage={dosesPercent} />
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
    >
      <dd className={styles["vaccine-count"]}>
        {numberFormatter.format(dhbData.firstDosesTo90Percent)} left
      </dd>
    </DosesDescription>
    <DosesDescription
      term="Second doses"
      hasMetTarget={dhbData.hasMetSecondDoseTarget}
      dosesPercent={dhbData.secondDosesPercentage}
    >
      <dd className={styles["vaccine-count"]}>
        {numberFormatter.format(dhbData.secondDosesTo90Percent)} left
      </dd>
    </DosesDescription>
  </dl>
);
