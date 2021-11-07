import { useState } from "react";
import { GetServerSideProps } from "next";

import { ExternalLink } from "../app/components/Link";
import { DarkModeToggle } from "../app/components/DarkModeToggle";
import { useHasMounted } from "../app/hooks/useIsMounted";
import { Page, PageContainer } from "../app/components/Page";
import { RegionDropdown } from "../app/components/RegionDropdown";
import { DhbRegionId, IndexPageProps } from "../app/types/IndexPageProps";
import fetchIndexPageProps from "../app/propsGenerators/indexPagePropsGenerator";
import { DhbsVaccineDoseDataList } from "../app/components/DhbsVaccineDoseDataList";

const Index: React.FC<IndexPageProps> = (props: IndexPageProps) => {
  const { allDhbsVaccineDoseData } = props;
  const hasMounted = useHasMounted();
  const [region, selectedRegion] = useState<DhbRegionId>("auckland");

  return (
    <Page className="flex align-items-center">
      <div className="flex-1 width-full">
        <section className="padding-top-4xl padding-bottom-l">
          <PageContainer className="flex align-items-stretch">
            <div className="padding-left-l l:padding-left-none margin-bottom-4xl s:margin-bottom-5xl">
              <div className="width-full flex flex-row justify-content-between align-items-center">
                <h2 className="heading-2">Vaccination rates</h2>
                {hasMounted && <DarkModeToggle className="flex-0" />}
              </div>
              <h1 className="heading-1">Aotearoa</h1>
            </div>
            <RegionDropdown
              selectedRegion={region}
              onChange={(regionId) => selectedRegion(regionId)}
            />
          </PageContainer>
        </section>
        <section>
          <PageContainer>
            <DhbsVaccineDoseDataList
              key={region}
              dhbsVaccineDoseData={allDhbsVaccineDoseData.filter((dhb) =>
                dhb.regionIds.includes(region)
              )}
            />
          </PageContainer>
        </section>
      </div>
      <footer className="padding-bottom-l padding-top-4xl">
        <PageContainer className="flex align-items-center">
          <p className="footnote">
            Data source:{" "}
            <ExternalLink href="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-data-and-statistics/covid-19-vaccine-data">
              Ministry of Health NZ
            </ExternalLink>
          </p>
          <div className="flex flex-row align-items-center justify-content-center footnote margin-top-2xs space-x-2xs">
            <div>&#128075;</div>
            <p>
              Made <span hidden>with love</span> by{" "}
              <ExternalLink href="https://www.linkedin.com/in/finnhello/">
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

export default Index;

export const getServerSideProps: GetServerSideProps<IndexPageProps> =
  async () => {
    return {
      props: await fetchIndexPageProps(),
    };
  };
