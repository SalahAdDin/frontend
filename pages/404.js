import { Button, Typography } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import Layout from "components/layout";
import SEO from "components/seo";
import Title from "components/fields/title";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useStyles from "styles/common";
import { getPageBySlug } from "../lib/api/pages";

const Folio404 = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Layout>
      <SEO
        description={t("error.404.title", 404)}
        title={{ title_es: "Error 404", title_tr: "Hata 404" }}
        title_en="404 Error"
      />
      <div className={classes.errorPage}>
        <Title title_en={t("error.404.title", { statusCode: 404 })} title={{}} />
        <Typography variant="body1" component="p" align="center">
          {t("error.404.disclaimer")}
        </Typography>
        <Button href="/" variant="contained" color="primary">
          {t("home")}
        </Button>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60,
  };
}

export default Folio404;
