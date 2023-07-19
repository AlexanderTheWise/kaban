import Chevron from "../../icons/Chevron"
import { useAppSelector } from "../../../redux/hooks"
import { ModalTypes } from "../../../contexts/types"
import { useModalContext } from "../../../contexts/contexts"

export default function CurrentBoardDisplay() {
  const currentBoard = useAppSelector((state) => state.currentBoard)
  const boards = useAppSelector((state) => state.boards)
  const { showModal } = useModalContext()

  const handleOnClick = () => {
    if (window.innerWidth < 768) {
      showModal(ModalTypes.Options, {})
    }
  }

  return (
    <div
      className="btn gap-[8px] text-headingM text-textDarkWhite tablet:text-[20px] desktop:text-headingXL mobile:cursor-default"
      onClick={handleOnClick}
    >
      {currentBoard}
      {boards.length > 1 && (
        <div className="tablet:hidden">
          <Chevron />
        </div>
      )}
    </div>
  )
}
