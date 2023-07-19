import { Mock, vi } from "vitest"
import { fireEvent, screen } from "@testing-library/react"
import { ModalContextStructure, ModalTypes } from "../../contexts/types"
import renderWithProviders from "../../testUtils/renderWithProviders"
import TaskDetail from "./TaskDetail"
import { mockModalContext } from "../../testUtils/mocks"

const modalContext: Partial<ModalContextStructure> = {
  hideModal: vi.fn(),
  showModal: vi.fn(),
}

const setup = () =>
  renderWithProviders(
    <TaskDetail
      coordenates={["Todo", "QA and test all major user journeys"]}
    />,
  )

beforeEach(() => {
  mockModalContext(modalContext)
})

afterEach(() => {
  vi.resetAllMocks()
})

describe("Given a <TaskDetail /> component", () => {
  describe("When it renders", () => {
    test("It should show 'QA and test all major user journeys' heading", () => {
      setup()

      const heading = screen.getByRole("heading", {
        name: "QA and test all major user journeys",
      })

      expect(heading).toBeInTheDocument()
    })

    test("It should show one completed subtask 'Internal testing' and one uncompleted 'External testing'", () => {
      setup()

      const [internalTesting, externalTesting] = screen.getAllByRole("checkbox")

      expect(internalTesting).toHaveAccessibleName("Internal testing")
      expect(externalTesting).toHaveAccessibleName("External testing")
      expect(internalTesting).toBeChecked()
      expect(externalTesting).not.toBeChecked()
    })

    test("It should show 'Subtasks (1 of 2)' heading counter", () => {
      setup()

      const heading = screen.getByRole("heading", { name: "Subtasks (1 of 2)" })

      expect(heading).toBeInTheDocument()
    })
  })

  describe("When 'External testing' subtask is clicked", () => {
    test("It should complete task, updating heading counter 'Subtasks (2 of 2)'", () => {
      setup()

      fireEvent.click(
        screen.getByRole("checkbox", { name: "External testing" }),
      )

      const heading = screen.getByRole("heading", { name: "Subtasks (2 of 2)" })

      expect(heading).toBeInTheDocument()
    })
  })

  describe("When button with accessible name 'edit or delete' is clicked", () => {
    test("It should open a dropdown that has 'Edit task' and 'Delete task' buttons", () => {
      setup()
      const buttonNames = ["Edit task", "Delete task"]

      buttonNames.forEach((name) => {
        expect(screen.queryByRole("button", { name })).toBeNull()
      })

      const ellipsis = screen.getByLabelText("edit or delete")

      fireEvent.click(ellipsis)

      buttonNames.forEach((name) => {
        expect(screen.getByRole("button", { name })).toBeInTheDocument()
      })
    })

    test("It should open edit task modal when we click 'Edit task' button", () => {
      setup()

      fireEvent.click(screen.getByLabelText("edit or delete"))

      fireEvent.click(screen.getByRole("button", { name: "Edit task" }))

      expect((modalContext.showModal as Mock).mock.calls[0][0]).toBe(
        ModalTypes.EditTask,
      )
    })

    test("It should open delete task modal when we click 'Delete task' button", () => {
      setup()

      fireEvent.click(screen.getByLabelText("edit or delete"))

      fireEvent.click(screen.getByRole("button", { name: "Delete task" }))

      expect((modalContext.showModal as Mock).mock.calls[0][0]).toBe(
        ModalTypes.DeleteTask,
      )
    })
  })
})
