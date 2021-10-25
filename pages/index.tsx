import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import fetchData from "../services/dataFetcher";

const Home: NextPage = (data) => {
  // data is injected, use it however you want
  console.log(data);

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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-src="https://heroicons.com/"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
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
          <div className="w-full flex">
            <div
              className="
                w-full
                relative
                h-12
                bg-purple-300
                rounded-lg
                animate-fade-in
              "
            >
              <div className="absolute inset-0 h-full w-[90%]">
                <div
                  className="
                    bg-purple-400
                    h-full
                    rounded-lg
                    overflow-hidden
                    animate-grow-width
                  "
                ></div>
              </div>
              <div className="absolute inset-0 h-full w-[76%]">
                <div
                  className="
                    bg-purple-500
                    h-full
                    rounded-lg
                    overflow-hidden
                    animate-grow-width
                  "
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>
              <div
                className="
                  absolute
                  top-0
                  left-[90%]
                  bottom-0
                  border-dashed border-black border-r-2
                "
              ></div>
            </div>
          </div>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-4 md:h-4 md:w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
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
              <div className="w-full flex">
                <div
                  className="
                    relative
                    w-full
                    h-6
                    bg-yellow-200
                    rounded-md
                    animate-fade-in
                  "
                >
                  <div className="absolute inset-0 h-full w-[90%]">
                    <div
                      className="
                        bg-yellow-500
                        h-full
                        rounded-md
                        overflow-hidden
                        animate-grow-width
                      "
                    ></div>
                  </div>
                  <div className="absolute inset-0 h-full w-[76%]">
                    <div
                      className="
                        bg-yellow-600
                        h-full
                        rounded-md
                        overflow-hidden
                        animate-grow-width
                      "
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                  <div
                    className="
                      absolute
                      top-0
                      left-[90%]
                      bottom-0
                      border-dashed border-black border-r-2
                    "
                  ></div>
                </div>
              </div>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-4 md:h-4 md:w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
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
              <div className="w-full flex">
                <div
                  className="
                    relative
                    w-full
                    h-6
                    bg-yellow-200
                    rounded-md
                    animate-fade-in
                  "
                >
                  <div className="absolute inset-0 h-full w-[93%]">
                    <div
                      className="
                        bg-yellow-500
                        h-full
                        rounded-md
                        overflow-hidden
                        animate-grow-width
                      "
                    ></div>
                  </div>
                  <div className="absolute inset-0 h-full w-[81%]">
                    <div
                      className="
                        bg-yellow-600
                        h-full
                        rounded-md
                        overflow-hidden
                        animate-grow-width
                      "
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                  <div
                    className="
                      absolute
                      top-0
                      left-[90%]
                      bottom-0
                      border-dashed border-black border-r-2
                    "
                  ></div>
                </div>
              </div>
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
              <div className="w-full flex">
                <div
                  className="
                    relative
                    w-full
                    h-6
                    bg-yellow-200
                    rounded-md
                    animate-fade-in
                  "
                >
                  <div className="absolute inset-0 h-full w-[88%]">
                    <div
                      className="
                        bg-yellow-500
                        h-full
                        rounded-md
                        overflow-hidden
                        animate-grow-width
                      "
                    ></div>
                  </div>
                  <div className="absolute inset-0 h-full w-[73%]">
                    <div
                      className="
                        bg-yellow-600
                        h-full
                        rounded-md
                        overflow-hidden
                        animate-grow-width
                      "
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                  <div
                    className="
                      absolute
                      top-0
                      left-[90%]
                      bottom-0
                      border-dashed border-black border-r-2
                    "
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=3600"
  );

  return {
    props: {
      data: await fetchData(),
    },
  };
};
