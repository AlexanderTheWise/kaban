import { Task } from "../../../types"

interface SubtasksProps {
  task: Task
  toggleSubtaskCompletition: (subtaskName: string) => void
}

export default function Subtasks({
  task,
  toggleSubtaskCompletition,
}: SubtasksProps) {
  return (
    <>
      <h4 className="form-subtitle">
        Subtasks ({task.subtasks.filter((task) => task.isCompleted).length} of{" "}
        {task.subtasks.length})
      </h4>
      <div className="flex flex-col gap-2 mt-4 mb-6">
        {task.subtasks.map(({ title, isCompleted }) => (
          <label
            className="subtask p-3 bg-bgPrimary flex relative items-center gap-4 font-bold hover:bg-[var(--common-hov)]"
            key={title}
          >
            <input
              checked={isCompleted}
              onChange={() => {
                toggleSubtaskCompletition(title)
              }}
              type="checkbox"
              className="opacity-0 absolute group w-full h-full top-0 left-0 cursor-pointer"
            />

            {title}
          </label>
        ))}
      </div>
    </>
  )
}
