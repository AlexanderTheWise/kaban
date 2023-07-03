import Board from "../../icons/Board"
import {
  changeCurrentBoardActionCreator,
  selectBoardsNames,
} from "../../../redux/features/boards/boardsSlice"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { useContext } from "react"
import { ModalContext } from "../../../contexts/contexts"

export default function BoardsNames() {
  const { hideModal } = useContext(ModalContext)
  const boardsNames = useAppSelector(selectBoardsNames)
  const currentBoard = useAppSelector((state) => state.currentBoard)
  const dispatch = useAppDispatch()

  const isCurrent = (name: string) => name === currentBoard
  const handleOnBoardChange = (name: string) => {
    dispatch(changeCurrentBoardActionCreator(name))

    if (window.innerWidth < 768) {
      hideModal()
    }
  }

  return (
    <ul>
      {boardsNames.map((name) => (
        <li key={name}>
          <label
            className={`btn w-full gap-4 py-3.5 pl-6 desktop:pl-[34px] rounded-r-[100px] ${
              isCurrent(name)
                ? "bg-bgBtnPrimary color text-white text-[15px] cursor-default"
                : "btn-secondary-first"
            }`}
          >
            <Board fillColor={isCurrent(name) ? "#ffffff" : "#828fa3"} />
            {name}

            <input
              type="radio"
              name="board"
              checked={isCurrent(name)}
              onChange={() => handleOnBoardChange(name)}
              className="opacity-0 h-0 w-0 peer/board"
            />
          </label>
        </li>
      ))}
    </ul>
  )
}
