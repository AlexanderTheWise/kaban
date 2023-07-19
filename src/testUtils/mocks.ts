import { vi } from "vitest"
import { ModalContextStructure } from "../contexts/types"
import * as AppContext from "../contexts/contexts"
import { BoardDetails, TaskDetails } from "../types"

export const mockModalContext = <T extends ModalContextStructure>(
  modalContext: Partial<T>,
) => vi.spyOn(AppContext, "useModalContext").mockReturnValue(modalContext as T)

export const taskDetails: TaskDetails = {
  title: "Build UI for user",
  description: "User is handsome",
  status: "Todo",
  subtasks: ["Sign up page", "Sign in page", "Log out page"],
}

export const boardDetails: BoardDetails = {
  boardName: "Example board",
  columns: ["Todo", "Doing", "Done", "For Review"],
}
