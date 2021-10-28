import { GetServerSideProps } from "next";

import fetchData from "../services/dataFetcher";
import { DhbData } from "../types/DhbData";
import { Progress } from "../components/Progress";
import hoursBeforeNow from "../utilities/hoursBeforeNow";
import DosesDescriptionList, {
  DosesDescription,
} from "../components/DosesDetailList";

export type HomePageProps = {
  waitemata: DhbData;
  auckland: DhbData;
  countiesManukau: DhbData;
  combinedAuckland: DhbData;
  dataValidAsAtTimeUtc: string;
  dataFetchedAtTimeUtc: string;
};

const Home: React.FC<HomePageProps> = (props: HomePageProps) => {
  const {
    combinedAuckland,
    auckland,
    countiesManukau,
    waitemata,
    dataFetchedAtTimeUtc,
  } = props;

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
              hasMetTarget={combinedAuckland.hasMetFirstDoseTarget}
              dosesPercent={combinedAuckland.firstDosesPercentage}
            />
            <DosesDescription
              term="Second doses"
              hasMetTarget={combinedAuckland.hasMetSecondDoseTarget}
              dosesPercent={combinedAuckland.secondDosesPercentage}
            />
          </dl>
          <Progress
            firstDose={combinedAuckland.firstDosesPercentage * 100}
            secondDose={combinedAuckland.secondDosesPercentage * 100}
            size="large"
          />
        </Container>
      </section>
      <section>
        <Container>
          <div className="container-data rounded-xl p-6 space-y-6">
            {[auckland, countiesManukau, waitemata].map((dhb) => (
              <div key={dhb.name}>
                <h3 className="heading-3 mb-2">{dhb.name}</h3>
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
            <p>{hoursBeforeNow(dataFetchedAtTimeUtc)}</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Home;

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-w-[600px] mx-5 sm:mx-auto">{children}</div>
);

export const getServerSideProps: GetServerSideProps<HomePageProps> =
  async () => {
    return {
      props: await fetchData(),
    };
  };
