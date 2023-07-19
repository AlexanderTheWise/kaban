import { useState } from "react"
import ellipsis from "../../assets/icon-vertical-ellipsis.svg"

interface EditOrDeleteProps {
  buttonsTextContents: string[]
  deleteAction: () => void
  editAction: () => void
}

export default function EditOrDelete({
  buttonsTextContents: [editText, deleteText],
  deleteAction,
  editAction,
}: EditOrDeleteProps) {
  const [dropVisible, setDropVisible] = useState(false)

  const toggleDropVisibility = () => {
    setDropVisible((prevDropVisibility) => !prevDropVisibility)
  }

  const handleButtonDeleteClick = () => {
    deleteAction()
    setDropVisible(false)
  }

  const handleButtonEditClick = () => {
    editAction()
    setDropVisible(false)
  }

  return (
    <>
      <button
        aria-label="edit or delete"
        className="btn"
        onClick={toggleDropVisibility}
      >
        <img src={ellipsis} alt="ellipsis" />
      </button>
      {dropVisible && (
        <div
          className={`flex flex-col z-10 bg-white rounded-lg drop-shadow-xl absolute p-4 gap-4 w-[180px] top-[100%] animate-fadeIn right-0 ${
            editText.includes("board")
              ? "translate-y-[22px]"
              : "translate-x-12 tablet:translate-x-1/2"
          }`}
        >
          <button
            className="btn text-bodyL w-full justify-start text-gray"
            onClick={handleButtonEditClick}
          >
            {editText}
          </button>
          <button
            className="btn text-bodyL w-full justify-start text-red"
            onClick={handleButtonDeleteClick}
          >
            {deleteText}
          </button>
        </div>
      )}
    </>
  )
}
