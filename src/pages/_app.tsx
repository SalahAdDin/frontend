import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { appWithTranslation } from "next-i18next";
import type { AppContext, AppProps, NextWebVitalsMetric } from "next/app";
import App from "next/app";
import React from "react";

import { menuLinks } from "domain/constants";
import type { IMenuLink, INavLink } from "domain/dto/common.dto";
import Footer from "presentation/components/footer";
import Meta from "presentation/components/meta";
import Nav from "presentation/components/nav";
import theme from "presentation/styles/theme";

const cache = createCache({ key: "css", prepend: true });
cache.compat = true;

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  if (process.env.NODE_ENV === "development") console.log(metric);
}

interface Props extends AppProps {
  // title: string;
  navLinks: INavLink[];
}

const FolioApp = ({ Component, pageProps, navLinks }: Props) => {
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

  const navLinks: INavLink[] = await getPageTitlesBySlugSet(
    menuLinks.map(({ label }: IMenuLink) => label)
  );

  return { ...appProps, navLinks };
};

export default appWithTranslation(FolioApp);
