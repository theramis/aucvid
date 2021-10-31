import { DhbRegionId } from "../../types/VaccineDataTypes";
import styles from "./RegionDropdown.module.scss";

type Option = {
  id: DhbRegionId;
  label: string;
};

const options: Option[] = [
  { id: "auckland", label: "Auckland DHBs" },
  { id: "northIsland", label: "North Island DHBs" },
  { id: "southIsland", label: "South Island DHBs" },
];

type RegionDropdownProps = {
  selectedRegion: DhbRegionId;
  onChange: (id: DhbRegionId) => void;
};

export const RegionDropdown = ({
  selectedRegion,
  onChange,
}: RegionDropdownProps) => {
  return (
    <div className={styles["dropdown-container"]}>
      <div className={styles["dropdown-caret"]}>
        <span className={styles["caret-left"]} />
        <span className={styles["caret-right"]} />
      </div>
      <select
        className={styles["dropdown"]}
        value={selectedRegion}
        onChange={(event) => onChange(event.target.value as DhbRegionId)}
      >
        {options.map((option: Option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
