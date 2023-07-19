import React from "react"
import TaskCard from "../Task/Task"
import { useAppSelector } from "../../redux/hooks"
import { selectTasksTitles } from "../../redux/features/boards/boardsSelectors"

interface ColumnProps {
  columnName: string
}

const ColumnComp = React.memo(({ columnName }: ColumnProps) => {
  const tasksTitles = useAppSelector((state) =>
    selectTasksTitles(state, [columnName]),
  )

  return (
    <div className="w-[280px]">
      <div className="flex items-center gap-3">
        <div className="rounded-full w-[15px] h-[15px] bg-slate-800"></div>
        <h2 className="small-heading">
          {columnName} ({tasksTitles.length})
        </h2>
      </div>
      <ul className="flex flex-col gap-5 mt-6">
        {tasksTitles.map((taskTitle) => (
          <li key={taskTitle}>
            <TaskCard coordenates={[columnName, taskTitle]} />
          </li>
        ))}
      </ul>
    </div>
  )
})

export default ColumnComp
