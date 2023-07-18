import { selectTask } from "../../../redux/features/boards/boardsSelectors"
import { editTaskActionCreator } from "../../../redux/features/boards/boardsSlice"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { TaskDetails } from "../../../types"
import TaskForm from "../TaskForm"
import { useModalContext } from "../../../contexts/contexts"

interface EditTaskFormProps {
  coordenates: string[]
}

export default function EditTaskForm({ coordenates }: EditTaskFormProps) {
  const { hideModal } = useModalContext()
  const dispatch = useAppDispatch()
  const task = useAppSelector((state) => selectTask(state, coordenates))

  const preloadedTaskDetails: TaskDetails = {
    title: task?.title,
    description: task?.description,
    status: task?.status,
    subtasks: task?.subtasks.map(({ title }) => title),
  }

  const onTaskEdit = (newDetails: TaskDetails) => {
    dispatch(editTaskActionCreator({ coordenates, newDetails }))
    hideModal()
  }

  return (
    <TaskForm
      {...{ preloadedTaskDetails: preloadedTaskDetails }}
      taskAction={onTaskEdit}
    />
  )
}
