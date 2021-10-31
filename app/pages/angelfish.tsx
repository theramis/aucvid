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
    <div className="page">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Head>
      <section className="margin-top-2xl margin-bottom-xl md:pt-16">
        <div className="page-container mx-5 lg:mx-auto">
          <div className="flex flex-row justify-content-between margin-bottom-4xl">
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
        <div className="page-container mx-5 lg:mx-auto">
          <div className="doses-data-grid">
            {allDhbsPopulationDoseData
              .filter((dhb) => dhb.regionIds.includes(region))
              .map((dhb) => (
                <div key={dhb.dhbName} className="doses-data-grid-item p-5">
                  <h3 className="heading-3 mb-3">
                    {dhbDisplayName(dhb.dhbName)}
                  </h3>
                  <div className="mb-2">
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
      <footer className="pb-4 pt-20 md:pt-32">
        <div className="page-container mx-5 lg:mx-auto flex align-items-center">
          <p className="footnote">
            Data source:{" "}
            <ExternalLink href="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-data-and-statistics/covid-19-vaccine-data">
              Ministry of Health NZ
            </ExternalLink>
          </p>
          <div className="flex flex-row items-center justify-center footnote mt-1">
            <div className="mr-1">&#128075;</div>
            <p>
              Made <span className="hidden sm:inline">with love</span> by{" "}
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
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomePageProps> =
  async () => {
    return {
      props: await fetchHomePageProps(),
    };
  };
