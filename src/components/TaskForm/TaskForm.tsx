import ColumnsDrop from "../ColumnsDrop/ColumnsDrop"
import { ModalTypes } from "../../contexts/types"
import useTaskForm from "../../hooks/useTaskForm"
import { TaskDetails } from "../../types"
import { useModalContext } from "../../contexts/contexts"
import FormTextInput from "../FormTextInput/FormTextInput"
import DeletableTextInput from "../FormTextInput/DeletableTextInput/DeletableTextInput"

interface TaskFormProps {
  preloadedTaskDetails?: TaskDetails
  taskAction: (newDetails: TaskDetails) => void
}
export default function TaskForm({
  preloadedTaskDetails,
  taskAction,
}: TaskFormProps) {
  const { modalType } = useModalContext()
  const {
    addSubtask,
    changeStatus,
    setDetails,
    submitChanges,
    taskDetails,
    errors,
    deleteSubtask,
    isTitleRepeated,
  } = useTaskForm(taskAction, modalType!, preloadedTaskDetails)

  return (
    <form className="overflow-y-auto max-h-[calc(100vh-114px)]">
      <h3 className="text-headingL text-textDarkWhite mb-6">
        {modalType === ModalTypes.EditTask ? "Edit" : "Add new"} task
      </h3>

      <h4 className="form-subtitle mb-2">Title</h4>
      <FormTextInput
        error={errors.titleError}
        changeEvent={setDetails}
        name="title"
        value={taskDetails.title}
        label="title"
        itemRepeated={isTitleRepeated(taskDetails.title)}
      />

      <label className="form-subtitle block mt-6">
        Description
        <textarea
          className="form-text-entry mt-2 min-h-[112px] resize-none"
          value={taskDetails.description}
          onChange={setDetails}
          name="description"
        ></textarea>
      </label>

      <h4 className="form-subtitle mt-6">Subtasks</h4>
      <div className="flex flex-col gap-3 mt-2">
        {taskDetails.subtasks.map((subtask, position) => (
          <DeletableTextInput
            changeEvent={setDetails}
            deleteEvent={deleteSubtask}
            label="subtask"
            name="subtasks"
            position={position}
            value={subtask}
            itemRepeated={
              taskDetails.subtasks.findIndex(
                (el) =>
                  el.trim().toLowerCase() === subtask.trim().toLowerCase(),
              ) !== position
            }
            error={errors.itemError}
            key={position}
          />
        ))}
      </div>

      <button onClick={addSubtask} className="btn-secondary w-full mt-3">
        + Add new subtask
      </button>

      <h4 className="form-subtitle mt-6">Status</h4>
      <ColumnsDrop
        coordenates={[taskDetails.status]}
        columnSelect={changeStatus}
      />

      <button
        disabled={Object.values(errors).some((value) => value)}
        onClick={submitChanges}
        className="btn-primary-small w-full mt-6"
      >
        {modalType === ModalTypes.EditTask ? "Save changes" : "Create task"}
      </button>
    </form>
  )
}
