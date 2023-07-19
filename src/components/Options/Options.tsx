import ThemeSwitch from "./ThemeSwitch/ThemeSwitch"
import Board from "../icons/Board"
import BoardsCounter from "./BoardsCounter/BoardsCounter"
import BoardsNames from "./BoardsNames/BoardsNames"
import { useModalContext } from "../../contexts/contexts"
import { ModalTypes } from "../../contexts/types"

const Options: React.ComponentType<{}> = () => {
  const { showModal } = useModalContext()

  const openAddBoardModal = () => {
    showModal(ModalTypes.AddBoard, {})
  }
  return (
    <article className="text-gray tablet:flex tablet:flex-col tablet:justify-between tablet:flex-1">
      <div className="pt-4 pr-6">
        <BoardsCounter />
        <BoardsNames />
        <button
          onClick={openAddBoardModal}
          className="btn text-headingM w-full gap-4 py-3.5 pl-6  text-purple desktop:pl-[34px] justify-start"
        >
          <Board fillColor="#635fc7" />
          <div className="flex items-center gap-1">+ Create New Board</div>
        </button>
      </div>

      <div className="p-4">
        <ThemeSwitch />
      </div>
    </article>
  )
}

export default Options
