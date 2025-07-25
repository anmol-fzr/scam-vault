import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { FormInput } from "../form"
import { apiKey } from "@/lib/auth-client"
import { toast } from "sonner"
import { CopyIcon } from "lucide-react/icons"
import { createApiKeySchema } from "@/schema/api.schema"
import { placeholders } from "@/utils/placeholders"

const copyToClipboard = (content: string) => {
  return navigator.clipboard.writeText(content)
}

export function NewApiKeyForm() {
  const [currKey, setCurrKey] = useState("")

  const form = useForm({
    resolver: zodResolver(createApiKeySchema),
  })

  const onSubmit = form.handleSubmit(formData => {
    const prms = apiKey.create(formData)

    toast.promise(prms, {
      loading: "Generating API Key ...",
      success: ({ data, error }) => {
        if (error) {
          throw new Error(error.message, { cause: error });
        }

        setCurrKey(data?.key)
        copyToClipboard(data?.key)

        return "API Key Generated Successfully"
      },
      error: {
        message: "Unable to create API Key",
        description: "Please Try after sometime"
      }
    })
  })

  const handleCopy = () => {
    const prms = copyToClipboard(currKey)
    toast.promise(prms, {
      loading: "Copying API Key to Clipboard",
      success: "API Key Copied to Clipboard",
      error: "Unable to Copy API Key"
    })
  }

  const disabled = form.formState.isSubmitting

  return (
    <Form {...form} >
      {!currKey ? (
        <form onSubmit={onSubmit} className="space-y-4 flex flex-col">
          <FormInput name="name" label="Name" placeholder={placeholders.getCompanyName()} disabled={disabled} />
          <Button type="submit" className="mr-0 ml-auto" disabled={disabled} >Submit</Button>
        </form>
      ) : (
        <>
          <div className="bg-card p-2 px-4 rounded-lg whitespace-nowrap overflow-hidden flex relative">
            <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              {currKey}
            </code>
            <button className="absolute right-0 top-0 bottom-0  p-3 bg-background/90" onClick={handleCopy} >
              <CopyIcon size={20} />
            </button>
          </div>
        </>
      )}
    </Form>
  )
}
