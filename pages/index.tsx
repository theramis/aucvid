import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { DateTime } from "luxon";

import { ExternalLink } from "../app/components/Link";
import { DarkModeToggle } from "../app/components/DarkModeToggle";
import { useHasMounted } from "../app/hooks/useHasMounted";
import {
  Page,
  PageContainer,
  PageFooter,
  Divider,
} from "../app/components/Page";
import {
  RegionDropdown,
  RegionOptionId,
} from "../app/components/RegionDropdown";
import { IndexPageProps } from "../app/types/IndexPageProps";
import fetchIndexPageProps from "../app/propsGenerators/indexPagePropsGenerator";
import { DhbsVaccineDoseDataList } from "../app/components/DhbsVaccineDoseDataList";

const useQueryParam = <ParamType extends string>(
  key: string,
  defaultValue: ParamType
): [ParamType, React.Dispatch<React.SetStateAction<ParamType>>] => {
  const { query, push } = useRouter();

  const [value, setValue] = useState<ParamType>(() => {
    if (query[key] && typeof query[key] === "string") {
      // TODO - check this is actually ParamType & decode value
      return query[key] as ParamType;
    }
    return defaultValue;
  });

  useEffect(() => {
    push({ query: { [key]: value } });
  }, [push, key, value]);

  return [value, setValue];
};

const Index: React.FC<IndexPageProps> = (props: IndexPageProps) => {
  const { allDhbsVaccineDoseData } = props;
  const hasMounted = useHasMounted();

  const [region, selectRegion] = useQueryParam<RegionOptionId>(
    "dhbs",
    "auckland"
  );

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
              onChange={(id) => selectRegion(id)}
            />
          </PageContainer>
        </section>
        <section>
          <PageContainer>
            <DhbsVaccineDoseDataList
              key={region}
              dhbsVaccineDoseData={allDhbsVaccineDoseData.filter((dhb) => {
                if (region === "all") {
                  return true;
                }
                return dhb.regionIds.includes(region);
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
