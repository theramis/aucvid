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
  dosesPercentChange = null,
  children = null,
}: DosesDescriptionProps) => {
  const displayDosesPercentageChange =
    dosesPercentChange && truncateNumber(dosesPercentChange, 1);

  return (
    <div className="width-half">
      <dt className={cx(styles["dose-label"], "margin-bottom-2xs")}>{term}</dt>
      <dd className="flex flex-row justify-content-start align-items-baseline space-x-xs">
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
        {displayDosesPercentageChange ? (
          <div
            className={cx(
              styles["percentage-change"],
              {
                [styles["percentage-change-negative"]]:
                  displayDosesPercentageChange < 0,
              },
              "flex flex-row align-items-baseline space-x-2xs paragraph"
            )}
          >
            <svg
              className="flex-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.23077 4.57143L14.1538 9.14286L16 7.42857L8 0L-5.96046e-07 7.42857L1.84615 9.14286L6.76923 4.57143L6.76923 16H9.23077L9.23077 4.57143Z"
                fill="currentColor"
              />
            </svg>
            <div>{displayDosesPercentageChange}</div>
          </div>
        ) : null}
      </dd>
      {children}
    </div>
  );
};

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
