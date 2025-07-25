import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getSessionQueryOps } from '@/hooks/auth/useGetSession'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from 'react'
import { DangerZone } from '@/components/settings/account/DangerZone'
import { KeyShortcuts } from '@/components/settings/KeyShortcuts'

const shortcuts = [
  {
    title: "Toggle Theme",
    keys: ["alt", "t"]
  },
  {
    title: "Toggle Sidebar",
    keys: ["ctrl", "b"]
  },
]

export const Route = createFileRoute('/(authenticated)/settings')({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      queryOps: getSessionQueryOps()
    }
  },
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(context.queryOps)
  }
})

function RouteComponent() {
  const { queryOps } = Route.useRouteContext()
  const { isLoading, data } = useQuery(queryOps)

  const navigate = Route.useNavigate()

  return (
    <div className='min-h-[calc(100vh_-_15px)] rounded-md !bg-sidebar'>
      <div className='p-6 max-w-6xl mx-auto rounded-md'>
        <div className='flex flex-col gap-8'>
          <div>
            <Button variant="ghost" onClick={() => navigate({ to: "/dashboard" })}>
              <ArrowLeft />
              Back to Dashboard
            </Button>
          </div>
          <div className='flex items-start justify-between gap-12'>
            <div className='flex flex-col gap-6'>
              <div className='flex items-center flex-col gap-4 px-12 min-w-80'>
                <img src={data?.data?.user.image} className='rounded-full size-40' />
                <div className='flex items-center flex-col'>
                  <p className='text-card-foreground font-bold text-2xl'>{data?.data?.user?.name}</p>
                  <p className='text-sidebar-ring' >{data?.data?.user?.email}</p>
                </div>
              </div>
              <KeyShortcuts />
            </div>
            <div className='w-full'>
              <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <DangerZone />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
