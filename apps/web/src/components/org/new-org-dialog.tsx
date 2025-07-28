import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react'
import { NewOrgForm } from "./new-org-form"

// const avatars = [
//   'Andrea',
//   'Amaya',
//   'Eden',
//   'Leo',
//   'Oliver',
//   'Luis',
//   'Emery',
//   'Jack',
//   'Eliza',
//   'Destiny',
//   'Christian',
//   'George',
//   'Leah',
//   'Sadie',
//   'Wyatt',
//   'Nolan',
//   'Kimberly',
//   'Adrian',
//   'Sophia',
//   'Caleb',
// ]

export function NewOrgDialog({ open = false }) {
  return (
    <Dialog defaultOpen={open}>
      <DialogTrigger asChild>
        <button className='flex gap-2 p-2'>
          <div className='bg-background flex size-6 items-center justify-center rounded-md border'>
            <Plus className='size-4' />
          </div>
          <div className='text-muted-foreground font-medium'>Add Organization</div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Organization</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <NewOrgForm />
      </DialogContent>
    </Dialog>
  )
}
