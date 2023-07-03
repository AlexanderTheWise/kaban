import { useEffect, useMemo, useState } from "react"
import { ChildrenProps } from "../types"
import { ThemeContext } from "../contexts"

export default function ThemeProvider({ children }: ChildrenProps) {
  const [darkModeOn, setDarkModeOn] = useState(
    !!localStorage.getItem("themeMode"),
  )
  const toggleDarkMode = () => {
    setDarkModeOn((prevDarkModeOn) => !prevDarkModeOn)
  }

  const value = useMemo(() => ({ darkModeOn, toggleDarkMode }), [darkModeOn])

  useEffect(() => {
    if (darkModeOn) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("themeMode", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.removeItem("themeMode")
    }
  }, [darkModeOn])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
