import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import { NavGroup } from '@/components/layout/nav-group'
import { LoadingNavUser, NavUser } from '@/components/layout/nav-user'
import { LoadingTeamSwitcher, OrgSwitcher } from '@/components/layout/org-switcher'
import { sidebarData } from './data/sidebar-data'
import { useListOrganizations } from '@/lib/auth-client'
import { NewApiKeyDialog } from '../api-key/new-api-key-dialog'
import { useGetSession } from '@/hooks/auth/useGetSession'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: orgs, isPending } = useListOrganizations()

  const { data: sessionData, isPending: isSessionPending } = useGetSession()


  const { open } = useSidebar()
  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarHeader>
        {isPending ? (
          <LoadingTeamSwitcher />
        ) : (
          <OrgSwitcher orgs={orgs} />
        )}
        <NewApiKeyDialog>
          <Button>
            <Plus className='size-4' />
            {open ? "Create API Key" : ""}
          </Button>
        </NewApiKeyDialog>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>

      {isSessionPending ? (
        <LoadingNavUser />
      ) : (
        <SidebarFooter>
          <NavUser user={{
            avatar: sessionData?.data?.user.image,
            name: sessionData?.data?.user.name,
            email: sessionData?.data?.user.email
          }} />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  )
}
