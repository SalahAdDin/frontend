import PropTypes from "prop-types"
import { Container } from "@material-ui/core"
import Footer from "./footer"
import Nav from "./nav"

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <Container>{children}</Container>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.object,
}

export default Layout
