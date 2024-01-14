import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
} from "react"
  
interface AppContext {
  setLocation: Dispatch<SetStateAction<string>>
}

export const Context = createContext<AppContext>({
  setLocation: () => "",
})

// Simple Provider, just to demonstrate.
export const AppProvider = ({
  setLocation,
  children,
}: PropsWithChildren<AppContext>) => {
  const contextProps: AppContext = {
    setLocation,
  }
  return <Context.Provider value={contextProps}>{children}</Context.Provider>
}

export const useAppContext = () => useContext<AppContext>(Context)
  