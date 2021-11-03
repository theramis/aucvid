import cx from "classnames";

import { DhbVaccineDoseDataForIndexPage } from "../../types/IndexPageProps";
import dhbDisplayName from "../../utilities/dhbDisplayName";

import { DosesDescriptionList } from "../DosesDescriptionList";
import { Progress } from "../Progress";

import styles from "./DhbsVaccineDoseDataList.module.scss";

type DhbsVaccineDoseDataListProps = {
  dhbsVaccineDoseData: DhbVaccineDoseDataForIndexPage[];
};

export const DhbsVaccineDoseDataList = ({
  dhbsVaccineDoseData,
}: DhbsVaccineDoseDataListProps) => (
  <div className={styles["card-grid"]}>
    {dhbsVaccineDoseData.map((dhbVaccineDoseData) => (
      <div
        key={dhbVaccineDoseData.dhbName}
        className={cx(styles["card"], "padding-l")}
      >
        <h2 className={cx(styles["card-title"], "margin-bottom-s")}>
          {dhbDisplayName(dhbVaccineDoseData.dhbName)}
        </h2>
        <div className="margin-bottom-l">
          <DosesDescriptionList dhbData={dhbVaccineDoseData} />
        </div>
        <Progress
          size="xsmall"
          firstDose={dhbVaccineDoseData.firstDosesPercentage}
          secondDose={dhbVaccineDoseData.secondDosesPercentage}
        />
      </div>
    ))}
  </div>
);
