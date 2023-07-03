import { useContext } from "react"
import { ThemeContext } from "../../../contexts/contexts"
import Sun from "../../../assets/icon-light-theme.svg"
import Moon from "../../../assets/icon-dark-theme.svg"

export default function ThemeSwitch() {
  const { darkModeOn, toggleDarkMode } = useContext(ThemeContext)

  const handleOnChange = () => {
    toggleDarkMode()
  }

  return (
    <div className="bg-bgPrimary py-3.5 flex justify-center gap-6 rounded-md">
      <img src={Sun} alt="sun" width="20" height="20" />

      <label className="relative inline-block w-10 h-5">
        <input
          aria-label={`Change the theme to ${darkModeOn ? "light" : "dark"}`}
          type="checkbox"
          className="opacity-0 w-0 h-0 peer"
          checked={darkModeOn}
          onChange={handleOnChange}
        />
        <span
          className="absolute rounded-xl cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#635FC7] before:content-[''] 
        before:absolute before:h-3.5 before:w-3.5 before:bg-white before:left-[4px] before:bottom-[3.5px] before:rounded-full 
        before:transition-transform before:peer-checked:translate-x-[18px]"
        ></span>
      </label>

      <img src={Moon} alt="moon" width="20" height="20" />
    </div>
  )
}
