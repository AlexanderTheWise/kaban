import { createContext } from "react"
import { ModalContextStructure, ThemeContextStructure } from "./types"

export const ThemeContext = createContext<ThemeContextStructure>({
  darkModeOn: false,
  toggleDarkMode: () => {},
})

export const ModalContext = createContext<ModalContextStructure>({
  hideModal: () => {},
  showModal: () => {},
  modalType: null,
})
