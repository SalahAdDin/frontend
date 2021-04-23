import { Button, Typography } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import Title from "components/fields/title";
import Layout from "components/layout";
import useStyles from "styles/common";

const Error = ({ statusCode }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Layout>
      <div className={classes.errorPage}>
        <Title
          title_en={t(`error.${statusCode}.title`, { statusCode })}
          title={{}}
        />
        <Typography variant="body1" component="p" align="center">
          {statusCode
            ? t("error.status.with", { statusCode })
            : t("error.status.without")}
        </Typography>
        <Button href="/" variant="contained" color="primary">
          {t("home")}
        </Button>
      </div>
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {
    statusCode,
  };
};

Error.propTypes = {
  statusCode: PropTypes.number,
};

export default Error;
