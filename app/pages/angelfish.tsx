import { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { Progress } from "../components/Progress";
import { ExternalLink } from "../components/Link";
import { DosesDescriptionList } from "../components/DosesDescriptionList";
import { DarkModeToggle } from "../components/DarkModeToggle";
import { DhbPopulationDoseDataWithRegion } from "../types/VaccineDataTypes";
import fetchHomePageProps from "../services/angelfishPagePropsService";
import { useHasMounted } from "../hooks/useIsMounted";
import { RegionDropdown } from "../components/RegionDropdown";
import dhbDisplayName from "../utilities/dhbDisplayName";
import { DhbRegionId } from "../types/VaccineDataTypes";

export type HomePageProps = {
  allDhbsPopulationDoseData: DhbPopulationDoseDataWithRegion[];
  dataValidAsAtTimeUtc: string;
  dataFetchedAtTimeUtc: string;
};

const Home: React.FC<HomePageProps> = (props: HomePageProps) => {
  const { allDhbsPopulationDoseData } = props;
  const hasMounted = useHasMounted();
  const [region, selectedRegion] = useState<DhbRegionId>("auckland");

  return (
    <main className="page flex align-items-center">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Head>
      <div className="flex-1 w-full">
        <section className="padding-y-4xl">
          <div className="page-container">
            <div className="flex flex-row justify-content-between margin-bottom-l m:margin-bottom-4xl">
              <div>
                <h2 className="heading-2">Vaccination rates</h2>
                <h1 className="heading-1">Aotearoa</h1>
              </div>
              {hasMounted && <DarkModeToggle className="margin-top-2xs" />}
            </div>
            <RegionDropdown
              selectedRegion={region}
              onChange={(regionId) => selectedRegion(regionId)}
            />
          </div>
        </section>
        <section>
          <div className="page-container">
            <div className="doses-data-grid">
              {allDhbsPopulationDoseData
                .filter((dhb) => dhb.regionIds.includes(region))
                .map((dhb) => (
                  <div
                    key={dhb.dhbName}
                    className="doses-data-grid-item padding-l"
                  >
                    <h3 className="heading-3 margin-bottom-s">
                      {dhbDisplayName(dhb.dhbName)}
                    </h3>
                    <div className="margin-bottom-xs">
                      <DosesDescriptionList dhbData={dhb} />
                    </div>
                    <Progress
                      size="xsmall"
                      firstDose={dhb.firstDosesPercentage}
                      secondDose={dhb.secondDosesPercentage}
                    />
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
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

export const getServerSideProps: GetServerSideProps<HomePageProps> =
  async () => {
    return {
      props: await fetchHomePageProps(),
    };
  };
