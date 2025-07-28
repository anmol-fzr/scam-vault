import { useGetSession } from "./useGetSession"

export function useAuth() {
  const sessionData = useGetSession()
  const isLogin = sessionData.data === undefined

  const session = sessionData?.data?.data?.session ?? null
  const user = sessionData?.data?.data?.user ?? null

  return { isLogin, user, session }
}
