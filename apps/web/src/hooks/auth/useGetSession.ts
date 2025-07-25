import { authClient } from "@/lib/auth-client"
import { queryOptions, useQuery } from "@tanstack/react-query"

const getSessionQueryOps = () => queryOptions({
  queryKey: ["SESSION"],
  queryFn: () => authClient.getSession(),
})

const useGetSession = () => {
  return useQuery(getSessionQueryOps())
}

export { useGetSession, getSessionQueryOps }
