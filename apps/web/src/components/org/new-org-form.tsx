import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { FormInput } from "../form"
import { organization } from "@/lib/auth-client"
import { toast } from "sonner"
import { placeholders } from "@/utils/placeholders"
import { createOrgSchema } from "@/schema/org.schema"

const namePlaceholder = placeholders.getName()

function getAvatar() {
  const randomSeed = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return `https://api.dicebear.com/9.x/lorelei/svg?seed=${randomSeed}`;
}

export function NewOrgForm() {
  const form = useForm({
    resolver: zodResolver(createOrgSchema),
  })

  const onSubmit = form.handleSubmit(async data => {
    const logo = getAvatar()

    try {
      const { error } = await organization.create({
        ...data,
        logo
      })

      if (error !== null) {
        if (error?.code === "ORGANIZATION_ALREADY_EXISTS") {
          toast.error(error.message, {
            description: "Try some other slug"
          })
        }
        return
      }
      toast.success("Organization Created Successfully")
    } catch (error) {
      toast.error("Unable to create Organization", {
        description: "Try after sometime"
      })
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4 flex flex-col">
        <FormInput name="name" label="Name" placeholder={namePlaceholder} />
        <FormInput
          name="slug"
          label="Slug"
          placeholder={namePlaceholder.split(" ").join("-").toLowerCase()}
        />
        <Button type="submit" className="mr-0 ml-auto">Save changes</Button>
      </form>
    </Form>
  )
}
