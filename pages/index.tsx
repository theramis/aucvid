import { useState } from "react";
import { GetServerSideProps } from "next";

import { Progress } from "../app/components/Progress";
import { ExternalLink } from "../app/components/Link";
import { DosesDescriptionList } from "../app/components/DosesDescriptionList";
import { DarkModeToggle } from "../app/components/DarkModeToggle";
import {
  DhbRegionId,
  DhbPopulationDoseDataWithRegion,
} from "../app/types/VaccineDataTypes";
import fetchHomePageProps from "../app/services/homePagePropsService";
import { useHasMounted } from "../app/hooks/useIsMounted";
import { Page, PageContainer } from "../app/components/Page";
import { RegionDropdown } from "../app/components/RegionDropdown";
import dhbDisplayName from "../app/utilities/dhbDisplayName";

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
    <Page className="flex align-items-center">
      <div className="flex-1 width-full">
        <section className="padding-top-4xl padding-bottom-l">
          <PageContainer>
            <div className="padding-left-l l:padding-left-none margin-bottom-l s:margin-bottom-4xl">
              <div className="width-full flex flex-row justify-content-between align-items-center">
                <h2 className="heading-2">Vaccination rates</h2>
                {hasMounted && <DarkModeToggle className="flex-0" />}
              </div>
              <h1 className="heading-1 margin-bottom-xl">Aotearoa</h1>
            </div>
            <RegionDropdown
              selectedRegion={region}
              onChange={(regionId) => selectedRegion(regionId)}
            />
          </PageContainer>
        </section>
        <section>
          <PageContainer>
            <div className="doses-data-grid" key={region}>
              {allDhbsPopulationDoseData
                .filter((dhb) => dhb.regionIds.includes(region))
                .map((dhb) => (
                  <div
                    key={dhb.dhbName}
                    className="doses-data-grid-item padding-l"
                  >
                    <h2 className="heading-3 margin-bottom-s">
                      {dhbDisplayName(dhb.dhbName)}
                    </h2>
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
          </PageContainer>
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
    </Page>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomePageProps> =
  async () => {
    return {
      props: await fetchHomePageProps(),
    };
  };
