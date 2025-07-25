import { AppSidebar } from '@/components/layout/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import { getSessionQueryOps } from '@/hooks/auth/useGetSession'
import { useTheme } from 'next-themes'
import { useHotkeys } from 'react-hotkeys-hook'
import { toast } from 'sonner'

export const Route = createFileRoute('/(authenticated)')({
  component: Dashboard,
  beforeLoad: async ({ context }) => {
    const { data } = await context.queryClient.fetchQuery(getSessionQueryOps())
    if (data === null) {
      throw redirect({
        to: "/"
      })
    }
  }
})

function Dashboard() {
  const theme = useTheme();

  useHotkeys('alt+t', evt => {
    evt.preventDefault()
    theme.setTheme(curr => {
      toast.info(`Theme Changed to ${curr === "light" ? "Dark" : "Light"} `)
      return curr === "light" ? "dark" : "light"
    })
  })

  return (
    <>
      <SidebarProvider defaultOpen={!true}>
        {/*
        <SkipToMain />
        */}
        <AppSidebar />
        <div
          id='content'
          className={cn(
            'ml-auto w-full max-w-full',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'sm:transition-[width] sm:duration-200 sm:ease-linear',
            'flex h-svh flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
          )}
        >
          <div className='pt-1 pb-1'>
            {/*
            <Header>
              <TopNav links={topNav} />
            <div className='ml-auto flex items-center space-x-4'>
          <Search />
                <ModeToggle />
              </div>
            </Header>
              */}
          </div>
          <div className='bg-sidebar h-full !rounded-lg p-6'>
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </>
  )
}



const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true,
  },
]
