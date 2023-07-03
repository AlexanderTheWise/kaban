import { Provider } from "react-redux"
import { store } from "../redux/store"
import { ChildrenProps } from "../contexts/types"
import ThemeProvider from "../contexts/Theme/ThemeProvider"
import { RenderOptions, render } from "@testing-library/react"

const renderWithProviders = (
  ui: React.ReactElement,
  renderOptions?: Omit<RenderOptions, "queries">,
) => {
  const Wrapper = ({ children }: ChildrenProps) => {
    return (
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    )
  }

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export default renderWithProviders
