import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { FormInput } from "@/components/form"
import { useForm } from "react-hook-form"
import { PasswordInput } from "@/components/password-input"
import { placeholders } from "@/utils/placeholders"
import { signUp } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema } from "@/schema/auth.schema"
import { toast } from "sonner"
import { Link } from "@tanstack/react-router"
import { GithubLogin } from "./github-login"
import { Route } from "@/routes/auth/signup"

const placeholder = placeholders.getSignUpForm()

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = Route.useNavigate()

  const form = useForm({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = form.handleSubmit(async (data) => {
    const signUpPrms = signUp.email({
      name: data.name,
      email: data.email,
      password: data.password
    })

    toast.promise(signUpPrms, {
      loading: "Creating Account ...",
      success: ({ data, error }) => {
        if (data === null) {
          toast.error("Unabe to ")
          return;
        }
        console.log(data);
        navigate({ to: "/dashboard" })
        return "Logged In Successfully"
      },
      error: (err) => {
        console.log(err);
        return "Unable to Login"
      }
    })
  })

  return (
    <div className={cn("flex flex-col gap-6 min-w-96 z-100", className)} {...props}>
      <Card className="pt-0 bg-muted">
        <Card className="border-none">
          <CardHeader>
            <CardTitle className="text-xl text-center" >Create your account</CardTitle>
            <CardDescription className="text-center"> Welcome! Please fill in the details to get started. </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Form {...form}>
                  <form onSubmit={onSubmit} className="space-y-4 flex flex-col">

                    <FormInput name="name" label="Name" placeholder={placeholder.name} />
                    <FormInput name="email" label="Email" type="email" placeholder={placeholder.email} />
                    <PasswordInput name="password" label="Password" placeholder={placeholder.password} />

                    <Button type="submit" className="w-full">Login</Button>
                  </form>
                </Form>

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-background text-muted-foreground relative z-10 px-2">
                    or
                  </span>
                </div>
                <GithubLogin />
              </div>
            </div>
          </CardContent>
        </Card>
        <CardFooter className="items-center justify-center">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="underline underline-offset-4">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
      {/*
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}

      </div>
      */}
    </div>
  )
}
