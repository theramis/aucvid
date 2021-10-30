import { GetServerSideProps } from "next";
import {
  DosesDescription,
  DosesDescriptionList,
} from "../components/DosesDescriptionList";
import { Progress } from "../components/Progress";
import { ExternalLink } from "../components/Link";
import { DarkModeToggle } from "../components/DarkModeToggle";
import { DhbPopulationDoseData } from "../types/VaccineDataTypes";
import fetchHomePageProps from "../services/homePagePropsService";
import { useHasMounted } from "../hooks/useIsMounted";
import dhbDisplayName from "../utilities/dhbDisplayName";

export type HomePageProps = {
  allDhbsPopulationDoseData: DhbPopulationDoseData[];
  aucklandDhbsPopulationDoseData: DhbPopulationDoseData[];
  combinedAucklandDhbsPopulationDoseData: DhbPopulationDoseData;
  dataValidAsAtTimeUtc: string;
  dataFetchedAtTimeUtc: string;
};

const Home: React.FC<HomePageProps> = (props: HomePageProps) => {
  const {
    combinedAucklandDhbsPopulationDoseData,
    aucklandDhbsPopulationDoseData,
  } = props;

  const sortedAucklandDhbsPopulationDoseData =
    aucklandDhbsPopulationDoseData.sort((a, b) =>
      a.dhbName.localeCompare(b.dhbName)
    );

  const hasMounted = useHasMounted();

  return (
    <div className="page">
      <section className="pb-12 pt-12 md:pt-16">
        <div className="max-w-[600px] mx-5 sm:mx-auto">
          <div className="flex flex-row justify-content-between">
            <div>
              <h2 className="heading-2">Vaccination rates</h2>
              <h1 className="heading-1 mb-6 md:mb-8">Auckland</h1>
            </div>
            {hasMounted && <DarkModeToggle className="mt-1" />}
          </div>
          <h2 className="heading-3 mb-3">Combined Auckland DHBs</h2>
          <dl className="mb-6">
            <DosesDescription
              term="First doses"
              hasMetTarget={
                combinedAucklandDhbsPopulationDoseData.hasMetFirstDoseTarget
              }
              dosesPercent={
                combinedAucklandDhbsPopulationDoseData.firstDosesPercentage
              }
            />
            <DosesDescription
              term="Second doses"
              hasMetTarget={
                combinedAucklandDhbsPopulationDoseData.hasMetSecondDoseTarget
              }
              dosesPercent={
                combinedAucklandDhbsPopulationDoseData.secondDosesPercentage
              }
            />
          </dl>
          <Progress
            firstDose={
              combinedAucklandDhbsPopulationDoseData.firstDosesPercentage
            }
            secondDose={
              combinedAucklandDhbsPopulationDoseData.secondDosesPercentage
            }
            size="large"
          />
        </div>
      </section>
      <section>
        <div className="max-w-[600px] mx-5 sm:mx-auto">
          <div className="container-data rounded-xl p-6 space-y-6">
            {sortedAucklandDhbsPopulationDoseData.map((dhb) => (
              <div key={dhb.dhbName}>
                <h3 className="heading-3 mb-2">
                  {dhbDisplayName(dhb.dhbName)}
                </h3>
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
        </div>
      </section>
      <footer className="pb-4 pt-20 md:pt-32">
        <div className="max-w-[600px] mx-5 sm:mx-auto">
          <div className="flex flex-row align-items-center justify-content-center footnote">
            <p>
              Data source:{" "}
              <ExternalLink href="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-data-and-statistics/covid-19-vaccine-data">
                Ministry of Health NZ
              </ExternalLink>
            </p>
          </div>
          <div className="flex flex-row align-items-center justify-content-center footnote mt-1">
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
