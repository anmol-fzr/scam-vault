import { memo } from "react";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const handleDelete = () => authClient.deleteUser({})

export const DeleteAccountDialog = memo(() => {
  return (
    <ConfirmDialog
      title='Are you absolutely sure?'
      desc='This will permanently delete your account and all associated data. This action cannot be undone.'
      onProceed={handleDelete}
    >
      <Button variant="destructive">
        Delete Account
      </Button>
    </ConfirmDialog>
  )
})
