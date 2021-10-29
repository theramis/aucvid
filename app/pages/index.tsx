import { DateTime } from "luxon";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Progress } from "../components/Progress";
import hoursBeforeNow from "../utilities/hoursBeforeNow";
import DosesDescriptionList, {
  DosesDescription,
} from "../components/DosesDescriptionList";
import { DhbPopulationDoseData } from "../types/VaccineDataTypes";
import fetchHomePageProps from "../services/homePagePropsService";

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
    dataFetchedAtTimeUtc,
  } = props;

  const sortedAucklandDhbsPopulationDoseData =
    aucklandDhbsPopulationDoseData.sort((a, b) =>
      a.dhbName.localeCompare(b.dhbName)
    );

  const formatTimeTitle = useTimeFormatter();

  return (
    <div className="h-full min-h-screen">
      <div className="background-shape"></div>
      <section className="pb-12 pt-12 md:pt-16">
        <Container>
          <div>
            <h2 className="heading-2">Vaccination rates</h2>
            <h1 className="heading-1 mb-6 md:mb-8">Auckland</h1>
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
              combinedAucklandDhbsPopulationDoseData.firstDosesPercentage * 100
            }
            secondDose={
              combinedAucklandDhbsPopulationDoseData.secondDosesPercentage * 100
            }
            size="large"
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
                  firstDose={dhb.firstDosesPercentage * 100}
                  secondDose={dhb.secondDosesPercentage * 100}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>
      <footer className="pb-4 pt-20 md:pt-32">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-center space-x-0 sm:space-x-2 space-y-2 sm:space-y-0 footnote">
            <p>
              Data fetched from{" "}
              <a
                className="underline focus:outline-none focus:no-underline focus:opacity-70 hover:opacity-70"
                href="https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-data-and-statistics/covid-19-vaccine-data"
                rel="noopener noreferrer"
                target="_blank"
              >
                Ministry of Health NZ
              </a>
            </p>
            <div className="hidden sm:block">&#8226;</div>
            <p title={formatTimeTitle(dataFetchedAtTimeUtc)}>
              {hoursBeforeNow(dataFetchedAtTimeUtc)}
            </p>
          </div>
          <div className="flex flex-row items-center justify-center footnote mt-1">
            <div className="mr-2">&#128075;</div>
            <p>
              Made <span className="hidden sm:inline">with love</span> by{" "}
              <a
                className="underline focus:outline-none focus:no-underline focus:opacity-70 hover:opacity-70"
                href="https://www.instagram.com/finnsta_gram/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Finn
              </a>
              ,{" "}
              <a
                className="underline focus:outline-none focus:no-underline focus:opacity-70 hover:opacity-70"
                href="https://twitter.com/andy__carrell"
                rel="noopener noreferrer"
                target="_blank"
              >
                Andy
              </a>
              ,{" "}
              <a
                className="underline focus:outline-none focus:no-underline focus:opacity-70 hover:opacity-70"
                href="https://twitter.com/jishaal"
                rel="noopener noreferrer"
                target="_blank"
              >
                Jishaal
              </a>
              , and{" "}
              <a
                className="underline focus:outline-none focus:no-underline focus:opacity-70 hover:opacity-70"
                href="https://twitter.com/__simar__"
                rel="noopener noreferrer"
                target="_blank"
              >
                Simar
              </a>
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

const useTimeFormatter = () => {
  // Set formatter for server - simply return a string
  const [format, setFormat] = useState(() => (a: string) => "");

  // Set formatter on client - will run in client TZ
  useEffect(() => {
    const clientFormatter = (t: string) =>
      DateTime.fromISO(t).toFormat("dd LLL yyyy h:mm a");
    setFormat(() => clientFormatter);
  }, []);

  return format;
};

export const getServerSideProps: GetServerSideProps<HomePageProps> =
  async () => {
    return {
      props: await fetchHomePageProps(),
    };
  };
