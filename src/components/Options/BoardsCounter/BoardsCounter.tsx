import { useAppSelector } from "../../../redux/hooks"

export default function BoardsCounter() {
  const boardsLength = useAppSelector((state) => state.boards.length)

  return (
    <h2 className="uppercase pl-6 mb-[16px] text-[13px] font-bold desktop:pl-[34px]">
      All boards ({boardsLength})
    </h2>
  )
}
