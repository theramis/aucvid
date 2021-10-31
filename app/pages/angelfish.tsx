import Head from "next/head";

import { ExternalLink } from "../components/Link";

const Home: React.FC = () => {
  return (
    <main className="page flex align-items-center">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Head>
      <div className="flex-1 w-full" />
      <footer className="padding-bottom-l padding-top-4xl">
        <div className="page-container flex align-items-center">
          <p className="footnote">
            Data source:{" "}
            <ExternalLink href="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-data-and-statistics/covid-19-vaccine-data">
              Ministry of Health NZ
            </ExternalLink>
          </p>
          <div className="flex flex-row items-center justify-center footnote margin-top-2xs space-x-2xs">
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
        </div>
      </footer>
    </main>
  );
};

export default Home;

export const getServerSideProps = (): { notFound: boolean } => {
  return {
    notFound: true,
  };
};
