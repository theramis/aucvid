import { GetServerSideProps } from "next";
import cx from "classnames";
import { CheckIcon } from "@heroicons/react/solid";

import { Progress } from "../components/Progress";
import { ExternalLink } from "../components/Link";
import { DarkModeToggle } from "../components/DarkModeToggle";
import { DhbPopulationDoseData } from "../types/VaccineDataTypes";
import fetchHomePageProps from "../services/homePagePropsService";
import { useHasMounted } from "../hooks/useIsMounted";
import dhbDisplayName from "../utilities/dhbDisplayName";
import numberFormatter from "../utilities/numberFormatter";

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
    <div className="h-full min-h-screen">
      <section className="pb-12 pt-12 md:pt-16">
        <div className="max-w-[600px] mx-5 sm:mx-auto">
          <div className="flex flex-row justify-between">
            <div>
              <h2 className="text-2xl font-light text-[color:var(--text-primary)]">
                Vaccination rates
              </h2>
              <h1 className="text-6xl font-bold leading-[4.5rem] text-[color:var(--text-primary)] mb-6 md:mb-8">
                Auckland
              </h1>
            </div>
            {hasMounted && <DarkModeToggle className="mt-1" />}
          </div>
          <h2 className="text-2xl font-medium text-[color:var(--text-primary)] mb-3">
            Combined Auckland DHBs
          </h2>
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
          <div className="bg-[color:var(--background-tint)] rounded-xl p-6 space-y-6">
            {sortedAucklandDhbsPopulationDoseData.map((dhb) => (
              <div key={dhb.dhbName}>
                <h3 className="text-2xl font-medium text-[color:var(--text-primary)] mb-2">
                  {dhbDisplayName(dhb.dhbName)}
                </h3>
                <dl className="mb-4">
                  <DosesDescription
                    term="First doses"
                    hasMetTarget={dhb.hasMetFirstDoseTarget}
                    dosesPercent={dhb.firstDosesPercentage}
                    dosesRemaining={dhb.numOfFirstDosesTo90Percent}
                  />
                  <DosesDescription
                    term="Second doses"
                    hasMetTarget={dhb.hasMetSecondDoseTarget}
                    dosesPercent={dhb.secondDosesPercentage}
                    dosesRemaining={dhb.numOfSecondDosesTo90Percent}
                  />
                </dl>
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
        </div>
      </footer>
    </div>
  );
};

export default Home;

export const DosesDescription = ({
  term,
  hasMetTarget,
  dosesPercent,
  dosesRemaining = null,
}: {
  term: string;
  hasMetTarget: boolean;
  dosesPercent: number;
  dosesRemaining?: number | null;
}) => {
  const isNumber = (x: any): x is number => typeof x === "number";

  return (
    <div className="flex flex-row justify-start items-center">
      <dt className="w-[8rem] flex flex-row justify-start items-center">
        {hasMetTarget && (
          <div className="h-[1rem] w-[1rem] rounded-full flex justify-center items-center bg-[#7bdaa1] text-black mr-2">
            <CheckIcon />
          </div>
        )}
        <div
          className={cx(
            "text-sm font-medium text-[color:var(--text-secondary)]",
            {
              ["text-[color:var(--text-positive)]"]: hasMetTarget,
            }
          )}
        >
          {term}
        </div>
      </dt>
      <dd
        className={cx(
          "w-[2rem] text-sm font-medium text-right text-[color:var(--text-secondary)]",
          {
            ["text-[color:var(--text-positive)]"]: hasMetTarget,
          }
        )}
      >
        {dosesPercent * 100}%
      </dd>
      {isNumber(dosesRemaining) ? (
        <dd className="flex-1 text-right text-sm font-medium text-[color:var(--text-primary)]">
          <strong>{numberFormatter.format(dosesRemaining)}</strong> left
        </dd>
      ) : null}
      <div
        className="hidden text-[color:var(--text-positive)]"
        data-purpose="Register --text-positive var for tailwind css JIT"
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageProps> =
  async () => {
    return {
      props: await fetchHomePageProps(),
    };
  };
