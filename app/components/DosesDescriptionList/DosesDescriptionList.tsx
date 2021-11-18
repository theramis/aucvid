import cx from "classnames";
import { CheckIcon } from "@heroicons/react/solid";
import numberFormatter from "../../utilities/numberFormatter";
import truncateNumber from "../../utilities/truncateNumber";
import { DhbVaccineDoseDataForIndexPage } from "../../types/IndexPageProps";

import styles from "./DosesDescriptionList.module.scss";

type DosesDescriptionProps = {
  term: string;
  hasMetTarget: boolean;
  dosesPercent: number;
  dosesPercentChange: number | null;
  children?: React.ReactNode;
};

type DosesDescriptionListProps = { dhbData: DhbVaccineDoseDataForIndexPage };

const DisplayPercentage = ({ percentage }: { percentage: number }) => {
  if (percentage > 99) {
    return <>&gt; 99%</>;
  }

  return <>{truncateNumber(percentage, 1)}%</>;
};

const DosesDescription = ({
  term,
  hasMetTarget,
  dosesPercent,
  dosesPercentChange,
  children = null,
}: DosesDescriptionProps) => (
  <div className="width-half">
    <dt className={cx(styles["dose-label"], "margin-bottom-2xs")}>{term}</dt>
    <dd className="flex flex-row justify-content-start align-items-center space-x-xs">
      {hasMetTarget && (
        <div className={cx(styles["check"], "flex-0")}>
          <CheckIcon aria-label={`${term} target met`} />
        </div>
      )}
      <div
        className={cx(styles["percentage-value"], {
          [styles["percentage-value-complete"]]: hasMetTarget,
        })}
      >
        <DisplayPercentage percentage={dosesPercent} />
      </div>
      {dosesPercentChange && truncateNumber(dosesPercentChange, 1) > 0 && (
        <div className={cx(styles["percentage-value-change"])}>
          ↑ {truncateNumber(dosesPercentChange, 1)}
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
      dosesPercentChange={dhbData.firstDosesPercentChange}
    >
      <dd className={styles["vaccine-count"]}>
        {numberFormatter.format(dhbData.firstDosesTo90Percent)} left
      </dd>
    </DosesDescription>
    <DosesDescription
      term="Second doses"
      hasMetTarget={dhbData.hasMetSecondDoseTarget}
      dosesPercent={dhbData.secondDosesPercentage}
      dosesPercentChange={dhbData.secondDosesPercentChange}
    >
      <dd className={styles["vaccine-count"]}>
        {numberFormatter.format(dhbData.secondDosesTo90Percent)} left
      </dd>
    </DosesDescription>
  </dl>
);
