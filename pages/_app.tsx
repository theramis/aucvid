import type { AppProps } from "next/app";
import Head from "next/head";

import { NewRelicSnippet } from "../app/NewRelicSnippet";
import { NextQueryParamProvider } from "../app/components/NextQueryParamProvider";

import "../app/styles/globals.scss";

const metaTags = {
  title: "Aotearoa New Zealand Vaccination Rates to 90% - outoflockdown.co",
  description:
    "View vaccination rates for each District Health Board (DHB) in New Zealand and track daily progress towards the 90% goal, enabling Kiwis to get out of lockdown.",
  url: "https://outoflockdown.co",
  imageUrl: "https://outoflockdown.co/preview-cover.png",
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#13011e" />

        <title key="title">{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={metaTags.url} />
        <meta property="og:title" content={metaTags.title} />
        <meta property="og:image" content={metaTags.imageUrl} />
        <meta property="og:description" content={metaTags.description} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={metaTags.title} />
        <meta property="twitter:url" content={metaTags.url} />
        <meta property="twitter:description" content={metaTags.description} />
        <meta property="twitter:image" content={metaTags.imageUrl} />
      </Head>
      <NextQueryParamProvider>
        <NewRelicSnippet />
        <Component {...pageProps} />
      </NextQueryParamProvider>
    </>
  );
}

export default MyApp;
