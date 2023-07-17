import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  BoardDetails,
  BoardsState,
  Column,
  Task,
  TaskDetails,
} from "../../../types"
import { boards } from "../../../../data.json"
import {
  getAllCoordenates,
  getColumn,
  getCurrentBoard,
} from "./boardsSelectors"

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
    toggleSubtask: (currentState, action: PayloadAction<string[]>) => {
      const { subtask } = getAllCoordenates(currentState, action.payload)

      subtask!.isCompleted = !subtask!.isCompleted
    },
    changeTaskStatus: (currentState, action: PayloadAction<string[]>) => {
      const [currentStatus, taskTitle, nextStatus] = action.payload

      const { currentBoard, column, task } = getAllCoordenates(currentState, [
        currentStatus,
        taskTitle,
      ])
      const nextColumn = getColumn(currentBoard, nextStatus)

      task!.status = nextStatus
      nextColumn.tasks.unshift(task!)
      column!.tasks = column!.tasks.filter(({ title }) => title !== taskTitle)
    },
    deleteTask: (currentState, action: PayloadAction<string[]>) => {
      const { task, column } = getAllCoordenates(currentState, action.payload)

      column!.tasks = column!.tasks.filter(({ title }) => title !== task!.title)
    },
    editTask: (
      currentState,
      action: PayloadAction<{ coordenates: string[]; newDetails: TaskDetails }>,
    ) => {
      const { coordenates, newDetails } = action.payload

      const { column, task, currentBoard } = getAllCoordenates(
        currentState,
        coordenates,
      )

      Object.assign<Task, Task>(task!, {
        ...newDetails,
        subtasks: newDetails.subtasks.map(
          (subtask) =>
            task!.subtasks.find(({ title }) => title === subtask) ?? {
              title: subtask,
              isCompleted: false,
            },
        ),
      })

      if (task!.status !== column!.name) {
        getColumn(currentBoard, task!.status).tasks.unshift(task!)
        column!.tasks = column!.tasks.filter(
          ({ title }) => title !== task!.title,
        )
      }
    },
    createTask: (currentState, action: PayloadAction<TaskDetails>) => {
      const newTask: Task = {
        ...action.payload,
        subtasks: action.payload.subtasks.map((title) => ({
          title,
          isCompleted: false,
        })),
      }

      getColumn(getCurrentBoard(currentState), newTask.status).tasks.unshift(
        newTask,
      )
    },
    deleteBoard: (currentState) => {
      currentState.boards = currentState.boards.filter(
        ({ name }) => currentState.currentBoard !== name,
      )

      currentState.currentBoard = currentState.boards[0]?.name ?? ""
    },
    editBoard: (currentState, action: PayloadAction<BoardDetails>) => {
      const { boardName, columns } = action.payload
      const currentBoard = getCurrentBoard(currentState)

      currentBoard.name = boardName
      currentBoard.columns = columns.map(
        (name): Column =>
          currentBoard.columns.find(
            ({ name: columnName }) => columnName === name,
          ) ?? {
            name,
            tasks: [],
          },
      )

      currentState.currentBoard = currentBoard.name
    },
    addBoard: (currentState, action: PayloadAction<BoardDetails>) => {
      const { boardName: name, columns } = action.payload

      currentState.boards.push({
        name,
        columns: columns.map((name) => ({ name, tasks: [] })),
      })
    },
  },
})

export const boardsReducer = boardsSlice.reducer
export const {
  changeCurrentBoard: changeCurrentBoardActionCreator,
  toggleSubtask: toggleSubtaskActionCreator,
  changeTaskStatus: changeTaskStatusActionCreator,
  deleteTask: deleteTaskActionCreator,
  editTask: editTaskActionCreator,
  createTask: createTaskActionCreator,
  deleteBoard: deleteBoardActionCreator,
  editBoard: editBoardActionCreator,
  addBoard: addBoardActionCreator,
} = boardsSlice.actions
