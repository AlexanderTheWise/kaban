import DeletableTextInput from "../FormTextInput/DeletableTextInput/DeletableTextInput"
import FormTextInput from "../FormTextInput/FormTextInput"
import useBoardForm from "../../hooks/useBoardForm"
import { useModalContext } from "../../contexts/contexts"
import { BoardDetails } from "../../types"
import { ModalTypes } from "../../contexts/types"

interface PreloadedBoardDetails {
  boardName: string
  columns: string[]
}

interface BoardFormProps {
  boardAction: (boardDetails: BoardDetails) => void
  preloadedBoardDetails?: PreloadedBoardDetails
}

export default function BoardForm({
  preloadedBoardDetails,
  boardAction,
}: BoardFormProps) {
  const { modalType } = useModalContext()

  const {
    addColumn,
    boardDetails,
    deleteColumn,
    setDetails,
    errors,
    submitChanges,
    isboardNameRepeated,
  } = useBoardForm(boardAction, modalType!, preloadedBoardDetails)

  return (
    <form className="overflow-y-auto max-h-[calc(100vh-114px)]">
      <h3 className="text-headingL text-textDarkWhite mb-6">
        {modalType === ModalTypes.EditBoard ? "Edit" : "Add new"} board
      </h3>

      <h4 className="form-subtitle mb-2">Board Name</h4>
      <FormTextInput
        error={errors.titleError}
        itemRepeated={isboardNameRepeated(boardDetails.boardName)}
        changeEvent={setDetails}
        name="boardName"
        label="board name"
        value={boardDetails.boardName}
      />

      <h4 className="form-subtitle mt-6">Board Columns</h4>
      <div className="flex flex-col gap-3 mt-2">
        {boardDetails.columns.map((column, position) => (
          <DeletableTextInput
            error={errors.itemError}
            itemRepeated={
              boardDetails.columns.findIndex(
                (el) => el.trim().toLowerCase() === column.trim().toLowerCase(),
              ) !== position
            }
            deleteEvent={deleteColumn}
            changeEvent={setDetails}
            position={position}
            key={position}
            label="column"
            name="columns"
            value={column}
          />
        ))}
      </div>
      <button onClick={addColumn} className="btn-secondary w-full mt-3">
        + Add new column
      </button>

      <button
        disabled={Object.values(errors).some((value) => value)}
        onClick={submitChanges}
        className="btn-primary-small w-full mt-6"
      >
        {modalType === ModalTypes.EditBoard
          ? "Save changes"
          : "Create new board"}
      </button>
    </form>
  )
}
