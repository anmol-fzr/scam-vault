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
import { PasswordInput } from "./password-input"
import { placeholders } from "@/utils/placeholders"
import { signIn } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/schema/auth.schema"
import { toast } from "sonner"
import { useGithubLogin } from "@/hooks/use-github-login"
import { GithubLogin } from "./forms/auth/github-login"
import { Link } from "@tanstack/react-router"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = form.handleSubmit(async (data) => {
    const loginPrms = signIn.email({
      email: data.email,
      password: data.password
    })
    //const resp = await loginPrms
    toast.promise(loginPrms, {
      loading: "Logging In...",
      success: ({ data, error }) => {
        if (data === null) {
          toast.error("Please Sign Up before Login")
          return;
        }
        console.log(data);
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
            <CardTitle className="text-xl text-center" >Login to your account</CardTitle>
            <CardDescription className="text-center">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Form {...form}>
                  <form onSubmit={onSubmit} className="space-y-4 flex flex-col">
                    <FormInput name="email" label="Email" placeholder={placeholders.getEmail()} />
                    <PasswordInput
                      name="password"
                      label="Password"
                      placeholder={placeholders.getPassword()}
                    />
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
            Don&apos;t have an account?{" "}
            <Link to="/auth/signup" className="underline underline-offset-4">
              Sign up
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
