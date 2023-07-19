import { vi } from "vitest"
import { fireEvent, screen } from "@testing-library/react"
import { ModalContextStructure, ModalTypes } from "../../../contexts/types"
import { boardDetails, mockModalContext } from "../../../testUtils/mocks"
import renderWithProviders from "../../../testUtils/renderWithProviders"
import AddBoardForm from "./AddBoardForm"
import { Board, Column } from "../../../types"

const modalContext: Partial<ModalContextStructure> = {
  hideModal: vi.fn(),
  modalType: ModalTypes.AddBoard,
}

beforeEach(() => {
  mockModalContext(modalContext)
})

afterEach(() => {
  vi.resetAllMocks()
})

const setup = () => renderWithProviders(<AddBoardForm />)

describe("Given an <AddBoardForm /> component", () => {
  describe("When it renders", () => {
    test("It should show 'Add new board' heading", () => {
      setup()

      const heading = screen.getByRole("heading", { name: "Add new board" })

      expect(heading).toBeInTheDocument()
    })
  })

  describe("When we set board name to 'Example board', add three columns and press 'Save changes button'", () => {
    test("It should add a new board with 'Example board' board name, with three subtasks and close modal", () => {
      const { store } = setup()

      fireEvent.change(screen.getByLabelText("board name"), {
        target: { value: boardDetails.boardName },
      })

      boardDetails.columns.forEach((value) => {
        fireEvent.click(
          screen.getByRole("button", { name: "+ Add new column" }),
        )

        fireEvent.change(screen.getAllByLabelText("column").slice(-1)[0], {
          target: { value },
        })
      })

      fireEvent.click(screen.getByRole("button", { name: "Create new board" }))

      const board = store.getState().boards.slice(-1)[0]

      expect(board).toStrictEqual<Board>({
        name: boardDetails.boardName,
        columns: boardDetails.columns.map(
          (name): Column => ({ name, tasks: [] }),
        ),
      })
    })
  })
})
