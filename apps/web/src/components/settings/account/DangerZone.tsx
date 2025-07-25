import { memo } from "react"
import { H2, P } from "@/components/ui/typography"
import { DeleteAccountDialog } from "./DeleteAccountDialog"

export const DangerZone = memo(() => {
  return (
    <div className="w-fit space-y-2 border-0 border-muted-foreground/10 mt-4">
      <H2>
        Danger Zone
      </H2>
      <div className="space-y-6">
        <div className="space-y-2">
          <P>Permanently delete your account and all associated data.</P>
          <div className="flex flex-row gap-2">
            <DeleteAccountDialog />
          </div>
        </div>
      </div>
    </div>
  )
})
