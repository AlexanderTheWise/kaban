import { vi } from "vitest"
import { ModalContextStructure, ModalTypes } from "../../../contexts/types"
import renderWithProviders from "../../../testUtils/renderWithProviders"
import EditBoardForm from "./EditBoardForm"
import { fireEvent, screen } from "@testing-library/react"
import { boardDetails, mockModalContext } from "../../../testUtils/mocks"
import { Column } from "../../../types"

const modalContext: Partial<ModalContextStructure> = {
  hideModal: vi.fn(),
  modalType: ModalTypes.EditBoard,
}
const setup = () => renderWithProviders(<EditBoardForm />)

beforeEach(() => {
  mockModalContext(modalContext)
})

describe("Given an <EditBoardForm /> component", () => {
  describe("When it renders", () => {
    test("It should show 'Edit board' heading", () => {
      setup()

      const heading = screen.getByRole("heading", { name: "Edit board" })

      expect(heading).toBeInTheDocument()
    })

    test("It should show alert 'Already defined' when we write an existing board name in board name input", () => {
      setup()

      const boardNameInput = screen.getByLabelText("board name")

      fireEvent.change(boardNameInput, { target: { value: "Roadmap" } })

      const alert = screen.getByRole("alert", { name: "Already defined" })

      expect(alert).toBeInTheDocument()
    })

    test("It should alert 'Can't be empty' when the board name input is empty", () => {
      setup()

      const boardNameInput = screen.getByLabelText("board name")

      fireEvent.change(boardNameInput, { target: { value: "" } })

      const alert = screen.getByRole("alert", { name: "Can't be empty" })

      expect(alert).toBeInTheDocument()
    })
  })

  describe("When button '+ Add new column' is clicked", () => {
    test("It should add a new column input and alert 'Can't be empty'", () => {
      setup()

      const button = screen.getByRole("button", { name: "+ Add new column" })

      fireEvent.click(button)

      const alertInput = screen.getAllByLabelText("column").slice(-1)[0]
      const alert = screen.getByRole("alert", { name: "Can't be empty" })

      expect(alertInput).not.toHaveValue()
      expect(alert).toBeInTheDocument()
    })
  })

  describe("When we click the delete button of 'Todo' column", () => {
    test("It should delete column input 'Todo'", () => {
      setup()

      expect(screen.getAllByLabelText("column")[0]).toHaveValue("Todo")

      const deleteButton = screen.getByLabelText("Delete item: Todo")

      fireEvent.click(deleteButton)

      expect(screen.getAllByLabelText("column")[0]).not.toHaveValue(
        "Sign up page",
      )
    })
  })

  describe("When we set board name to 'Example board', add 'For Review' column and press 'Save changes button'", () => {
    test("It should change board name to 'Example board', add 'For Review' column and close modal", () => {
      const { store } = setup()

      fireEvent.change(screen.getByLabelText("board name"), {
        target: { value: boardDetails.boardName },
      })

      fireEvent.click(screen.getByRole("button", { name: "+ Add new column" }))

      fireEvent.change(screen.getAllByLabelText("column").splice(-1)[0], {
        target: { value: boardDetails.columns.slice(-1)[0] },
      })

      fireEvent.click(screen.getByRole("button", { name: "Save changes" }))

      const board = store.getState().boards[0]

      expect(board.name).toBe(boardDetails.boardName)
      expect(board.columns.slice(-1)[0]).toStrictEqual<Column>({
        tasks: [],
        name: boardDetails.columns.slice(-1)[0],
      })
    })
  })
})
