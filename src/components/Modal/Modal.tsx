import { useEffect, useRef } from "react"
import { ChildrenProps, ModalTypes } from "../../contexts/types"
import { useModalContext } from "../../contexts/contexts"

export default function Modal({ children }: ChildrenProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const { modalType, hideModal } = useModalContext()
  const isOptions = modalType === ModalTypes.Options

  const onCancelModal = () => {
    hideModal()
  }

  const onClickModal = (
    event: React.MouseEvent<HTMLDialogElement, MouseEvent>,
  ) => {
    if (event.target === dialog.current) {
      hideModal()
    }
  }

  useEffect(() => {
    dialog.current?.close()
    dialog.current?.showModal()
  })

  return (
    <dialog
      onClick={onClickModal}
      onCancel={onCancelModal}
      ref={dialog}
      aria-hidden="false"
      className={`left-1/2 overfow-visible max-h-[calc(100vh-25px)] rounded-lg bg-bgSecond translate-x-[-50%] ${
        isOptions
          ? "w-[264px] top-[80px]"
          : "top-1/2 translate-y-[-50%] w-[343px] tablet:w-[480px]"
      }`}
    >
      <div className={isOptions ? "" : "p-8"}>{children}</div>
    </dialog>
  )
}
