import Head from "next/head";

import { Page, PageFooter } from "../app/components/Page";

const Home: React.FC = () => {
  return (
    <Page className="flex align-items-center">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Head>
      <div className="flex-1 width-full" />
      <PageFooter />
    </Page>
  );
};

export default Home;

export const getServerSideProps = (): { notFound: boolean } => {
  return {
    notFound: true,
  };
};
