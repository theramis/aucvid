import cx from "classnames";
import { ButtonHTMLAttributes } from "react";

import styles from "./Button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const Button = ({
  children,
  className,
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      className={cx(styles.button, "padding-x-l padding-y-s", className)}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
