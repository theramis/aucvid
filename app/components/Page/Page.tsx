import cx from "classnames";

import styles from "./Page.module.scss";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const PageContainer = ({ className, children }: PageContainerProps) => (
  <div className={cx(styles["page-container"], className)}>{children}</div>
);

type PageProps = {
  children: React.ReactNode;
  role?: React.AriaRole;
  className?: string;
};

export const Page = ({ className, children, role = "main" }: PageProps) => (
  <div role={role} className={cx(styles["page"], className)}>
    {children}
  </div>
);
