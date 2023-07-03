import { fireEvent, screen } from "@testing-library/react"
import renderWithProviders from "../../../testUtils/renderWithProviders"
import BoardsNames from "./BoardsNames"

const setup = () => renderWithProviders(<BoardsNames />)

describe("Given a <BoardsNames> component", () => {
  const accesibleNames = ["Platform Launch", "Marketing Plan", "Roadmap"]

  describe("When it renders", () => {
    test("It should show three radios with accessible names 'Platform Launch', 'Marketing Plan' and 'Roadmap'", () => {
      setup()

      const radios = screen.getAllByRole("radio")

      radios.forEach((radio, index) => {
        expect(radio).toHaveAccessibleName(accesibleNames[index])
      })
    })

    test("It should show a checked radio with accessible name 'Platform Launch'", () => {
      setup()

      const radio = screen.getByRole("radio", {
        checked: true,
      })

      expect(radio).toHaveAccessibleName(accesibleNames[0])
    })
  })

  describe("When 'Marketing Plan' radio is clicked", () => {
    test("It should change the checked radio to 'Marketing Plan'", () => {
      setup()

      const radio = screen.getByRole("radio", {
        name: accesibleNames[1],
      })

      expect(radio).not.toBeChecked()

      fireEvent.click(radio)

      expect(radio).toBeChecked()
    })
  })
})
