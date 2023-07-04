import ThemeProvider from "./contexts/Theme/ThemeProvider"
import GlobalModalProvider from "./contexts/Modal/GlobalModalProvider"
import "./App.css"

function App() {
  return (
    <ThemeProvider>
      <GlobalModalProvider>
        <h1>Kanban Task Management</h1>
      </GlobalModalProvider>
    </ThemeProvider>
  )
}

export default App
