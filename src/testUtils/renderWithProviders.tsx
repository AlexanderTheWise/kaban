import React from "react"
import { render } from "@testing-library/react"
import type { RenderOptions } from "@testing-library/react"
import type { PreloadedState } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import GlobalModalProvider from "../contexts/Modal/GlobalModalProvider"
import ThemeProvider from "../contexts/Theme/ThemeProvider"
import { AppStore, RootState, setupStore } from "../redux/store"
import { ChildrenProps } from "../contexts/types"
import { initialState } from "../redux/features/boards/boardsSlice"

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = { ...initialState },
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) => {
  const Wrapper = ({ children }: ChildrenProps) => {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <GlobalModalProvider>{children}</GlobalModalProvider>
        </ThemeProvider>
      </Provider>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export default renderWithProviders
