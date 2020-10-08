import { Button, Typography } from "@material-ui/core"
import { useTranslation } from "../i18n"
import Layout from "components/layout"
import SEO from "components/seo"
import Title from "components/fields/title"
import useStyles from "styles/common"

const Folio404 = () => {
  const classes = useStyles()
  const { t } = useTranslation()

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
  )
}

export default Folio404
