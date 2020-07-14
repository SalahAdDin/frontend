import React from "react"
import Link from "next/link"
import { FormControl, Select, MenuItem } from "@material-ui/core"
import { useTranslation } from "react-i18next"

const links = [
  { href: "https://zeit.co/now", label: "ZEIT" },
  { href: "https://github.com/zeit/next.js", label: "GitHub" },
].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = () => {
  const { i18n } = useTranslation()

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value)
  }

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        {links.map(({ key, href, label }) => (
          <li key={key}>
            <a href={href}>{label}</a>
          </li>
        ))}
        <FormControl variant="outlined">
          <Select value={i18n.language} onChange={handleLanguageChange}>
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="tr">TR</MenuItem>
            <MenuItem value="es">ES</MenuItem>
          </Select>
        </FormControl>
      </ul>

      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
            Helvetica, sans-serif;
        }
        nav {
          text-align: center;
        }
        ul {
          display: flex;
          justify-content: space-between;
        }
        nav > ul {
          padding: 4px 16px;
        }
        li {
          display: flex;
          padding: 6px 8px;
        }
        a {
          color: #067df7;
          text-decoration: none;
          font-size: 13px;
        }
      `}</style>
    </nav>
  )
}

export default Nav
