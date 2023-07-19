import { useCallback, useState } from "react"
import Header from "../Header/Header"
import Sidebar from "../Sidebard/Sidebar"
import BoardComp from "../Board/Board"

export default function Page() {
  const [isHidden, setIsHidden] = useState(false)

  const toggleHidden = useCallback(() => {
    setIsHidden(!isHidden)
  }, [isHidden])

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex w-full h-full overflow-auto">
        <Sidebar {...{ isHidden, toggleHidden }} />
        <BoardComp isHidden={isHidden} />
      </main>
    </div>
  )
}
