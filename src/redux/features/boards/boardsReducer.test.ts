import {
  boardsReducer,
  changeCurrentBoardActionCreator,
  changeTaskStatusActionCreator,
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

      const resultedSubtask = boardsReducer(
        initialState,
        toggleSubtaskActionCreator(coordenates),
      )
        .boards.find(({ name }) => name === initialState.currentBoard)
        ?.columns.find(({ name }) => name === coordenates[0])
        ?.tasks.find(({ title }) => title === coordenates[1])
        ?.subtasks.find(({ title }) => title === coordenates[2])!

      expect(resultedSubtask.isCompleted).toBeFalsy()
    })
  })

  describe("When it receives a changeTaskStatus action with payload ['Todo', 'Build UI for onboarding flow', 'Doing']", () => {
    test("It should delete 'Build UI for onboarding flow' task from 'Todo' column, add it to 'Doing' column and change task status to 'Doing'", () => {
      const coordenates = ["Todo", "Build UI for onboarding flow", "Doing"]

      const resultedCurrentBoard = boardsReducer(
        initialState,
        changeTaskStatusActionCreator(coordenates),
      ).boards.find(({ name }) => name === initialState.currentBoard)!

      const resultedPreviousColumnTasks = resultedCurrentBoard.columns.find(
        ({ name }) => name === coordenates[0],
      )!.tasks

      expect(
        resultedPreviousColumnTasks.find(
          ({ title }) => title === coordenates[1],
        )!,
      ).toBeUndefined()

      const resultedTask = resultedCurrentBoard.columns
        .find(({ name }) => name === coordenates[2])!
        .tasks.find(({ title }) => title === coordenates[1])!

      expect(resultedTask).toHaveProperty("status", coordenates[2])
    })
  })
})
