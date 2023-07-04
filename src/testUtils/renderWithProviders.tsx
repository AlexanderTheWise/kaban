import { Provider } from "react-redux"
import { store } from "../redux/store"
import { ChildrenProps } from "../contexts/types"
import ThemeProvider from "../contexts/Theme/ThemeProvider"
import { RenderOptions, render } from "@testing-library/react"
import GlobalModalProvider from "../contexts/Modal/GlobalModalProvider"

const renderWithProviders = (
  ui: React.ReactElement,
  renderOptions?: Omit<RenderOptions, "queries">,
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

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export default renderWithProviders
