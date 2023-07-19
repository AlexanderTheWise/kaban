import GlobalModalProvider from "./contexts/Modal/GlobalModalProvider"
import ThemeProvider from "./contexts/Theme/ThemeProvider"
import Page from "./components/Page/Page"
import "./App.css"

function App() {
  return (
    <ThemeProvider>
      <GlobalModalProvider>
        <Page />
      </GlobalModalProvider>
    </ThemeProvider>
  )
}

export default App
