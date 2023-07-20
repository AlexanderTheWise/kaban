import { selectTask } from "../../redux/features/boards/boardsSelectors"
import {
  changeTaskStatusActionCreator,
  toggleSubtaskActionCreator,
} from "../../redux/features/boards/boardsSlice"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { TaskProps } from "../Task/Task"
import "./subtask.css"
import { useModalContext } from "../../contexts/contexts"
import { ModalTypes } from "../../contexts/types"
import EditOrDelete from "../EditOrDelete/EditOrDelete"
import Subtasks from "./Subtasks/Subtasks"
import ColumnsDrop from "../ColumnsDrop/ColumnsDrop"

const TaskDetail: React.ComponentType<TaskProps> = ({ coordenates }) => {
  const dispatch = useAppDispatch()
  const { showModal } = useModalContext()
  const task = useAppSelector((state) => selectTask(state, coordenates))

  const toggleSubtaskCompletition = (subtaskName: string) => {
    dispatch(toggleSubtaskActionCreator([...coordenates, subtaskName]))
  }

  const showDeleteTaskConfirm = () => {
    showModal(ModalTypes.DeleteTask, { coordenates })
  }

  const showEditTaskModal = () => {
    showModal(ModalTypes.EditTask, { coordenates })
  }

  const onChangeStatus = (nextColumn: string) => {
    if (nextColumn === coordenates[0]) {
      return
    }

    dispatch(changeTaskStatusActionCreator([...coordenates, nextColumn]))

    showModal(ModalTypes.TaskDetail, { coordenates: [nextColumn, task.title] })
  }

  return (
    <div className="text-[14px]">
      <div className="flex items-center justify-between relative">
        <h3 className="text-headingL text-textDarkWhite">{task.title}</h3>
        <EditOrDelete
          buttonsTextContents={["Edit task", "Delete task"]}
          deleteAction={showDeleteTaskConfirm}
          editAction={showEditTaskModal}
        />
      </div>
      <div className="overflow-y-auto">
        <p className="text-bodyL text-gray my-6">{task.description}</p>
        <Subtasks {...{ task, toggleSubtaskCompletition }} />
        <h4 className="form-subtitle">Current status</h4>
        <ColumnsDrop coordenates={coordenates} columnSelect={onChangeStatus} />
      </div>
    </div>
  )
}

export default TaskDetail
