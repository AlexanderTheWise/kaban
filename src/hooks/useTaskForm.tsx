import { useCallback, useEffect, useState } from "react"
import {
  getCurrentBoard,
  selectAllTaskTitles,
} from "../redux/features/boards/boardsSelectors"
import { useAppSelector } from "../redux/hooks"
import { Errors, TaskDetails } from "../types"
import { ModalTypes } from "../contexts/types"
const errorsInitialState: Errors = {
  titleError: false,
  itemError: false,
}

export default function useTaskForm(
  taskAction: (newDetails: TaskDetails) => void,
  modalType: ModalTypes,
  preloadedTaskDetails?: TaskDetails,
) {
  const taskTitles = useAppSelector(selectAllTaskTitles)
  const preloadedStatus = useAppSelector(
    (state) => getCurrentBoard(state).columns[0].name,
  )
  const [taskDetails, setTaskDetails] = useState<TaskDetails>(
    preloadedTaskDetails ?? {
      title: "",
      description: "",
      subtasks: [],
      status: preloadedStatus,
    },
  )
  const [errors, setErrors] = useState<Errors>(errorsInitialState)

  const setDetails = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, dataset: { position } = {} } = event.currentTarget

    setTaskDetails((prevTaskDetails) => {
      if (name === "subtasks") {
        const updatedSubtasks = prevTaskDetails.subtasks.map((subtask, idx) =>
          idx === +position! ? value : subtask,
        )
        return { ...prevTaskDetails, [name]: updatedSubtasks }
      }

      return { ...prevTaskDetails, [name]: value }
    })
  }

  const addSubtask = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()

    setTaskDetails((prevTaskDetails) => ({
      ...prevTaskDetails,
      subtasks: [...prevTaskDetails.subtasks, ""],
    }))
  }

  const deleteSubtask = (position: number) => {
    setTaskDetails((prevTaskDetails) => ({
      ...prevTaskDetails,
      subtasks: prevTaskDetails.subtasks.filter(
        (_, index) => index !== position,
      ),
    }))
  }

  const changeStatus = (status: string) => {
    setTaskDetails((prevTaskDetails) => ({
      ...prevTaskDetails,
      status,
    }))
  }

  const isTitleRepeated = useCallback(
    (title: string) =>
      (modalType === ModalTypes.EditTask &&
        title !== preloadedTaskDetails?.title &&
        taskTitles.some(
          (taskTitle) =>
            taskTitle.toLowerCase() === title.toLocaleLowerCase().trim(),
        )) ||
      (modalType === ModalTypes.CreateTask &&
        taskTitles.some(
          (taskTitle) =>
            taskTitle.toLowerCase() === title.toLocaleLowerCase().trim(),
        )),
    [modalType, preloadedTaskDetails?.title, taskTitles],
  )

  const submitChanges = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()

    taskAction({
      ...taskDetails,
      title: taskDetails.title.trim(),
      subtasks: taskDetails.subtasks.map((subtask) => subtask.trim()),
    })
  }

  useEffect(() => {
    const { title, subtasks } = taskDetails

    setErrors((prevErrors) => ({
      ...prevErrors,
      titleError: !title.trim() || isTitleRepeated(title),
      itemError:
        !subtasks.every((subtask) => subtask.trim()) ||
        new Set(subtasks.map((subtask) => subtask.trim().toLowerCase()))
          .size !== subtasks.length,
    }))
  }, [isTitleRepeated, taskDetails])

  return {
    submitChanges,
    changeStatus,
    deleteSubtask,
    addSubtask,
    setDetails,
    isTitleRepeated,
    taskDetails,
    errors,
  }
}
