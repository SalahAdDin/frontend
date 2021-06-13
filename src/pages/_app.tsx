import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { menuLinks } from "domain/constants";
import { INavLink } from "domain/dto/common.dto";
import { appWithTranslation } from "next-i18next";
import App, { AppContext, AppProps, NextWebVitalsMetric } from "next/app";
import Footer from "presentation/components/footer";
import Meta from "presentation/components/meta";
import Nav from "presentation/components/nav";
import theme from "presentation/styles/theme";
import React from "react";

export const cache = createCache({ key: "css", prepend: true });

export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (process.env.NODE_ENV === "development") console.log(metric);
}

interface Props extends AppProps {
  // title: string;
  navLinks: [INavLink];
}

const FolioApp = ({ Component, pageProps, navLinks }: Props) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={cache}>
      <Meta />
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Nav navLinks={navLinks} />
        <Component {...pageProps} />
        <Footer navLinks={navLinks} />
      </ThemeProvider>
    </CacheProvider>
  );
};

FolioApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const navLinks = await getPageTitlesBySlugSet(
    menuLinks.map(({ label }) => label)
  );

  return { ...appProps, navLinks };
};

export default appWithTranslation(FolioApp);
