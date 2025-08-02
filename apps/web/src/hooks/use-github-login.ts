import { signIn } from "@/lib/auth-client";
import { useCallback } from "react";

export const useGithubLogin = () => {
  const handleGithubLogin = useCallback(async () => {
    await signIn.social({
      provider: "github",
      callbackURL: `/dashboard`
    })
  }, [])

  return { handleGithubLogin }
}
