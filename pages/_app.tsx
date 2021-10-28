import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import "../styles/main.scss";

const metaTags = {
  title: "Auckland DHB Vaccination Rates to 90%",
  description:
    "Easily view Auckland's vaccinations to 90% by DHB and the daily progress towards getting out of lockdown.",
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#200133" />
        <title key="title">{metaTags.title}</title>
        <meta
          name="description"
          content={metaTags.description}
          key="description"
        />
        <meta
          property="og:url"
          content="https://outoflockdown.co"
          key="ogUrl"
        />
        <meta property="og:title" content={metaTags.title} key="ogtitle" />
        <meta
          property="og:description"
          content={metaTags.description}
          key="ogdesc"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
