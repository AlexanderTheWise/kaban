import { addBoardActionCreator } from "../../../redux/features/boards/boardsSlice"
import { useAppDispatch } from "../../../redux/hooks"
import { BoardDetails } from "../../../types"
import BoardForm from "../BoardForm"
import { useModalContext } from "../../../contexts/contexts"

const AddBoardForm: React.ComponentType<{}> = () => {
  const dispatch = useAppDispatch()
  const { hideModal } = useModalContext()

  const onCreateBoard = (boardDetails: BoardDetails) => {
    dispatch(addBoardActionCreator(boardDetails))
    hideModal()
  }

  return <BoardForm boardAction={onCreateBoard} />
}

export default AddBoardForm
