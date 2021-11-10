import Head from "next/head";

import { useHasMounted } from "../app/hooks/useHasMounted";
import { Page, PageContainer, PageFooter } from "../app/components/Page";
import { DarkModeToggle } from "../app/components/DarkModeToggle";
import { InternalLink } from "../app/components/Link";

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
              This page could not be found
            </h2>
            <InternalLink className="paragraph" href="/">
              Back to homepage
            </InternalLink>
          </div>
        </PageContainer>
      </section>
      <PageFooter />
    </Page>
  );
};

export default NotFound;
