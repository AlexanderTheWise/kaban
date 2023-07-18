import { vi } from "vitest"
import { ModalContextStructure, ModalTypes } from "../../../contexts/types"
import renderWithProviders from "../../../testUtils/renderWithProviders"
import CreateTaskForm from "./CreateTaskForm"
import { mockModalContext, taskDetails } from "../../../testUtils/mocks"
import { fireEvent, screen } from "@testing-library/react"
import { getAllCoordenates } from "../../../redux/features/boards/boardsSelectors"
import { Subtask, Task } from "../../../types"

const modalContext: Partial<ModalContextStructure> = {
  hideModal: vi.fn(),
  modalType: ModalTypes.CreateTask,
}

const setup = () => renderWithProviders(<CreateTaskForm />)

beforeEach(() => {
  mockModalContext(modalContext)
})

afterEach(() => {
  vi.resetAllMocks()
})

describe("Given a <CreateTaskForm /> component", () => {
  describe("When it renders", () => {
    test("It should show 'Add new task' heading", () => {
      setup()

      const heading = screen.getByRole("heading", { name: "Add new task" })

      expect(heading).toBeInTheDocument()
    })
  })

  describe("When we type an already defined task title on title input", () => {
    test("It should show an alert 'Already defined'", () => {
      setup()

      const titleInput = screen.getByLabelText("title")

      fireEvent.change(titleInput, {
        target: { value: "Build UI for onboarding flow" },
      })

      const alert = screen.getByRole("alert", { name: "Already defined" })

      expect(alert).toBeInTheDocument()
    })
  })

  describe("When title is set to 'Build UI for user', description to 'User is handsome' and add 3 subtasks", () => {
    test("It should add a new task to 'Todo' column with that info and close modal", () => {
      const { store } = setup()
      const addSubtaskButton = screen.getByRole("button", {
        name: "+ Add new subtask",
      })
      const createTaskButton = screen.getByRole("button", {
        name: "Create task",
      })

      fireEvent.change(screen.getByLabelText("title"), {
        target: { value: taskDetails.title },
      })

      fireEvent.change(screen.getByLabelText("Description"), {
        target: { value: taskDetails.description },
      })

      taskDetails.subtasks.forEach((value) => {
        fireEvent.click(addSubtaskButton)

        fireEvent.change(screen.getAllByLabelText("subtask").slice(-1)[0], {
          target: { value },
        })
      })

      fireEvent.click(createTaskButton)

      const task = getAllCoordenates(store.getState(), [
        "Todo",
        taskDetails.title,
      ]).task!

      expect(task).toStrictEqual<Task>({
        ...taskDetails,
        subtasks: taskDetails.subtasks.map(
          (title): Subtask => ({ title, isCompleted: false }),
        ),
      })

      expect(modalContext.hideModal).toHaveBeenCalled()
    })
  })
})
