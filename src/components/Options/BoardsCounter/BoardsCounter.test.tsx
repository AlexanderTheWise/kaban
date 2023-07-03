import { screen } from "@testing-library/react"
import renderWithProviders from "../../../testUtils/renderWithProviders"
import BoardsCounter from "./BoardsCounter"

const setup = () => renderWithProviders(<BoardsCounter />)

describe("Given a <BoardsCounter /> component", () => {
  describe("When it renders", () => {
    test("It should show a heading with accessible name 'All boards (3)'", () => {
      setup()
      const name = "All boards (3)"

      const heading = screen.getByRole("heading", {
        name,
      })

      expect(heading).toBeInTheDocument()
    })
  })
})
