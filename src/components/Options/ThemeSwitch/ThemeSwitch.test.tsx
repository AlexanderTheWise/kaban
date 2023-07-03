import { fireEvent, screen } from "@testing-library/react"
import renderWithProviders from "../../../testUtils/renderWithProviders"
import ThemeSwitch from "./ThemeSwitch"

const setup = () => renderWithProviders(<ThemeSwitch />)

describe("Given a <ThemeSwitch> component", () => {
  describe("When it renders", () => {
    test("It should show a toggle with accessible name 'Change the theme to dark'", () => {
      setup()

      const toggle = screen.getByRole("checkbox", {
        name: "Change the theme to dark",
      })

      expect(toggle).toBeInTheDocument()
    })
  })

  describe("When the toggle is clicked", () => {
    test("It should change its accessible name to 'Change the theme to light'", async () => {
      setup()
      const expectedAccessibleName = "Change the theme to light"

      const toggle = screen.getByRole("checkbox")
      fireEvent.click(toggle)

      expect(toggle).toHaveAccessibleName(expectedAccessibleName)
    })
  })
})
