import { createContext, useContext, type ReactNode } from "react"

const ifContext = createContext(false)

const useIfContext = () => {
  const ctx = useContext(ifContext)
  if (ctx === null || ctx === undefined) {
    throw new Error("<Then> and <Else> can be used only inside <If></If>")
  }
  return ctx
}

const IfProvider = ifContext.Provider

type OnlyChild = {
  children: ReactNode
}

type IfProps = OnlyChild & {
  value: boolean
}

const If = ({ children, value = false }: IfProps) => {
  return (
    <IfProvider value={value} >
      {children}
    </IfProvider>
  )
}


type ThenProps = OnlyChild

const Then = ({ children }: ThenProps) => {
  const cond = useIfContext()
  return cond ? children : null
}


type ElseProps = OnlyChild

const Else = ({ children }: ElseProps) => {
  const cond = useIfContext()
  return cond ? null : children
}

export { If, Then, Else }
