import React from "react"
import {
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
} from "react-beautiful-dnd"
import { useModalContext } from "../../contexts/contexts"
import { ModalTypes } from "../../contexts/types"
import { useAppSelector } from "../../redux/hooks"
import { selectTask } from "../../redux/features/boards/boardsSelectors"

export interface TaskProps {
  coordenates: string[]
}

const TaskCard = React.memo(({ coordenates }: TaskProps) => {
  const task = useAppSelector((state) => selectTask(state, coordenates))

  return (
    <>
      <h3 className="text-headingM text-textDarkWhite group-hover:text-[#635fc7]">
        {task.title}
      </h3>
      <p className="text-bodyM font-bold mt-2 text-[#828fa3]">
        {task.subtasks.filter((task) => task.isCompleted).length} of{" "}
        {task.subtasks.length} substasks
      </p>
    </>
  )
})

const getRenderItem =
  (columnName: string, items: string[]) =>
  (
    provided: DraggableProvided,
    _: DraggableStateSnapshot,
    rubric: DraggableRubric,
  ) => {
    const taskTitle = items[rubric.source.index]
    const { showModal } = useModalContext()

    const openTaskDetail = (taskTitle: string) => {
      showModal(ModalTypes.TaskDetail, { coordenates: [columnName, taskTitle] })
    }

    return (
      <article
        {...provided.dragHandleProps}
        {...provided.draggableProps}
        className="bg-bgSecond group drop-shadow-md rounded-lg"
        style={{
          ...provided.draggableProps.style,
          marginTop: "1.25rem",
          padding: "1.5rem 1rem",
        }}
        ref={provided.innerRef}
        onClick={() => {
          openTaskDetail(taskTitle)
        }}
      >
        <TaskCard coordenates={[columnName, taskTitle]} key={taskTitle} />
      </article>
    )
  }

export default getRenderItem
