import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="antialiased bg-pink-50 bg-opacity-50 h-full min-h-screen">
      <div className="max-w-xl mx-5 sm:mx-auto py-20">
        <section className="mb-12">
          <div className="text-gray-900 text-lg md:text-2xl">
            Vaccination rates
          </div>
          <h1 className="text-gray-900 text-4xl md:text-6xl font-bold">
            Auckland
          </h1>
        </section>
        <section>
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
                      stroke-lineCap="round"
                      stroke-lineJoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>First dose</div>
              </dd>
              <dt className="w-8">90%</dt>
            </div>
            <div className="w-44 flex flex-row justify-between items-center">
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
                  // this breaks figure this out later
                  style={{ animationDelay: "1s" }}
                  // style="animation-delay: 1s"
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
      </div>
    </div>
  );
};

export default Home;
