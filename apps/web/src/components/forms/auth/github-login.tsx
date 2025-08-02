import { Button } from "@/components/ui/button";
import { useGithubLogin } from "@/hooks/use-github-login";
import { GithubIcon } from "lucide-react";

export function GithubLogin() {
  const { handleGithubLogin } = useGithubLogin()

  return (
    <Button variant="outline" className="w-full" onClick={handleGithubLogin}>
      <GithubIcon />
      Login with Github
    </Button>
  )
}
