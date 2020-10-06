import PropTypes from "prop-types"
import { Button, Container } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"

const Layout = ({ preview, children }) => {
  // TODO: Preview is unrequired because of Strapi
  return (
    <>
      {preview ? (
        <Alert
          severity="warning"
          action={
            <Button color="inherit" size="small" href="/api/exit-preview">
              Exit
            </Button>
          }
        >
          <AlertTitle>Warning</AlertTitle>
          {`You are looking the website in — ${(<strong>preview mode</strong>)}.`}
        </Alert>
      ) : null}
      <Container
        component="main"
        maxWidth="md"
        style={{ marginTop: 100, marginBottom: 100 }}
      >
        {children}
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  preview: PropTypes.bool,
}

export default Layout
