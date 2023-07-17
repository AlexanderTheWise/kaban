import {
  BoardDetails,
  Column,
  Subtask,
  Task,
  TaskDetails,
} from "../../../types"
import { getAllCoordenates, getCurrentBoard } from "./boardsSelectors"
import {
  addBoardActionCreator,
  boardsReducer,
  changeCurrentBoardActionCreator,
  changeTaskStatusActionCreator,
  createTaskActionCreator,
  deleteTaskActionCreator,
  editBoardActionCreator,
  editTaskActionCreator,
  initialState,
  toggleSubtaskActionCreator,
} from "./boardsSlice"

describe("Given a boards reducer function", () => {
  describe("When it receives a changeCurrentBoard action with payload 'Marketing Plan'", () => {
    test("It should update currentBoard property of the state with 'Marketing Plan'", () => {
      const expectedCurrentBoard = "Marketing Plan"

      const resultedCurrentBoard = boardsReducer(
        initialState,
        changeCurrentBoardActionCreator(expectedCurrentBoard),
      ).currentBoard

      expect(expectedCurrentBoard).toBe(resultedCurrentBoard)
    })
  })

  describe("When it receives a toggleSubtask action with payload ['Todo', 'Build UI for onboarding flow', 'Sign up page']", () => {
    test("It should uncomplete 'Sign up page' subtask", () => {
      const coordenates = [
        "Todo",
        "Build UI for onboarding flow",
        "Sign up page",
      ]

      const resultedState = boardsReducer(
        initialState,
        toggleSubtaskActionCreator(coordenates),
      )
      const { subtask } = getAllCoordenates(resultedState, coordenates)

      expect(subtask!.isCompleted).toBeFalsy()
    })
  })

  describe("When it receives a changeTaskStatus action with payload ['Todo', 'Build UI for onboarding flow', 'Doing']", () => {
    test("It should delete 'Build UI for onboarding flow' task from 'Todo' column, add it to 'Doing' column and change task status to 'Doing'", () => {
      const coordenates = ["Todo", "Build UI for onboarding flow", "Doing"]

      const resultedState = boardsReducer(
        initialState,
        changeTaskStatusActionCreator(coordenates),
      )

      const { task } = getAllCoordenates(resultedState, coordenates.slice(0, 2))

      expect(task).toBeUndefined()

      const movedTask = getAllCoordenates(
        resultedState,
        coordenates.slice(-2).reverse(),
      ).task

      expect(movedTask).toHaveProperty("status", coordenates[2])
    })
  })

  describe("When it receives a deleteTask action with payload ['Todo', 'Build UI for onboarding flow']", () => {
    test("It should delete 'Build UI for onboarding flow' task", () => {
      const coordenates = ["Todo", "Build UI for onboarding flow"]

      const resultedState = boardsReducer(
        initialState,
        deleteTaskActionCreator(coordenates),
      )

      const { task } = getAllCoordenates(resultedState, coordenates)

      expect(task).toBeUndefined()
    })
  })

  const newTaskDetails: TaskDetails = {
    title: "Build UI for users",
    description: "Build UI for new users",
    status: "Doing",
    subtasks: ["Sign up page", "Sign in page", "Log out page"],
  }

  describe("When it receives a editTask action with payload ['Todo', 'Build UI for onboarding flow'] and task new details", () => {
    test("It should modify title, description, move task to 'Doing' column, and create an uncompleted 'Log out page' subtask", () => {
      const coordenates = ["Todo", "Build UI for onboarding flow"]

      const resultedState = boardsReducer(
        initialState,
        editTaskActionCreator({ coordenates, newDetails: newTaskDetails }),
      )

      const { task } = getAllCoordenates(resultedState, coordenates)

      expect(task).toBeUndefined()

      const movedTask = getAllCoordenates(resultedState, [
        newTaskDetails.status,
        newTaskDetails.title,
      ]).task!

      expect(movedTask).toStrictEqual(
        expect.objectContaining<Task>({
          ...newTaskDetails,
          subtasks: expect.arrayContaining<Subtask>([
            { title: newTaskDetails.subtasks.slice(-1)[0], isCompleted: false },
          ]),
        }),
      )
    })
  })

  describe("When it receives a createTask action with newTaskDetails payload", () => {
    test("It should add a new task with newTaskDetails title, description, status (add it to the specified column) and create subtasks", () => {
      const resultedState = boardsReducer(
        initialState,
        createTaskActionCreator(newTaskDetails),
      )

      const task = getAllCoordenates(resultedState, [
        newTaskDetails.status,
        newTaskDetails.title,
      ]).task!

      expect(task).toStrictEqual({
        ...newTaskDetails,
        subtasks: newTaskDetails.subtasks.map(
          (title): Subtask => ({ title, isCompleted: false }),
        ),
      })
    })
  })

  const newBoardDetails: BoardDetails = {
    boardName: "MapRoad",
    columns: ["Todo", "Doing", "ForReview"],
  }

  describe("When it receives editBoard action with payload newBoardDetails", () => {
    test("It should modify current board with name 'MapRoad' and add 'ForReview' column", () => {
      const resultedState = boardsReducer(
        initialState,
        editBoardActionCreator(newBoardDetails),
      )

      const { columns, name } = getCurrentBoard(resultedState)

      expect(name).toBe(newBoardDetails.boardName)
      expect(columns).toContainEqual<Column>({
        name: newBoardDetails.columns.slice(-1)[0],
        tasks: [],
      })
    })
  })

  describe("When it receives addBoard action with payload newBoardDetails", () => {
    test("It should create a board with name 'MapRoad' and add 'Todo', 'Doing' and 'ForReview' columns", () => {
      const resultedState = boardsReducer(
        initialState,
        addBoardActionCreator(newBoardDetails),
      )

      const { name, columns } = resultedState.boards.slice(-1)[0]

      expect(name).toBe(newBoardDetails.boardName)
      expect(columns).toStrictEqual(
        newBoardDetails.columns.map((name): Column => ({ name, tasks: [] })),
      )
    })
  })
})
