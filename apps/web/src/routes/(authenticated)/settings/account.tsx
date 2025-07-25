import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/(authenticated)/settings/account')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
    </div>
  )
}
