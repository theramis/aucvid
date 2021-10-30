import { GetServerSideProps } from "next";
import Head from "next/head";

import { Progress } from "../components/Progress";
import { ExternalLink } from "../components/Link";
import { DosesDescriptionList } from "../components/DosesDescriptionList";
import { DarkModeToggle } from "../components/DarkModeToggle";
import { DhbPopulationDoseData } from "../types/VaccineDataTypes";
import fetchHomePageProps from "../services/homePagePropsService";
import { useHasMounted } from "../hooks/useIsMounted";
import { RegionDropdown } from "../components/RegionDropdown";
import { DhbRegionId } from "../components/RegionDropdown/RegionDropdown";
import { useState } from "react";

export type HomePageProps = {
  allDhbsPopulationDoseData: DhbPopulationDoseData[];
  aucklandDhbsPopulationDoseData: DhbPopulationDoseData[];
  combinedAucklandDhbsPopulationDoseData: DhbPopulationDoseData;
  dataValidAsAtTimeUtc: string;
  dataFetchedAtTimeUtc: string;
};

const Home: React.FC<HomePageProps> = (props: HomePageProps) => {
  const { aucklandDhbsPopulationDoseData } = props;

  const sortedAucklandDhbsPopulationDoseData =
    aucklandDhbsPopulationDoseData.sort((a, b) =>
      a.dhbName.localeCompare(b.dhbName)
    );

  const hasMounted = useHasMounted();
  const [region, selectedRegion] = useState<DhbRegionId>("auckland");

  return (
    <div className="h-full min-h-screen">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Head>
      <div className="background-shape"></div>
      <section className="pb-12 pt-12 md:pt-16">
        <Container>
          <div className="flex flex-row justify-between">
            <div>
              <h2 className="heading-2">Vaccination rates</h2>
              <h1 className="heading-1 mb-6 md:mb-8">Aotearoa</h1>
            </div>
            {hasMounted && <DarkModeToggle className="mt-1" />}
          </div>
          <RegionDropdown
            selectedRegion={region}
            onChange={(regionId) => selectedRegion(regionId)}
          />
        </Container>
      </section>
      <section>
        <Container>
          <div className="container-data rounded-xl p-6 space-y-6">
            {sortedAucklandDhbsPopulationDoseData.map((dhb) => (
              <div key={dhb.dhbName}>
                <h3 className="heading-3 mb-2">{dhb.dhbName}</h3>
                <div className="mb-4">
                  <DosesDescriptionList dhbData={dhb} />
                </div>
                <Progress
                  firstDose={dhb.firstDosesPercentage}
                  secondDose={dhb.secondDosesPercentage}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>
      <footer className="pb-4 pt-20 md:pt-32">
        <Container>
          <div className="flex flex-row items-center justify-center footnote">
            <p>
              Data source:{" "}
              <ExternalLink href="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-data-and-statistics/covid-19-vaccine-data">
                Ministry of Health NZ
              </ExternalLink>
            </p>
          </div>
          <div className="flex flex-row items-center justify-center footnote mt-1">
            <div className="mr-2">&#128075;</div>
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
        </Container>
      </footer>
    </div>
  );
};

export default Home;

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mx-5 sm:mx-auto" style={{ maxWidth: "600px" }}>
    {children}
  </div>
);

export const getServerSideProps: GetServerSideProps<HomePageProps> =
  async () => {
    return {
      props: await fetchHomePageProps(),
    };
  };
