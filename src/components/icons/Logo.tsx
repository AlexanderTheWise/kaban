import { useContext } from "react"
import LogoMobile from "../../assets/logo-mobile.svg"
import LogoLight from "../../assets/logo-light.svg"
import LogoDark from "../../assets/logo-dark.svg"
import { ThemeContext } from "../../contexts/contexts"

export default function Logo() {
  const { darkModeOn } = useContext(ThemeContext)

  return (
    <picture>
      <source srcSet={LogoMobile} media="(max-width: 768px)" />
      <img src={darkModeOn ? LogoLight : LogoDark} alt="Logo" />
    </picture>
  )
}
