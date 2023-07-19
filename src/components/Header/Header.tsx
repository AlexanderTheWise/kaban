import React, { useRef } from "react"
import Add from "../../assets/icon-add-task-mobile.svg"
import Logo from "../icons/Logo.js"
import Options from "../Options/Options.js"
import CurrentBoardDisplay from "./CurrentBoardDisplay/CurrentBoardDisplay.js"
import { useModalContext } from "../../contexts/contexts"
import { ModalTypes } from "../../contexts/types"
import EditOrDelete from "../EditOrDelete/EditOrDelete"

const Header = React.memo(() => {
  const { showModal } = useModalContext()
  const dialogRef = useRef<HTMLDialogElement>(null)

  const showCreateTaskModal = () => {
    showModal(ModalTypes.CreateTask, {})
  }

  const openDeleteBoard = () => {
    showModal(ModalTypes.DeleteBoard, {})
  }

  const openEditBoard = () => {
    showModal(ModalTypes.EditBoard, {})
  }

  return (
    <header className="flex bg-bgSecond">
      <div className="flex items-center pl-4 tablet:pl-[26px] tablet:pr-[80px] desktop:pl-[34px] desktop:pr-[112px]">
        <Logo />
      </div>
      <div className="flex items-center justify-between p-4 flex-1 tablet:border-l-[2px] tablet:border-b-[2px] tablet:border-b-bordSecond tablet:border-l-bordSecond tablet:px-6 desktop:pt-5 desktop:pb-7">
        <CurrentBoardDisplay />

        <div className="flex gap-4 tablet:gap-6">
          <button
            onClick={showCreateTaskModal}
            className="mobile:h-8 btn-primary-big px-[18px]"
          >
            <img src={Add} alt="add icon" className="tablet:hidden" />
            <span className="hidden tablet:inline">+ add new task</span>
          </button>

          <div className="relative flex flex-col justify-center">
            <EditOrDelete
              buttonsTextContents={["Edit board", "Delete board"]}
              deleteAction={openDeleteBoard}
              editAction={openEditBoard}
            />
          </div>
        </div>

        <dialog
          ref={dialogRef}
          className="absolute bg-bgSecond top-[80px] left-[50%] translate-x-[-50%] w-[264px] rounded-lg"
        >
          <Options />
        </dialog>
      </div>
    </header>
  )
})

export default Header
