import { useEffect, useRef } from "react"
import { ChildrenProps } from "../../contexts/types"

export default function Modal({ children }: ChildrenProps) {
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialog.current?.close()
    dialog.current?.showModal()
  })

  return (
    <dialog
      ref={dialog}
      aria-hidden="false"
      className="z-10 rounded-lg w-[264px] bg-bgSecond translate-x-[-50%] top-[80px] left-1/2"
    >
      {children}
    </dialog>
  )
}
