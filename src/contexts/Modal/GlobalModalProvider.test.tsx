import { vi } from "vitest"
import { useContext } from "react"
import { fireEvent, screen } from "@testing-library/react"
import renderWithProviders from "../../testUtils/renderWithProviders"
import { ModalContext } from "../contexts"
import { ModalTypes } from "../types"

const TestComponent = () => {
  const { showModal } = useContext(ModalContext)

  const handleOnClick = () => {
    showModal(ModalTypes.Options, {})
  }

  return <button onClick={handleOnClick}></button>
}

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn()
  HTMLDialogElement.prototype.close = vi.fn()
})

const setup = () => renderWithProviders(<TestComponent />)

describe("Given <GlobalModalProvider>", () => {
  describe("When it renders with TestComponent as a child", () => {
    test("It should render options modal if the button is clicked", async () => {
      setup()

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()

      fireEvent.click(screen.getByRole("button"))

      expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument()
    })
  })

  describe("When one of the options from the options modal is clicked", () => {
    test("It should close the options modal", () => {
      setup()

      fireEvent.click(screen.getByRole("button"))

      expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument()

      window.innerWidth = 767

      fireEvent.click(
        screen.getByRole("radio", { name: "Roadmap", hidden: true }),
      )

      expect(
        screen.queryByRole("dialog", { hidden: true }),
      ).not.toBeInTheDocument()
    })
  })
})
