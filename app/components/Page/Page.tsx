import cx from "classnames";

import { ExternalLink } from "../Link";

import styles from "./Page.module.scss";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const PageContainer = ({ className, children }: PageContainerProps) => (
  <div className={cx(styles["page-container"], className)}>{children}</div>
);

export const Divider = ({ className }: { className?: string }) => (
  <hr className={cx(styles["divider"], className)} />
);

type PageFooterProps = {
  children?: React.ReactNode;
  className?: string;
};

export const PageFooter = ({ className, children = null }: PageFooterProps) => (
  <footer
    className={cx(
      "padding-bottom-l padding-top-4xl flex align-items-center",
      className
    )}
  >
    {children}
    <div className="flex flex-row align-items-center justify-content-center footnote space-x-2xs">
      <div>&#128075;</div>
      <p>
        Made <span hidden>with love</span> by{" "}
        <ExternalLink href="https://www.instagram.com/finnhello/">
          Finn
        </ExternalLink>
        ,{" "}
        <ExternalLink href="https://twitter.com/andy__carrell">
          Andy
        </ExternalLink>
        ,{" "}
        <ExternalLink href="https://twitter.com/jishaal">Jishaal</ExternalLink>,
        and{" "}
        <ExternalLink href="https://twitter.com/__simar__">Simar</ExternalLink>
      </p>
    </div>
  </footer>
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
