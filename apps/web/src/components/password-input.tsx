import { useId, useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useFormContext, type FieldPath, type FieldValues } from "react-hook-form"
import { Input, type InputProps } from "@/components/ui/input"

type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>
  = InputProps & {
    label: string;
    placeholder: string;
    name: TName
    desc?: string
  }

export function PasswordInput(props: FormInputProps) {
  const { name, label, placeholder } = props

  const form = useFormContext()
  const id = useId()
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const toggleVisibility = () => setIsVisible((prevState) => !prevState)

  return (
    <FormField
      control={form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                id={id}
                className="pe-9"
                placeholder={placeholder}
                type={isVisible ? "text" : "password"}
                name={name}
              />
              <button
                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={toggleVisibility}
                aria-label={isVisible ? "Hide password" : "Show password"}
                aria-pressed={isVisible}
                aria-controls="password"
              >
                {isVisible ? (
                  <EyeOffIcon size={16} aria-hidden="true" />
                ) : (
                  <EyeIcon size={16} aria-hidden="true" />
                )}
              </button>
            </div>

          </FormControl>
          <FormDescription>
            {props?.desc}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />

  )
}
