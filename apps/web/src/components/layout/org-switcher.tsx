import * as React from 'react'
import { ChevronsUpDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { NewOrgDialog } from '../org/new-org-dialog'
import { Skeleton } from '../ui/skeleton'
import { organization, useActiveOrganization } from '@/lib/auth-client'
import type { Organization } from '@/lib/auth-client'
import { cn } from '@/lib/utils'

export function OrgSwitcher({
  orgs,
}: {
  orgs: Organization[]
}) {
  const { isMobile } = useSidebar()
  let { data: activeOrg, isPending } = useActiveOrganization()

  activeOrg = activeOrg ?? orgs[0]

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {isPending
              ? <LoadingTeamSwitcher />
              : <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              >
                <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                  <img src={activeOrg.logo} className='size-4' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    {activeOrg.name}
                  </span>
                  {/*
                <span className='truncate text-xs'>{activeTeam.plan}</span>
                */}
                </div>
                <ChevronsUpDown className='ml-auto' />
              </SidebarMenuButton>
            }
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-muted-foreground text-xs'>
              Organizations
            </DropdownMenuLabel>
            {orgs.map((org) => (
              <OrgListItem key={org.id} id={org.id} name={org.name} slug={org.slug} logo={org.logo} />
            ))}
            <DropdownMenuSeparator />
            <NewOrgDialog />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}


type LoadingTeamSwitcherProps = {
  className?: string
}

export const LoadingTeamSwitcher = React.memo(({ className }: LoadingTeamSwitcherProps) => {
  return (
    <SidebarMenuButton
      size='lg'
      className={cn('!bg-transparent', className)}
    >
      <Skeleton className='flex aspect-square size-8 items-center justify-center rounded-lg' />
      <div className='grid flex-1 gap-2'>
        <Skeleton className='h-4' />
        <Skeleton className='h-3' />
      </div>
    </SidebarMenuButton>
  )
})

type OrgListItemProps = Pick<Organization, "id" | "slug" | "logo" | "name">

const OrgListItem = React.memo((props: OrgListItemProps) => {
  const handleClick = React.useCallback(
    async () => {
      await organization.setActive({
        organizationId: props.id,
        organizationSlug: props.slug
      })
    },
    [props.id, props.slug],
  )

  return (
    <DropdownMenuItem
      onClick={handleClick}
      className='gap-2 p-2'
    >
      <div className='flex size-6 items-center justify-center rounded-sm border'>
        <img src={props.logo} className='size-4 shrink-0' />
      </div>
      {props.name}
    </DropdownMenuItem>
  )
})
