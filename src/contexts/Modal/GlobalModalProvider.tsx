import { useMemo, useState } from "react"
import Options from "../../components/Options/Options"
import {
  ChildrenProps,
  ModalTypes,
  ShowModal,
  ModalState,
  ModalChildrenComponent,
} from "../types"
import Modal from "../../components/Modal/Modal"
import { ModalContext } from "../contexts"

export const ModalChildren = {
  [ModalTypes.Options]: Options,
}

export default function GlobalModalProvider({ children }: ChildrenProps) {
  const [modalStore, setModalStore] = useState<ModalState>()

  const showModal: ShowModal = (modalType, childProps) => {
    setModalStore({
      modalType,
      childProps,
    })
  }

  const hideModal = () => {
    setModalStore({
      childProps: {},
      modalType: null,
    })
  }

  const value = useMemo(
    () => ({
      showModal,
      hideModal,
      modalType: modalStore?.modalType!,
    }),
    [modalStore?.modalType],
  )

  const renderComponent = () => {
    if (!modalStore || modalStore.modalType === null) {
      return null
    }

    const ChildElement: ModalChildrenComponent =
      ModalChildren[modalStore.modalType]

    return (
      <Modal>
        <ChildElement {...modalStore.childProps} />
      </Modal>
    )
  }

  return (
    <ModalContext.Provider value={value}>
      {renderComponent()}
      {children}
    </ModalContext.Provider>
  )
}
