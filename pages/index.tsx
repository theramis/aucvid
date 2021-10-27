import { GetServerSideProps } from "next";
import { CheckIcon } from "@heroicons/react/solid";

import fetchData from "../services/dataFetcher";
import { DhbData } from "../types/DhbData";
import { Progress } from "../components/Progress";
import hoursBeforeNow from "../utilities/hoursBeforeNow";
import { numberFormatter } from "../utilities/numberFormatter";

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
          <h3 className="heading-3 mb-3">Combined Auckland DHBs</h3>
          <dl className="mb-6">
            <div
              className="
                data-text
                data-text-complete
                w-44
                flex flex-row
                justify-between
                items-center
              "
            >
              <dd className="w-32 flex items-center space-x-2">
                <div
                  className="
                    w-4
                    h-4
                    flex
                    items-center
                    justify-center
                    rounded-full
                    check
                  "
                >
                  <CheckIcon className="h-4 w-4" />
                </div>
                <div>First dose</div>
              </dd>
              <dt className="w-8">
                {combinedAuckland.firstDosesPercentage * 100}%
              </dt>
            </div>
            <div className="data-text w-44 flex flex-row justify-between items-center text-lg">
              <dd className="w-32">Second dose</dd>
              <dt className="w-8">
                {combinedAuckland.secondDosesPercentage * 100}%
              </dt>
            </div>
          </dl>
          <Progress
            firstDose={combinedAuckland.firstDosesPercentage * 100}
            secondDose={combinedAuckland.secondDosesPercentage * 100}
            size="large"
            color="purple"
          />
        </Container>
      </section>
      <section>
        <Container>
          <div className="container-data rounded-xl p-6 space-y-6">
            <div>
              <h3 className="heading-3 mb-2">Waitemata</h3>
              <dl className="mb-4">
                <div
                  className="
                    w-full
                    grid grid-cols-12
                    data-text
                  "
                >
                  <dd className="col-span-5 sm:col-span-4 md:col-span-3 flex items-center space-x-2">
                    <div
                      className="
                        w-4
                        h-4
                        flex
                        items-center
                        justify-center
                        rounded-full
                        check
                      "
                    >
                      <CheckIcon className="h-3 w-4 md:h-4 md:w-4" />
                    </div>
                    <div className="data-text data-text-complete">
                      First dose
                    </div>
                  </dd>
                  <dt className="col-span-1 data-text data-text-complete">
                    {waitemata.firstDosesPercentage * 100}%
                  </dt>
                  <dt className="col-span-6 sm:col-span-7 md:col-span-8 text-right">
                    <strong>
                      {numberFormatter.format(
                        waitemata.numOfFirstDosesTo90Percent
                      )}
                    </strong>{" "}
                    left
                  </dt>
                </div>
                <div className="w-full grid grid-cols-12 data-text">
                  <dd className="col-span-5 sm:col-span-4 md:col-span-3">
                    Second dose
                  </dd>
                  <dt className="col-span-1">
                    {waitemata.secondDosesPercentage * 100}%
                  </dt>
                  <dt className="col-span-6 sm:col-span-7 md:col-span-8 text-right">
                    <strong>
                      {numberFormatter.format(
                        waitemata.numOfSecondDosesTo90Percent
                      )}
                    </strong>{" "}
                    left
                  </dt>
                </div>
              </dl>
              <Progress
                firstDose={waitemata.firstDosesPercentage * 100}
                secondDose={waitemata.secondDosesPercentage * 100}
              />
            </div>
            <div>
              <h3 className="heading-3 mb-2">Auckland</h3>
              <dl className="mb-4">
                <div
                  className="
                    w-full
                    grid grid-cols-12
                    data-text
                  "
                >
                  <dd className="col-span-5 sm:col-span-4 md:col-span-3 flex items-center space-x-2">
                    <div
                      className="
                        w-4
                        h-4
                        flex
                        items-center
                        justify-center
                        rounded-full
                        check
                      "
                    >
                      <CheckIcon className="h-3 w-4 md:h-4 md:w-4" />
                    </div>
                    <div className="data-text data-text-complete">
                      First dose
                    </div>
                  </dd>
                  <dt className="col-span-1 data-text data-text-complete">
                    {auckland.firstDosesPercentage * 100}%
                  </dt>
                  <dt className="col-span-6 sm:col-span-7 md:col-span-8 text-right">
                    <strong>
                      {numberFormatter.format(
                        auckland.numOfFirstDosesTo90Percent
                      )}
                    </strong>{" "}
                    left
                  </dt>
                </div>
                <div className="w-full grid grid-cols-12 data-text">
                  <dd className="col-span-5 sm:col-span-4 md:col-span-3">
                    Second dose
                  </dd>
                  <dt className="col-span-1">
                    {auckland.secondDosesPercentage * 100}%
                  </dt>
                  <dt className="col-span-6 sm:col-span-7 md:col-span-8 text-right">
                    <strong>
                      {numberFormatter.format(
                        auckland.numOfSecondDosesTo90Percent
                      )}
                    </strong>{" "}
                    left
                  </dt>
                </div>
              </dl>
              <Progress
                firstDose={auckland.firstDosesPercentage * 100}
                secondDose={auckland.secondDosesPercentage * 100}
              />
            </div>
            <div>
              <h3 className="heading-3 mb-2">Counties Manukau</h3>
              <dl className="mb-4">
                <div className="w-full grid grid-cols-12 data-text">
                  <dd className="col-span-5 sm:col-span-4 md:col-span-3">
                    First dose
                  </dd>
                  <dt className="col-span-1">
                    {countiesManukau.firstDosesPercentage * 100}%
                  </dt>
                  <dt className="col-span-6 sm:col-span-7 md:col-span-8 text-right">
                    <strong>
                      {numberFormatter.format(
                        countiesManukau.numOfFirstDosesTo90Percent
                      )}
                    </strong>{" "}
                    left
                  </dt>
                </div>
                <div className="w-full grid grid-cols-12 data-text">
                  <dd className="col-span-5 sm:col-span-4 md:col-span-3">
                    Second dose
                  </dd>
                  <dt className="col-span-1">
                    {countiesManukau.secondDosesPercentage * 100}%
                  </dt>
                  <dt className="col-span-6 sm:col-span-7 md:col-span-8 text-right">
                    <strong>
                      {numberFormatter.format(
                        countiesManukau.numOfSecondDosesTo90Percent
                      )}
                    </strong>{" "}
                    left
                  </dt>
                </div>
              </dl>
              <Progress
                firstDose={countiesManukau.firstDosesPercentage * 100}
                secondDose={countiesManukau.secondDosesPercentage * 100}
              />
            </div>
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
