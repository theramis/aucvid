import { useEffect } from "react";
import { useStickyState } from "../../hooks/useStickyState";
import styles from "./RegionDropdown.module.scss";

export type DhbRegionId = "auckland" | "northIsland" | "southIsland";
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
  onChange: (id: DhbRegionId) => void;
};

export const RegionDropdown = ({ onChange }: RegionDropdownProps) => {
  const [region, setRegion] = useStickyState<DhbRegionId>(
    "regionPreference",
    "auckland"
  );

  const handleChange = (id: DhbRegionId) => {
    setRegion(id);
    onChange(id);
  };

  useEffect(() => {
    onChange(region);
  }, []);

  return (
    <select
      className={styles.dropdown}
      value={region}
      onChange={(event) => handleChange(event.target.value as DhbRegionId)}
    >
      {options.map((option: Option) => {
        return (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};
