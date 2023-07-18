import { deleteBoardActionCreator } from "../../../redux/features/boards/boardsSlice"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import DeleteConfirm from "../DeleteConfirm"

const DeleteBoardConfirm: React.ComponentType<{}> = () => {
  const dispatch = useAppDispatch()
  const currentBoardName = useAppSelector((state) => state.currentBoard)

  const onDeleteBoard = () => {
    dispatch(deleteBoardActionCreator())
  }

  return (
    <DeleteConfirm
      deleteAction={onDeleteBoard}
      itemToDelete={currentBoardName}
    />
  )
}

export default DeleteBoardConfirm
