export interface Subtask extends Title {
  isCompleted: boolean
}

export interface Task extends Title {
  description: string
  status: string
  subtasks: Subtasks
}

export interface Column extends Name {
  tasks: Tasks
}

export interface Board extends Name {
  columns: Columns
}

export interface BoardsState {
  boards: Boards
  currentBoard: string
}

export interface TaskDetails {
  title: string
  description: string
  subtasks: string[]
  status: string
}
export interface AllCoordenates {
  currentBoard: Board
  column?: Column
  task?: Task
  subtask?: Subtask
}

export interface Errors {
  titleError: boolean
  itemError: boolean
}
export interface BoardDetails {
  boardName: string
  columns: string[]
}

type Boards = Board[]
type Subtasks = Subtask[]
type Tasks = Task[]
type Columns = Column[]
type Name = Record<"name", string>
type Title = Record<"title", string>
