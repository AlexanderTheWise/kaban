import React from "react"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { useAppSelector } from "../../redux/hooks"
import { selectTasksTitles } from "../../redux/features/boards/boardsSelectors"
import getRenderItem from "../Task/Task"

interface ColumnProps {
  columnName: string
}

const ColumnComp = React.memo(({ columnName }: ColumnProps) => {
  const tasksTitles = useAppSelector((state) =>
    selectTasksTitles(state, [columnName]),
  )

  const renderItem = getRenderItem(columnName, tasksTitles)

  return (
    <div className="w-[280px]">
      <div className="flex items-center gap-3">
        <div className="rounded-full w-[15px] h-[15px] bg-slate-800"></div>
        <h2 className="small-heading">
          {columnName} ({tasksTitles.length})
        </h2>
      </div>
      <Droppable droppableId={columnName} renderClone={renderItem}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="mt-6"
          >
            {tasksTitles.map((taskTitle, index) => (
              <Draggable draggableId={taskTitle} index={index} key={taskTitle}>
                {renderItem}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
})

export default ColumnComp
