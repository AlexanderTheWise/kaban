import { useModalContext } from "../../contexts/contexts"
import { ModalTypes } from "../../contexts/types"
import { useAppSelector } from "../../redux/hooks"
import { selectTask } from "../../redux/features/boards/boardsSelectors"
import React from "react"

export interface TaskProps {
  coordenates: string[]
}

const TaskCard = React.memo(({ coordenates }: TaskProps) => {
  const { showModal } = useModalContext()
  const task = useAppSelector((state) => selectTask(state, coordenates))

  const openTaskDetail = () => {
    showModal(ModalTypes.TaskDetail, { coordenates })
  }

  return (
    <article
      className="bg-bgSecond cursor-pointer group drop-shadow-md py-6 px-4 rounded-lg"
      onClick={openTaskDetail}
    >
      <h3 className="text-headingM text-textDarkWhite group-hover:text-[#635fc7]">
        {task.title}
      </h3>
      <p className="text-bodyM font-bold mt-2 text-[#828fa3]">
        {task.subtasks.filter((task) => task.isCompleted).length} of{" "}
        {task.subtasks.length} substasks
      </p>
    </article>
  )
})

export default TaskCard
