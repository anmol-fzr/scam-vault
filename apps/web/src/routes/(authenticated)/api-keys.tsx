import { createFileRoute } from '@tanstack/react-router'
import { apiKey } from '@/lib/auth-client'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { DataTable } from '@/components/data-table'
import type { ColumnDef } from "@tanstack/react-table"
import { PlusIcon, Trash2Icon as TrashIcon } from "lucide-react/icons"
import { ConfirmDialog } from '@/components/confirm-dialog'
import { toast } from 'sonner'
import { H1, P } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { NewApiKeyDialog } from '@/components/api-key/new-api-key-dialog'
import { formatters } from '@/utils/formatters'
import { Else, If, Then } from '@/components/If'

type Payment = {
  name: string;
  requestCount: number;
  createdAt: string;
  prefix: string;
}

async function handleApiKeyDelete(keyId: string) {
  try {
    const { data, error } = await apiKey.delete({
      keyId
    })
    if (data?.success) {
      toast.success("API Key Deleted Successfully")
      return
    }
    toast.error(error?.message)
  } catch (error) {
    toast.error("Unable to Delete API Key", {
      description: "Please try after sometime"
    })
  }

}

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "requestCount",
    header: "Total Requests Made",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt

      return formatters.date(new Date(createdAt))
    }
  },
  // {
  //   accessorKey: "updatedAt",
  //   header: "Updated At",
  // },
  {
    accessorKey: "prefix",
    header: "Delete Key",
    cell: (row) => {
      const id = row.row.original.id
      return (
        <ConfirmDialog title='Delete API Key ?'
          desc='API Key deletion is an irreversible process'
          onProceed={() => handleApiKeyDelete(id)}
        >
          <button>
            <TrashIcon color='red' size={20} />
          </button>
        </ConfirmDialog>
      )
    }
  },
]

const apiKeyQueryOps = queryOptions({
  queryKey: ["API", "KEYS"],
  queryFn: () => apiKey.list()
})

export const Route = createFileRoute('/(authenticated)/api-keys')({
  component: RouteComponent,
  beforeLoad: () => {
    return { queryOptions: apiKeyQueryOps }
  },
  // loader: ({ context }) => {
  //   context.queryClient.prefetchQuery(context.queryOptions)
  // }
})

function RouteComponent() {
  const { queryOptions } = Route.useRouteContext()
  const { isPending, data } = useQuery(queryOptions)

  const vals = [{
    "name": "WalterWhite",
    "start": "gBQXwT",
    "prefix": null,
    "userId": "gvuSvhEbTP8PjyPaAe8uZ2wmIjQ8IMVz",
    "refillInterval": null,
    "refillAmount": null,
    "lastRefillAt": null,
    "enabled": true,
    "rateLimitEnabled": true,
    "rateLimitTimeWindow": 86400000,
    "rateLimitMax": 10,
    "requestCount": 0,
    "remaining": null,
    "lastRequest": null,
    "expiresAt": null,
    "createdAt": "2025-07-23T21:15:52.000Z",
    "updatedAt": "2025-07-23T21:15:52.000Z",
    "permissions": null,
    "metadata": null,
    "id": "JzY1dLWiTLb1NWs1IUFelsEumytpcZcQ"
  },
  {
    "name": "A New API Key",
    "start": "ypVPiM",
    "prefix": null,
    "userId": "gvuSvhEbTP8PjyPaAe8uZ2wmIjQ8IMVz",
    "refillInterval": null,
    "refillAmount": null,
    "lastRefillAt": null,
    "enabled": true,
    "rateLimitEnabled": true,
    "rateLimitTimeWindow": 86400000,
    "rateLimitMax": 10,
    "requestCount": 0,
    "remaining": null,
    "lastRequest": null,
    "expiresAt": null,
    "createdAt": "2025-07-23T21:16:32.000Z",
    "updatedAt": "2025-07-23T21:16:32.000Z",
    "permissions": null,
    "metadata": null,
    "id": "jxqZ0RFovncrwGQ1egJS51MDKXkNkeOU"
  },
  {
    "name": "Testing API Key func",
    "start": "iMyuLJ",
    "prefix": null,
    "userId": "gvuSvhEbTP8PjyPaAe8uZ2wmIjQ8IMVz",
    "refillInterval": null,
    "refillAmount": null,
    "lastRefillAt": null,
    "enabled": true,
    "rateLimitEnabled": true,
    "rateLimitTimeWindow": 86400000,
    "rateLimitMax": 10,
    "requestCount": 10,
    "remaining": null,
    "lastRequest": "2025-07-24T06:53:29.000Z",
    "expiresAt": null,
    "createdAt": "2025-07-24T06:07:52.000Z",
    "updatedAt": "2025-07-24T06:07:52.000Z",
    "permissions": null,
    "metadata": null,
    "id": "VmIjUidupNu317N168xDdQzGi3OSkj4D"
  },
  {
    "name": "Some random name",
    "start": "NolZPF",
    "prefix": null,
    "userId": "gvuSvhEbTP8PjyPaAe8uZ2wmIjQ8IMVz",
    "refillInterval": null,
    "refillAmount": null,
    "lastRefillAt": null,
    "enabled": true,
    "rateLimitEnabled": true,
    "rateLimitTimeWindow": 86400000,
    "rateLimitMax": 1000,
    "requestCount": 0,
    "remaining": null,
    "lastRequest": null,
    "expiresAt": null,
    "createdAt": "2025-07-24T16:09:17.000Z",
    "updatedAt": "2025-07-24T16:09:17.000Z",
    "permissions": null,
    "metadata": null,
    "id": "p8GSPP1iWqbC2ScImPntRbQzKN6AdtN4"
  },
  {
    "name": "Another Random Name",
    "start": "xrbhjB",
    "prefix": null,
    "userId": "gvuSvhEbTP8PjyPaAe8uZ2wmIjQ8IMVz",
    "refillInterval": null,
    "refillAmount": null,
    "lastRefillAt": null,
    "enabled": true,
    "rateLimitEnabled": true,
    "rateLimitTimeWindow": 86400000,
    "rateLimitMax": 1000,
    "requestCount": 0,
    "remaining": null,
    "lastRequest": null,
    "expiresAt": null,
    "createdAt": "2025-07-24T16:12:26.000Z",
    "updatedAt": "2025-07-24T16:12:26.000Z",
    "permissions": null,
    "metadata": null,
    "id": "vrWn5p4DRn8HagVQJzVb7vxd0WLQtlQi"
  },
  {
    "name": "Api key Name",
    "start": "gqKTmP",
    "prefix": null,
    "userId": "gvuSvhEbTP8PjyPaAe8uZ2wmIjQ8IMVz",
    "refillInterval": null,
    "refillAmount": null,
    "lastRefillAt": null,
    "enabled": true,
    "rateLimitEnabled": true,
    "rateLimitTimeWindow": 86400000,
    "rateLimitMax": 1000,
    "requestCount": 0,
    "remaining": null,
    "lastRequest": null,
    "expiresAt": null,
    "createdAt": "2025-07-24T16:15:25.000Z",
    "updatedAt": "2025-07-24T16:15:25.000Z",
    "permissions": null,
    "metadata": null,
    "id": "wnmqJdVnmXNTqZIdzawIiNoXjXBCkZV4"
  }
  ]

  return (
    <div className='flex flex-col gap-12 '>
      <div className='flex items-end justify-between'>
        <div>
          <H1>
            API Keys
          </H1>
          <P>
            Manage your personal API keys to authenticate requests to the API.
          </P>
        </div>
        <NewApiKeyDialog >
          <Button>
            <PlusIcon className='size-4' />
            Create API Key
          </Button>
        </NewApiKeyDialog>
      </div>
      <DataTable columns={columns} data={vals} isLoading={isPending} />
    </div >
  )
}
