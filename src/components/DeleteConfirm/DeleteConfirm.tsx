import { useModalContext } from "../../contexts/contexts"
import { ModalTypes } from "../../contexts/types"

interface DeleteConfirmProps {
  itemToDelete: string
  deleteAction: () => void
}

export default function DeleteConfirm({
  itemToDelete,
  deleteAction,
}: DeleteConfirmProps) {
  const { modalType, hideModal } = useModalContext()

  const onActionDelete = () => {
    deleteAction()
    hideModal()
  }

  const onCancelDelete = () => {
    hideModal()
  }

  return (
    <div className="text-[14px] text-red">
      <h3 className="font-bold text-[18px]">
        Delete this {modalType === ModalTypes.DeleteTask ? "task" : "board"}?
      </h3>
      <p className="text-gray my-6">
        Are you sure you want to delete the '{itemToDelete}'{" "}
        {modalType === ModalTypes.DeleteTask
          ? "task and its subtasks? This action cannot be reversed."
          : " board? This action will remove all columns and tasks and cannot be reversed."}
      </p>
      <div className="flex gap-4 text-white">
        <button
          className="btn bg-bgBtnDelete rounded-[20px] hover:bg-bgBtnDeleteHov py-2 flex-1 justify-center"
          onClick={onActionDelete}
        >
          Delete
        </button>
        <button
          className="btn flex-1 justify-center py-2 rounded-[20px] bg-bgBtnSecond hover:bg-bgBtnSecondHov text-purple"
          onClick={onCancelDelete}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
