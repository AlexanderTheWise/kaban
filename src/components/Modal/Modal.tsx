import { useEffect, useRef } from "react"
import { ChildrenProps, ModalTypes } from "../../contexts/types"
import { useModalContext } from "../../contexts/contexts"

export default function Modal({ children }: ChildrenProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const { modalType, hideModal } = useModalContext()

  const onCancelModal = () => {
    hideModal()
  }

  useEffect(() => {
    dialog.current?.close()
    dialog.current?.showModal()
  })

  return (
    <dialog
      onCancel={onCancelModal}
      ref={dialog}
      aria-hidden="false"
      className={`left-1/2 z-10 overflow-visible rounded-lg bg-bgSecond translate-x-[-50%] ${
        modalType === ModalTypes.Options
          ? "w-[264px] top-[80px]"
          : "top-1/2 translate-y-[-50%] p-8 w-[343px] tablet:w-[480px]"
      }`}
    >
      {children}
    </dialog>
  )
}
