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

type Boards = Board[]
type Subtasks = Subtask[]
type Tasks = Task[]
type Columns = Column[]
type Name = Record<"name", string>
type Title = Record<"title", string>
