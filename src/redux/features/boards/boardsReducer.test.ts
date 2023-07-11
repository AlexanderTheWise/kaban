import {
  boardsReducer,
  changeCurrentBoardActionCreator,
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
})
