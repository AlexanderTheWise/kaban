import { useCallback, useEffect, useState } from "react"
import { BoardDetails, Errors } from "../types"
import { ModalTypes } from "../contexts/types"
import { useAppSelector } from "../redux/hooks"
import { selectBoardsNames } from "../redux/features/boards/boardsSelectors"

const errorsInitialState: Errors = {
  titleError: false,
  itemError: false,
}

export default function useBoardForm(
  boardAction: (boardDetails: BoardDetails) => void,
  modalType: ModalTypes,
  preloadedBoardDetails?: BoardDetails,
) {
  const boardNames = useAppSelector(selectBoardsNames)
  const [boardDetails, setBoardDetails] = useState<BoardDetails>(
    preloadedBoardDetails ?? {
      boardName: "",
      columns: [],
    },
  )
  const [errors, setErrors] = useState<Errors>(errorsInitialState)

  const setDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, dataset: { position } = {} } = event.currentTarget

    setBoardDetails((prevBoardDetails) => {
      if (name === "columns") {
        const updatedColumns = prevBoardDetails.columns.map((column, idx) =>
          idx === +position! ? value : column,
        )

        return { ...prevBoardDetails, [name]: updatedColumns }
      }

      return { ...prevBoardDetails, [name]: value }
    })
  }

  const isboardNameRepeated = useCallback(
    (boardName: string) =>
      (modalType === ModalTypes.EditBoard &&
        preloadedBoardDetails?.boardName !== boardName &&
        boardNames.some(
          (board) => board.toLowerCase() === boardName.toLowerCase().trim(),
        )) ||
      (modalType === ModalTypes.AddBoard &&
        boardNames.some(
          (board) => board.toLowerCase() === boardName.toLowerCase().trim(),
        )),
    [boardNames, modalType, preloadedBoardDetails?.boardName],
  )

  const addColumn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()

    setBoardDetails((prevBoardDetails) => ({
      ...prevBoardDetails,
      columns: [...prevBoardDetails.columns, ""],
    }))
  }

  const deleteColumn = (position: number) => {
    setBoardDetails((prevBoardDetails) => ({
      ...prevBoardDetails,
      columns: prevBoardDetails.columns.filter((_, idx) => idx !== position),
    }))
  }

  const submitChanges = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    boardAction(boardDetails)
  }

  useEffect(() => {
    const { boardName, columns } = boardDetails

    setErrors((prevErrors) => ({
      ...prevErrors,
      titleError: !boardName.trim() || isboardNameRepeated(boardName),
      itemError:
        !columns.every((column) => column.trim()) ||
        new Set(columns.map((column) => column.trim().toLowerCase())).size !==
          columns.length,
    }))
  }, [boardDetails, isboardNameRepeated])

  return {
    boardDetails,
    setDetails,
    addColumn,
    deleteColumn,
    isboardNameRepeated,
    submitChanges,
    errors,
  }
}
