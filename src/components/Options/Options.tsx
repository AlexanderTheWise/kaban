import ThemeSwitch from "./ThemeSwitch/ThemeSwitch"
import Add from "../icons/Add"
import Board from "../icons/Board"
import BoardsCounter from "./BoardsCounter/BoardsCounter"
import BoardsNames from "./BoardsNames/BoardsNames"

const Options: React.ComponentType<{}> = () => {
  return (
    <article className="text-[#828fa3]">
      <div className="pt-4 pr-6">
        <BoardsCounter />
        <BoardsNames />
        <button className="btn w-full gap-4 py-3.5 pl-6 text-[15px] text-[#635fc7] desktop:pl-[34px]">
          <Board fillColor="#635fc7" />
          <div className="flex items-center gap-1">
            <Add fillColor="#635fc7" />
            Create New Board
          </div>
        </button>
      </div>

      <div className="p-4">
        <ThemeSwitch />
      </div>
    </article>
  )
}

export default Options
