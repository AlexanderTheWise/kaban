import { useState } from "react"
import { selectColumnsNames } from "../../redux/features/boards/boardsSelectors"
import Chevron from "../icons/Chevron"
import { useAppSelector } from "../../redux/hooks"

interface ColumnsDropProps {
  coordenates: string[]
  columnSelect: (column: string) => void
}

export default function ColumnsDrop({
  coordenates,
  columnSelect,
}: ColumnsDropProps) {
  const columnsNames = useAppSelector(selectColumnsNames)
  const [dropVisible, setDropVisible] = useState(false)

  const toggleDropVisibility = () => {
    setDropVisible((prevDropVisibility) => !prevDropVisibility)
  }

  const handleOnButtonClick = (column: string) => {
    columnSelect(column)
  }

  return (
    <div
      aria-label={"status: " + coordenates[0]}
      aria-expanded={dropVisible}
      aria-controls="columnsOptions"
      onClick={toggleDropVisibility}
      className={`flex justify-between cursor-pointer items-center relative  text-[13px] px-4 py-2 border-2 rounded mt-2 hover:border-purple ${
        dropVisible ? "border-purple" : "border-bordInput"
      }`}
    >
      {coordenates[0]}
      <Chevron />
      {dropVisible && (
        <div
          id="columnsOptions"
          className="absolute flex animate-fadeIn rounded-lg flex-col bg-bgSecond w-[calc(100%+2px)] left-0 bottom-0 translate-y-[calc(100%+7px)] p-4 gap-2"
        >
          {columnsNames.map((columnName) => (
            <button
              key={columnName}
              onClick={(event) => {
                event.preventDefault()
                handleOnButtonClick(columnName)
              }}
              className="text-left text-gray"
            >
              {columnName}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
