import { GetServerSideProps } from "next";
import { DateTime } from "luxon";
import { useQueryParams, withDefault, StringParam } from "use-query-params";

import { ExternalLink } from "../app/components/Link";
import { DarkModeToggle } from "../app/components/DarkModeToggle";
import { useHasMounted } from "../app/hooks/useHasMounted";
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
import { LatestDataRefresh } from "../app/components/LatestDataRefresh";

const Index: React.FC<IndexPageProps> = (props: IndexPageProps) => {
  const { allDhbsVaccineDoseData } = props;

  const hasMounted = useHasMounted();
  const [query, setQuery] = useQueryParams({
    dhbs: withDefault(StringParam, "auckland"),
  });

  return (
    <Page className="flex align-items-center">
      <LatestDataRefresh dataUpdatedAtTimeUtc={props.dataUpdatedAtTimeUtc} />
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
              selectedRegion={query.dhbs}
              onChange={(id) => setQuery({ dhbs: id })}
            />
          </PageContainer>
        </section>
        <section>
          <PageContainer>
            <DhbsVaccineDoseDataList
              key={query.dhbs}
              dhbsVaccineDoseData={allDhbsVaccineDoseData.filter((dhb) => {
                if (query.dhbs === "all") {
                  return true;
                }
                return dhb.regionIds.includes(query.dhbs as DhbRegionId);
              })}
            />
          </PageContainer>
        </section>
      </div>
      <PageFooter>
        <div className="flex align-items-center">
          <p className="footnote margin-bottom-xs">
            Source:{" "}
            <ExternalLink href="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-data-and-statistics/covid-19-vaccine-data">
              Ministry of Health NZ
            </ExternalLink>
          </p>
          <div className="flex flex-column s:flex-row justify-content-center align-items-center footnote">
            <p>
              Data updated{" "}
              {DateTime.fromISO(props.dataUpdatedAtTimeUtc).toRelative()}
            </p>
            {props.lastCheckedAtTimeUtc ? (
              <>
                <span className="hidden s:visible margin-x-xs">-</span>
                <p>
                  Last checked{" "}
                  {DateTime.fromISO(props.lastCheckedAtTimeUtc).toRelative()}
                </p>
              </>
            ) : null}
          </div>
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
