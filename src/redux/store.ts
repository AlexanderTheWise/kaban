import { configureStore } from "@reduxjs/toolkit"
import { boardsReducer } from "./features/boards/boardsSlice"

export const store = configureStore({ reducer: boardsReducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
