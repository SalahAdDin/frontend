import PropTypes from "prop-types"
import { Button, Container } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import Footer from "./footer"
import Nav from "./nav"

const Layout = ({ preview, children }) => {
  return (
    <>
      <Nav />
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
          You are looking the website in — <strong>preview mode</strong>.
        </Alert>
      ) : (
        ""
      )}
      <Container component="main" maxWidth="md">
        {children}
      </Container>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  preview: PropTypes.bool,
}

export default Layout
