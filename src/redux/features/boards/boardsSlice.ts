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
    changeTaskStatus: (currentState, action: PayloadAction<string[]>) => {
      const [currentStatus, taskTitle, nextStatus] = action.payload

      const currentBoard = currentState.boards.find(
        ({ name }) => name === currentState.currentBoard,
      )!

      const taskColumn = currentBoard.columns.find(
        ({ name }) => name === currentStatus,
      )!

      const nextColumn = currentBoard.columns.find(
        ({ name }) => name === nextStatus,
      )!

      const task = taskColumn.tasks.find(({ title }) => title === taskTitle)!

      task.status = nextStatus

      nextColumn.tasks.unshift(task)

      taskColumn.tasks = taskColumn.tasks.filter(
        ({ title }) => title !== taskTitle,
      )
    },
  },
})

export const boardsReducer = boardsSlice.reducer
export const {
  changeCurrentBoard: changeCurrentBoardActionCreator,
  toggleSubtask: toggleSubtaskActionCreator,
  changeTaskStatus: changeTaskStatusActionCreator,
} = boardsSlice.actions
