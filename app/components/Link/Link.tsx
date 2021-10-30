import styles from "./Link.module.scss";

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
};

export const ExternalLink = ({ href, children }: ExternalLinkProps) => (
  <a
    href={href}
    className={styles["link"]}
    rel="noopener noreferrer"
    target="_blank"
  >
    {children}
  </a>
);
