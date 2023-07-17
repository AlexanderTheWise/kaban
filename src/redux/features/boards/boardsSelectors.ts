import { createSelector } from "@reduxjs/toolkit"
import {
  AllCoordenates,
  BoardsState,
  Column,
  Task,
  Board,
} from "../../../types"

export const getCurrentBoard = (state: BoardsState) =>
  state.boards.find(({ name }) => name === state.currentBoard)!

export const getColumn = (board: Board, columnName: string) =>
  board.columns.find(({ name }) => name === columnName)!

export const getTask = (column: Column, taskTitle: string) =>
  column.tasks.find(({ title }) => title === taskTitle)!

export const getSubtask = (task: Task, subtaskTitle: string) =>
  task.subtasks.find(({ title }) => title === subtaskTitle)!

const identifiers = (_: BoardsState, identifiers: string[]) => identifiers

export const selectBoardsNames = createSelector(
  (state: BoardsState) => state.boards,
  (boards) => boards.map(({ name }) => name),
)

const selectColum = createSelector(
  [getCurrentBoard, identifiers],
  (board, [columnName]) => getColumn(board, columnName),
)

export const selectAllTaskTitles = createSelector([getCurrentBoard], (board) =>
  board.columns.flatMap(({ tasks }) => tasks.map(({ title }) => title)),
)

export const selectColumnsNames = createSelector(
  [getCurrentBoard],
  ({ columns }) => columns.map(({ name }) => name),
)

export const selectTasksTitles = createSelector([selectColum], (column) =>
  column.tasks.map(({ title }) => title),
)

export const selectTask = createSelector(
  [getCurrentBoard, identifiers],
  (board, [columnName, taskTitle]) =>
    board.columns
      .find(({ name }) => name === columnName)
      ?.tasks.find(({ title }) => title === taskTitle)!,
)

export const getAllCoordenates = (
  state: BoardsState,
  coordenates: string[],
) => {
  const [columnName, taskTitle, subtaskTitle] = coordenates

  let allCoordenates: AllCoordenates = {
    currentBoard: getCurrentBoard(state),
  }

  if (columnName) {
    allCoordenates = {
      ...allCoordenates,
      column: getColumn(allCoordenates.currentBoard!, columnName),
    }
  }

  if (taskTitle) {
    allCoordenates = {
      ...allCoordenates,
      task: getTask(allCoordenates.column!, taskTitle),
    }
  }

  if (subtaskTitle) {
    allCoordenates = {
      ...allCoordenates,
      subtask: getSubtask(allCoordenates.task!, subtaskTitle),
    }
  }

  return allCoordenates
}
