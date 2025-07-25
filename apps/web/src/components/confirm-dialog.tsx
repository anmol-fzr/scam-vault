import { memo, type ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@radix-ui/react-dialog"

type ConfirmDialogProps = {
  title: string;
  desc: string
  children: ReactNode
  onProceed: () => void
}

function ConfirmDialogImpl(props: ConfirmDialogProps) {
  const { title, desc, children, onProceed } = props
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onProceed} variant="ghost">Proceed</Button>
          <DialogClose asChild>
            <Button autoFocus >Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const ConfirmDialog = memo(ConfirmDialogImpl)
