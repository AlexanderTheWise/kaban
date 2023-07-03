import { useContext } from "react"
import { ThemeContext } from "../contexts"
import { fireEvent, render, screen } from "@testing-library/react"
import ThemeProvider from "./ThemeProvider"

const TestComponent = () => {
  const { darkModeOn, toggleDarkMode } = useContext(ThemeContext)

  return (
    <button onClick={toggleDarkMode}>
      Set theme to {darkModeOn ? "light" : "dark"}
    </button>
  )
}

const setup = () =>
  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>,
  )

describe("Given a <ThemeProvider>", () => {
  describe("When it renders with TestComponent as child component", () => {
    test("It should show a button with text 'Set theme to dark'", () => {
      setup()

      const button = screen.getByRole("button", {
        name: "Set theme to dark",
      })

      expect(button).toBeInTheDocument()
    })

    test("It should change text to 'Set theme to light' when the button is clicked", () => {
      setup()

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(button).toHaveAccessibleName("Set theme to light")
    })
  })
})
