import renderWithProviders from "../../../testUtils/renderWithProviders"
import DeleteTaskConfirm from "./DeleteTaskConfirm"
import { mockModalContext } from "../../../testUtils/mocks"
import { ModalContextStructure, ModalTypes } from "../../../contexts/types"
import { fireEvent, screen } from "@testing-library/react"
import { vi } from "vitest"
import { getAllCoordenates } from "../../../redux/features/boards/boardsSelectors"

const modalContext: Partial<ModalContextStructure> = {
  hideModal: vi.fn(),
  modalType: ModalTypes.DeleteTask,
}

const coordenates = ["Todo", "Build UI for onboarding flow"]

const setup = () =>
  renderWithProviders(<DeleteTaskConfirm coordenates={coordenates} />)

beforeEach(() => {
  mockModalContext(modalContext)
})

describe("Given a <DeleteTaskConfirm /> component", () => {
  describe("When it renders", () => {
    test("It should show 'Delete this task' heading", () => {
      setup()

      const heading = screen.getByRole("heading", {
        name: "Delete this task?",
      })

      expect(heading).toBeInTheDocument()
    })

    test("It should show a paragrah asking the user if he wants to delete 'Build UI for onboarding flow' task", () => {
      setup()

      const paragraph = screen.getByText(
        "Are you sure you want to delete the 'Build UI for onboarding flow' task and its subtasks? This action cannot be reversed.",
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
    })
  })

  describe("When delete button is clicked", () => {
    test("It should delete the task and close the modal", () => {
      const { store } = setup()

      const deleteButton = screen.getByRole("button", {
        name: "Delete",
      })

      vi.resetAllMocks()

      fireEvent.click(deleteButton)

      const { task } = getAllCoordenates(store.getState(), coordenates)

      expect(task).toBeUndefined()
      expect(modalContext.hideModal).toHaveBeenCalled()
    })
  })
})
