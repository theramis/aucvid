import { GetServerSideProps, GetServerSidePropsResult } from "next";
import fetchData from "../services/dataFetcher";
import { DhbData } from "../types/DhbData";
import { Progress } from "../components/Progress";
import { CheckIcon } from "@heroicons/react/solid";

export type HomePageProps = {
  waitemata: DhbData;
  auckland: DhbData;
  countiesManukau: DhbData;
  combinedAuckland: DhbData;
  dataUpdatedTime: string;
  lastRetrievedTime: string;
};

const Home: React.FC<HomePageProps> = (props: HomePageProps) => {
  // props is injected, use it however you want
  console.log(props);

  return (
    <div className="antialiased bg-pink-50 bg-opacity-50 h-full min-h-screen">
      <div className="max-w-[600px] mx-5 sm:mx-auto py-20">
        <section className="mb-12">
          <div className="text-gray-900 text-lg md:text-2xl">
            Vaccination rates
          </div>
          <h1 className="text-gray-900 text-4xl md:text-6xl font-bold">
            Auckland
          </h1>
        </section>
        <section className="mb-8">
          <h2 className="text-gray-900 text-lg md:text-2xl font-semibold mb-2">
            Combined Auckland DHBs
          </h2>
          <dl className="mb-6">
            <div
              className="
                w-44
                flex flex-row
                justify-between
                items-center
                text-green-500 text-lg
              "
            >
              <dd className="w-32 flex items-center space-x-3">
                <div
                  className="
                    w-5
                    h-5
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-green-300
                    text-green-700
                  "
                >
                  <CheckIcon className="h-4 w-4" />
                </div>
                <div>First dose</div>
              </dd>
              <dt className="w-8">90%</dt>
            </div>
            <div className="w-44 flex flex-row justify-between items-center text-lg">
              <dd className="w-32">Second dose</dd>
              <dt className="w-8">76%</dt>
            </div>
          </dl>
          <Progress
            firstDose={90}
            secondDose={76}
            size="large"
            color="purple"
          />
        </section>

        <section>
          <div className="bg-white rounded-xl p-6 space-y-6">
            <div>
              <h3 className="text-gray-900 text-lg md:text-2xl font-semibold mb-2">
                Waitemata
              </h3>
              <dl className="mb-6">
                <div
                  className="
                    w-full
                    grid grid-cols-12
                    text-md sm:text-lg
                  "
                >
                  <dd className="col-span-4 md:col-span-3 flex items-center space-x-3">
                    <div
                      className="
                        w-4 md:w-5
                        h-4 md:h-5
                        flex
                        items-center
                        justify-center
                        rounded-full
                        bg-green-300
                        text-green-700
                      "
                    >
                      <CheckIcon className="h-3 w-4 md:h-4 md:w-4" />
                    </div>
                    <div className="text-green-500">First dose</div>
                  </dd>
                  <dt className="col-span-1 text-green-500">90%</dt>
                  <dt className="col-span-7 md:col-span-8 text-right">
                    <strong>0</strong> left
                  </dt>
                </div>
                <div className="w-full grid grid-cols-12 text-md sm:text-lg">
                  <dd className="col-span-4 md:col-span-3">Second dose</dd>
                  <dt className="col-span-1">76%</dt>
                  <dt className="col-span-7 md:col-span-8 text-right">
                    <strong>71,486</strong> left
                  </dt>
                </div>
              </dl>
              <Progress firstDose={90} secondDose={76} />
            </div>
            <div>
              <h3 className="text-gray-900 text-lg md:text-2xl font-semibold mb-2">
                Auckland
              </h3>
              <dl className="mb-6">
                <div
                  className="
                    w-full
                    grid grid-cols-12
                    text-md sm:text-lg
                  "
                >
                  <dd className="col-span-4 md:col-span-3 flex items-center space-x-3">
                    <div
                      className="
                        w-4 md:w-5
                        h-4 md:h-5
                        flex
                        items-center
                        justify-center
                        rounded-full
                        bg-green-300
                        text-green-700
                      "
                    >
                      <CheckIcon className="h-3 w-4 md:h-4 md:w-4" />
                    </div>
                    <div className="text-green-500">First dose</div>
                  </dd>
                  <dt className="col-span-1 text-green-500">93%</dt>
                  <dt className="col-span-7 md:col-span-8 text-right">
                    <strong>0</strong> left
                  </dt>
                </div>
                <div className="w-full grid grid-cols-12 text-md md:text-lg">
                  <dd className="col-span-4 md:col-span-3">Second dose</dd>
                  <dt className="col-span-1">81%</dt>
                  <dt className="col-span-7 md:col-span-8 text-right">
                    <strong>38,916</strong> left
                  </dt>
                </div>
              </dl>
              <Progress firstDose={93} secondDose={81} />
            </div>
            <div>
              <h3 className="text-gray-900 text-lg md:text-2xl font-semibold mb-2">
                Counties Manukau
              </h3>
              <dl className="mb-6">
                <div className="w-full grid grid-cols-12 text-md md:text-lg">
                  <dd className="col-span-4 md:col-span-3">First dose</dd>
                  <dt className="col-span-1">88%</dt>
                  <dt className="col-span-7 md:col-span-8 text-right">
                    <strong>11,728</strong> left
                  </dt>
                </div>
                <div className="w-full grid grid-cols-12 text-md md:text-lg">
                  <dd className="col-span-4 md:col-span-3">Second dose</dd>
                  <dt className="col-span-1">73%</dt>
                  <dt className="col-span-7 md:col-span-8 text-right">
                    <strong>80,400</strong> left
                  </dt>
                </div>
              </dl>
              <Progress firstDose={88} secondDose={73} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=3600"
  );

  return {
    props: await fetchData(),
  };
};
