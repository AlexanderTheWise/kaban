import { deleteTaskActionCreator } from "../../../redux/features/boards/boardsSlice"
import { useAppDispatch } from "../../../redux/hooks"
import DeleteConfirm from "../DeleteConfirm"

interface DeleteTaskConfirmProps {
  coordenates: string[]
}

export default function DeleteTaskConfirm({
  coordenates,
}: DeleteTaskConfirmProps) {
  const dispatch = useAppDispatch()

  const onDeleteTask = () => {
    dispatch(deleteTaskActionCreator(coordenates))
  }

  return (
    <DeleteConfirm itemToDelete={coordenates[1]} deleteAction={onDeleteTask} />
  )
}
