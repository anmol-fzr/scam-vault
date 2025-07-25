import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GithubIcon } from "lucide-react"
import { signIn } from "@/lib/auth-client"


const handleGithubLogin = async () => {
  await signIn.social({
    provider: "github",
    callbackURL: "/dashboard"
  })
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6 min-w-96", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Github account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-full" onClick={handleGithubLogin}>
                <GithubIcon />
                Login with Github
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {/*
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}

      </div>
      */}
    </div>
  )
}
