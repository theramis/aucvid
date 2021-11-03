import Head from "next/head";

import { useHasMounted } from "../app/hooks/useIsMounted";
import { Page, PageContainer } from "../app/components/Page";
import { DarkModeToggle } from "../app/components/DarkModeToggle";
import { ExternalLink, InternalLink } from "../app/components/Link";

const NotFound = () => {
  const hasMounted = useHasMounted();

  return (
    <Page className="flex align-items-center">
      <Head>
        <title>Page not found | outoflockdown.co</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Head>
      <section className="padding-top-4xl padding-bottom-l flex-1 width-full">
        <PageContainer>
          <div className="height-3xl flex flex-row justify-content-end">
            {hasMounted && <DarkModeToggle className="flex-0" />}
          </div>
          <div className="flex flex-column align-items-center margin-y-5xl">
            <h1 className="heading-1">404</h1>
            <h2 className="heading-2 margin-bottom-l">
              This page could not be found.
            </h2>
            <InternalLink className="paragraph" href="/">
              Back to homepage
            </InternalLink>
          </div>
        </PageContainer>
      </section>
      <footer className="padding-bottom-l padding-top-4xl">
        <PageContainer className="flex align-items-center">
          <div className="flex flex-row align-items-center justify-content-center footnote margin-top-2xs space-x-2xs">
            <div>&#128075;</div>
            <p>
              Made <span hidden>with love</span> by{" "}
              <ExternalLink href="https://www.instagram.com/finnsta_gram/">
                Finn
              </ExternalLink>
              ,{" "}
              <ExternalLink href="https://twitter.com/andy__carrell">
                Andy
              </ExternalLink>
              ,{" "}
              <ExternalLink href="https://twitter.com/jishaal">
                Jishaal
              </ExternalLink>
              , and{" "}
              <ExternalLink href="https://twitter.com/__simar__">
                Simar
              </ExternalLink>
            </p>
          </div>
        </PageContainer>
      </footer>
    </Page>
  );
};

export default NotFound;
