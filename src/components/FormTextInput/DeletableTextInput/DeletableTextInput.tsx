import DeleteIcon from "../../icons/Delete"
import FormTextInput, { FormTextInputProps } from "../FormTextInput"

interface DeletableTextInputProps extends FormTextInputProps {
  deleteEvent: (position: number) => void
}

export default function DeletableTextInput({
  deleteEvent,
  ...rest
}: Required<DeletableTextInputProps>) {
  const deleteItem = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()

    deleteEvent(rest.position)
  }

  return (
    <div className="flex gap-4">
      <FormTextInput {...rest} />
      <button className="btn group" onClick={deleteItem}>
        <DeleteIcon />
      </button>
    </div>
  )
}
