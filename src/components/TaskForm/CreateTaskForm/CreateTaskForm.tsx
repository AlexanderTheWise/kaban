import { createTaskActionCreator } from "../../../redux/features/boards/boardsSlice"
import { useAppDispatch } from "../../../redux/hooks"
import { TaskDetails } from "../../../types"
import TaskForm from "../TaskForm"
import { useModalContext } from "../../../contexts/contexts"

const CreateTaskForm: React.ComponentType<{}> = () => {
  const dispatch = useAppDispatch()
  const { hideModal } = useModalContext()

  const createTask = (newTask: TaskDetails) => {
    dispatch(createTaskActionCreator(newTask))
    hideModal()
  }

  return <TaskForm taskAction={createTask} />
}

export default CreateTaskForm
