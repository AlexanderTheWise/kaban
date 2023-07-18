import { vi } from "vitest"
import { ModalContextStructure, ModalTypes } from "../../../contexts/types"
import renderWithProviders from "../../../testUtils/renderWithProviders"
import EditTaskForm from "./EditTaskForm"
import { mockModalContext, taskDetails } from "../../../testUtils/mocks"
import { fireEvent, screen } from "@testing-library/react"
import {
  getAllCoordenates,
  getCurrentBoard,
} from "../../../redux/features/boards/boardsSelectors"
import { Subtask, Task } from "../../../types"

const modalContext: Partial<ModalContextStructure> = {
  hideModal: vi.fn(),
  modalType: ModalTypes.EditTask,
}
const coordenates = ["Todo", "Build UI for onboarding flow"]

const setup = () => renderWithProviders(<EditTaskForm {...{ coordenates }} />)

beforeEach(() => {
  mockModalContext(modalContext)
})

afterEach(() => {
  vi.resetAllMocks()
})

describe("Given an <EditTaskForm /> component", () => {
  describe("When it renders", () => {
    test("It should show a 'Edit task' heading", () => {
      setup()

      const heading = screen.getByRole("heading", { name: "Edit task" })

      expect(heading).toBeInTheDocument()
    })

    test("It should show alert 'Already defined' when we write an existing task title in title input", () => {
      setup()

      const titleInput = screen.getByLabelText("title")

      fireEvent.change(titleInput, {
        target: { value: "Build UI for search" },
      })

      const alert = screen.getByRole("alert", { name: "Already defined" })

      expect(alert).toBeInTheDocument()
    })

    test("It should show alert 'Can't be empty' when the input is empty", () => {
      setup()

      const titleInput = screen.getByLabelText("title")

      fireEvent.change(titleInput, {
        target: { value: "" },
      })

      const alert = screen.getByRole("alert", { name: "Can't be empty" })

      expect(alert).toBeInTheDocument()
    })
  })

  describe("When button '+ Add new subtask' is clicked", () => {
    test("It should show a new subtask input and alert 'Can't be empty'", () => {
      setup()

      const button = screen.getByRole("button", { name: "+ Add new subtask" })

      fireEvent.click(button)

      const subtaskInput = screen.getAllByLabelText("subtask").slice(-1)[0]
      const alert = screen.getByRole("alert", { name: "Can't be empty" })

      expect(subtaskInput).not.toHaveValue()
      expect(alert).toBeInTheDocument()
    })

    test("It should show alert 'Already defined' when we type a title that is already defined in another subtask input", () => {
      setup()

      const button = screen.getByRole("button", { name: "+ Add new subtask" })
      fireEvent.click(button)

      const subtaskInput = screen.getAllByLabelText("subtask").slice(-1)[0]

      fireEvent.change(subtaskInput, { target: { value: "Sign up page" } })

      const alert = screen.getByRole("alert", { name: "Already defined" })

      expect(alert).toBeInTheDocument()
    })
  })

  describe("When we click the delete button of 'Sign up page' subtask", () => {
    test("It should delete subtask input 'Sign up page'", async () => {
      setup()

      expect(screen.getAllByLabelText("subtask")[0]).toHaveValue("Sign up page")

      const deleteButton = screen.getByLabelText("Delete task: Sign up page")

      fireEvent.click(deleteButton)

      expect(screen.getAllByLabelText("subtask")[0]).not.toHaveValue(
        "Sign up page",
      )
    })
  })

  describe("When we click the status select", () => {
    test("It should expand a dropdown with the columns", () => {
      const { store } = setup()
      const { columns } = getCurrentBoard(store.getState())

      columns.forEach(({ name }) => {
        expect(screen.queryByRole("button", { name })).toBeNull()
      })

      const statusSelect = screen.getByLabelText("status: Todo")

      fireEvent.click(statusSelect)

      columns.forEach(({ name }) => {
        expect(screen.getByRole("button", { name })).toBeInTheDocument()
      })
    })

    test("It should select 'Done' status when clicking 'Done' option button", () => {
      setup()

      const statusSelect = screen.getByLabelText("status: Todo")

      fireEvent.click(statusSelect)

      const doneStatus = screen.getByRole("button", { name: "Done" })

      fireEvent.click(doneStatus)

      expect(statusSelect).toHaveAccessibleName("status: Done")
    })
  })

  describe("When title is set to 'Build UI for user', description to 'User is handsome', new subtask to 'Log out page' and 'Save changes' button clicked", () => {
    test("It should change task with the new info and close modal", () => {
      const { store } = setup()

      const titleInput = screen.getByLabelText("title")
      const descriptionInput = screen.getByLabelText("Description")
      const addSubtaskButton = screen.getByRole("button", {
        name: "+ Add new subtask",
      })
      const saveChangesButton = screen.getByRole("button", {
        name: "Save changes",
      })

      fireEvent.change(titleInput, { target: { value: taskDetails.title } })
      fireEvent.change(descriptionInput, {
        target: { value: taskDetails.description },
      })
      fireEvent.click(addSubtaskButton)

      fireEvent.change(screen.getAllByLabelText("subtask").slice(-1)[0], {
        target: { value: taskDetails.subtasks.slice(-1)[0] },
      })
      fireEvent.click(saveChangesButton)

      const task = getAllCoordenates(store.getState(), [
        taskDetails.status,
        taskDetails.title,
      ]).task

      expect(task).toStrictEqual(
        expect.objectContaining<Task>({
          ...taskDetails,
          subtasks: expect.arrayContaining<Subtask>([
            { title: taskDetails.subtasks.slice(-1)[0], isCompleted: false },
          ]),
        }),
      )
      expect(modalContext.hideModal).toHaveBeenCalled()
    })
  })
})
