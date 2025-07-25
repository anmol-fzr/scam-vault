import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NewApiKeyForm } from "./new-api-key-form"
import type React from "react"

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

export function NewApiKeyDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New API Key</DialogTitle>
          <DialogDescription>
            This will create a new API Key under the current active Organization
          </DialogDescription>
        </DialogHeader>
        <NewApiKeyForm />
      </DialogContent>
    </Dialog>
  )
}
