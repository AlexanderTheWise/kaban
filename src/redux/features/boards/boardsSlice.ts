import { PayloadAction, createSlice } from "@reduxjs/toolkit"
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
    toggleSubtask: (
      currentState,
      {
        payload: [columnName, taskTitle, subtaskTitle],
      }: PayloadAction<string[]>,
    ) => {
      const subtask = currentState.boards
        .find(({ name }) => name === currentState.currentBoard)
        ?.columns.find(({ name }) => name === columnName)
        ?.tasks.find(({ title }) => title === taskTitle)
        ?.subtasks.find(({ title }) => title === subtaskTitle)!

      subtask.isCompleted = !subtask.isCompleted
    },
  },
})

export const boardsReducer = boardsSlice.reducer
export const {
  changeCurrentBoard: changeCurrentBoardActionCreator,
  toggleSubtask: toggleSubtaskActionCreator,
} = boardsSlice.actions
