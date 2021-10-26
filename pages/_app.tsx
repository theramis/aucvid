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
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
