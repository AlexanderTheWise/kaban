import {
  boardsReducer,
  changeCurrentBoardActionCreator,
  initialState,
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
})
