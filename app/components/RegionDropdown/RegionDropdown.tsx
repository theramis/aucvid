import { useEffectOnce } from "../../hooks/useEffectOnce";
import { DhbRegionId } from "../../types/IndexPageProps";
import styles from "./RegionDropdown.module.scss";

export type RegionOptionId = DhbRegionId | "all";

type Option = {
  id: RegionOptionId;
  label: string;
};

const options: Option[] = [
  { id: "auckland", label: "Auckland DHBs" },
  { id: "northIsland", label: "North Island DHBs" },
  { id: "southIsland", label: "South Island DHBs" },
  { id: "all", label: "All DHBs" },
];

type RegionDropdownProps = {
  selectedRegion: RegionOptionId | string | undefined;
  onChange: (id: RegionOptionId) => void;
};

export const RegionDropdown = ({
  selectedRegion,
  onChange,
}: RegionDropdownProps) => {
  return (
    <div className={styles["dropdown-container"]}>
      <select
        className={styles["dropdown"]}
        value={selectedRegion}
        onChange={(event) => onChange(event.target.value as RegionOptionId)}
      >
        <option hidden>Select DHBs</option>
        {options.map((option: Option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          );
        })}
      </select>
      <div className={styles["dropdown-caret"]}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
        </svg>
      </div>
    </div>
  );
};
