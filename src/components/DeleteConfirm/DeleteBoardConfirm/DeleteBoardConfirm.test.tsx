import { fireEvent, screen } from "@testing-library/react"
import renderWithProviders from "../../../testUtils/renderWithProviders"
import DeleteBoardConfirm from "./DeleteBoardConfirm"
import { ModalContextStructure } from "../../../contexts/types"
import { vi } from "vitest"
import { mockModalContext } from "../../../testUtils/mocks"

const modalContext: Partial<ModalContextStructure> = {
  hideModal: vi.fn(),
}

const setup = () => renderWithProviders(<DeleteBoardConfirm />)

beforeEach(() => {
  mockModalContext(modalContext)
})

describe("Given a <DeleteBoardConfirm />", () => {
  describe("When it renders", () => {
    test("It should show 'Delete this board?' heading", () => {
      setup()

      const heading = screen.getByRole("heading", {
        name: "Delete this board?",
      })

      expect(heading).toBeInTheDocument()
    })

    test("It should show a paragrah asking the user if he wants to delete 'Platform Launch' board", () => {
      setup()

      const paragraph = screen.getByText(
        "Are you sure you want to delete the 'Platform Launch' board? This action will remove all columns and tasks and cannot be reversed.",
      )

      expect(paragraph).toBeInTheDocument()
    })
  })

  describe("When cancel button is clicked", () => {
    test("It should close the modal", () => {
      setup()

      const cancelButton = screen.getByRole("button", {
        name: "Cancel",
      })

      fireEvent.click(cancelButton)

      expect(modalContext.hideModal).toHaveBeenCalled()
      vi.resetAllMocks()
    })
  })

  describe("When delete button is clicked", () => {
    test("It should delete the current board and close the modal", () => {
      const { store } = setup()
      const name = store.getState().currentBoard

      const deleteButton = screen.getByRole("button", { name: "Delete" })

      fireEvent.click(deleteButton)

      expect(store.getState().boards).not.toContainEqual(
        expect.objectContaining({ name }),
      )

      expect(store.getState().currentBoard).toBe(
        store.getState().boards[0].name,
      )

      expect(modalContext.hideModal).toHaveBeenCalled()
    })
  })
})
