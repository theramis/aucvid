import { useState } from "react";
import { GetServerSideProps } from "next";
import { DateTime } from "luxon";

import { ExternalLink } from "../app/components/Link";
import { DarkModeToggle } from "../app/components/DarkModeToggle";
import { useHasMounted } from "../app/hooks/useIsMounted";
import {
  Page,
  PageContainer,
  PageFooter,
  Divider,
} from "../app/components/Page";
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
      <PageFooter>
        <div className="flex align-items-center">
          <p className="footnote margin-bottom-xs">
            Data source:{" "}
            <ExternalLink href="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-data-and-statistics/covid-19-vaccine-data">
              Ministry of Health NZ
            </ExternalLink>
          </p>
          <p className="footnote">
            Data updated{" "}
            {DateTime.fromISO(props.dataUpdatedAtTimeUtc).toRelative()}
          </p>
          {props.lastCheckedAtTimeUtc ? (
            <p className="footnote">
              Last checked{" "}
              {DateTime.fromISO(props.lastCheckedAtTimeUtc).toRelative()}
            </p>
          ) : null}
        </div>
        <Divider className="margin-l" />
      </PageFooter>
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
