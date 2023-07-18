import { vi } from "vitest"
import { ModalContextStructure } from "../contexts/types"
import * as AppContext from "../contexts/contexts"

export const mockModalContext = <T extends ModalContextStructure>(
  modalContext: Partial<T>,
) => vi.spyOn(AppContext, "useModalContext").mockReturnValue(modalContext as T)
