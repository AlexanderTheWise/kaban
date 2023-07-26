import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { useModalContext } from "../../contexts/contexts"
import { ModalTypes } from "../../contexts/types"
import { getCurrentBoard } from "../../redux/features/boards/boardsSelectors"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import ColumnComp from "../Column/Column"
import { dropTaskActionCreator } from "../../redux/features/boards/boardsSlice"

interface BoardProps {
  isHidden: boolean
}

export default function BoardComp({ isHidden }: BoardProps) {
  const dispatch = useAppDispatch()
  const currentBoard = useAppSelector((state) => getCurrentBoard(state))

  const { showModal } = useModalContext()

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    dispatch(dropTaskActionCreator({ destination, source }))
  }

  return (
    <div
      className={`flex transition-transform mobile:w-full ${
        isHidden ? "" : "tablet:translate-x-[261px] desktop:translate-x-[301px]"
      } duration-500 px-4 py-6 gap-6 ${
        currentBoard?.columns?.length > 0
          ? ""
          : `justify-center items-center ${
              isHidden
                ? "w-full"
                : "tablet:w-[calc(100%-261px)] desktop:w-[calc(100%-301px)]"
            }`
      }`}
    >
      {currentBoard?.columns?.length > 0 ? (
        <>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="flex h-full gap-6">
              {currentBoard?.columns.map((column) => (
                <ColumnComp columnName={column.name} key={column.name} />
              ))}
            </div>
          </DragDropContext>
          <div
            onClick={() => {
              showModal(ModalTypes.EditBoard, {})
            }}
            className="flex items-center justify-center min-w-[280px] box-gradient rounded-md cursor-pointer group mt-[calc(12px+1.5rem)]"
          >
            <h2 className="capitalize text-gray transition-colors text-headingXL group-hover:text-purple">
              + New column
            </h2>
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <p className="text-gray text-headingL text-center">
            This {currentBoard ? "board" : "kanban"} is empty. Create a new
            {currentBoard ? " column" : " board"} to get started.
          </p>

          <button
            onClick={() => {
              showModal(
                currentBoard ? ModalTypes.EditBoard : ModalTypes.AddBoard,
                {},
              )
            }}
            className="btn-primary-big px-4 self-center mt-8"
          >
            + Create new {currentBoard ? " column" : " board"}
          </button>
        </div>
      )}
    </div>
  )
}
