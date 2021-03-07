import PropTypes from "prop-types";
import { Button, Container } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Trans, useTranslation } from "next-i18next";

const Layout = ({ preview, children }) => {
  const { t } = useTranslation();
  return (
    <>
      <Container
        component="main"
        maxWidth="md"
        style={{ marginTop: 100, marginBottom: 100 }}
      >
        {preview ? (
          <Alert
            severity="warning"
            action={
              <Button color="inherit" size="small" href="/api/exit-preview">
                {t("exit")}
              </Button>
            }
            style={{ marginBottom: 20 }}
          >
            <AlertTitle>{t("alert.preview-mode.title")}</AlertTitle>
            <Trans i18nKey="alert.preview-mode.message">
              You are looking the website in — <strong>preview mode</strong>.
            </Trans>
          </Alert>
        ) : null}
        {children}
      </Container>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  preview: PropTypes.bool,
};

export default Layout;
