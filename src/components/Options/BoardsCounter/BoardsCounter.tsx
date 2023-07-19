import { useAppSelector } from "../../../redux/hooks"

export default function BoardsCounter() {
  const boardsLength = useAppSelector((state) => state.boards.length)

  return (
    <h2 className="pl-6 mb-[16px] desktop:pl-[34px] small-heading">
      All boards ({boardsLength})
    </h2>
  )
}
