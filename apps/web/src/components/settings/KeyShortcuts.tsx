import { memo, type ReactNode } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type OnlyChild = {
  children: ReactNode
}

const shortcuts = [
  {
    title: "Toggle Theme",
    keys: ["alt", "t"]
  },
  {
    title: "Toggle Sidebar",
    keys: ["ctrl", "b"]
  },
] as const

export const KeyShortcuts = memo(() => {
  return (
    <Card className="border-none shadow-none w-full"  >
      <CardHeader >
        <CardTitle>Keyboard Shortcuts</CardTitle>
      </CardHeader>
      <CardContent>
        <Shortcuts />
      </CardContent>
    </Card>
  )
})



const Shortcuts = memo(() => {
  return (
    <div className='space-y-3'>
      {shortcuts.map((shortcut) => (
        <Shortcut shortcut={shortcut} key={shortcut.title} />
      ))}
    </div>
  )
})

type ShortcutProps = {
  shortcut: typeof shortcuts[0]
}

const Shortcut = memo(({ shortcut }: ShortcutProps) => {
  return (
    <div className='flex justify-between items-center'>
      <p>{shortcut.title}</p>
      <Keys keys={shortcut.keys} />
    </div>
  )
})

type KeysProps = {
  keys: typeof shortcuts[0]["keys"]
}

const Keys = memo(({ keys }: KeysProps) => {
  return (
    <div className='flex items-center gap-2'>
      {keys.map((key) => (
        <Key key={key}>{key}</Key>
      ))}
    </div>
  )
})

const Key = memo(({ children }: OnlyChild) => (
  <p className='bg-muted w-fit py-1 px-3 rounded-md capitalize'>{children}</p>
))
