import cx from "classnames";
import Link from "next/link";

import styles from "./Link.module.scss";

type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export const ExternalLink = ({ href, children, className }: LinkProps) => (
  <a
    href={href}
    className={cx(styles["link"], className)}
    rel="noopener noreferrer"
    target="_blank"
  >
    {children}
  </a>
);

export const InternalLink = ({ href, children, className }: LinkProps) => (
  <Link href={href}>
    <a className={cx(styles["link"], className)}>{children}</a>
  </Link>
);
