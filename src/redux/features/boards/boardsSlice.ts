import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit"
import { BoardsState } from "../../../types"
import { boards } from "../../../../data.json"

export const initialState: BoardsState = {
  boards,
  currentBoard: boards[0].name,
}

const boardsSlice = createSlice({
  initialState,
  name: "boards",
  reducers: {
    changeCurrentBoard: (currentState, action: PayloadAction<string>) => ({
      ...currentState,
      currentBoard: action.payload,
    }),
  },
})

export const boardsReducer = boardsSlice.reducer
export const { changeCurrentBoard: changeCurrentBoardActionCreator } =
  boardsSlice.actions

export const selectBoardsNames = createSelector(
  (state: BoardsState) => state.boards,
  (boards) => boards.map(({ name }) => name),
)
