import { signIn } from "@/lib/auth-client";
import { useCallback } from "react";

export const useGithubLogin = () => {
  const handleGithubLogin = useCallback(async () => {
    const { origin } = window.location

    await signIn.social({
      provider: "github",
      callbackURL: `${origin}/dashboard`
    })
  }, [])

  return { handleGithubLogin }
}
