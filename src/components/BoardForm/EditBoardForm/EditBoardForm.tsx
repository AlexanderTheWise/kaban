import { selectColumnsNames } from "../../../redux/features/boards/boardsSelectors"
import { editBoardActionCreator } from "../../../redux/features/boards/boardsSlice"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { BoardDetails } from "../../../types"
import BoardForm from "../BoardForm"
import { useModalContext } from "../../../contexts/contexts"

const EditBoardForm: React.ComponentType<{}> = () => {
  const dispatch = useAppDispatch()
  const { hideModal } = useModalContext()
  const boardName = useAppSelector((state) => state.currentBoard)
  const columns = useAppSelector(selectColumnsNames)

  const preloadedBoardDetails: BoardDetails = {
    boardName,
    columns,
  }

  const onEditBoard = (boardDetails: BoardDetails) => {
    dispatch(editBoardActionCreator(boardDetails))
    hideModal()
  }

  return <BoardForm {...{ preloadedBoardDetails }} boardAction={onEditBoard} />
}

export default EditBoardForm
