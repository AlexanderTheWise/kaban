import React from "react"
import { ModalChildren } from "./Modal/GlobalModalProvider"

export interface ChildrenProps {
  children: React.JSX.Element | React.JSX.Element[]
}

export interface ThemeContextStructure {
  darkModeOn: boolean
  toggleDarkMode: () => void
}

export enum ModalTypes {
  Options,
}

export type ModalChildrenComponent = {
  [K in ModalChildrenKeys]: (typeof ModalChildren)[K]
}[ModalChildrenKeys]

export interface ModalState {
  modalType: ModalTypes | null
  childProps: ChildProps
}

export type ShowModal = <T extends ModalChildrenKeys>(
  modalType: T,
  childProps: React.ComponentProps<(typeof ModalChildren)[T]>,
) => void

export interface ModalContextStructure {
  showModal: ShowModal
  hideModal: () => void
  modalType: ModalTypes | null
}

export type ChildProps = {
  [K in ModalChildrenKeys]: React.ComponentProps<(typeof ModalChildren)[K]>
}[ModalChildrenKeys]

type ModalChildrenKeys = keyof typeof ModalChildren
